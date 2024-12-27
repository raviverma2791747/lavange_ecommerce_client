import BaseService from "@/services/service";


class ProductService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = ProductService.BASE_API_URL + '/public/product'
    }
    

    // async getOne(productId: string) {
    //     const response = await fetch(`${this.API_URL}${productId}`)

    // }

    async getOneBySlug(slug: string) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/${slug}`)
            return await response.json()
        })
    }
}

export default ProductService