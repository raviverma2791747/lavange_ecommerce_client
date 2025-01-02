import { PUBLIC_BRAND_NAME, PUBLIC_COMPANY_NAME, PUBLIC_SOCIAL_EMAIL, PUBLIC_SOCIAL_INSTAGRAM, PUBLIC_SOCIAL_LINKEDIN, PUBLIC_SOCIAL_MOBILE, PUBLIC_SOCIAL_TWITTER } from '@/secrets'
import { EnvelopeSimple, InstagramLogo, LinkedinLogo, Phone, TwitterLogo } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
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
                            <li><Link href="/about">About us</Link></li>
                            <li><Link href="/career">Careers</Link></li>
                            {/* <li><a href="/blog">Blog</a></li>  */}
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-lg mb-2">Support</h2>
                        <ul
                            className="marker:text-primary-600 list-disc ps-5 space-y-2 text-gray-600 text-sm"
                        >
                            <li><Link href="/help">Help</Link></li>
                            <li
                            // on:click={() => {
                            //   if (!$user_info_store) {
                            //     $login_signup_modal_open = true;
                            //   }
                            // }}
                            >
                                <Link
                                    href="/account"
                                    className="cursor-pointer"
                                //   class:pointer-events-none={!$user_info_store}
                                >My Account</Link>
                            </li>
                            <li><Link href="/">Track Order</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-lg mb-2">Important Links</h2>
                        <ul
                            className="marker:text-primary-600 list-disc ps-5 space-y-2 text-gray-600 text-sm"
                        >
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li>
                                <Link href="/delivery-and-return-policy">Delivery & Return Policy</Link>
                            </li>
                            <li><Link href="/terms-and-conditions">Terms & conditions</Link></li>
                        </ul>
                    </div>
                    <div className="ps-5 space-y-2 text-sm">
                        <div className="flex gap-2 text-gray-600">
                            <Phone size={24} />
                            <div>{PUBLIC_SOCIAL_MOBILE}</div>
                        </div>
                        <div className="flex gap-2 text-gray-600">
                            <EnvelopeSimple size={24} />
                            <div>{PUBLIC_SOCIAL_EMAIL}</div>
                        </div>
                        <h2 className="font-semibold text-lg mb-4">Follow us</h2>
                        <div className="flex gap-2">
                            <Link href={PUBLIC_SOCIAL_INSTAGRAM} target="_blank">
                                <InstagramLogo size={24} />
                            </Link>
                            <Link href={PUBLIC_SOCIAL_TWITTER} target="_blank">
                                <TwitterLogo size={24} />
                            </Link>
                            <Link href={PUBLIC_SOCIAL_LINKEDIN} target="_blank">
                                <LinkedinLogo size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm pt-2">
                    ©{new Date().getFullYear()} {PUBLIC_BRAND_NAME} {PUBLIC_COMPANY_NAME ? `powered by ${PUBLIC_COMPANY_NAME}` : ''}. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer