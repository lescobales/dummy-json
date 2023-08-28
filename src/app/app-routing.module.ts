import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from './guard/auth/auth.guard';
import {EditComponent} from './view/edit/edit/edit.component';
import {LoginComponent} from './view/login/login/login.component';
import {ProductDetailsComponent} from './view/productDetails/product-details/product-details.component';
import {ProductListComponent} from './view/productsList/product-list/product-list.component';

const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'login'},
	{path: 'login', component: LoginComponent},
	{
		path: 'produits', canActivate: [authGuard], children: [
			{path: '', component: ProductListComponent},
			{path: ':id/edit', component: EditComponent},
			{path: ':id', component: ProductDetailsComponent}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
