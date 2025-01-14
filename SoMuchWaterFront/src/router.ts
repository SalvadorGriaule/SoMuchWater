import { createMemoryHistory, createRouter} from 'vue-router'

import FormPage from './FormPage.vue'
import HomePage from './HomePage.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/form', component: FormPage}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router