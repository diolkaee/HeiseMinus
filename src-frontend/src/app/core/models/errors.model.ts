enum ErrorType {
    ValidationError
}

export interface Errors {
    type: ErrorType,
    errors: {[key: string]: string}
}
