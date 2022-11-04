export interface RouteMenu {
  path: string;
  title: string;
  children?: RouteMenu[];
}

const menus: RouteMenu[] = [
  {
    title: '标题1',
    path: '/demo1',
  },
  {
    title: '标题2',
    path: '/demo2',
  },
  {
    title: '测试',
    path: '/test',
  },
  // {
  //   title: '标题3',
  //   path: '/demo',
  //   children: [
  //     {
  //       title: '标题3 - 子标题1',
  //       path: '/demo/demo3'
  //     },
  //     {
  //       title: '标题3 - 子标题2',
  //       path: '/demo/demo4'
  //     }
  //   ]
  // },
];

export default menus;
