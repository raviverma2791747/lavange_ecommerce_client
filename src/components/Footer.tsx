import { EnvelopeSimple, InstagramLogo, LinkedinLogo, Phone, TwitterLogo } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const Footer = () => {
    return (

        <footer className="border-t border-gray-200 bg-gray-100 hidden md:block">
            <div
                className="max-w-7xl mx-auto py-4 divide-y flex flex-col gap-2 px-4 7xl:px-0"
            >
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                        <h2 className="font-semibold text-lg mb-2">Our Company</h2>
                        <ul
                            className="marker:text-primary-600 list-disc ps-5 space-y-2 text-gray-600 text-sm"
                        >
                            <li><a href="/about">About us</a></li>
                            <li><a href="/career">Careers</a></li>
                            {/* <li><a href="/blog">Blog</a></li>  */}
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-lg mb-2">Support</h2>
                        <ul
                            className="marker:text-primary-600 list-disc ps-5 space-y-2 text-gray-600 text-sm"
                        >
                            <li><a href="/help">Help</a></li>
                            <li
                            // on:click={() => {
                            //   if (!$user_info_store) {
                            //     $login_signup_modal_open = true;
                            //   }
                            // }}
                            >
                                <a
                                    href="/account"
                                    className="cursor-pointer"
                                //   class:pointer-events-none={!$user_info_store}
                                >My Account</a>
                            </li>
                            <li><a>Track Order</a></li>
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-lg mb-2">Important Links</h2>
                        <ul
                            className="marker:text-primary-600 list-disc ps-5 space-y-2 text-gray-600 text-sm"
                        >
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li>
                                <a href="/delivery-and-return-policy">Delivery & Return Policy</a>
                            </li>
                            <li><a href="/terms-and-conditions">Terms & conditions</a></li>
                        </ul>
                    </div>
                    <div className="ps-5 space-y-2 text-sm">
                        <div className="flex gap-2 text-gray-600">
                            <Phone size={24} />
                            <div>{process.env.NEXT_PUBLIC_SOCIAL_MOBILE}</div>
                        </div>
                        <div className="flex gap-2 text-gray-600">
                            <EnvelopeSimple size={24}/>
                            <div>{process.env.NEXT_PUBLIC_SOCIAL_EMAIL}</div>
                        </div>
                        <h2 className="font-semibold text-lg mb-4">Follow us</h2>
                        <div className="flex gap-2">
                            <a href={process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM} target="_blank">
                                <InstagramLogo size={24}/>
                            </a>
                            <a href={process.env.NEXT_PUBLIC_SOCIAL_TWITTER} target="_blank">
                                <TwitterLogo size={24}/>
                            </a>
                            <a href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} target="_blank">
                                <LinkedinLogo size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm pt-2">
                    ©{new Date().getFullYear()} {process.env.NEXT_PUBLIC_BRAND_NAME} {process.env.NEXT_PUBLIC_COMPANY_NAME ? `powered by ${process.env.NEXT_PUBLIC_COMPANY_NAME}` : ''}. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer