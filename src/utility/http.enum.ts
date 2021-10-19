enum StatusCode {
    OK = 200,
    Created = 201,
    Accepted = 202,
    No_Content = 204,
    Unauthorized = 401,
    Bad_Request = 400,
    Forbidden = 403,
    Not_Found = 404,
    Bad_Gateway = 502,
    Service_Unavailable = 503,
    Gateway_Time_out = 504,
    Internal_Server_Error = 500
}

export { StatusCode };
