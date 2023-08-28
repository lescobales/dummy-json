import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Product} from 'src/app/model/product.model';
import {ProductService} from 'src/app/service/product/product.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	productToUpdate!: Promise<Product>

	constructor(private route: ActivatedRoute,
		private productService: ProductService) {

	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')
		if (id) {
			this.productToUpdate = this.productService.getById(parseInt(id))

		}
	}
	updateProduct(product: Omit<Product, 'id'>) {

	}

}
