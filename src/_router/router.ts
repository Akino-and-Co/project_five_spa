import Vue from 'vue';
import Router from 'vue-router';
import store from '../_store/store';
import Meta from 'vue-meta';
// main navigation routes
// import extMainRoutes from './main';
// static routes
import extStaticRoutes from './static';
import extLastRedirectRoutes from './last';

Vue.use(Router);
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
});

const routers = new Router({
  mode: 'history',
  routes: [
    ...extStaticRoutes,
    ...extLastRedirectRoutes,
  ],
});

// This works! Now we can set paths that we want to be authorized only.
routers.beforeEach((to, from, next) => {
  if (to.matched.some((path) => path.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.getAuth) {
      // console.log('passed');
      next();
    } else {
      // console.log('failure');
      // user is not logged in so we send to login page
      next({ name: 'login' });
    }
  }
  // otherwise next
  next();
});

export default routers;
