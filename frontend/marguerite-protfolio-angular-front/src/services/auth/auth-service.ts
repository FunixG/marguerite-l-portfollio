import {Injectable} from "@angular/core";
import {GenericHttpClient} from "../../lib/requests/generic-http-client";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PasswordRequestDTO} from "../../dtos/auth/password-request-dto";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export default class AuthService extends GenericHttpClient {

    private readonly path

    constructor(private readonly httpClient: HttpClient) {
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
                    return throwError(() => this.buildErrorDto(error))
                })
            )
    }

}