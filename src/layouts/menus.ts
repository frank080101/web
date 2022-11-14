export interface RouteMenu {
  path: string;
  title: string;
  children?: RouteMenu[];
}

const menus: RouteMenu[] = [
  {
    title: 'fusion',
    path: '/fusion',
  },
  {
    title: 'segmentation',
    path: '/segmentation',
  },
  {
    title: 'test',
    path: '/test',
  }
];

export default menus;
