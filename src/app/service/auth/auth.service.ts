import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, map} from 'rxjs';
import {Environment} from 'src/app/environment/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseUrl: string
	private tokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('')
	token$ = this.tokenSubject$.asObservable()

	constructor(private http: HttpClient) {
		this.baseUrl = Environment.API_URL
	}

	get token() {
		return this.tokenSubject$.value
	}
	login(credentials: {username: string, password: string}): Promise<void> {
		return firstValueFrom(this.http
			.post<{token: string}>(
				this.baseUrl + 'auth/login', credentials)
			.pipe(
				map(response => this.tokenSubject$.next(response.token))
			))
	}

	logout() {
		this.tokenSubject$.next('')
	}
}

