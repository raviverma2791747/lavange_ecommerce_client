import BaseService from "@/services/service";


class UserPrivateService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = UserPrivateService.BASE_API_URL + '/private/user'
    }

    me() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            return await response.json()
        })
    }

    getWishlist() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/wishlist`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            return await response.json()
        })
    }

    getCart() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            return await response.json()
        })
    }

    getOneOrder(id: string) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/order/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            return await response.json()
        })
    }

    getAllOrders() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/order`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            return await response.json()
        })
    }


    getOneAddress(id: string) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/address/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            return await response.json()
        })
    }

    updateAddress(address: any) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(address)
            })
            return await response.json()
        })
    }

    updatePassword(payload: any) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/change-password`, {
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

    // async getOne(CategoryId: string) {
    //     const response = await fetch(`${this.API_URL}${CategoryId}`)

    // }

    // async getAll() {
    //     return BaseService.handler(async () => {            
    //         const response = await fetch(`${this.API_URL}`)
    //         return await response.json()
    //     })
    // }

    // async getOne(id: string) {
    //     return BaseService.handler(async () => {
    //         const response = await fetch(`${this.API_URL}/${id}`)
    //         return await response.json()
    //     })
    // }

    // async getOneBySlug(slug: string) {
    //     return BaseService.handler(async () => {
    //         const response = await fetch(`${this.API_URL}/slug/${slug}`)
    //         return await response.json()
    //     })
    // }
}

export default UserPrivateService