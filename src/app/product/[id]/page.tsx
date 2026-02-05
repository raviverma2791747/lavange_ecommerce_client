
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { FACET_TYPE } from '@/helper/constants';
import { formatCurrency } from '@/helper/utils';
import { productService } from '@/services';
import { Heart, Minus, Plus, ShareFat } from '@phosphor-icons/react/dist/ssr';
import ProductMedia from '@/components/ProductMedia';
import { ProductModel } from '@/models';
import { model } from '@/types/model';

export interface IProductPageProps {
  params: Promise<{
    id: string
  }>
}

const ProductPage: React.FC<IProductPageProps> = async ({ params }) => {
  const { id: productID } = await params;
  // const loading: boolean = true;
  const quantity: number = 1;
  const MAX_QUANTITY: number = 100;
  const MIN_QUANTITY: number = 1;


  // const slideOptions = {
  //   // type: "loop",
  //   perPage: 6,
  //   gap: "0.5rem",
  //   breakpoints: {
  //     1280: {
  //       perPage: 8,
  //       gap: ".7rem",
  //     },
  //     1024: {
  //       perPage: 5,
  //       gap: ".7rem",
  //     },
  //     768: {
  //       perPage: 4,
  //       gap: ".7rem",
  //     },
  //     640: {
  //       perPage: 3,
  //       gap: ".7rem",
  //     },
  //     480: {
  //       perPage: 2,
  //       gap: ".7rem",
  //     },
  //   },
  // };

  // const productSlideOptions = {
  //   // type: "loop",
  //   perPage: 6,
  //   gap: ".7rem",
  //   breakpoints: {
  //     1280: {
  //       perPage: 8,
  //       gap: ".7rem",
  //     },
  //     1024: {
  //       perPage: 8,
  //       gap: ".7rem",
  //     },
  //     768: {
  //       perPage: 6,
  //       gap: ".7rem",
  //     },
  //     640: {
  //       perPage: 5,
  //       gap: ".7rem",
  //     },
  //     480: {
  //       perPage: 5,
  //       gap: ".7rem",
  //     },
  //   },
  // };

  const initProduct = async () => {
    const response = await productService.getOneBySlug(productID);
    if (response && response.status === 200) {
      console.log(response);
      const temp_product = response.data.product as model.IProduct ?? null;
      return temp_product ? ProductModel.fromOBJ(temp_product) : null;
    }
    return null;
  };
  const product: ProductModel | null = await initProduct();

  // const initCategory = async (category_id: string) => {
  //   const response = await categoryService.getOne(category_id);
  //   if (response && response.status === 200) {
  //     category = response.data.category ?? null;
  //   }
  // }

  // const initCollection = async (collection_id: any) => {
  //   const response = await collectionService.getOne(collection_id);
  //   if (response && response.status === 200) {
  //     collections = [...collections, response.data.collection];
  //   }
  // }

  // const fetchCollection = async () => {
  //   product.collections.forEach((collection_id: any) => {
  //     initCollection(collection_id);
  //   });
  // }

  const calculateDiscount = (price: number, compareAtPrice: number) => {
    if (compareAtPrice) {
      return compareAtPrice - price;
    } else {
      return 0;
    }
  };

  if (product === null) return (<div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
    {/* <img src={not_found_img} alt="not found" className="w-1/2 mb-5" /> */}
    <h1 className="font-semibold text-3xl">Oops! product not found</h1>
    <p className="italic">
      Maybe the product was unlisted or something went wrong!
    </p>
  </div>);

  return (
    <div id="product-page"
      className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 text-gray-800"
    >
      <div className="mb-4 flex">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/category/${typeof product.category === 'string' ? product.category : product.category.slug}`}>
                    {typeof product.category === 'string' ? product.category : product.category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ms-auto">
          {!product.favorite ?
            <button
              className=" hover:text-primary-500 hover:bg-primary-200 rounded-full"
            //onClick={handleAddToWishlist}
            >
              <Heart size={24} />
            </button>
            :
            <button
              className=" text-primary-500 hover:bg-primary-200 rounded-full"
            //onClick={handleRemoveFromWishlist}
            >
              <Heart size={24} weight='duotone' />
            </button>
          }
          <button
            className=" hover:text-primary-500 hover:bg-primary-200 rounded-full"
          >
            <ShareFat size={24} />
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 mb-4">
          <ProductMedia assets={product.assets} />
        </div>
        <div className="lg:col-span-2 mb-4 flex flex-col">
          <h1 className="font-semibold text-2xl lg:text-xl mb-2">
            {product.title}
          </h1>

          <div className="mb-2">
            {product.compareAtPrice ?
              <div className="text-sm font-semibold line-through">
                {formatCurrency(product.compareAtPrice * quantity)}
              </div> : ''
            }

            <div className="text-lg font-semibold">
              {formatCurrency(product.price * quantity)}
            </div>
            <div className="text-sm text-gray-600">inclusive of all taxes</div>
            {product.compareAtPrice ?
              <div>
                <div className="text-sm text-green-500 font-semibold">
                  You save {formatCurrency(
                    calculateDiscount(
                      product.price,
                      product.compareAtPrice * quantity
                    )
                  )}
                </div>
              </div> : ''
            }
          </div>

          {product.variantSchema ?
            <div className="flex flex-col gap-2 mb-4">
              {
                product.variantSchema.map((variantOption, index) => (
                  <div key={index}>
                    <div className="block text-sm font-semibold mb-2">
                      {variantOption.displayName}
                    </div>
                    {variantOption.type === FACET_TYPE.COLOR ?
                      <div className="flex gap-4">
                        {
                          variantOption.options.map((option, variantOptionIndex) => (
                            <div className="cursor-pointer" key={variantOptionIndex}>
                              <button
                                className="border-2 rounded-full w-fit p-0.5"
                              // class:border-gray-200={option.value !==
                              //   variantFilter[variantOption.name]}
                              // class:border-primary-500={option.value ===
                              //   variantFilter[variantOption.name]}
                              // on:click={() => {
                              //   variantFilter[variantOption.name] = option.value;
                              // }}
                              >
                                <div
                                  className="hover:scale-105 transition duration-100 ease-in-out h-8 w-8 rounded-full"
                                  style={{ backgroundColor: `${option.value}` }}
                                ></div>
                              </button>
                              <div className="text-sm text-gray-600">
                                {option.displayName}
                              </div>
                            </div>
                          ))
                        }
                      </div> : (variantOption.type === FACET_TYPE.SIZE ?
                        <div className="flex gap-4">
                          {
                            variantOption.options.map((option, variantOptionIndex) => (
                              <button
                                key={variantOptionIndex}
                                className="hover:scale-105 border border-gray-600 p-2 rounded-lg transition duration-100 ease-in-out cursor-pointer text-sm text-gray-600"
                              // class:border-primary-500={option.value ===
                              //   variantFilter[variantOption.name]}
                              // on:click={() => {
                              //   variantFilter[variantOption.name] = option.value;
                              // }}
                              // class:border-2={option.value ===
                              //   variantFilter[variantOption.name]}
                              // on:click={() => {
                              //   variantFilter[variantOption.name] = option.value;
                              // }}
                              // class:text-primary-500={option.value ===
                              //   variantFilter[variantOption.name]}
                              // on:click={() => {
                              //   variantFilter[variantOption.name] = option.value;
                              // }}
                              >
                                {option.displayName}
                              </button>
                            ))
                          }
                        </div>
                        :
                        <select
                          className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                        // value={variantFilter[variantOption.name]}
                        // on:change={(e) => {
                        //   variantFilter[variantOption.name] = e.target.value;
                        // }}
                        >
                          {
                            variantOption.options.map((option, optIndex) => (<option key={optIndex} value={option.value}
                            >{option.displayName}</option>))
                          }

                        </select>)}

                  </div>
                ))
              }

            </div> : ''
          }
          <div className="mb-4 mt-auto">
            <label htmlFor="quantity" className="block text-sm font-semibold mb-2"
            >Quantity</label>

            <div
              className="bg-white border border-gray-200 rounded-lg w-full md:w-36"
            >
              <div className="w-full flex justify-between items-center gap-x-1">
                <div className="grow py-2 px-3">
                  <input
                    className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    min={MIN_QUANTITY}
                    max={MAX_QUANTITY}
                  // bind:value={quantity}
                  // on:change={() => {
                  //   if (quantity < MIN_QUANTITY) {
                  //     quantity = MIN_QUANTITY;
                  //   }
                  //   if (quantity > MAX_QUANTITY) {
                  //     quantity = MAX_QUANTITY;
                  //   }
                  // }}
                  />
                </div>
                <div
                  className="flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200"
                >
                  <button
                    // on:click={() => {
                    //   if (quantity < MAX_QUANTITY) {
                    //     quantity++;
                    //   }
                    // }}
                    type="button"
                    className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    // on:click={() => {
                    //   if (quantity > MIN_QUANTITY) {
                    //     quantity--;
                    //   }
                    // }}
                    type="button"
                    className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {quantity === MAX_QUANTITY ?
              <div className="text-sm text-gray-500 mt-2">
                For bulk order, please contact us
              </div> : ''}
          </div>

          <div
            // bind:this={actions}
            id="actions"
            className="grid md:grid-cols-2 gap-4 mb-4 md:mb-0"
          >
            <button
              type="button"
              // disabled={disable}
              className="grow hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
            // on:click={handleBuy}
            >
              <span>Buy</span>
            </button>
            <button
              type="button"
              // disabled={disable}
              className=" grow hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-primary-600 text-primary-600 disabled:opacity-50 disabled:pointer-events-none"
            // on:click={handleAddToCart}
            >
              {/* <!-- <ShoppingCartIcon /> --> */}
              <span>Add to Cart</span>

              {/* <!-- <HeartIcon />
              <span>Wish List</span> --> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage