import menus, { RouteMenu } from '../menus';
import { Menu } from 'antd';
import { useHistory } from 'umi';
const { SubMenu } = Menu;

export default function () {
  const history = useHistory();

  // 获取默认打开的子菜单
  const getOpenKey = (path: string): Array<string> => {
    let result: Array<string> = [];
    const pathArray = path.split('/');
    for (let i = 2; i < pathArray.length; i++) {
      result.push(pathArray.slice(0, i).join('/'));
    }
    return result;
  };

  // 渲染侧边栏
  const renderMenu = (routes: RouteMenu[]) => {
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={getOpenKey(location.pathname)}
      >
        {routes.map((route) => {
          if (!route.children) return renderFirstMenu(route);
          if (route.children.length === 1)
            return renderFirstMenu(route.children[0]);
          // 递归多级菜单
          if (route.children.length > 1) return renderMultMenu(route);
          return '';
        })}
      </Menu>
    );
  };

  /**
   * 渲染一级菜单
   * @param route 路由数组
   * @param showIcon 是否显示 icon
   * @returns
   */
  const renderFirstMenu = (route: RouteMenu) => {
    return (
      <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
        {route?.title}
      </Menu.Item>
    );
  };

  // 渲染多级菜单
  const renderMultMenu = (subRoute: RouteMenu) => {
    return (
      <SubMenu title={subRoute?.title} key={subRoute.path}>
        {subRoute.children?.map((item) => {
          return renderFirstMenu(item);
        })}
      </SubMenu>
    );
  };

  return renderMenu(menus);
}
