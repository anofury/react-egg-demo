module.exports = {
    SUCCESS_RESP(data = []) {
        return {
            code: 200,
            msg: 'success',
            data
        }
    },
    ERROR_PARAM_RESP() {
        return {
            code: 422,
            msg: 'Validation Failed',
            data: []
        }
    },
    ERROR_SERVER_RESP() {
        return {
            code: 500,
            msg: 'Internal Server Error',
            data: []
        }
    },
    UNAUTHORIZED_RESP() {
        return {
            status: 401,
            msg: 'Unauthorized Request',
            data: []
        }
    },
    REPEATING_DATA_RESP() {
        return {
            status: 402,
            msg: 'Repeating Data',
            data: []
        }
    }

};