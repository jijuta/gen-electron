import store from '../store/index'
function guardMyroute(to, from, next) {
  console.log(store.loginData, "asddddddddddddddddddd")
  // const authenticated = store.getters['getLoginData'];
  // console.log("1231312313123", authenticated);
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem('isAuthenticated'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}
const routes = [
  {
    path: '/',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Login') },
      { path: '/login', component: () => import('pages/auth/Login') },
      { path: '/logout', component: () => import('pages/auth/Logout') },
      { path: '/sign', component: () => import('pages/auth/Sign') },
      { path: '/signin', component: () => import('pages/auth/Signin') },

    ]
  },
  {
    path: '/gen',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: "home", beforeEnter : guardMyroute, path: '', component: () => import('pages/Index'), meta: {title: 'egov'} },
      { name: "cmp", beforeEnter : guardMyroute, path: '/gen/cmp', component: () => import('pages/cmpView'), meta: {title: 'boot'} },
      { name: "node", beforeEnter : guardMyroute, path: '/gen/node', component: () => import('pages/NodePage'), meta: {title: 'node js'} },
      { name: "php", beforeEnter : guardMyroute, path: '/gen/php', component: () => import('pages/PhpPage'), meta: {title: 'php '} }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/auth/UserView') },
      { path: '/auth/login', component: () => import('pages/auth/UserView') }
    ]
  },
]
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
