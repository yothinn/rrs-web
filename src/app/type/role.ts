export enum Role {
    Superadmin = 'superadmin',
    Admin = 'admin',
    Manager = 'manager',
    Staff = 'staff'
};

export const rolesList: string[] = [
    Role.Superadmin,
    Role.Admin,
    Role.Manager,
    Role.Staff
];

export const positionList: string[] = [
    'แอดมิน',
    'ผู้จัดการ',
    'พนักงาน',
];