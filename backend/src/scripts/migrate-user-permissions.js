const mongoose = require('mongoose');

const connectDatabase = require('../config/db');

const User = require('../models/user.model');
const Role = require('../models/role.model');

async function migrateUserPermissions() {
    const user = await User.findOne({
        email: 'santheeshjm2003@gmail.com'
    });

    if (!user) {
        throw new Error(
            'Administrator user was not found'
        );
    }

    const role = await Role.findById(user.roleId);

    if (!role) {
        throw new Error(
            'Administrator user role was not found'
        );
    }

    const rolePermissionIds = role.permissionIds || [];

    user.permissionIds = rolePermissionIds;

    await user.save();

    console.log('User permission migration completed');
    console.log(`User: ${user.username}`);
    console.log(`Role: ${role.code}`);
    console.log(
        `Permissions assigned: ${user.permissionIds.length}`
    );
}

async function main() {
    try {
        await connectDatabase();

        await migrateUserPermissions();

        process.exitCode = 0;
    } catch (error) {
        console.error(
            'User permission migration failed'
        );
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

main();
