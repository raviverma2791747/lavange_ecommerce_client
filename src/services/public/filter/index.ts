import BaseService from "@/services/service";
import { service } from "@/types/service";


class FilterService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = FilterService.BASE_API_URL + '/public/filters'
    }
    

    // async getOne(FilterId: string) {
    //     const response = await fetch(`${this.API_URL}${FilterId}`)

    // }

    // async getOneBySlug(slug: string): Promise<service.IBaseResponse | null> {
    //     return BaseService.handler(async () => {
    //         const response = await fetch(`${this.API_URL}/${slug}`)
    //         return await response.json()
    //     })
    // }

    async getAll(): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default FilterService