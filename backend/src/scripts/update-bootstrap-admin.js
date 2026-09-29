const readline = require('readline');

const mongoose = require('mongoose');

const connectDatabase = require('../config/db');
const User = require('../models/user.model');

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

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function validateEmail(email) {
    if (!email) {
        throw new Error('Email is required');
    }

    if (email.length > 254) {
        throw new Error('Email is too long');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        throw new Error('Invalid email address');
    }
}

async function updateBootstrapAdministrator() {
    const emailInput = await askQuestion(
        'Administrator email address: '
    );

    const email = normalizeEmail(emailInput);

    validateEmail(email);

    const administrator = await User.findOne({
        username: 'innolens'
    });

    if (!administrator) {
        throw new Error(
            'Bootstrap administrator "innolens" was not found'
        );
    }

    const existingUser = await User.findOne({
        email: email,
        _id: {
            $ne: administrator._id
        }
    });

    if (existingUser) {
        throw new Error(
            `Email "${email}" is already assigned to another user`
        );
    }

    administrator.email = email;
    administrator.username = email;

    await administrator.save();

    console.log('Bootstrap administrator updated successfully');
    console.log(`Email: ${administrator.email}`);
    console.log(`Username: ${administrator.username}`);
}

async function main() {
    try {
        await connectDatabase();

        await updateBootstrapAdministrator();

        process.exitCode = 0;
    } catch (error) {
        console.error('Bootstrap administrator update failed');
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

main();
