'use client';
import { formatCurrency } from '@/helper/utils';
import { model } from '@/types/model';
import { Minus, Plus, Trash, TrashSimple } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

interface CartItemProps {
    item: model.ICartItem,
    disabled: boolean,
    readonly?: boolean
}

const CartItem: React.FC<CartItemProps> = ({ item, disabled = false, readonly = false }) => {
    const MAX_QUANTITY = 100;
    const MIN_QUANTITY = 1;
    const [quantity, setQuantity] = React.useState(item.quantity);

    return (
        <a className="w-full p-2 flex gap-2 cursor-pointer hover:bg-primary-50 rounded-lg"
            //   class:pointer-events-none={disabled}
            href={`/product/${item.product.slug}`}>
            <div className="w-1/6 min-w-20">
                {item.product.assets.length ?
                    <img
                        className="aspect-square object-cover rounded-lg "
                        src={item.product.assets[0].url}
                        alt={item.product.title}
                    />
                    :
                    <div className="aspect-square bg-gray-300 rounded-lg"></div>
                }
            </div>
            <div className="grow">
                <h1 className="font-semibold">{item.product.title}</h1>

                {!item.isOutOfStock ?
                    <>
                        {item.product.hasVariants()}
                        <div className="flex gap-2 flex-wrap">
                            {item.variant && item.product.hasVariants() && item.product.getVariant(item.variant) &&
                                <>
                                    {
                                        Object.entries(item.product.getVariant(item.variant).attributes).map(([key, attribute]) => (<div
                                            className="border border-primary-500 text-primary-500 bg-primary-200 px-2 rounded-xl text-sm"
                                        >
                                            {attribute.name}
                                        </div>)

                                        )
                                    }
                                </>
                            }
                        </div>
                        <p>
                            <span className="font-semibold">Price</span>
                            {item.variant ?
                                <>
                                    {item.product.variants && item.product.variants.find((v: any) => v._id === item.variant) &&
                                        (<>{formatCurrency(
                                            item.variant
                                                ? item.product.variants.find((v: any) => v._id === item.variant)
                                                    .price
                                                : item.product.price)}

                                            <span className="text-sm line-through">
                                                {formatCurrency(
                                                    item.variant
                                                        ? item.product.variants.find((v: any) => v._id === item.variant)
                                                            .compareAtPrice
                                                        : item.product.compareAtPrice
                                                )}
                                            </span></>)
                                    }
                                </>
                                :
                                <>
                                    {formatCurrency(item.product.price)}
                                    <span className="text-sm line-through">
                                        {formatCurrency(item.product.compareAtPrice)}
                                    </span></>
                            }
                        </p>
                        <div>
                            <span className="font-semibold">Quantity</span>

                            {readonly ? <>{quantity}</> : <div className="bg-white border border-gray-200 rounded-lg w-36">
                                <div className="w-full flex justify-between items-center gap-x-1">
                                    <div className="grow py-2 px-3">
                                        <input
                                            disabled={disabled}
                                            className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            type="number"
                                            min={MIN_QUANTITY}
                                            max={MAX_QUANTITY}
                                            value={quantity}
                                        // on:click={(e) => {
                                        //     e.stopImmediatePropagation();
                                        //     e.preventDefault();
                                        // }}
                                        // on:change={(e) => {
                                        //     if (quantity < MIN_QUANTITY) {
                                        //         quantity = MIN_QUANTITY;
                                        //     }
                                        //     if (quantity > MAX_QUANTITY) {
                                        //         quantity = MAX_QUANTITY;
                                        //     }
                                        //     const diff = quantity - item.quantity;
                                        //     if (diff > 0) {
                                        //         handleAddToCart(diff);
                                        //     } else if (diff < 0) {
                                        //         handleRemoveFromCart(-diff);
                                        //     }
                                        // }}
                                        />
                                    </div>
                                    <div
                                        className="flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200"
                                    >
                                        <button
                                            disabled={disabled || quantity === MAX_QUANTITY}
                                            // on:click={(e) => {
                                            //     e.stopImmediatePropagation();
                                            //     e.preventDefault();
                                            //     if (quantity < MAX_QUANTITY) {
                                            //         quantity++;
                                            //         handleAddToCart(quantity - item.quantity);
                                            //     }
                                            // }}
                                            type="button"
                                            className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            <Plus size={16} />
                                        </button>

                                        <button
                                            disabled={disabled || quantity === MIN_QUANTITY}
                                            // on:click={(e) => {
                                            //     e.stopImmediatePropagation();
                                            //     e.preventDefault();
                                            //     if (quantity > MIN_QUANTITY) {
                                            //         quantity--;
                                            //         handleRemoveFromCart(item.quantity - quantity);
                                            //     }
                                            // }}
                                            type="button"
                                            className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            <Minus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <p>
                            {/* {#if item.product.status === STATUS.ACTIVE}
                            {#if!item.isOutOfStock}
                            {#if item.variant && item.product.variants.find((v) => v._id === item.variant)}
                            <span className="font-semibold">Total Price</span>
                            {formatCurrency(
                                (item.variant
                                    ? item.product.variants.find((v) => v._id === item.variant)
                                        .price
                                    : item.product.price) * quantity
                            )}
                            {:else}
                            <span className="font-semibold">Total Price</span>
                            {formatCurrency(item.product.price * quantity)}
                            {/if}
                            {:else}
                            <p className="text-red-500">Unavailable</p>
                            {/if}
                            {:else}
                            <p className="text-red-500">Unavailable</p>
                            {/if} */}
                        </p> </>
                    :
                    <p className="text-red-500">Unavailable</p>
                }
            </div>
            {
                !readonly &&

                <div>
                    <button
                        disabled={disabled}
                        className="hover:text-red-500"
                        onClick={(e: any) => {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            console.log(item);
                            // handleDeleteCart(item._id);
                        }}
                    >
                        <Trash size={24} />
                    </button>
                </div>
            }
        </a>
    )
}

export default CartItem