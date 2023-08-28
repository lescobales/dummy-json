import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	private valueSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('')
	value$: Observable<string> = this.valueSubject$.asObservable()
	constructor() {}

	get value() {
		return this.valueSubject$.value
	}

	set value(value: string) {
		this.valueSubject$.next(value)
	}

}
