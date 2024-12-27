import BaseService from "@/services/service";

class PolicyConfigService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = PolicyConfigService.BASE_API_URL + '/public/config/policy'
    }

    async getAll() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default PolicyConfigService