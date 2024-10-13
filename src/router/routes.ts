// // 常量路由,将路由规则放在这里,后面需要拿到
// import login from '../views/login/index.vue'
// import layout from '../views/layout/index.vue'
// import err from '../views/404/index.vue'


// import home from '../views/layout/home/index.vue'

export const constantRoute = [
    {
        path: '/login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录页',
            hidden: true,
            icon: 'Select'
        }
    },
    {
        path: '/',
        component: () => import('../views/layout/index.vue'),
        children: [
            {
                path: '/home',
                component: () => import('../views/layout/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'House'
                }
            },
        ],
        // 添加显示该路由的名字
        meta: {
            hidden: false,
            icon: 'House'
        },
        // '/'为layout，'.home'为layout+home,默认展示到二级路由home
        redirect: '/home'

    },
    {
        path: '/screen',
        component: () => import('../views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: 'Screen',
            hidden: false,
            icon: 'Platform'
        }
    },
    {
        path: '/acl',
        component: () => import('../views/layout/index.vue'),
        name: 'ACL',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        redirect:'/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('../views/acl/user/index.vue'),
                name:'User',
                meta:{
                    title:'用户管理',
                    hidden:false,
                    icon:'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('../views/acl/role/index.vue'),
                name:'Role',
                meta:{
                    title:'角色管理',
                    hidden:false,
                    icon:'UserFilled'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('../views/acl/permission/index.vue'),
                name:'Permission',
                meta:{
                    title:'菜单管理',
                    hidden:false,
                    icon:'UserFilled'
                }
            },
        ]
    },
    {
        path: '/product',
        component: () => import('../views/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods'
        },
        redirect:'/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('../views/product/trademark/index.vue'),
                name: 'trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCartFull',
                    hidden: false
                }
            },
            {
                path: '/product/attr',
                component: () => import('../views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled',
                    hidden: false
                }
            },
            {
                path: '/product/spu',
                component: () => import('../views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    icon: 'Calendar',
                    hidden: false
                }
            },
            {
                path: '/product/sku',
                component: () => import('../views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange',
                    hidden: false
                }
            },
        ]
    },

    {
        path: '/404',
        component: () => import('../views/404/index.vue'),
        meta: {
            title: '404错误',
            hidden: true,
            icon: 'Close'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'Coin'
        }
    }
]