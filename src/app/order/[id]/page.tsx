'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer'
import OrderStatusPill from '@/components/OrderStatusPill';
import PaymentStatusPill from '@/components/PaymentStatusPill';
import Breadcrumb from '@/components/ui/Breadcrumb'
import { DATE_TIME_FORMAT, ORDER_STATUS, PAYMENT_MODE } from '@/helper/constants';
import { formatCurrency, formatDate, getByValue } from '@/helper/utils';
import { OrderModel } from '@/models';
import { userPrivateService } from '@/services';
import { model } from '@/types/model';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

interface IOrderPageParams {
    id: string,
    [key: string]: string | string[] | undefined
}

const OrderPage = () => {
    const params = useParams<IOrderPageParams>();
    const orderID: string = params.id;
    const [order, setOrder] = React.useState<OrderModel | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true)

    const initOrder = async () => {
        const response = await userPrivateService.getOneOrder(orderID);
        if (response && response.status === 200) {
            setOrder(OrderModel.fromOBJ(response.data.order as model.IOrder) ?? null);
        }
        setLoading(false);
    }

    useEffect(() => {
        initOrder();
    }, [])

    if (!order) return <div>Order not found</div>

    return (
        <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-2">
            {
                loading ?
                    <BreadcrumbShimmer count={2} />
                    :
                    < Breadcrumb
                        routes={
                            [
                                {
                                    name: "Order",
                                    path: "/order",
                                },
                                {
                                    name: "Details",
                                    path: `/order/${orderID}`,
                                },
                            ]}
                    />
            }
            {
                loading ?
                    <>
                        <div className="flex gap-4 mb-4 flex-wrap">
                            <div>
                                <div className="font-semibold">Order Status</div>
                                <div
                                    className="bg-gray-200 animate-pulse capitalize px-2 py-1 inline-flex border border-gray-400 rounded-full w-24"
                                >
                                    &nbsp;
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold">Order Placed</div>
                                <div className="bg-gray-200 animate-pulse rounded-lg">&nbsp;</div>
                            </div>
                            <div>
                                <div className="font-semibold">Order#</div>
                                <div className="bg-gray-200 animate-pulse uppercase rounded-lg">
                                    &nbsp;
                                </div>
                            </div>
                        </div>

                        <div
                            className="mb-4 grid md:grid-cols-3 border p-4 gap-4 border-gray-200 rounded-lg"
                        >
                            <div>
                                <div className="font-semibold">Shipping Address</div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-full">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-3/4">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-3/4">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-3/4">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-1/2">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-32">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-32">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-32">
                                    &nbsp;
                                </div>
                                <div className="bg-gray-200 animate-pulse mb-2 rounded-lg w-32">
                                    &nbsp;
                                </div>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <div className="font-semibold">Payment Status</div>
                                    <div
                                        className=" bg-gray-200 animate-pulse capitalize px-2 py-1 inline-flex border border-gray-300 text-sm rounded-full w-24"
                                    >
                                        &nbsp;
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="font-semibold">Payment Mode</div>
                                    <div
                                        className="bg-gray-200 animate-pulse capitalize px-2 py-1 inline-flex border border-gray-300 text-sm rounded-full w-24"
                                    >
                                        &nbsp;
                                    </div>
                                </div>
                                {/* <!-- <div className="mb-4">
                                                <div className="font-semibold">Payment Gateway</div>
                                                <div className="uppercase">{order.paymentGateway}</div>
                                            </div> --> */}
                            </div>

                            <div>
                                <div className="font-semibold">Total</div>
                                <div className="bg-gray-200 animate-pulse rounded-lg w-24">&nbsp;</div>
                                <div className="font-semibold">Discount</div>
                                <div className="bg-gray-200 animate-pulse rounded-lg w-24">&nbsp;</div>
                            </div>

                            <div>
                                <div className="font-semibold">Tracking</div>
                                <div className="italic text-sm bg-gray-200 animate-pulse rounded-lg">
                                    &nbsp;
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold mb-2">Timeline</div>
                            <ol className="relative border-s border-gray-300 mb-4">
                                {
                                    Array(2).map((item, index) => (
                                        <li key={index} className="ms-4">
                                            <div
                                                className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"
                                            ></div>
                                            <time
                                                className="bg-gray-200 animate-pulse mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 rounded-lg w-24 inline-block"
                                            >&nbsp;</time>
                                            <h3
                                                className=" bg-gray-200 animate-pulse text-lg font-semibold text-gray-900 capitalize rounded-lg w-24 mb-2"
                                            >
                                                &nbsp;
                                            </h3>
                                            <p
                                                className=" bg-gray-200 animate-pulse text-base font-normal text-gray-500 rounded-lg w-48"
                                            >
                                                &nbsp;
                                            </p>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold mb-2">Items</div>
                            <div className="grid gap-2">
                                {
                                    Array(3).map((item, index) => (
                                        <Link
                                            href={"/"}
                                            key={index}
                                            className="w-full p-2 flex gap-2 cursor-pointer rounded-lg border border-gray-200"
                                        >
                                            <div className="w-24">
                                                <div className="aspect-square bg-gray-300 rounded-lg"></div>
                                            </div>
                                            <div className="grow">
                                                <h1
                                                    className="font-semibold bg-gray-200 animate-pulse rounded-lg mb-2 w-48"
                                                >
                                                    &nbsp;
                                                </h1>

                                                <div className="flex gap-2 flex-wrap mb-2">
                                                    {
                                                        Array(3).map((attribute, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="border border-gray-500 px-2  bg-gray-200 animate-pulse rounded-lg w-24"
                                                            >
                                                                &nbsp;
                                                            </div>
                                                        ))
                                                    }

                                                </div>

                                                <p className="bg-gray-200 animate-pulse rounded-lg mb-2 w-24">
                                                    &nbsp;
                                                </p>
                                                <p className="mb-2">
                                                    <span className="font-semibold">Quantity</span>
                                                    <span
                                                        className="inline-block bg-gray-200 animate-pulse rounded-lg w-24"
                                                    >&nbsp;</span>
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Total Price</span>
                                                    <span
                                                        className="inline-block bg-gray-200 animate-pulse rounded-lg w-24"
                                                    >&nbsp;</span
                                                    >
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        {/* <!--
            < div className = "" >
        <button
            className="hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
        >
            Cancel
        </button>
            </div > --> */}
                    </>
                    :
                    <>
                        <div className="flex gap-4 mb-4 flex-wrap" >
                            <div>
                                <div className="font-semibold">Order Status</div>
                                <OrderStatusPill status={order.status} />
                            </div>
                            <div>
                                <div className="font-semibold">Order Placed</div>
                                <div>{formatDate(order.createdAt, DATE_TIME_FORMAT)}</div>
                            </div>
                            <div>
                                <div className="font-semibold">Order#</div>
                                <div className="uppercase">{order._id}</div>
                            </div>
                        </div >

                        <div
                            className="mb-4 grid md:grid-cols-3 border p-4 gap-4 border-gray-200 rounded-lg"
                        >
                            <div>
                                <div className="font-semibold">Shipping Address</div>
                                <div>{order.address.fullName}</div>
                                <div>{order.address.mobile}</div>
                                <div>{order.address.addressLine1}</div>
                                <div>{order.address.addressLine2}</div>
                                <div>{order.address.landmark}</div>
                                <div>{order.address.city}</div>
                                <div>{order.address.state}</div>
                                <div>{order.address.country}</div>
                                <div>{order.address.pincode}</div>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <div className="font-semibold">Payment Status</div>
                                    <PaymentStatusPill paymentStatus={order.paymentStatus} />
                                </div>
                                <div className="mb-4">
                                    <div className="font-semibold">Payment Mode</div>
                                    <div
                                        className="capitalize px-2 py-1 inline-flex border border-primary-500 text-sm rounded-full bg-primary-100 text-primary-500"
                                    >
                                        {getByValue(PAYMENT_MODE, order.paymentMode)}
                                    </div>
                                </div>
                                {/* <!-- <div className="mb-4">
                                                <div className="font-semibold">Payment Gateway</div>
                                                <div className="uppercase">{order.paymentGateway}</div>
                                            </div> --> */}
                            </div>

                            <div>
                                <div className="font-semibold">Total</div>
                                <div>
                                    {formatCurrency(order.total)}
                                </div>
                                <div className="font-semibold">Discount</div>
                                <div>{formatCurrency(order.discount)}</div>
                            </div>

                            {order.shipping.trackingId && order.shipping.trackingUrl ?
                                <div>
                                    <div className="font-semibold">Tracking</div>
                                    <div>
                                        Tracking ID: <span className="italic">
                                            {order.shipping.trackingId}</span>
                                    </div>
                                    <div>
                                        <Link
                                            href={order.shipping.trackingUrl}
                                            target="_blank"
                                            className="text-primary-500"
                                        >
                                            Track Your Order
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="font-semibold">Tracking</div>
                                    <div className="italic text-sm">
                                        Once your order is dispatched your will be able to view the
                                        tracking details
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold mb-2">Timeline</div>
                            <ol className="relative border-s border-primary-300 mb-4">
                                {
                                    order.timeline.map((item, index) => (
                                        <li key={index} className="ms-4">
                                            <div
                                                className="absolute w-3 h-3 bg-primary-500 rounded-full mt-1.5 -start-1.5 border border-white"
                                            ></div>
                                            <time
                                                className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                                            >{formatDate(item.updatedAt, DATE_TIME_FORMAT)}</time>
                                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                                {getByValue(ORDER_STATUS, item.status)}
                                            </h3>
                                            <p className="text-base font-normal text-gray-500">
                                                {item.message}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold mb-2">Items</div>
                            {/* <!-- <div className="flex flex-col gap-2">
                                            {#each order.items as item}
                                            <a
                                                href={`/product/${item.product.slug}`}
                                                className="border border-gray-200 p-2 rounded-lg"
                                            >
                                                <div className="font-semibold">
                                                    {item.product.title}
                                                </div>
                                                {item.quantity}
                                                {formatCurrency(item.price)}
                                            </a>
                                            {/each}
                                        </div> --> */}
                            <div className="grid gap-2">
                                {
                                    order.items.map((item) => (
                                        <Link
                                            key={item._id}
                                            className="w-full p-2 flex gap-2 cursor-pointer hover:bg-gray-200 rounded-lg border border-gray-200"
                                            href={`/product/${item.product.slug}`}
                                        >
                                            <div className="w-24">
                                                {item.product.assets.length ?
                                                    <img
                                                        className="aspect-square object-cover rounded-lg"
                                                        src={item.product.assets[0].url}
                                                        alt={item.product.title}
                                                    />
                                                    :
                                                    <div className="aspect-square bg-gray-300 rounded-lg"></div>
                                                }
                                            </div>
                                            <div className="grow">
                                                <h1 className="font-semibold">{item.product.title}</h1>

                                                {item.variant &&
                                                    <div className="flex gap-2 flex-wrap">
                                                        {item.variant && item.product.hasVariants() && item.product.getVariant(item.variant) ?
                                                            Object.entries(item.product.getVariant(item.variant)!.attributes).map(([key, attribute]) => (
                                                                <div
                                                                    key={key}
                                                                    className="border border-primary-500 text-primary-500 bg-primary-200 px-2 rounded-lg"
                                                                >
                                                                    {attribute.name}
                                                                </div>
                                                            ))
                                                            :
                                                            <p className="text-red-500">Unavailable</p>
                                                        }
                                                    </div>
                                                }

                                                <p>
                                                    {formatCurrency(item.price)}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Quantity</span>
                                                    {item.quantity}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Total Price</span>
                                                    {formatCurrency(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }

        </div >
    )
}

export default OrderPage