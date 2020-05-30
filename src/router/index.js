import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Login = () => import('views/login/Login')
const Register = () => import('views/register/Register')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const List = () => import('views/list/List')
const Detail = () => import('views/detail/Detail')
const Order = () => import('views/order/Order')
const Pay = () => import('views/pay/Pay')
const SearchResults = () => import('components/content/searchbox/SearchResults')
const AdminLogin = () => import('views/admin/login/AdminLogin')
const AdminHome = () => import('views/admin/Admin')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/list',
    component: List
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay
  },
  {
    path: '/searchresults',
    component: SearchResults
  },
  // {
  //   path: '/admin',
  //   redirect: '/admin/login'
  // },
  {
    path: '/admin',
    component: AdminLogin
  },
  {
    path: '/adminhome',
    component: AdminHome
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
