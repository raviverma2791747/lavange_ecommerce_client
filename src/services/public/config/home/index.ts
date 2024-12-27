import BaseService from "@/services/service";

class HomeConfigService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = HomeConfigService.BASE_API_URL + '/public/config/home'
    }

    async getOne() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default HomeConfigService