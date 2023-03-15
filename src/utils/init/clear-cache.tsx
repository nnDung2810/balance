import React, { useRef } from 'react';
import { timeBuild } from '../variable';

function withClearCache(Component: any) {
  function ClearCacheComponent(props: any) {
    const componentMounted = useRef(false);
    if (!componentMounted.current) {
      fetch('/meta.json')
        .then((response) => response.json())
        .then((meta) => {
          const latestVersionDate = meta.buildDate;
          let currentVersionDate: any = localStorage.getItem(timeBuild);
          currentVersionDate = parseInt(currentVersionDate);
          if (!currentVersionDate || latestVersionDate > currentVersionDate) {
            localStorage.clear();
            localStorage.setItem(timeBuild, new Date().getTime().toString());
            refreshCacheAndReload();
          }
        });
      componentMounted.current = true;
    }

    const refreshCacheAndReload = () => {
      if (caches) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
      window.location.reload();
    };

    return (
      <React.Fragment>
        <Component {...props} />
      </React.Fragment>
    );
  }

  return ClearCacheComponent;
}

export default withClearCache;
