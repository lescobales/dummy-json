export type Category =  string

export type CategoryHttp = string

export namespace Category {
	export function fromCategoryHttpCategory (categoryHttp: CategoryHttp): Category {
		return categoryHttp
	}
}
