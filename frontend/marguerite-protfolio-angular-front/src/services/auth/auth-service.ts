import {Injectable} from "@angular/core";
import {GenericHttpClient} from "../../lib/requests/generic-http-client";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PasswordRequestDTO} from "../../dtos/auth/password-request-dto";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export default class AuthService extends GenericHttpClient {

    private readonly path

    constructor(private readonly httpClient: HttpClient,
                private readonly router: Router) {
        super()
        this.path = environment.apiUrl + '/auth'
    }

    login(password: string): Observable<{ token: string }> {
        return this.httpClient.post<{ token: string }>(this.path + '/login', password, {headers: {
                'Content-Type': 'application/json'
        }})
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => this.buildErrorDto(error))
                })
            )
    }

    setPassword(request: PasswordRequestDTO): Observable<void> {
        return this.httpClient.post<void>(this.path + '/setPassword', request, {headers: super.getHeaders()})
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if (typeof localStorage !== 'undefined') {
                            localStorage.removeItem(GenericHttpClient.accessTokenLocalStorageName);
                            this.router.navigate(['/admin']);
                        }
                    }

                    return throwError(() => this.buildErrorDto(error))
                })
            )
    }

}