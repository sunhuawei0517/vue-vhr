import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Test2 from '../views/Test2.vue'
import Test1 from '../views/Test1.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden:true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        hidden:true
    },
    {
        path: '/home',
        name: '菜单栏',
        component: Home,
        // 这里表示如果是从这个路径下面进行页面跳转的话，会优先展示在home页面下的<router-view/>
        children: [
            {
                path: '/test1',
                name: '选项1',
                component: Test1
            },
            {
                path: '/test2',
                name: '选项2',
                component: Test2
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
