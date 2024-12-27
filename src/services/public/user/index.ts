import BaseService from "@/services/service";


class UserService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = UserService.BASE_API_URL + '/public/user'
    }


    // getWishlist() {
    //     return BaseService.handler(async () => {
    //         const response = await fetch(`${this.API_URL}/wishlist`)
    //         return await response.json()
    //     })
    // }
    

    login({ username, password }: any) {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })
            return await response.json()
        })
    }

    logout() {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
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

export default UserService