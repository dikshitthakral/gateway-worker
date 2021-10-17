import { IErrorDetail, IErrorList } from './common.type';
import { get } from 'lodash';

export class AppError extends Error {
    public errorCode: string;
    errors?: IErrorDetail[];
    constructor(errorCode: string, errors?: IErrorDetail[]) {
        super(errorCode);
        this.errorCode = errorCode;
        this.name = AppError.name;
        this.errors = errors;
    }

    getErrors(ErrorList: IErrorList) {
        const error = get(ErrorList, this.errorCode);
        return {
            errors: this.errors,
            statusCode: error.statusCode,
            message: error.message
        };
    }
}