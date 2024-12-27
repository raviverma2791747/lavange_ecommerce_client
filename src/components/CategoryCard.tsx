import React from 'react'

interface ICategoryProps {
    category: any
}

const CategoryCard: React.FC<ICategoryProps> = ({ category }) => {
    return (
        <a
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
                {category.asset &&
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
        </a>
    )
}

export default CategoryCard