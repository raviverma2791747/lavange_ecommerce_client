import { Minus, Plus, Trash, TrashSimple } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const CartItemShimmer = () => {
    const disabled = true;
    const MAX_QUANTITY = 100;
    const MIN_QUANTITY = 1;
    return (
        <div
            className="w-full p-2 flex gap-2 cursor-pointer hover:bg-primary-50 rounded-lg"
        //   class:pointer-events-none={disabled}
        >
            <div className="w-1/6">
                <div className="aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
            <div className="grow">
                <h1 className="font-semibold animate-pulse bg-gray-200 rounded-lg w-32 mb-2">&nbsp;</h1>

                {/* <!-- <div className="flex gap-2 flex-wrap">
        {#if item.variant && item.product.variants && item.product.variants.find((v) => v._id === item.variant)}
          {#each Object.entries(item.product.variants.find((v) => v._id === item.variant).attributes).map( (a) => {
              return item.product.variantOptions
                .find((v) => v.name === a[0])
                .options.find((o) => o.value === a[1]).displayName;
            } ) as attribute}
            <div
              className="border border-primary-500 text-primary-500 bg-primary-200 px-2 rounded-xl text-sm"
            >
              {attribute}
            </div>
          {/each}
        {/if}
      </div> --> */}

                <p>
                    <span className="font-semibold">Price</span>
                    <span className="animate-pulse bg-gray-200 rounded-lg w-16 inline-block">&nbsp;</span>
                </p>
                <div className="mb-2">
                    <span className="font-semibold">Quantity</span>

                    <div className="bg-white border border-gray-200 rounded-lg w-36">
                        <div className="w-full flex justify-between items-center gap-x-1">
                            <div className="grow py-2 px-3">
                                <input
                                    disabled={disabled}
                                    className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    type="number"
                                    min={MIN_QUANTITY}
                                    max={MAX_QUANTITY}
                                />
                            </div>
                            <div
                                className="flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200"
                            >
                                <button
                                    disabled={disabled}
                                    type="button"
                                    className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <Plus size={16} />
                                </button>

                                <button
                                    disabled={disabled}
                                    type="button"
                                    className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <Minus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <p>
                    <span className="font-semibold">Total Price</span>
                    <span className="animate-pulse bg-gray-200 rounded-lg w-16 inline-block">&nbsp;</span>
                </p>
            </div>
            <div>
                <button disabled={disabled}>
                    <Trash size={24} />
                </button>
            </div>
        </div>
    )
}

export default CartItemShimmer