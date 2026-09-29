const permissionDefinitions = [
    {
        name: 'View Dashboard',
        code: 'dashboard.view',
        module: 'dashboard',
        description: 'View dashboard'
    },

    {
        name: 'View Users',
        code: 'users.view',
        module: 'users',
        description: 'View users'
    },
    {
        name: 'Create Users',
        code: 'users.create',
        module: 'users',
        description: 'Create users'
    },
    {
        name: 'Update Users',
        code: 'users.update',
        module: 'users',
        description: 'Update users'
    },
    {
        name: 'Delete Users',
        code: 'users.delete',
        module: 'users',
        description: 'Delete users'
    },

    {
        name: 'View Roles',
        code: 'roles.view',
        module: 'roles',
        description: 'View roles'
    },
    {
        name: 'Create Roles',
        code: 'roles.create',
        module: 'roles',
        description: 'Create roles'
    },
    {
        name: 'Update Roles',
        code: 'roles.update',
        module: 'roles',
        description: 'Update roles'
    },
    {
        name: 'Delete Roles',
        code: 'roles.delete',
        module: 'roles',
        description: 'Delete roles'
    },

    {
        name: 'View Branding & UI',
        code: 'branding.view',
        module: 'branding',
        description: 'View Branding & UI'
    },
    {
        name: 'Update Branding & UI',
        code: 'branding.update',
        module: 'branding',
        description: 'Update Branding & UI'
    },

    {
        name: 'View App Whitelist',
        code: 'app_whitelist.view',
        module: 'app_whitelist',
        description: 'View app whitelist'
    },
    {
        name: 'Create App Whitelist',
        code: 'app_whitelist.create',
        module: 'app_whitelist',
        description: 'Create app whitelist entry'
    },
    {
        name: 'Update App Whitelist',
        code: 'app_whitelist.update',
        module: 'app_whitelist',
        description: 'Update app whitelist entry'
    },
    {
        name: 'Delete App Whitelist',
        code: 'app_whitelist.delete',
        module: 'app_whitelist',
        description: 'Delete app whitelist entry'
    },

    {
        name: 'View Organizations',
        code: 'organizations.view',
        module: 'organizations',
        description: 'View organizations'
    },
    {
        name: 'Create Organizations',
        code: 'organizations.create',
        module: 'organizations',
        description: 'Create organizations'
    },
    {
        name: 'Update Organizations',
        code: 'organizations.update',
        module: 'organizations',
        description: 'Update organizations'
    },
    {
        name: 'Delete Organizations',
        code: 'organizations.delete',
        module: 'organizations',
        description: 'Delete organizations'
    },

    {
        name: 'View Applications',
        code: 'applications.view',
        module: 'applications',
        description: 'View application management'
    },
    {
        name: 'Create Applications',
        code: 'applications.create',
        module: 'applications',
        description: 'Create applications'
    },
    {
        name: 'Update Applications',
        code: 'applications.update',
        module: 'applications',
        description: 'Update applications'
    },
    {
        name: 'Delete Applications',
        code: 'applications.delete',
        module: 'applications',
        description: 'Delete applications'
    },

    {
        name: 'View Devices',
        code: 'devices.view',
        module: 'devices',
        description: 'View devices and device details'
    },
    {
        name: 'Create Devices',
        code: 'devices.create',
        module: 'devices',
        description: 'Add or register devices'
    },
    {
        name: 'Update Devices',
        code: 'devices.update',
        module: 'devices',
        description: 'Update device information'
    },
    {
        name: 'Delete Devices',
        code: 'devices.delete',
        module: 'devices',
        description: 'Remove or deactivate devices'
    },
    {
        name: 'Link Devices',
        code: 'devices.link',
        module: 'devices',
        description: 'Link devices to customers'
    },
    {
        name: 'Unlink Devices',
        code: 'devices.unlink',
        module: 'devices',
        description: 'Remove customer links from devices'
    },
    {
        name: 'Assign Devices',
        code: 'devices.assign',
        module: 'devices',
        description: 'Assign devices'
    },
    {
        name: 'Unassign Devices',
        code: 'devices.unassign',
        module: 'devices',
        description: 'Remove device assignments'
    },
    {
        name: 'Bulk Assign Devices',
        code: 'devices.bulk_assign',
        module: 'devices',
        description: 'Bulk assign devices'
    },
    {
        name: 'Activate Devices',
        code: 'devices.activate',
        module: 'devices',
        description: 'Activate devices'
    },
    {
        name: 'Deactivate Devices',
        code: 'devices.deactivate',
        module: 'devices',
        description: 'Deactivate devices'
    },
    {
        name: 'Lock Devices',
        code: 'devices.lock',
        module: 'devices',
        description: 'Lock devices'
    },
    {
        name: 'Unlock Devices',
        code: 'devices.unlock',
        module: 'devices',
        description: 'Unlock devices'
    },

    {
        name: 'View Login Activity',
        code: 'login_activity.view',
        module: 'login_activity',
        description: 'View login activity'
    },

    {
        name: 'View Audit Logs',
        code: 'audit_logs.view',
        module: 'audit_logs',
        description: 'View audit logs'
    },

    {
        name: 'View Settings',
        code: 'settings.view',
        module: 'settings',
        description: 'View settings'
    },
    {
        name: 'Update Settings',
        code: 'settings.update',
        module: 'settings',
        description: 'Update settings'
    }
];

const administratorRole = {
    name: 'Administrator',
    code: 'administrator',
    description: 'Full platform administration role'
};

module.exports = {
    permissionDefinitions,
    administratorRole
};