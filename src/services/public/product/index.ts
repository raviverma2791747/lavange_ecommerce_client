import BaseService from "@/services/service";
import { service } from "@/types/service";


class ProductService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = ProductService.BASE_API_URL + '/public/product'
    }
    

    // async getOne(productId: string) {
    //     const response = await fetch(`${this.API_URL}${productId}`)

    // }

    async getOneBySlug(slug: string): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/${slug}`)
            return await response.json()
        })
    }
}

export default ProductService