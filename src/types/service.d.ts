export namespace service {
    interface IBaseResponse {
        status: number
        success: boolean
        data: { [key: string]: unknown };
        message: string
    }

    interface IBaseParams { }


    namespace Config {
        namespace Home {
            interface IGetOneResponse extends IBaseResponse {
                
            }
        }
    }
}