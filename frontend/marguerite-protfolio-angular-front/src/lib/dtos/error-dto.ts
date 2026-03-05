export class ErrorDto {
    error: string;
    status: number;
    timestamp: number;
    fieldErrors: FieldErrorDto[] = [];

    constructor(error: string, status: number, timestamp: number, fieldErrors: FieldErrorDto[]) {
        this.error = error;
        this.status = status;
        this.timestamp = timestamp;
        this.fieldErrors = fieldErrors;
    }
}

export class FieldErrorDto {
    field: string;
    message: string;

    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }
}