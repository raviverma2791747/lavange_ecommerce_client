'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import OrderCard from '@/components/OrderCard';
import OrderCardShimmer from '@/components/OrderCardShimmer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { OrderModel } from '@/models';
import { userPrivateService } from '@/services';
import { model } from '@/types/model';
import Link from 'next/link';
import React, { useEffect } from 'react'

const OrdersPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState<OrderModel[]>([]);

  const initOrders = async () => {
    const response = await userPrivateService.getAllOrders();
    if (response && response.status === 200) {
      setOrders((response.data.orders as model.IOrder[]).map((order) => OrderModel.fromOBJ(order)) ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    initOrders();
  }, [])

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 mb-4 mt-4 min-h-[calc(100vh-64px)] flex flex-col">

      <>
        {loading ?
          <>
            <BreadcrumbShimmer count={1} />
            <div className="flex gap-4 flex-col">
              {
                Array(5).fill(0).map((A, index: number) => (
                  <OrderCardShimmer key={index} />
                ))
              }
            </div>
          </>
          :
          <>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Order</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {/* <!-- <h1 className="hidden md:block font-semibold text-3xl text-center mb-4">
        Orders
      </h1> --> */}
            <div>
              {/* <!-- <select
          className="cursor-pointer outline-primary-500 block w-fit border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
          on:change={(e) => {
            let v = e.target.value.split("-");
            let s = v[0];
            let d = v[1];
            applied_filters = {
              ...applied_filters,
              sort: s,
              order: d,
              order: d,
            };
          }}
        >
          <option value="title-asc"></option>
          <option value="createdAt-desc">Newest</option>
          <option selected value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select> --> */}
            </div>

            {orders.length > 0 ?
              <>
                <div className="flex gap-4 flex-col">
                  {
                    orders.map((order, index: number) => (
                      <OrderCard key={index} order={order} />
                    ))
                  }
                </div>
                {/* <!-- <Pagination.Root count={100} perPage={10} let:pages let:range>
        <div className="my-8 flex items-center">
          <Pagination.PrevButton
            className="mr-[25px] inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent hover:bg-dark-10 active:scale-98 disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
          >
            <ChevronLeft />
          </Pagination.PrevButton>
          <div className="flex items-center gap-2.5">
            {#each pages as page (page.key)}
            {#if page.type === "ellipsis"}
            <div className="text-[15px] font-medium text-foreground-alt">
              ...
            </div>
            {:else}
            <Pagination.Page
              {page}
              className="inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent text-[15px] font-medium hover:bg-dark-10 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent data-[selected]:bg-foreground data-[selected]:text-background"
            >
              {page.value}
            </Pagination.Page>
            {/if}
            {/each}
          </div>
          <Pagination.NextButton
            className="ml-[29px] inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent hover:bg-dark-10 active:scale-98 disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
          >
            <ChevronRight />
          </Pagination.NextButton>
        </div>
        <p className="text-center text-[13px] text-muted-foreground">
          Showing {range.start} - {range.end}
        </p>
      </Pagination.Root> -->
      {:else}
      <!-- <div className=" grow flex items-center justify-center">
        <p className="text-xl font-semibold">No orders found!</p>
      </div> --> */}

              </>
              : <div
                className="grow flex justify-center items-center flex-col gap-4 p-4 h-[calc(100vh-64px)]"
              >
                <div>Your order history is empty</div>
                <Link
                  href="/search"
                  className="w-full sm:w-fit hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                >Continue shopping</Link>
              </div>
            }
          </>}
      </>
    </div>
  )
}

export default OrdersPage