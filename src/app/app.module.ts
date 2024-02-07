import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { InsertOrderComponent } from './insert-order/insert-order.component';
import { NgModule } from '@angular/core';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { AddressDetailsDialogComponent } from './address-details-dialog/address-details-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { FilterOrdersComponent } from './filter-orders/filter-orders.component';
import { ValidatorDirective } from './not-empty-string-validator.directive';
import { SendOrderComponent } from './send-order/send-order.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewOrdersComponent,
    InsertOrderComponent,
    ProductSelectionComponent,
    AddressDetailsDialogComponent,
    UpdateOrderComponent,
    ViewProductsComponent,
    FilterOrdersComponent,
    ValidatorDirective,
    SendOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule],
  bootstrap: [AppComponent]
})

export class AppModule {}
