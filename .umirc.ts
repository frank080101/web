import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/main' },
    {
      path: '/main',
      component: '@/pages/main',
    },
    {
      path: '/index',
      component: '@/pages/index',
    },
    {
      path: '/main111',
      component: '@/pages/main(1)',
    },
    {
      path: '/test',
      component: '@/pages/test',
    },
  ],
  fastRefresh: {},
});
