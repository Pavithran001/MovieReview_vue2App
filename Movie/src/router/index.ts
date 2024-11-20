// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name:'home',
    component: () => import('@/components/Home.vue'),
  },
  {
    path: '/signup',
        name: 'signup',
        component: () => import('@/components/Signup.vue'),
  },
  {
    path: '/login',
        name: 'login',
        component: () => import('@/components/Login.vue'),
  },
  {
    path: '/details/:id',
        name: 'details',
        component: () => import('@/components/ReviewDetails.vue'),
  },
  {
    path: '/profile',
        name: 'profile',
        component: () => import('@/components/Profile.vue'),
  },
  {
    path: '/addReview',
        name: 'addReview',
        component: () => import('@/components/AddReview.vue'),
  },
  {
    path: '/viewPost',
        name: 'viewPost',
        component: () => import('@/components/ViewPost.vue'),
  },
  {
    path: '/updatePost/:id',
        name: 'updatePost',
        component: () => import('@/components/UpdatePost.vue'),
  },
  {
    path: '/detailsProfile/:id',
        name: 'detailsProfile',
        component: () => import('@/components/DetailsProfile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
