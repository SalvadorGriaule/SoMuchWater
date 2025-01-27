import { createWebHistory, createRouter} from 'vue-router'

import FormPage from './FormPage.vue'
import HomePage from './HomePage.vue'
import LoginPage from './LoginPage.vue'
import DashBoard from './DashBoard.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/form', component: FormPage},
    {path: '/login', component: LoginPage},
    {path: '/dashboard', component: DashBoard}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router