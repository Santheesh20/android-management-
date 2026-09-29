const readline = require('readline');

const bcrypt = require('bcryptjs');

const connectDatabase = require('../config/db');

const Permission = require('../models/permission.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

const {
    permissionDefinitions,
    administratorRole
} = require('../config/rbac');

function createQuestionInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(question) {
    const readlineInterface = createQuestionInterface();

    return new Promise(function (resolve) {
        readlineInterface.question(question, function (answer) {
            readlineInterface.close();
            resolve(answer.trim());
        });
    });
}

function askSecret(question) {
    return new Promise(function (resolve, reject) {
        const input = process.stdin;

        process.stdout.write(question);

        let value = '';

        function cleanup() {
            input.setRawMode(false);
            input.pause();
            input.removeListener('data', handleInput);
        }

        function handleInput(data) {
            const character = data.toString();

            if (character === '\u0003') {
                cleanup();
                process.stdout.write('\n');
                reject(new Error('Operation cancelled'));
                return;
            }

            if (character === '\r' || character === '\n') {
                cleanup();
                process.stdout.write('\n');
                resolve(value);
                return;
            }

            if (character === '\u007f') {
                if (value.length > 0) {
                    value = value.slice(0, -1);
                    process.stdout.write('\b \b');
                }

                return;
            }

            value += character;
            process.stdout.write('*');
        }

        input.setRawMode(true);
        input.resume();
        input.on('data', handleInput);
    });
}

function normalizeUsername(username) {
    return username.trim().toLowerCase();
}

function validateUsername(username) {
    if (!username) {
        throw new Error('Username is required');
    }

    if (username.length < 3 || username.length > 50) {
        throw new Error(
            'Username must be between 3 and 50 characters'
        );
    }

    if (!/^[a-z0-9._-]+$/.test(username)) {
        throw new Error(
            'Username may contain only letters, numbers, dot, underscore and hyphen'
        );
    }
}

function validatePassword(password) {
    if (!password) {
        throw new Error('Password is required');
    }

    if (password.length < 12) {
        throw new Error(
            'Password must be at least 12 characters long'
        );
    }
}

async function provisionPermissions() {
    const permissionIds = [];

    for (const permissionDefinition of permissionDefinitions) {
        const permission = await Permission.findOneAndUpdate(
            {
                code: permissionDefinition.code
            },
            {
                $setOnInsert: permissionDefinition
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
        );

        permissionIds.push(permission._id);
    }

    return permissionIds;
}

async function provisionAdministratorRole(permissionIds) {
    let role = await Role.findOne({
        code: administratorRole.code
    });

    if (!role) {
        role = await Role.create({
            name: administratorRole.name,
            code: administratorRole.code,
            description: administratorRole.description,
            permissionIds: permissionIds,
            isActive: true
        });

        console.log('Administrator role created');
        return role;
    }

    const existingPermissionIds = new Set(
        role.permissionIds.map(function (permissionId) {
            return permissionId.toString();
        })
    );

    const missingPermissionIds = permissionIds.filter(
        function (permissionId) {
            return !existingPermissionIds.has(
                permissionId.toString()
            );
        }
    );

    if (missingPermissionIds.length > 0) {
        role.permissionIds.push(...missingPermissionIds);
        await role.save();

        console.log(
            `Administrator role updated with ${missingPermissionIds.length} new permission(s)`
        );
    } else {
        console.log('Administrator role already up to date');
    }

    return role;
}

async function provisionAdministratorUser(role) {
    const usernameInput = await askQuestion(
        'Initial administrator username: '
    );

    const username = normalizeUsername(usernameInput);

    validateUsername(username);

    const existingUser = await User.findOne({
        username: username
    });

    if (existingUser) {
        throw new Error(
            `User "${username}" already exists. No changes were made to that user.`
        );
    }

    const password = await askSecret(
        'Initial administrator password: '
    );

    validatePassword(password);

    const passwordConfirmation = await askSecret(
        'Confirm administrator password: '
    );

    if (password !== passwordConfirmation) {
        throw new Error('Passwords do not match');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
        username: username,
        passwordHash: passwordHash,
        roleId: role._id,
        status: 'active'
    });

    console.log(`Administrator user "${user.username}" created`);
}

async function provision() {
    await connectDatabase();

    console.log('Starting RBAC provisioning...');

    const permissionIds = await provisionPermissions();

    console.log(
        `${permissionIds.length} permission(s) are available`
    );

    const administrator = await provisionAdministratorRole(
        permissionIds
    );

    await provisionAdministratorUser(administrator);

    console.log('RBAC provisioning completed successfully');
}

async function main() {
    try {
        await provision();
        process.exitCode = 0;
    } catch (error) {
        console.error('RBAC provisioning failed');
        console.error(error.message);
        process.exitCode = 1;
    }
}

main();