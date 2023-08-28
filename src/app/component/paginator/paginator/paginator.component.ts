import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
	@Input() total!: number
	@Input() limit!: number
	@Output() changePage: EventEmitter<number> = new EventEmitter<number>()
	offset!: number
	pages!: number[]
	currentPage: number = 1
	maxPage: number = 1
	minPage: number = 1
	isMaxPage: boolean = false
	isMinPage: boolean = true


	ngOnChanges() {
		if (this.maxPage != Math.ceil(this.total / this.limit)) {
			this.currentPage = 1
			this.setDisabledEnabled()
		}
		this.maxPage = Math.ceil(this.total / this.limit)
		this.pages = new Array(this.maxPage)
	}
	onPageClick(page: number | string) {
		if (typeof page === 'number') {
			this.currentPage = page
			if (this.currentPage == this.maxPage) {
				this.isMaxPage = true
				this.isMinPage = false
			} else if (this.currentPage == this.minPage) {
				this.isMinPage = true
				this.isMaxPage = false

			} else {
				this.isMinPage = false
				this.isMaxPage = false
			}

		} else if (page === 'next') {
			this.currentPage++
			if (this.currentPage == this.maxPage) {
				this.isMaxPage = true
				this.isMinPage = false
			} else {
				this.isMinPage = false
				this.isMaxPage = false
			}


		} else if (page === 'previous') {
			this.currentPage--
			if (this.currentPage == this.minPage) {
				this.isMinPage = true
				this.isMaxPage = false

			} else {
				this.isMinPage = false
				this.isMaxPage = false
			}

		}
		this.offset = (this.currentPage - 1) * this.limit
		this.changePage.emit(this.offset)
	}

	setDisabledEnabled() {

		if (this.minPage == this.maxPage) {
			this.isMinPage = this.isMaxPage = true
		} else {
			this.isMinPage = true
			this.isMaxPage = false
		}

	}

}
