import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import ProductCard from '@/components/ProductCard';
import ProductCardShimmer from '@/components/ProductCardShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { categoryService } from '@/services';
import React from 'react'

interface ICategoryPageProps {
  params: {
    id: string
  }
}

const CategoryPage: React.FC<ICategoryPageProps> = async ({ params }) => {
  const { id: categoryID } = await params;
  let loading = true;
  let category: any = null;

  const initCategory = async () => {
    const response = await categoryService.getOneBySlug(categoryID);
    console.log(response);
    if (response && response.status === 200) {
      category = response.data.category ?? null;
    }
    loading = false;
  }

  await initCategory();

  if (!category) return <div>Category not found</div>;

  return (<div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 min-h-[calc(100vh-64px)] flex flex-col">
    {loading ? <>
      <BreadcrumbShimmer count={3} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {
          Array(5).fill(0).map((A, index: number) => (
            <ProductCardShimmer key={index} />
          ))
        }
      </div>
    </> : <>
      <Breadcrumb
        routes={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Category",
            path: `/category`,
          },
          {
            name: category.name,
            path: `/category/${category.slug}`,
          },
        ]}
      />
      {category.products.length ? (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {
          category.products.map((product: any, index: number) => <ProductCard key={index} product={product} />)
        }
      </div>) :
        <div className="grow flex items-center justify-center" >
          <p className="text-xl font-semibold">No products found!</p>
        </div>
      }
    </>}
  </div>)
}


export default CategoryPage