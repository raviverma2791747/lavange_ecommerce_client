import { model } from "@/types/model"
import Link from "next/link"

interface CollectionCardProps {
    collection: model.ICollection
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
    return (
        <Link
            href={`/collection/${collection.slug}`}
            className="relative block rounded-lg w-full overflow-hidden"
        >
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
        </Link>
    )
}

export default CollectionCard