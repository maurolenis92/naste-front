import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { tokenGuard } from './guards/token.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layaouts/dashboard-layaout/dashboard-layaout.component').then(
        m => m.DashboardLayaoutComponent
      ),
    canActivate: [tokenGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products-view/products-view.component').then(
            m => m.ProductsViewComponent
          ),
      },
      {
        path: 'products/create',
        loadComponent: () =>
          import('./pages/products/products-form/products-form.component').then(
            m => m.ProductsFormComponent
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/products/product-detail/product-detail.component').then(
            m => m.ProductDetailComponent
          ),
      },
      {
        path: 'products/:id/edit',
        loadComponent: () =>
          import('./pages/products/products-form/products-form.component').then(
            m => m.ProductsFormComponent
          ),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./pages/invoices/invoices-view/invoices-view.component').then(
            m => m.InvoicesViewComponent
          ),
      },
      {
        path: 'invoices/create',
        loadComponent: () =>
          import('./pages/invoices/invoice-form/invoice-form.component').then(
            m => m.InvoiceFormComponent
          ),
      },
      {
        path: 'invoices/:id',
        loadComponent: () =>
          import('./pages/invoices/invoice-detail/invoice-detail.component').then(
            m => m.InvoiceDetailComponent
          ),
      },
      {
        path: 'invoices/:id/edit',
        loadComponent: () =>
          import('./pages/invoices/invoice-form/invoice-form.component').then(
            m => m.InvoiceFormComponent
          ),
      },
    ],
  },
  {
    path: 'home',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
