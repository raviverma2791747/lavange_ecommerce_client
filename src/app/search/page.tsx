'use client';
import ProductCard from '@/components/ProductCard';
import ProductCardShimmer from '@/components/ProductCardShimmer';
import useStore from '@/helper/store';
import { filterService, productService } from '@/services';
import { model } from '@/types/model';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<model.IProduct[]>([]);
  const { searchFilter, setSearchFilter } = useStore();
  const { register, handleSubmit } = useForm();
  const pathname = usePathname();

  const initFilters = async () => {
    const response = await filterService.getAll();
    if (response && response.status === 200) {
      const categories = response.data.categories as model.ICategory[] ?? [];
      const collections = response.data.collections as model.ICollection[] ?? [];
      const facets = response.data.facets as model.IFacet[] ?? [];
      setSearchFilter({
        categories,
        collections,
        facets
      })
    }
  }

  const initProducts = async () => {
    setLoading(true);
    const searchParamsPayload = getSearchParams();
    const response = await productService.getAll("");
    if (response && response.status === 200) {
      setProducts(response.data.products as model.IProduct[] ?? [])
    } else {
      setProducts([])
    }
    setLoading(false);
  }

  const setParams = (data: any) => {
    const params = new URLSearchParams(searchParams.toString());
    if (data.query) { params.set("q", data.q) } else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`);
  }

  const getSearchParams = () => {
    const data: any = {
      q: searchParams.get('q') ?? "",
    }
    return data
  }

  useEffect(() => {
    initFilters();
    initProducts();
  }, [])


  useEffect(() => {
    initProducts();
  },[searchParams])

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 mt-4 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="mb-4">
        {/* {#if $appliedFilters_store.q}
        <h1 class="font-semibold text-gray-800">
          Search results for "{$appliedFilters_store.q}"
        </h1>
        {/if} */}
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-4 grow">
        <div className="col-span-1 hidden md:flex flex-col divide-y">
          <form onSubmit={handleSubmit((data: any) => console.log(data))}>
            {
              searchFilter.categories.length > 0 && (
                <div className="py-2 first:pt-0">
                  <div className="mb-2 font-semibold">Categories</div>
                  <div className="flex flex-col gap-2">
                    {
                      searchFilter.categories.map((category, index) => (<div key={index} className="flex gap-2">
                        <input
                          id={`categories.${category._id}`}
                          {...register(`categories.${category._id}`)}
                          type="checkbox"
                          className="focus:border-primary-500 focus:ring-primary-500 checked:bg-primary-500 focus:checked:bg-primary-500 hover:checked:bg-primary-500 h-4 w-4 cursor-pointer"
                        />
                        <label
                          htmlFor={`categories.${category._id}`}
                          className=" text-sm cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>))
                    }
                  </div>
                </div>
              )
            }
            {
              searchFilter.collections.length > 0 && (
                <div className="py-2">
                  <div className="mb-2 font-semibold">Collections</div>

                  <div className="flex flex-col gap-2">
                    {
                      searchFilter.collections.map((collection, index) => (<div key={index} className="flex gap-2">
                        <input
                          id={`collections.${collection._id}`}
                          {...register(`collections.${collection._id}`)}
                          type="checkbox"
                          className="focus:border-primary-500 focus:ring-primary-500 checked:bg-primary-500 focus:checked:bg-primary-500 hover:checked:bg-primary-500 h-4 w-4 cursor-pointer"
                        />
                        <label
                          htmlFor={`categories.${collection._id}`}
                          className=" text-sm cursor-pointer"
                        >
                          {collection.name}
                        </label>
                      </div>))
                    }
                  </div>
                </div>
              )
            }
            {
              searchFilter.facets.length > 0 && (<>
                {
                  searchFilter.facets.map((facet, index) => (<div className="py-2">
                    <div className="mb-2 font-semibold">{facet.displayName}</div>
                    <div className="flex flex-col gap-2">

                      {
                        facet.options.map((option, index) => (<div className="flex gap-2">
                          <input
                            id={`facet.${facet.name}.${option.value}`}
                            {...register(`facet.${facet.name}.${option.value}`)}
                            type="checkbox"
                            className="focus:border-primary-500 focus:ring-primary-500 checked:bg-primary-500 focus:checked:bg-primary-500 hover:checked:bg-primary-500 h-4 w-4 cursor-pointer"
                          />
                          <label
                            htmlFor={`facet.${facet.name}.${option.value}`}
                            className=" text-sm cursor-pointer"
                          >
                            {option.displayName}
                          </label>
                        </div>))
                      }
                    </div>
                  </div>))
                }
              </>
              )
            }
            <button type='submit'>submit</button>
          </form>
        </div>
        <div className="md:col-span-3">
          {
            loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {
                  Array(8).map((product, index) => <ProductCardShimmer key={index} />)
                }
              </div>
            ) : products.length ? (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {
                products.map((product, index) => <ProductCard key={index} product={product} />)
              }
            </div>) : <div className="flex justify-center items-center w-full h-full text-xl">
              No products found!
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage