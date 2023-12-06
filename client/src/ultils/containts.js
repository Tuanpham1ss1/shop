import path from "./path"
import icons from "./icons"
export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'OUR_SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQ',
        path: `/${path.FAQ}`
    }
    
]

export const productInfoTab = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content:'Sản phẩm đồ trang sức'
    },
    {
        id: 2,
        name: 'WARRANTY',
        content:'test'
    },
    {
        id: 3,
        name: 'DELIVERY',
        content:'test'
    },
    {
        id: 4,
        name: 'PAYMENT',
        content:'test'
    },
]
export const color = [
    'black',
    'white',
    'pink',
    'orange',
    'blue',
    'green',
    'gold',
    'platinum',
 
]
export const sorts = [
    {
        id: 1,
        value: '-sold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: '-title',
        text: 'Z->A'
    },
    {
        id: 3,
        value: 'title',
        text: 'A->Z'
    },
    {
        id: 4,
        value: '-price',
        text: 'Price,high to low'
    },
    {
        id: 5,
        value: 'price',
        text: 'Price,low to high'
    },
]
export const voteOptions = [
    {
        id: 1,
        text:'Terrible'
    },
    {
        id: 2,
        text:'Bad'
    },{
        id: 3,
        text:'Neitral'
    },
    {
        id: 4,
        text:'Good'
    },
    {
        id: 5,
        text:'Perfect'
    },
    
    
    
]
const {GrDashboard,MdOutlineGroups,TbBrandProducthunt,RiBillLine} = icons
export const adminSlidebar = [
    {
        id:1,
        type:'SINGLE',
        text:'Dashboard',
        path:`/${path.ADMIN}/${path.DASBOARD}`,
        icons: <GrDashboard size={20}/>
    },
    {
        id:2,
        type:'SINGLE',
        text:'Manage users',
        path:`/${path.ADMIN}/${path.MANAGE_USER}`,
        icons: <MdOutlineGroups size={20} />
    },
    {
        id:3,
        type:'PARENT',
        text:'Manage products',
        icons: <TbBrandProducthunt size={20}/>,
        submenu: [
            {
                text: 'Create product',
                path:`/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
            },
            {
                text: 'Manage product',
                path:`/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
            }
        ]
    },
    {
        id:4,
        type:'SINGLE',
        text:'Manage orders',
        path:`/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icons: <RiBillLine size={20}/>
    },
]
export const memberSlidebar = [
    {
        id:1,
        type:'SINGLE',
        text:'Personal',
        path:`/${path.MEMBER}/${path.PERSONAL}`,
        icons: <GrDashboard size={20}/>
    },
    {
        id:2,
        type:'SINGLE',
        text:'My Cart',
        path:`/${path.MEMBER}/${path.MY_CART}`,
        icons: <MdOutlineGroups size={20} />
    },
    {
        id:3,
        type:'SINGLE',
        text:'Buy histories',
        path:`/${path.MEMBER}/${path.HISTORY}`,
        icons: <TbBrandProducthunt size={20}/>,
        
    },
    {
        id:4,
        type:'SINGLE',
        text:'Wishlist',
        path:`/${path.MEMBER}/${path.WISHLIST}`,
        icons: <RiBillLine size={20}/>
    },
]
export const roles = [
    {
        code:2001,
        value: 'Admin',
    },
    {
        code:4020,
        value:'User',
    }
]
export const blockStatus = [
    {
        code:true,
        value: 'Blocked',
    },
    {
        code:false,
        value:'Active',
    }
]