import { formatCurrency } from '@/helper/utils';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { MAX_QUANTITY, MIN_QUANTITY, STATUS } from '@/helper/constants';
import { toast } from 'react-toastify';
import Counter from './Counter';
import { CartItemModel, ProductModel } from '@/models';
import Link from 'next/link';

export interface IOnRemoveParams {
    productId: string,
    variantId: string | undefined,
    quantity: number,
}

export interface IOnAddParams {
    productId: string,
    variantId: string | undefined,
    quantity: number,
}

interface CartItemProps {
    item: CartItemModel,
    disabled?: boolean
    readonly?: boolean,
    onDelete?: (id: string) => Promise<boolean>
    onRemove?: (payload: IOnRemoveParams) => Promise<boolean>
    onAdd?: (payload: IOnAddParams) => Promise<boolean>
}

const CartItem: React.FC<CartItemProps> = ({ item, disabled = false, readonly = false, onDelete, onRemove, onAdd }) => {

    const onRemoveHandler = async (qty: number) => {
        if (onRemove && typeof item.product !== "string") {
            const success = await onRemove({
                productId: item.product._id,
                variantId: item.variant ?? undefined,
                quantity: item.quantity - qty,
            });
            if (!success) {
                toast.error("Failed to remove item");
                // setQuantity(item.quantity);
            }
        }
    }

    const onAddHandler = async (qty: number) => {
        if (onAdd && typeof item.product !== "string") {
            await onAdd({
                productId: item.product._id,
                variantId: item.variant ?? undefined,
                quantity: qty - item.quantity,
            });
            // if (!success) setQuantity(item.quantity);
        }
    }

    const onChangeHandler = async (qty: number) => {
        const diff = qty - item.quantity;
        if (diff > 0) {
            await onAddHandler(diff);
        } else if (diff < 0) {
            await onRemoveHandler(-diff);
        }
    }

    const onDeleteHandler = async (item_id: string) => {
        if (onDelete) {
            await onDelete(item_id);
        }
    }

    return (
        <article className={`w-full p-2 flex gap-2 cursor-pointer  rounded-lg ${disabled ? 'pointer-events-none' : ''}`}>
            {
                item.product instanceof ProductModel ?
                    <>
                        <div className="w-1/6 min-w-20  max-w-36">
                            {item.product.assets.length ?
                                <div className="group relative">
                                    <Carousel opts={{ loop: true }} className="w-full">
                                        <CarouselContent>
                                            {item.product.assets.map((asset, index) => (
                                                <CarouselItem key={index}>
                                                    <img
                                                        className="aspect-square object-cover rounded-lg w-full"
                                                        src={asset.url}
                                                        alt={item.product instanceof ProductModel ? item.product.title : ''}
                                                    />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-1 size-6 hidden group-hover:flex" />
                                        <CarouselNext className="right-1 size-6 hidden group-hover:flex" />
                                    </Carousel>
                                </div>
                                :
                                <div className="aspect-square bg-gray-300 rounded-lg"></div>
                            }
                        </div>
                        <div className="grow">
                            <Link className="font-semibold hover:underline " href={`/product/${item.product.slug}`}>{item.product.title}</Link>

                            {!item.isOutOfStock ?
                                <>
                                    {item.product.hasVariants()}
                                    <div className="flex gap-2 flex-wrap">
                                        {item.variant && item.product.getVariant(item.variant) &&
                                            Object.entries(item.product.getVariant(item.variant)!.attributes).map(([key, attribute]) => (<div
                                                key={key}
                                                className="border border-primary-500 text-primary-500 bg-primary-200 px-2 rounded-xl text-sm">
                                                {attribute.name}
                                            </div>
                                            ))
                                        }
                                    </div>
                                    <p>
                                        <span className="font-semibold">Price</span>
                                        {item.variant ?
                                            item.product.hasVariants() && item.product.getVariant(item.variant) &&
                                            <>{formatCurrency(
                                                item.variant
                                                    ? item.product.getVariant(item.variant)!.price
                                                    : item.product.price)}

                                                <span className="text-sm line-through">
                                                    {formatCurrency(
                                                        item.variant
                                                            ? item.product.getVariant(item.variant)!.compareAtPrice
                                                            : item.product.compareAtPrice
                                                    )}
                                                </span></>
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

                                        {readonly ? <>{item.quantity}</> : <Counter value={item.quantity} minValue={MIN_QUANTITY} maxValue={MAX_QUANTITY} onIncrement={onAddHandler} onDecrement={onRemoveHandler} onChange={onChangeHandler} disabled={disabled} />
                                        }
                                    </div>
                                    <p>
                                        {
                                            item.product.status === STATUS.ACTIVE ? (
                                                !item.isOutOfStock ? (
                                                    item.variant && item.product.getVariant(item.variant) ? (
                                                        <div>
                                                            <span className="font-semibold">Total Price</span>
                                                            {formatCurrency(
                                                                item.product.getVariant(item.variant)!.price * item.quantity
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="font-semibold">Total Price</span>
                                                            {formatCurrency(item.product.price * item.quantity)}
                                                        </div>
                                                    )
                                                ) : (
                                                    <p className="text-red-500">Unavailable</p>
                                                )
                                            ) : (
                                                <p className="text-red-500">Unavailable</p>
                                            )
                                        }
                                    </p> </>
                                :
                                <p className="text-red-500">Unavailable</p>
                            }
                        </div>
                        {
                            !readonly &&

                            <div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={disabled}
                                    className="hover:text-red-500 disabled:text-gray-300 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        // e.stopImmediatePropagation();
                                        // e.preventDefault();
                                        onDeleteHandler(item._id);
                                    }}
                                >
                                    <Trash size={24} />
                                </Button>
                            </div>
                        }
                    </>
                    : <div>Error</div>
            }
        </article>
    )
}

export default CartItem