const nodemailer = require('nodemailer');

const env = require('../config/env');

let transporter = null;

function validateMailConfiguration() {
    if (!env.mail.host) {
        throw new Error(
            'Mail service is not configured: MAIL_HOST is missing'
        );
    }

    if (!env.mail.user) {
        throw new Error(
            'Mail service is not configured: MAIL_USER is missing'
        );
    }

    if (!env.mail.password) {
        throw new Error(
            'Mail service is not configured: MAIL_PASSWORD is missing'
        );
    }

    if (!env.mail.from) {
        throw new Error(
            'Mail service is not configured: MAIL_FROM is missing'
        );
    }
}

function getTransporter() {
    if (transporter) {
        return transporter;
    }

    validateMailConfiguration();

    transporter = nodemailer.createTransport({
        host: env.mail.host,
        port: env.mail.port,
        secure: env.mail.secure,

        auth: {
            user: env.mail.user,
            pass: env.mail.password
        }
    });

    return transporter;
}

async function sendEmail(options) {
    if (!options || typeof options !== 'object') {
        throw new Error('Email options are required');
    }

    if (!options.to) {
        throw new Error('Email recipient is required');
    }

    if (!options.subject) {
        throw new Error('Email subject is required');
    }

    if (!options.text && !options.html) {
        throw new Error(
            'Email must contain either text or HTML content'
        );
    }

    const mailTransporter = getTransporter();

    const message = {
        from: env.mail.from,
        to: options.to,
        subject: options.subject
    };

    if (options.text) {
        message.text = options.text;
    }

    if (options.html) {
        message.html = options.html;
    }

    return mailTransporter.sendMail(message);
}

module.exports = {
    sendEmail
};
