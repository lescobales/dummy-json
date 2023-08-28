import { Category, CategoryHttp } from "./category.model"

export interface Product {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: Category
	thumbnail: string
	images: Array<string>
}

export interface ProductHttp {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: CategoryHttp
	thumbnail: string
	images: Array<string>

}
export namespace Product {
	export function productFromHttp(productHttp: ProductHttp): Product{
		return {
		id: productHttp.id,
		title:  productHttp.title,
		description: productHttp.description,
		price: productHttp.discountPercentage,
		discountPercentage: productHttp.rating,
		rating: productHttp.rating,
		stock: productHttp.stock,
		brand: productHttp.brand,
		category: Category.fromCategoryHttpCategory(productHttp.category),
		thumbnail: productHttp.thumbnail,
		images: productHttp.images
		}
	}
}
