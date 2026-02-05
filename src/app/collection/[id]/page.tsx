import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import ProductCard from '@/components/ProductCard';
import ProductCardShimmer from '@/components/ProductCardShimmer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { collectionService } from '@/services';
import { model } from '@/types/model';
import React from 'react'

interface ICollectionPageProps {
  params: Promise<{
    id: string
  }>
}

const CollectionPage: React.FC<ICollectionPageProps> = async ({ params }) => {
  const { id: collectionID } = await params;
  let loading = true;

  const initCollection = async () => {
    const response = await collectionService.getOneBySlug(collectionID);
    if (response && response.status === 200) {
      return response.data.collection as model.ICollection ?? null;
    }
    return null;
  }

  const collection: model.ICollection | null = await initCollection();
  loading = false;
  if (!collection) return <div>Collection not found</div>;

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 min-h-[calc(100vh-64px)] flex flex-col">
      {loading ?
        <>
          <BreadcrumbShimmer count={3} />
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {
              Array(5).fill(0).map((A, index: number) => (
                <ProductCardShimmer key={index} />
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
                <BreadcrumbLink href="/collection">Collection</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{collection.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <h1 className="font-semibold text-3xl text-center mb-4 capitalize">
      {collection.name} Collection
    </h1>  */}
          <div className="mb-4 dynamic-html" dangerouslySetInnerHTML={{ __html: collection.description }}>

          </div>
          {collection.products.length ?
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {
                collection.products.map((product, index: number) => (
                  <ProductCard key={index} product={product} />
                ))
              }
            </div>
            :
            <div className=" grow flex items-center justify-center">
              <p className="text-xl font-semibold">No products found!</p>
            </div>}
        </>
      }
    </div >
  )
}

export default CollectionPage