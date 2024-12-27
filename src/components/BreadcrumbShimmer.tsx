import React from 'react'

interface IBreadcrumbShimmerProps {
    count: number
}

const BreadcrumbShimmer: React.FC<IBreadcrumbShimmerProps> = ({ count }) => {
    return (
        <div className="mb-4">
            {Array.from({ length: count }).map((A, index) => (
                <>
                    <div key={index} className="inline-block bg-gray-200 animate-pulse rounded-lg w-12">
                        &nbsp;
                    </div>
                    {index < count - 1 ? '  /  ' : ''}
                </>
            ))}
        </div>
    )
}

export default BreadcrumbShimmer