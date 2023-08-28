import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, switchMap, map} from 'rxjs';
import {SearchService} from 'src/app/service/search/search.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

	searchTerms = new BehaviorSubject<string>('')
	constructor(private searchService: SearchService) {

	}

	ngOnInit() {
		this.searchTerms.pipe(
			debounceTime(300),
			distinctUntilChanged(),
		).subscribe(term => this.searchService.value = term)

	}

	onKeyUp(term: string) {
		this.searchTerms.next(term)

	}
}
