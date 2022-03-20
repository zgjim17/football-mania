import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminDashboard from '../views/adminViews/AdminDashboard.vue'
import CreateArticle from '@/views/articleViews/CreateArticle.vue'
import ArticleView from '@/views/articleViews/ArticleView.vue'
import AllLeagues from '@/views/leagueViews/AllLeagues.vue'
import LeagueView from '@/views/leagueViews/LeagueView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/article/:id',
    name: 'ArticleView',
    component: ArticleView
  },
  {
    path: '/article/create',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/leagues',
    name: 'AllLeagues',
    component: AllLeagues
  },
  {
    path: '/league/:id',
    name: 'LeagueView',
    component: LeagueView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
