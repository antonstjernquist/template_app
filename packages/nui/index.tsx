/*
    NOTICE

    This is not used in production.
    Anything you put here will NOT get loaded into NPWD.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import '../../npwd.config';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import image from './bg.png';
import i18next from 'i18next';
import { routes } from './routes';

// Default settings will come from package. This is for development purposes.
const settings = {
  language: {
    label: 'English',
    value: 'en',
  },
  theme: {
    label: 'Theme name',
    value: 'theme-name',
  },
} as any;

/*
 *   Providers loaded here will only be applied to the development environment.
 *   If you want to add more providers to the actual app inside NPWD you have to add them INSIDE app.tsx.
 */

const Root = () => {
  if (import.meta.env.PROD) return null;

  return (
    <React.Suspense fallback="LOOOOL">
      <div className="relative m-12">
        <img src={image} className="top-0 left-0 absolute" />
        <div className="z-10 top-[101px] left-[51px] absolute w-[398px] h-[797px] rounded-3xl flex flex-col overflow-hidden">
          <div className="h-6 bg-black w-full"></div>
          <RouterProvider router={createHashRouter(routes)} />
        </div>
      </div>
    </React.Suspense>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
