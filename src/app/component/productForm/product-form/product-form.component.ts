import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from 'src/app/model/product.model';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
	@Input() labelBtn!: string
	@Input() title!: string
	@Input() productToUpdate?: Product

	@Output() submittedForm: EventEmitter<Omit<Product, 'id'>> = new EventEmitter<Omit<Product, 'id'>>()

	productForm!: FormGroup

	constructor(private fb: FormBuilder) {

	}
	ngOnInit() {

		this.productForm = this.fb.group({
			title: [
				this.productToUpdate ? this.productToUpdate.title : '',
				[Validators.required]
			],
			description: [
				this.productToUpdate ? this.productToUpdate.description : '',
				[Validators.required]
			]
		})
	}
	onSubmitForm() {
		this.submittedForm.emit(this.productForm.value)
	}

}
