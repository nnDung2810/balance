import { Collapse, Popover } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router';

import { routerLinks } from '@utils';
import listMenu from '../menus';
import './index.less';

const Layout = ({ isCollapsed = false, permission = [] }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const refMenu: any = useRef();

  const [menuActive, set_menuActive]: any = useState();
  useEffect(() => {
    let linkActive = '';
    listMenu().forEach((item: any) => {
      if (!linkActive && !!item.children && location.pathname.indexOf(routerLinks(item.name)) > -1) {
        linkActive = routerLinks(item.name);
      }
    });
    set_menuActive([linkActive]);
  }, []);

  useEffect(() => {
    const ele = document.getElementById('menu-sidebar');
    if (ele) {
      import('perfect-scrollbar').then(({ default: PerfectScrollbar }) => {
        new PerfectScrollbar(ele, {
          suppressScrollX: true,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (isCollapsed) {
      refMenu.current.scrollTop = 0;
    }
  }, [isCollapsed]);

  return (
    <ul className="menu relative h-[calc(100vh-5rem)]" id={'menu-sidebar'} ref={refMenu}>
      {!!menuActive &&
        listMenu()
          .filter((item: any) => !item.permission || permission?.includes(item.permission))
          .map((item: any, index) => {
            if (!item.child) {
              return (
                <li
                  className={classNames('flex items-center h-11 m-3 px-2', {
                    'bg-white text-blue-500 rounded-2xl': location.pathname === routerLinks(item.name),
                    'justify-center': isCollapsed,
                  })}
                  onClick={() => navigate(routerLinks(item.name))}
                  key={index}
                >
                  <i className={classNames('text-3xl', item.icon)} />
                  <span
                    className={classNames('ml-2.5 transition-all duration-300 ease-in-out font-bold', {
                      'opacity-100': !isCollapsed,
                      'opacity-0 text-[0] ml-0': isCollapsed,
                    })}
                  >
                    {item.name}
                  </span>
                </li>
              );
            } else {
              return isCollapsed ? (
                <Popover
                  key={index}
                  placement="rightTop"
                  trigger={'hover'}
                  content={
                    <>
                      {item.child.map((subItem: any, index: number) => (
                        <li
                          key={index}
                          className={classNames('child-item py-2 cursor-pointer', {
                            'bg-white text-blue-500': location.pathname.indexOf(routerLinks(subItem.name)) > -1,
                          })}
                          onClick={() => navigate(routerLinks(subItem.name))}
                        >
                          {subItem.name}
                        </li>
                      ))}
                    </>
                  }
                >
                  <li className="flex items-center justify-center h-11 m-3 px-2">
                    <i className={classNames('text-3xl block', item.icon)} />
                  </li>
                </Popover>
              ) : (
                <li className="my-3" key={index}>
                  <Collapse
                    accordion
                    bordered={false}
                    className={classNames('bg-blue-100', {
                      'active-menu': location.pathname.indexOf(routerLinks(item.name)) > -1,
                    })}
                    defaultActiveKey={menuActive}
                  >
                    <Collapse.Panel
                      key={index}
                      showArrow={!isCollapsed}
                      header={
                        <div
                          className={classNames('flex items-center text-gray-500', {
                            'justify-center': isCollapsed,
                          })}
                        >
                          <i
                            className={classNames('text-3xl block', item.icon, {
                              'ml-1': !isCollapsed,
                            })}
                          />
                          <span
                            className={classNames('pl-2.5 transition-all duration-300 ease-in-out font-bold', {
                              'opacity-100': !isCollapsed,
                              'opacity-0 text-[0]': isCollapsed,
                            })}
                          >
                            {item.name}
                          </span>
                        </div>
                      }
                    >
                      {item.child.map((subItem: any, index: number) => (
                        <li
                          key={index}
                          className={classNames('child-item py-2 cursor-pointer', {
                            'bg-white text-blue-500': location.pathname.indexOf(routerLinks(subItem.name)) > -1,
                          })}
                          onClick={() => navigate(routerLinks(subItem.name))}
                        >
                          {subItem.name}
                        </li>
                      ))}
                    </Collapse.Panel>
                  </Collapse>
                </li>
              );
            }
          })}
    </ul>
  );
};
export default Layout;
