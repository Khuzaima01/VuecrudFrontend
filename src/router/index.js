import { createRouter, createWebHistory } from 'vue-router'
import Create from "../components/Create.vue";
import Show from "../components/Show.vue"
import Update from "../components/Update.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Create',
      component: Create,
      meta: { title: 'CreateUser : Vue Crud' },

    },
    {
      path: '/show/product',
      name: 'Show',
      component: Show,
      meta: { title: 'ShowUser : Vue Crud' },
    },
     {
      path: '/update/product/:id',
      name: 'Update',
      component: Update,
      meta: { title: 'UpdateUser : Vue Crud' },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Default Title';
  }
  next();
});

export default router
