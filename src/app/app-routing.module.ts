import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { RegisterComponent } from './demo/elements/register/register.component';
import { ShowProductComponent } from './demo/product/show-product/show-product.component';
import { UpdateProductComponent } from './demo/product/update-product/update-product.component';
import { SaleComponent } from './demo/sale/sale.component';


export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
       {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent)
      },
      /*{
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      }, */
      {
        path: 'registrar-producto',
        loadComponent: () => import('./demo/elements/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'ver-producto',
        loadComponent: () => import('./demo/product/show-product/show-product.component').then(m => m.ShowProductComponent)
      },
      {
        path: 'update_product/:id',
        loadComponent: ()=>import('./demo/elements/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'compra',
        loadComponent: () => import('./demo/sale/sale.component').then(m => m.SaleComponent),
        
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
