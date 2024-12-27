import BaseService from "@/services/service";

class HelpConfigService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = HelpConfigService.BASE_API_URL + '/public/config/help'
    }

    async getOne() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default HelpConfigService