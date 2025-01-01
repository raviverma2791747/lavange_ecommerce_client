import { CategoryModel } from '@/models'
import Link from 'next/link'
import React from 'react'

interface ICategoryCardProps {
    category: CategoryModel
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ category }) => {
    return (
        <Link
            href={`/category/${category.slug}`}
            className="relative block rounded-lg w-full overflow-hidden"
        >
            {/* <div
                className="absolute bg-primary-500 text-white text-xs p-1 rounded-tr-lg rounded-br-lg top-0 left-0 mt-2"
            >
                category
            </div>  */}
            <div
                className="aspect-square bg-gray-200 rounded-full overflow-hidden hover:border-primary-200 border-gray-200 border"
            >
                {category.asset &&  typeof category.asset === 'object' &&
                    <img
                        className="object-cover object-center w-full h-full rounded-t-lg bg-white"
                        src={category.asset.url}
                        alt={category.name}
                    />}
            </div>
            <div className="pb-4 px-2 pt-2">
                <div
                    className="font-semibold text-base grow truncate text-center hover:text-primary-500"
                >
                    {category.name}
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard