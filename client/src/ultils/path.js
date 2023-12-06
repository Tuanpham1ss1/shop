const path = {
    PUBLIC: '/',
    HOME: '',
    ALL : '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINALREGISTER:'finalregister/:status',
    RESETPASSWORD:'reset-password/:token',

    //Admin
    ADMIN: 'admin',
    DASBOARD: 'dashboard',
    MANAGE_USER:'manage-user',
    MANAGE_PRODUCT:'manage-product',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCTS: 'create-products',

    //Member
    MEMBER: 'member',
    PERSONAL : 'personal',
    MY_CART : 'my-cart',
    HISTORY : 'buy-history',
    WISHLIST : 'wishlist',

}

export default path