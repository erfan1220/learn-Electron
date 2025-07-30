import { Route } from '@angular/router';
import { Layout } from './shared/layout/layout';

export const PagesRoutes: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'main-page',
        loadComponent: () =>
          import('./components/main-page/main-page').then((m) => m.MainPage),
      },
      {
        path: 'add-phone',
        loadComponent: () =>
          import('./components/add-phone/add-phone').then((m) => m.AddPhone),
      },
      {
        path: 'update',
        loadComponent: () =>
          import('./components/update-phone/update-phone').then((m) => m.UpdatePhone),
      },
      {
        path: '**',
        redirectTo: 'main-page',
      },
    ],
  },
];
