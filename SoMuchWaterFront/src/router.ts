import { createWebHistory, createRouter } from 'vue-router'

import FormPage from './FormPage.vue'
import HomePage from './HomePage.vue'
import LoginPage from './LoginPage.vue'
import DashBoard from './DashBoard.vue'
import UpdatePage from './UpdatePage.vue'
import DeletePage from './DeletePage.vue'

import { isAdmin } from './assets/ts/guard'

const routes = [
    { path: '/', component: HomePage },
    { path: '/form', component: FormPage },
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: DashBoard, async beforeEnter(to, from) {
        if(!await isAdmin()) return {path : "/"}
    }},{ path: '/item/:id', component: UpdatePage, async beforeEnter (to, from) {
        if(!await isAdmin()) return {path : "/"}
    }},{ path: '/item/delete/:id', component: DeletePage, async beforeEnter (to, from) {
        if(!await isAdmin()) return {path : "/"}}}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router