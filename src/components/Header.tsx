'use client';
import { BagSimple, Heart, List, MagnifyingGlass, UserCircle } from '@phosphor-icons/react/dist/ssr'
import React, { useEffect } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import useStore from '@/helper/store';
import { userPrivateService, userService } from '@/services';
import { getAvatarName, processCart } from '@/helper/utils';
import { useRouter } from 'next/navigation';
import { ProductModel } from "@/models";
import { model } from "@/types/model"
import CartItem from './CartItem';
import Link from 'next/link';

const Header = () => {
    const { setAuthModal, wishlist, setWishlist, cart, setCart, userInfo, setUserInfo, authenticating, setAuthenticating } = useStore();
    const router = useRouter();

    const initWishlist = async () => {
        const response = await userPrivateService.getWishlist();
        if (response && response.status === 200) {
            setWishlist(response.data.wishList as ProductModel[] ?? []);
        }
    }

    const initCart = async () => {
        const response = await userPrivateService.getCart();
        if (response && response.status === 200) {
            const temp_cart = response.data.cart as model.ICartItem[] ?? [];
            setCart(processCart(temp_cart).map((temp_item) => { return { ...temp_item, product: ProductModel.fromOBJ(temp_item.product) } }));
            // const t = temp_cart.map((temp_item: any) => { return { ...temp_item, product: Product.fromJSON(temp_item.product) } });
            // console.log(t);
        }
    }

    const initUser = async () => {
        setAuthenticating(true);
        const response = await userPrivateService.me();
        if (response && response.status === 200) {
            setUserInfo(response.data.user as model.IUser ?? null);
            initCart();
            initWishlist();
        }
        setAuthenticating(false);
    }

    const logout = async () => {
        const response = await userService.logout();
        if (response && response.status === 200) {
            setUserInfo(null);
        }
    }

    useEffect(() => {
        initUser();
    }, []);

    useEffect(() => {
        // toast.info("Authenticating...");
    }, [authenticating])

    return (<header className="border-b border-gray-200 sticky top-0 bg-white z-50 h-16">
        <div
            className="max-w-7xl mx-auto flex items-center py-2 px-4 7xl:px-0 gap-4"
        >
            <div>
                <Link className="flex-none text-xl font-semibold" href="/">
                    {process.env.NEXT_PUBLIC_BRAND_NAME}</Link>
            </div>
            <div className="grow">
                <div className="lg:w-4/12 mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search"
                        // bind:value={search_query}
                        className="w-full py-3 pe-10 px-4 block border border-gray-200 rounded-full text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    // on:keypress={(e) => {
                    //     if (e.key === "Enter") {
                    //         applied_filters_clone.q = search_query;
                    //         $appliedFilters_store = {
                    //             ...applied_filters_clone,
                    //         };
                    //         initQueryParams(applied_filters_clone);
                    //     }
                    // }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 text-gray-400 flex items-center pe-2"
                    >
                        <MagnifyingGlass size={24} />
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                {/* <Dialog.Root
                        onOutsideClick={() => {
                            applied_filters_clone = { ...$appliedFilters_store };
                        }}
                    >
                        <Dialog.Trigger className="text-gray-600 hover:text-primary-500">
                            <SliderIcon />
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay
                                transition={fade}
                                transitionConfig={{ duration: 150 }}
                                className="fixed inset-0 z-50 bg-black/80"
                            />
                            <Dialog.Content
                                className="bg-white fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
                            >
                                <Dialog.Title
                                    className="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
                                >Filters</Dialog.Title
                                >
                                <Dialog.Description className="">
                                    <div className="mb-4">
                                        <div className="mb-2 font-semibold">Sort</div>
                                        <select
                                            className="cursor-pointer focus:border-primary-500 focus:ring-primary-500 block w-full border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
                                            on:change={(e) => {
                                                let v = e.target.value.split("-");
                                                let s = v[0];
                                                let d = v[1];
                                                applied_filters_clone = {
                                                    ...applied_filters_clone,
                                                    sort: s,
                                                    order: d,
                                                };
                                            }}
                                            value={`${applied_filters_clone.sort}-${applied_filters_clone.order}`}
                                        >
                                            <option value="title-asc">A-Z</option>
                                            <option value="createdAt-desc">Newest</option>
                                            <option selected value="price-asc">Price: Low to High</option>
                                            <option value="price-desc">Price: High to Low</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1 flex flex-col divide-y">
                                        {#if $searchFilters_store.categories.length > 0}
                                        <div className="py-2 first:pt-0">
                                            <div className="mb-2 font-semibold">Categories</div>
                                            <div className="flex flex-col gap-2">
                                                {#each $searchFilters_store.categories as category}
                                                <div className="flex gap-2">
                                                    <input
                                                        id={`categories-${category._id}`}
                                                        bind:group={applied_filters_clone.categories}
                                                        value={category._id}
                                                        type="checkbox"
                                                        className="focus:border-primary-500 focus:ring-primary-500 checked:bg-primary-500 hover:checked:bg-primary-500 h-4 w-4 cursor-pointer"
                                                    />
                                                    <label
                                                        for={`categories-${category._id}`}
                                                        className=" text-sm cursor-pointer"
                                                    >
                                                        {category.name}
                                                    </label>
                                                </div>
                                                {/each}
                                            </div>
                                        </div>
                                        {/if}
                                        {#if $searchFilters_store.collections.length > 0}
                                        <div className="py-2">
                                            <div className="mb-2 font-semibold">Collections</div>
                                            <div className="flex flex-col gap-2">
                                                {#each $searchFilters_store.collections as collection}
                                                <div className="flex gap-2">
                                                    <input
                                                        id={`categories-${collection._id}`}
                                                        bind:group={applied_filters_clone.collections}
                                                        value={collection._id}
                                                        type="checkbox"
                                                        className="focus:border-primary-500 focus:ring-primary-500 focus checked:bg-primary-500 hover:checked:bg-primary-500 h-4 w-4 cursor-pointer"
                                                    />
                                                    <label
                                                        for={`categories-${collection._id}`}
                                                        className=" text-sm cursor-pointer"
                                                    >
                                                        {collection.name}
                                                    </label>
                                                </div>
                                                {/each}
                                            </div>
                                        </div>
                                        {/if}
                                        {#each $searchFilters_store.facets as facet}
                                        <div className="py-2">
                                            <div className="mb-2 font-semibold">{facet.displayName}</div>
                                            <div className="flex flex-col gap-2">
                                                {#each facet.options as option}
                                                <div className="flex gap-2">
                                                    <input
                                                        id={`facet-${facet.name}-${option.value}`}
                                                        bind:group={applied_filters_clone.facets[
                                                            facet.name
                                                        ]}
                                                        value={option.value}
                                                        type="checkbox"
                                                        className="focus:border-primary-500 focus:ring-primary-500 checked:bg-primary-500 hover:checked:bg-primary-500 h-4 w-4 cursor-pointer"
                                                    />
                                                    <label
                                                        for={`facet-${facet.name}-${option.value}`}
                                                        className=" text-sm cursor-pointer"
                                                    >
                                                        {option.displayName}
                                                    </label>
                                                </div>
                                                {/each}
                                            </div>
                                        </div>
                                        {/each}
                                    </div>
                                </Dialog.Description>
                                <div className="flex w-full justify-end gap-4">
                                    <Dialog.Close
                                        onClick={() => {
                                            applied_filters_clone = {
                                                ...$appliedFilters_store,
                                            };
                                        }}
                                        className="text-sm grow hover:scale-105 transition duration-100 ease-in-out py-1.5 px-2 inline-flex justify-center items-center gap-x-2  font-semibold rounded-lg border border-primary-600 text-primary-600 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Cancel
                                    </Dialog.Close>
                                    <Dialog.Close
                                        onClick={() => {
                                            applied_filters_clone.q = search_query;
                                            $appliedFilters_store = {
                                                ...applied_filters_clone,
                                            };
                                            initQueryParams(applied_filters_clone);
                                        }}
                                        className="text-sm grow hover:scale-105 transition duration-100 ease-in-out py-1.5 px-2 inline-flex justify-center items-center gap-x-2  font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Apply
                                    </Dialog.Close>
                                </div>
                                <Dialog.Close
                                    className="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
                                >
                                    <div>
                                        <CloseIcon className="size-5 text-foreground" />
                                        <span className="sr-only">Close</span>
                                    </div>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root> */}
            </div>
            <div className="hidden md:flex gap-4 items-center">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        className="hover:text-primary-500 text-gray-600 relative py-2"
                    >
                        <BagSimple size={24} />
                        {cart.length > 0 && (
                            <div
                                className=" absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-4"
                            >
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"
                                ></span>
                                {cart.reduce((a, b) => a + b.quantity, 0) > 9 ? "9+" : cart.reduce((a, b) => a + b.quantity, 0)}
                            </div>)}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        sideOffset={8}
                        align="end"
                        className="w-full max-w-[20rem] bg-white rounded-xl border border-muted bg-background py-2 shadow-lg z-[75]"
                    >

                        {!userInfo ? (
                            <p className="px-4 py-2">Please sign in to view your cart</p>
                        ) : cart.length === 0 ? (
                            <p className="px-4 py-2 text-center">Your cart is empty</p>
                        ) : (
                            <>{cart.slice(0, 3).map((cart_item) =>
                            (<DropdownMenu.Item key={cart_item._id}>
                                {/* <a
                                    className="w-full p-2 grid grid-cols-4 gap-2 cursor-pointer hover:bg-gray-200"
                                    href={`/product/${cart_item.product.slug}`}
                                >
                                    <div>
                                        {cart_item.product.assets.length ?
                                            <img
                                                className="aspect-square object-cover rounded-lg"
                                                src={cart_item.product.assets[0].url}
                                                alt={cart_item.product.title}
                                            />
                                            :
                                            <div className="aspect-square bg-gray-300 rounded-lg"></div>
                                        }
                                    </div>
                                    <div className="col-span-3">
                                        <h1 className="font-semibold truncate">
                                            {cart_item.product.title}
                                        </h1>
                                        <div className="flex gap-2 flex-wrap">
                                            {cart_item.variant && cart_item.product.hasVariants() && cart_item.product.getVariant(cart_item.variant) &&
                                                Object.entries(
                                                    cart_item.product.getVariant(cart_item.variant).attributes
                                                ).map(([key, attribute]: any) => (
                                                    <div
                                                        key={key}
                                                        className="border text-xs border-primary-500 text-primary-500 bg-primary-200 px-2 rounded-xl"
                                                    >
                                                        {attribute.name}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <p>Quantity {cart_item.quantity}</p>
                                    </div>
                                </a> */}
                                <CartItem item={cart_item} disabled readonly />
                            </DropdownMenu.Item>))}
                                <DropdownMenu.Item>
                                    <a
                                        href="/cart"
                                        className="block w-full p-2 cursor-pointer hover:bg-gray-200 text-center underline"
                                    >
                                        View All
                                    </a>
                                </DropdownMenu.Item>
                            </>
                        )}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        className="hover:text-primary-500 text-gray-600 relative py-2"
                    >
                        <Heart size={24} />
                        {wishlist.length > 0 && (
                            <div
                                className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-4"
                            >
                                {wishlist.length > 9 ? "9+" : wishlist.length}
                            </div>
                        )}

                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        sideOffset={8}
                        align="end"
                        className="w-full max-w-[20rem] bg-white rounded-xl border border-muted bg-background py-2 shadow-lg z-[75]"
                    >
                        {!userInfo ? (
                            <p className="px-4 py-2">Please sign in to view your wishlist</p>
                        ) : wishlist.length === 0 ? (
                            <p className="px-4 py-2 text-center">Your wishlist is empty</p>
                        ) : (
                            <>
                                {wishlist.slice(0, 3).map((product) => (
                                    <DropdownMenu.Item key={product.slug}>
                                        <a
                                            className="w-full p-2 grid grid-cols-4 gap-2 cursor-pointer hover:bg-gray-200"
                                            href={`/product/${product.slug}`}
                                        >
                                            <div>
                                                {product.assets.length > 0 ? (
                                                    <img
                                                        className="aspect-square object-cover rounded-lg"
                                                        src={product.assets[0].url}
                                                        alt={product.title}
                                                    />
                                                ) : (
                                                    <div className="aspect-square bg-gray-300 rounded-lg"></div>
                                                )}
                                            </div>
                                            <div className="col-span-3">
                                                <h1 className="font-semibold truncate">{product.title}</h1>
                                            </div>
                                        </a>
                                    </DropdownMenu.Item>
                                ))}
                                <DropdownMenu.Item>
                                    <a
                                        href="/wishlist"
                                        className="block w-full p-2 cursor-pointer hover:bg-gray-200 text-center underline"
                                    >
                                        View All
                                    </a>
                                </DropdownMenu.Item>
                            </>
                        )}

                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        className="text-gray-600 flex gap-2 py-2 px-3 border border-gray-200 rounded-full hover:shadow"
                    >
                        <List size={24} />

                        {userInfo ?
                            <div
                                className="rounded-full w-6 h-6 bg-gray-600 text-white text-xs flex justify-center items-center"
                            >
                                <div>
                                    {getAvatarName(userInfo)}
                                </div>
                            </div>
                            :
                            <UserCircle size={24} />
                        }
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        sideOffset={8}
                        align="end"
                        className="w-full max-w-[10rem] bg-white rounded-xl border border-muted bg-background py-2 shadow-lg z-[75]"
                    >
                        {userInfo && (<><DropdownMenu.Item>
                            <button className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                onClick={() => {
                                    router.push("/account");
                                }}
                            >
                                Account
                            </button>
                        </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button
                                    className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                    onClick={() => {
                                        router.push("/order");
                                    }}
                                >
                                    Orders
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button
                                    className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                    onClick={() => {
                                        router.push("/cart");
                                    }}
                                >
                                    Cart
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button
                                    className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                    onClick={() => {
                                        router.push("/wishlist");
                                    }}
                                >
                                    Wishlist
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button
                                    className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                    onClick={() => {
                                        router.push("/help");
                                    }}
                                >
                                    Help
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button
                                    className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </DropdownMenu.Item></>)}

                        {!userInfo && (<><DropdownMenu.Item>
                            <button
                                className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                onClick={() => {
                                    setAuthModal(true);
                                }}
                            >
                                Sign up
                            </button>
                        </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button
                                    data-hs-overlay="#hs-slide-up-animation-modal"
                                    className="flex items-center w-full gap-x-3.5 py-2 px-3 text-gray-800 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:bg-gray-100"
                                    onClick={() => {
                                        setAuthModal(true);
                                    }}
                                >
                                    Login
                                </button>
                            </DropdownMenu.Item></>)}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </div>

        <div

            className="max-w-7xl mx-auto px-4 py-[15.2px] 7xl:px-0 flex items-center"
        >
            <button>
                {/* <ChevronLeft className="text-gray-600 w-8 h-8" /> */}
            </button>
            <div className="grow text-xl font-semibold text-center">
                {/* {$header_title_store} */}
            </div>
        </div>
    </header>
    )
}

export default Header