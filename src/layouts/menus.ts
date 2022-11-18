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
    title: 'uoseg',
    path: '/uoseg',
  }
];

export default menus;
