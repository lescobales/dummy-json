import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './view/productsList/product-list/product-list.component';
import { ProductDetailsComponent } from './view/productDetails/product-details/product-details.component';
import { HeaderComponent } from './component/header/header/header.component';
import { LoginComponent } from './view/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './component/paginator/paginator/paginator.component';
import { SearchBarComponent } from './component/searchBar/search-bar/search-bar.component';
import { EditComponent } from './view/edit/edit/edit.component';
import { ProductFormComponent } from './component/productForm/product-form/product-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    HeaderComponent,
    LoginComponent,
    PaginatorComponent,
    SearchBarComponent,
    EditComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  FormsModule,
	  ReactiveFormsModule,
	  HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
