import BreadcrumbShimmer from '@/components/BreadcrumbShimmer'
import CategoryCard from '@/components/CategoryCard'
import CategoryCardShimmer from '@/components/CategoryCardShimmer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CategoryModel } from '@/models'
import { categoryService } from '@/services'
import { model } from '@/types/model'
import React from 'react'

const CategoriesPage = async () => {
    let categories: CategoryModel[] = [];
    const loading = false;

    const initCategories = async () => {
        const response = await categoryService.getAll();
        if (response && response.status === 200) {
            categories =   (response.data.categories as model.ICategory[]).map(category => CategoryModel.fromOBJ(category)) ?? [];
        }
    }
    await initCategories();

    return (
        <div
            className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 min-h-[calc(100vh-64px)] flex flex-col"
        >
            {loading ?
                <>
                    <BreadcrumbShimmer count={2} />
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {
                            Array(5).fill(0).map((A, index: number) => (
                                <CategoryCardShimmer key={index} />
                            ))
                        }
                    </div>
                </>
                :
                <>
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
                        ]}
                    />
                    {/* <h1 className="font-semibold text-3xl text-center mb-4 capitalize">
                        {collection.name} Collection
                    </h1>  */}
                    {categories.length ?
                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        >
                            {
                                categories.map((category, index: number) => <CategoryCard key={index} category={category} />)
                            }
                        </div>
                        :
                        <div className=" grow flex items-center justify-center">
                            <p className="text-xl font-semibold">No categories found!</p>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default CategoriesPage