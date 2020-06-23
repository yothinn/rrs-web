import { FuseNavigation } from '@fuse/types';

// export const navigation: FuseNavigation[] = [
//     {
//         id       : 'applications',
//         title    : 'Applications',
//         translate: 'NAV.APPLICATIONS',
//         type     : 'group',
//         children : [
//             {
//                 id       : 'main',
//                 title    : 'main',
//                 translate: 'NAV.SAMPLE.TITLE',
//                 type     : 'item',
//                 icon     : 'email',
//                 url      : '/sample',
//                 badge    : {
//                     title    : '25',
//                     translate: 'NAV.SAMPLE.BADGE',
//                     bg       : '#F44336',
//                     fg       : '#FFFFFF'
//                 }
//             }
//         ]
//     },
// ];

// Main navigation
export const MAIN_NAVNAME = 'main';
export const navigation: FuseNavigation[] = [
    {
        id       : 'mainDashboard',
        title    : 'ภาพรวม',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'item',
        url      : '/dashboard',

    },
    {
        id       : 'addRestuarant',
        title    : 'เพิ่มร้านค้า',
        icon     : 'email',
        //translate: 'NAV.APPLICATIONS',
        type     : 'item',
        url      : '/restuarant/new',
    },
    {
        id       : 'permission',
        title    : 'กำหนดสิทธิผู้ใช้งาน',
        icon     : 'email',
        //translate: 'NAV.APPLICATIONS',
        type     : 'item',
        url      : '/permissions/list',
    },
    {
        id       : 'customer',
        title    : 'รายชื่อลูกค้า',
        icon     : 'email',
        //translate: 'NAV.APPLICATIONS',
        type     : 'item',
        url      : '/customers/list',
    },
];

export const REST_NAVNAME = 'restuarantNav';
export const restuarantNav: FuseNavigation[] = [
    {
        id       : 'restDashboard',
        title    : 'ภาพรวม',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'item',
        url      : '/restuarant/dashboard',           // /restuarant/dashboard?rest=id
    },
    {
        id       : 'restInfo',
        title    : 'ร้านค้า',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'item',
        url      : '/restuarant/info',               // /restuarant/desp?rest=id
    },
    {
        id       : 'mealGroup',
        title    : 'มื้ออาหาร',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'collapsable',
        children : [
            {
                id       : 'addMeal',
                title    : 'เพิ่มมื้ออาหาร',
                //translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                //icon     : 'email',
                url      : '/restuarant/meal',      // /restuarant/meal?rest=id&meal=new
            }
        ]
    },
    {
        id       : 'restUser',
        title    : 'กำหนดผู้ใช้งาน',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'item',
        url      : '/restuarant/user',               // /restuarant/user?rest=id
    },
    {
        id       : 'restHoliday',
        title    : 'วันหยุด',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'item',
        url      : '/restuarant/holiday',               // /restuarant/holiday?rest=id
    },
];


// For add to restuarant nav when super admin login
export const backMainNav: FuseNavigation[] = [
    {
        id       : 'backMain',
        title    : 'กลับสู่หน้าหลัก',
        //translate: 'NAV.APPLICATIONS',
        icon     : 'email',
        type     : 'item',
        url      : '/main',               
    },
];
