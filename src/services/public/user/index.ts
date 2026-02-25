import BaseService from "@/services/service";
import { service } from "@/types/service";


class UserService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = UserService.BASE_API_URL + '/v1/auth'
    }

    private normalizeResponse(
        response: Response,
        payload: Partial<service.IBaseResponse> | null
    ): service.IBaseResponse {
        return {
            status: typeof payload?.status === 'number' ? payload.status : response.status,
            success: typeof payload?.success === 'boolean' ? payload.success : response.ok,
            message:
                typeof payload?.message === 'string'
                    ? payload.message
                    : response.ok
                        ? 'Request successful'
                        : `Request failed with status ${response.status}`,
            data: payload?.data && typeof payload.data === 'object' ? payload.data : {},
        }
    }

    private async request(
        path: string,
        method: 'GET' | 'POST',
        body?: Record<string, unknown>,
    ): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}${path}`, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                ...(body ? { body: JSON.stringify(body) } : {})
            })

            let payload: Partial<service.IBaseResponse> | null = null
            try {
                payload = await response.json()
            } catch {
                payload = null
            }

            return this.normalizeResponse(response, payload)
        }) ?? {
            status: 0,
            success: false,
            message: 'Unable to reach server. Please check your connection and try again.',
            data: {},
        }
    }

    private post(path: string, body?: Record<string, unknown>): Promise<service.IBaseResponse | null> {
        return this.request(path, 'POST', body)
    }

    private get(path: string): Promise<service.IBaseResponse | null> {
        return this.request(path, 'GET')
    }


    // getWishlist() {
    //     return BaseService.handler(async () => {
    //         const response = await fetch(`${this.API_URL}/wishlist`)
    //         return await response.json()
    //     })
    // }


    login({ username, password }: service.User.ILoginParams): Promise<service.IBaseResponse | null> {
        return this.post('/login', { username, password })
    }

    signup({ username, email, password, phoneNumber }: service.User.ISignupParams): Promise<service.IBaseResponse | null> {
        return this.post('/register', {
            username,
            email,
            password,
            phoneNumber,
        })
    }

    logout(): Promise<service.IBaseResponse | null> {
        return this.post('/logout')
    }

    me(): Promise<service.IBaseResponse | null> {
        return this.get('/me')
    }

    forgotPassword({ email }: service.User.IForgotPasswordParams): Promise<service.IBaseResponse | null> {
        return this.post('/forgot-password', { email })
    }

    resetPassword(
        payload: service.User.IResetPasswordParams | { email: string; url?: string }
    ): Promise<service.IBaseResponse | null> {
        if ('token' in payload) {
            return this.post('/reset-password', {
                token: payload.token,
                newPassword: payload.newPassword,
            })
        }

        return this.forgotPassword({ email: payload.email })
    }

    refresh(): Promise<service.IBaseResponse | null> {
        return this.post('/refresh')
    }

    // Backward compatibility for existing callers until all auth flows are migrated.
    requestPasswordResetLink({ email }: service.User.IForgotPasswordParams): Promise<service.IBaseResponse | null> {
        return this.forgotPassword({ email })
    }
}

export default UserService
