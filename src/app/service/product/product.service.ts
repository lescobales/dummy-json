import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, map, Observable} from 'rxjs';
import {Environment} from 'src/app/environment/environment';
import {Product, ProductHttp} from 'src/app/model/product.model';
import {SearchService} from '../search/search.service';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	private baseUrl!: string
	productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
	product$ = this.productsSubject$.asObservable()
	searchValue!: string

	constructor(private http: HttpClient,
		private searchService: SearchService) {
		this.baseUrl = Environment.API_URL
		this.searchService.value$.subscribe(value => {
			this.searchValue = value
			this.getAll().then(response => this.productsSubject$.next(response.products))

		})
	}

	get products() {
		return this.productsSubject$.value.map(p => ({...p}))
	}

	set products(products: Product[]) {
		this.productsSubject$.next(products)
	}

	getAll(limit: number = 10, offset: number = 0, name: string = ''): Promise<{total: string, products: Product[]}> {
		if (!this.searchValue && !name) {
			return firstValueFrom(this.http.get<{total: string, products: ProductHttp[]}>(this.baseUrl + 'products?limit=' + limit + '&skip=' + offset)
				.pipe(
					map(response => ({total: response.total, products: response.products.map(httpProduct => Product.productFromHttp(httpProduct))}))
				))

		} else {
			let search = this.searchValue ? this.searchValue : name
			return firstValueFrom(this.http.get<{total: string, products: ProductHttp[]}>(this.baseUrl + 'products/search?q=' + search + '&limit=' + limit + '&skip=' + offset)
				.pipe(
					map(response => ({total: response.total, products: response.products.map(httpProduct => Product.productFromHttp(httpProduct))}))
				))


		}
	}

	getById(id: number): Promise<Product> {
		return firstValueFrom(this.http.get<ProductHttp>(this.baseUrl + 'products/' + id)
			.pipe(
				map(response => (Product.productFromHttp(response)))
			))
	}

	update(product: Product): Promise<any> {
		const body = {...product}
		return firstValueFrom(this.http.put(this.baseUrl + 'products/' + product.id, body))
	}

}
