import { createWebHistory, createRouter} from 'vue-router'

import FormPage from './FormPage.vue'
import HomePage from './HomePage.vue'
import LoginPage from './LoginPage.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/form', component: FormPage},
    {path: '/login', component: LoginPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router