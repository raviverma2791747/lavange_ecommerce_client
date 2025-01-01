
export namespace service {
    export interface IBaseResponse {
        status: number
        success: boolean
        data: { [key: string]: unknown };
        message: string
    }

    export namespace User {
        export interface ILoginParams {
            username: string
            password: string
        }

        export interface ISignupParams {
            username: string,
            email: string,
            password: string,
            firstName: string,
            lastName: string,
            dob: string
        }

        export interface IResetPasswordParams {
            email: string,
            url: string
        }
    }

    export namespace Config {
        export namespace Home {
        }
    }

    export namespace Private {
        export namespace Checkout {
            export interface IInitiateCheckoutParams {
                coupon_code: string | null;
            }
        }

        export namespace User {

            export interface IRemoveFromCartParams {
                productId: string;
                variantId: string | undefined;
                quantity: number;
            }

            export interface IAddToCartParams {
                productId: string;
                variantId: string | undefined;
                quantity: number;
            }

            export interface IDeleteFromCartParams {
                itemId: string;
            }

            export interface IAddToWishlistParams {
                productId: string;
            }

            export interface IRemoveFromWishlistParams {
                productId: string;
            }

            export interface IUpdateAddressParams {
                _id?: string;
                country: string;
                fullName: string;
                mobile: number;
                type: number;
                addressLine1: string;
                addressLine2: string;
                landmark: string;
                city: string;
                state: string;
                pincode: number;
            }

            export interface IUpdatePasswordParams {
                confirmPassword: string;
                password: string;
            }

            export interface ICreateOrderParams {
                coupon_code: string | null;
                items: {
                    product: string,
                    quantity: number,
                    variant: string | null,
                    variantSchema: string | null,
                }[];
                address: string;
                redirectUrl: string;
                paymentMethod: number;
            }
        }
    }
}