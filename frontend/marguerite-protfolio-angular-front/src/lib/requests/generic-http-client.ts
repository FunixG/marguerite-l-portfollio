import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ErrorDto} from "../dtos/error-dto";

export abstract class GenericHttpClient {

    public static getBearer(): string | null {
        if (typeof localStorage === 'undefined') {
            return null;
        } else {
            return localStorage.getItem(GenericHttpClient.accessTokenLocalStorageName);
        }
    }

    public static readonly accessTokenLocalStorageName: string = 'user-mgl-token-requests'
    private static readonly captchaHeaderCode: string = 'X-Captcha-Google-Code';
    public static readonly headerAuth: string = 'Authorization';
    public static readonly bearerPrefix: string = 'Bearer';

    protected getHeaders(): HttpHeaders {
        let headersToSend = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        if (typeof localStorage !== 'undefined') {
            const bearerToken: string | null = localStorage.getItem(GenericHttpClient.accessTokenLocalStorageName);
            if (bearerToken !== null) {
                headersToSend = headersToSend.append(GenericHttpClient.headerAuth, GenericHttpClient.bearerPrefix + ' ' + bearerToken);
            }
        }

        return headersToSend;
    }

    public buildErrorDto(error: HttpErrorResponse): ErrorDto {
        let customError: ErrorDto = new ErrorDto(
            'Une erreur est survenue : ',
            error.status,
            Date.now(),
            []
        );

        if (error.error instanceof ErrorEvent) {
            customError.error += error.error.message;
        } else {
            if (error.error.error) {
                customError.error += error.error.error;
            }
            if (error.error.timestamp) {
                customError.timestamp = error.error.timestamp;
            }
            if (error.error.fieldErrors) {
                customError.fieldErrors = error.error.fieldErrors.map((fieldError: any) => ({
                    field: fieldError.field,
                    message: fieldError.message
                }));
            }
        }

        return customError;
    }

}