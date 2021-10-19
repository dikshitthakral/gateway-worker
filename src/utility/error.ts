import { IErrorList } from './common.type';
import { StatusCode } from './http.enum';

enum ErrorCode {
    UNAUTHORIZED = 'UNAUTHORIZED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
}

const ErrorList: IErrorList = {
    [ErrorCode.UNAUTHORIZED]: {
        statusCode: StatusCode.Unauthorized,
        message: 'User do not have permission to perform action'
    },
    [ErrorCode.INTERNAL_SERVER_ERROR]: {
        statusCode: StatusCode.Internal_Server_Error,
        message: 'Error occured while performing a particular action.'
    },
    [ErrorCode.INVALID_CREDENTIALS]: {
        statusCode: StatusCode.Bad_Request,
        message: 'Invalid Credentials or access Token not found.'
    }
};

export { ErrorCode, ErrorList };
