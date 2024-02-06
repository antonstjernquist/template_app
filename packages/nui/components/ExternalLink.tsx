import React from 'react';
import { HashRouter, Link, LinkProps } from 'react-router-dom';

// Used to navigate outside /ride-app
export const LinkExternal = (props: LinkProps) => {
  return (
    <HashRouter>
      <Link {...props} />
    </HashRouter>
  );
};
