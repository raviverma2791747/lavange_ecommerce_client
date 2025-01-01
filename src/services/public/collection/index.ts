import BaseService from "@/services/service";
import { service } from "@/types/service";


class CollectionService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = CollectionService.BASE_API_URL + '/public/collection'
    }
    

    // async getOne(CollectionId: string) {
    //     const response = await fetch(`${this.API_URL}${CollectionId}`)

    // }

    async getAll(): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {            
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }

    async getOne(id: string): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/${id}`)
            return await response.json()
        })
    }

    async getOneBySlug(slug: string): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/slug/${slug}`)
            return await response.json()
        })
    }
}

export default CollectionService