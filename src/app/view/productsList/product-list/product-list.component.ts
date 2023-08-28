import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product, ProductHttp} from 'src/app/model/product.model';
import {ProductService} from 'src/app/service/product/product.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	products: Product[] = []
	totalSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
	limit: number = 10

	constructor(private productService: ProductService) {

	}

	ngOnInit() {
		this.productService.product$.subscribe(() => this.getProduct())
	}

	getNewPage(page: number) {
		// this.offset = (page - 1) * this.limit
		this.getProduct(page)
	}

	getProduct(offset: number = 0) {
		this.productService.getAll(this.limit, offset)
			.then(response => {
				this.products = response.products
				this.totalSubject$.next(parseInt(response.total))
			})
			.catch(err => console.log(err))

	}

	updateProduct(product: Product) {
		this.productService.update(product).then(res => console.log(res))
	}
}
