'use client';
import React, { useEffect, useState } from "react";
import { Heart, Share } from "@phosphor-icons/react/dist/ssr";
import { STATUS } from "@/helper/constants";
import { formatCurrency, formatPercentage } from "@/helper/utils";
import { userPrivateService } from "@/services";
import { ProductModel } from "@/models";
import useStore from "@/helper/store";
import { model } from "@/types/model";
import Link from "next/link";

interface IProductCardProps {
    product: model.IProduct;
    hidePrice?: boolean;
    hideWishlist?: boolean;
    hideShare?: boolean;
}

const ProductCard: React.FC<IProductCardProps> = ({
    product,
    hidePrice = false,
    hideWishlist = false,
    hideShare = false,
}) => {
    const [wishlist, setWishlist] = useState<ProductModel[]>([]);
    const { userInfo } = useStore();
    const [activeSlide, setActiveSlide] = useState(0);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [compareAtPrice, setCompareAtPrice] = useState<number>(0);

    useEffect(() => {
        if (product.variants) {
            setPrice(product.minPrice);
            setCompareAtPrice(product.minCompareAtPrice);
        } else {
            setPrice(product.price);
            setCompareAtPrice(product.compareAtPrice);
        }
    }, [product]);

    useEffect(() => {
        if (product.assets.length) {
            const interval = setInterval(() => {
                setActiveSlide((prev) => (prev + 1) % product.assets.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [product.assets]);


    useEffect(() => {
        setFavorite(wishlist.some((item) => item._id === product._id));
    }, [wishlist, product._id]);

    const calculateDiscount = (price: number, compareAtPrice: number) => {
        return (compareAtPrice - price) / compareAtPrice;
    };

    const initWishlist = async () => {
        const response = await userPrivateService.getWishlist();
        if (response && response.status === 200) {
            setWishlist(response.data.wishList as ProductModel[] ?? []);
        }
    };

    const addToWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (!userInfo) {
            // Handle login/signup modal
            return;
        }
        const response = await userPrivateService.addToWishlist({
            productId: product._id,
        })
        if (response && response.status === 200) {
            initWishlist();
        }
    };

    const removeFromWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const response = await userPrivateService.removeFromWishlist({
            productId: product._id
        })
        if (response && response.status === 200) {
            initWishlist();
        }
    };

    const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        // Implement sharing logic
    };

    return (
        <Link href={`/product/${product.slug}`} className="relative block rounded-lg bg-white w-full">
            {compareAtPrice > 0 && (
                <div className="absolute bg-green-500 font-semibold text-white text-sm p-1 rounded-tr-lg rounded-br-lg top-0 left-0 mt-2">
                    {formatPercentage(calculateDiscount(price, compareAtPrice))} Off
                </div>
            )}
            {!hideShare && (
                <button
                    onClick={handleShare}
                    className="absolute top-2 right-2 hover:text-primary-500 bg-primary-50 rounded-full p-2"
                >
                    <Share size={24} />
                </button>
            )}
            <div className="aspect-square bg-gray-200 rounded-t-lg">
                {product.assets.length > 0 && (
                    <img
                        className="object-cover object-center w-full h-full rounded-t-lg"
                        src={product.assets[activeSlide].url}
                        alt={product.title}
                    />
                )}
            </div>
            <div className="pb-2 pt-2">
                <div className="flex px-2">
                    <div className="font-semibold text-sm grow line-clamp-2">{product.title}</div>
                    {!hideWishlist && (
                        <div className="relative">
                            {!favorite ? (
                                <button
                                    className="hover:text-primary-500 rounded-full"
                                    onClick={addToWishlist}
                                >
                                    <Heart size={24} />
                                </button>
                            ) : (
                                <button
                                    className="text-primary-500 rounded-full"
                                    onClick={removeFromWishlist}
                                >
                                    <Heart size={24} weight="duotone" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {!hidePrice && (
                    <>
                        {product.status === STATUS.ACTIVE ? (
                            <div className="px-2 flex gap-1 items-center">
                                <div className="font-semibold">{formatCurrency(price)}</div>
                                {compareAtPrice > 0 && (
                                    <div className="line-through text-gray-500 font-semibold text-sm">
                                        {formatCurrency(compareAtPrice)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-red-500 px-2">Unavailable</div>
                        )}
                    </>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;
