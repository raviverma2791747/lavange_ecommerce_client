import BaseService from "@/services/service";


class CategoryService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = CategoryService.BASE_API_URL + '/public/category'
    }
    

    // async getOne(CategoryId: string) {
    //     const response = await fetch(`${this.API_URL}${CategoryId}`)

    // }

    async getAll() {
        return BaseService.handler(async () => {            
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }

    async getOne(id: string) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/${id}`)
            return await response.json()
        })
    }

    async getOneBySlug(slug: string) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/slug/${slug}`)
            return await response.json()
        })
    }
}

export default CategoryService