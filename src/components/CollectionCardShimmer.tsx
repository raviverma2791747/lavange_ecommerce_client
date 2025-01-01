import Link from "next/link"



const CollectionCardShimmer = () => {
    return (
        <Link href="/" className="relative block rounded-lg border-gray-200 w-full">
            {/* <div className="absolute bg-gray-500 text-white text-xs p-1 rounded-tr-lg rounded-br-lg top-0 left-0 mt-2">
  Collection
 </div>  */}
            <div className="aspect-square bg-gray-200 rounded-full animate-pulse"></div>
            <div className="pb-4 px-2 pt-2">
                <div className="font-semibold text-base grow truncate">
                    <div className="bg-gray-200 animate-pulse rounded-lg w-6/12 mx-auto">&nbsp;</div>
                </div>
            </div>
        </Link>

    )
}

export default CollectionCardShimmer