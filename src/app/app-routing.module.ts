import { RouterModule, Routes } from '@angular/router';
import { InsertOrderComponent } from './insert-order/insert-order.component';
import { NgModule } from '@angular/core';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { SendOrderComponent } from './send-order/send-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'insert-order', component: InsertOrderComponent },
  { path: 'orders', component: ViewOrdersComponent },
  { path: 'send-order', component: SendOrderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
