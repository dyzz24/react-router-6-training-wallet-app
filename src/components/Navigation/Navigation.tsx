import React, { useEffect, useState } from 'react';
import { Link, useLocation, Location } from 'react-router-dom';

import style from './Navigation.module.scss';

type BreadcrumbsType = {
  id: string;
  title: string;
  path: string;
};
export const Navigation = React.memo(() => {
  const location = useLocation();
  const [breadCrumbs, setBreadCrumbs] = useState<BreadcrumbsType[]>([
    { id: '/home', title: '/home', path: '/home' },
  ]);

  const pushToBreadcrumbs = (locationState: Location) => {
    setBreadCrumbs((prevState) => [
      ...prevState?.filter(
        (el) =>
          el.id !== locationState.pathname &&
          `${el.id}/` !== locationState.pathname,
      ),
      {
        id: locationState.pathname,
        path: locationState.pathname + locationState.search,
        title: locationState.pathname.replace('/home/', ''),
      },
    ]);
  };

  const cutBreadCrumb = (crumbIndex: number) => {
    setBreadCrumbs((prevState) =>
      prevState.filter((_, idx) => idx <= crumbIndex),
    );
  };

  useEffect(() => {
    if (location.pathname) {
      pushToBreadcrumbs(location);
    }
  }, [location]);

  return (
    <div className={style.wrapper}>
      {breadCrumbs.map((crumb, idx) => (
        <Link
          to={crumb.path}
          key={crumb.id}
          className={style.link}
          onClick={() => cutBreadCrumb(idx)}
        >
          {crumb.title}
        </Link>
      ))}
    </div>
  );
});
