import { StatusCode } from './http.enum';

export interface IErrorDetail {
    message: string;
    key: string;
    code: string;
}

export interface IErrorListDetail {
    message: string;
    statusCode: StatusCode;
}

export interface IErrorList {
    [key: string]: IErrorListDetail;
}

export type NewEntity<T> = Omit<T, 'id'>;
