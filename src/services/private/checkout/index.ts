import BaseService from "@/services/service";
import { service } from "@/types/service";

class CheckoutPrivateService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = CheckoutPrivateService.BASE_API_URL + '/private/checkout'
    }
    

    // async getOne(CategoryId: string) {
    //     const response = await fetch(`${this.API_URL}${CategoryId}`)

    // }

    initiateCheckout(payload: service.Private.Checkout.IInitiateCheckoutParams): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            })
            return await response.json()
        })
    }
}

export default CheckoutPrivateService