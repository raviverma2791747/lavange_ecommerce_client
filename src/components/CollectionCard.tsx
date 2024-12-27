

const CollectionCard = ({
    collection,
}: any) => {
    return (
        <a
            href={`/collection/${collection.slug}`}
            className="relative block rounded-lg w-full overflow-hidden"
        >
            {/* <div
                className="absolute bg-primary-500 text-white text-xs p-1 rounded-tr-lg rounded-br-lg top-0 left-0 mt-2"
            >
                Collection
            </div>  */}
            <div className=" bg-gray-200 rounded-full aspect-square border-gray-200 border hover:border-primary-200  overflow-hidden">
                {collection.asset &&
                    <img
                        className="object-cover object-center w-full h-full bg-white"
                        src={collection.asset.url}
                        alt={collection.name}
                    />}
            </div>
            <div className="pb-4 px-2 pt-2">
                <div className="text-center font-semibold text-base grow truncate hover:text-primary-500">
                    {collection.name}
                </div>
            </div>
        </a>
    )
}

export default CollectionCard