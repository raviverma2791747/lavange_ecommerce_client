'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import ProductCard from '@/components/ProductCard';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { STATUS } from '@/helper/constants';
import useStore from '@/helper/store';
import { formatCurrency } from '@/helper/utils';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react'

const WishlistPage = () => {
    const loading = false;
    const { wishlist } = useStore();

    return (
        <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4">
            {loading ?
                <BreadcrumbShimmer count={2} />
                :
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Wishlist</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 py-4">
                {
                    wishlist.map((product, index: number) => (
                        <div key={index}>
                            <Link
                                key={index}
                                className="w-full p-2 grid grid-cols-8 gap-2 cursor-pointer hover:bg-primary-250 md:hidden rounded-lg"
                                href={`/product/${product.slug}`}
                            >
                                <div className="col-span-2">
                                    {product.assets.length ?
                                        <img
                                            className="aspect-square object-cover rounded-lg"
                                            src={product.assets[0].url}
                                            alt={product.title}
                                        />
                                        :
                                        <div className="aspect-square bg-gray-300 rounded-lg"></div>
                                    }
                                </div>
                                <div className="col-span-5">
                                    <h1 className="font-semibold">{product.title}</h1>
                                    {product.status === STATUS.ACTIVE ?
                                        <p>{formatCurrency(product.price)}</p>
                                        :
                                        <p className="text-red-500">Unavailable</p>
                                    }
                                </div>
                                <div>

                                </div>
                                <div>
                                    <button
                                        className="hover:text-red-500"
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            e.nativeEvent.stopImmediatePropagation();
                                            e.preventDefault();
                                            // handleRemoveFromWishlist(product._id);
                                        }}
                                    >
                                        <Trash size={24} />
                                    </button>
                                </div>
                            </Link>


                            <div className="hidden md:block">
                                <ProductCard product={product} />

                                <button
                                    className="hover:text-red-500 inline-flex gap-2"
                                // onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                //     // handleRemoveFromWishlist(product._id);
                                // }}
                                >
                                    Remove <Trash size={24} />
                                </button>


                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default WishlistPage