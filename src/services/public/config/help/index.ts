import BaseService from "@/services/service";
import { service } from "@/types/service";

class HelpConfigService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = HelpConfigService.BASE_API_URL + '/public/config/help'
    }

    async getOne(): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default HelpConfigService