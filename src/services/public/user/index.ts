import BaseService from "@/services/service";
import { service } from "@/types/service";


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


    login({ username, password }: service.User.ILoginParams): Promise<service.IBaseResponse | null> {
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

    signup({ username, email, password, firstName, lastName, dob }: service.User.ISignupParams): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password, firstName, lastName, dob })
            })
            return await response.json()
        })
    }

    logout(): Promise<service.IBaseResponse | null> {
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

    resetPassword({ email }: service.User.IResetPasswordParams): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}/password/reset/link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email })
            })
            return await response.json()
        })
    }
}

export default UserService