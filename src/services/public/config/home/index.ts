import BaseService from "@/services/service";
import { service } from "@/types/service";

class HomeConfigService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = HomeConfigService.BASE_API_URL + '/public/config/home'
    }

    async getOne(): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default HomeConfigService