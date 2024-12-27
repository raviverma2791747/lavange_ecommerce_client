'use client';
import useStore from '@/helper/store';
import { getAvatarName } from '@/helper/utils';
import { BagSimple, Heart, House, MagnifyingGlass, UserCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const BottomNavbar = () => {
    const { userInfo, cart, wishlist } = useStore();
    return (
        <>
            <div className="h-16 md:hidden"></div>
            <div
                className="h-16 fixed bottom-0 w-full z-[100] bg-white shadow border-t border-gray-200 text-gray-600 md:hidden"
            >
                <div className="grid grid-cols-5 gap-2 sm:mx-8">
                    <a
                        href="/search"
                        className="p-2 hover:text-primary-500 hover:bg-primary-50 flex flex-col items-center cursor-pointer"
                    //   class:text-primary-500={$page.url.pathname === "/search"}
                    >
                        <MagnifyingGlass className="h-6 w-6" />
                        <div className="text-sm">Search</div>
                    </a>
                    <a
                        href="/cart"
                        className="p-2 hover:text-primary-500 hover:bg-primary-50 flex flex-col relative items-center cursor-pointer"
                    //   class:text-primary-500={$page.url.pathname === "/cart"}
                    >
                        <BagSimple className="h-6 w-6" />
                        {cart.length > 0 &&
                            <div
                                className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 end-0"
                            >
                                {cart.reduce((a, b) => a + b.quantity, 0) > 9 ?
                                    "9+"
                                    :
                                    <>{cart.reduce((a, b) => a + b.quantity, 0)}</>
                                }
                            </div>
                        }
                        <div className="text-sm">Bag</div>
                    </a>
                    <a
                        href="/"
                        //   class:text-primary-500={$page.url.pathname === "/"}
                        className="p-2 hover:text-primary-500 hover:bg-primary-50 flex flex-col items-center cursor-pointer"
                    >
                        <House className="h-6 w-6" />
                        <div className="text-sm">Home</div>
                    </a>
                    <a
                        href="/wishlist"
                        //   class:text-primary-500={$page.url.pathname === "wishlist"}
                        className="p-2 hover:text-primary-500 hover:bg-primary-50 flex flex-col items-center cursor-pointer relative"
                    >
                        <Heart className="h-6 w-6" />
                        {wishlist.length > 0 &&
                            <div
                                className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 end-0"
                            >
                                {wishlist.length > 9 ?
                                    "9+"
                                    :
                                    wishlist.length
                                }
                            </div>
                        }
                        <div className="text-sm">Wishlist</div>
                    </a>
                    <button
                        //   class:text-primary-500={$page.url.pathname === "/account"}
                        //   on:click={() => {
                        //     if (!userInfo) {
                        //       $login_signup_modal_open = true;
                        //     } else {
                        //       goto("/account");
                        //     }
                        //   }}
                        className="p-2 hover:text-primary-500 hover:bg-primary-50 flex flex-col items-center cursor-pointer"
                    >
                        {userInfo ?
                            <div
                                className="rounded-full w-6 h-6 bg-gray-600 text-white text-xs flex justify-center items-center"
                            >
                                <div>
                                    {getAvatarName(userInfo)}
                                </div>
                            </div>
                            :
                            <UserCircle className="h-6 w-6" />
                        }
                        <div className="text-sm">
                            {userInfo ?
                                "Account"
                                :
                                "Log in"
                            }
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default BottomNavbar