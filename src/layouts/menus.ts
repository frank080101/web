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
  },
  {
    title: 'multitask',
    path: '/multitask',
  },
  {
    title: 'lidar_semantic',
    path: '/lidar_semantic',
  }
];

export default menus;
