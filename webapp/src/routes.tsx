import { Login, PostCreate, PostList, PostView } from './pages'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/post/create',
        component: PostCreate
    },
    {
        path: '/post/edit/:id',
        component: PostCreate,
    },

    {
        path: '/post/:id',
        ccomponent: PostView
    }
]

export default routes