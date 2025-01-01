import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import CollectionCard from '@/components/CollectionCard';
import CollectionCardShimmer from '@/components/CollectionCardShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { collectionService } from '@/services';
import { model } from '@/types/model';
import React from 'react'

const CollectionsPage = async () => {
    let collections: model.ICollection[] = [];
    let loading = true;

    const initCollections = async () => {
        const response = await collectionService.getAll();
        if (response && response.status === 200) {
            collections = response.data.collections as model.ICollection[] ?? [];
        }
        loading = false;
    }

    await initCollections();

    return (
        <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 min-h-[calc(100vh-64px)] flex flex-col">
            {loading ?

                <>
                    <BreadcrumbShimmer count={2} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {
                            Array(5).fill(0).map((A, index: number) => (
                                <CollectionCardShimmer key={index} />
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
                                name: "Collection",
                                path: `/collection`,
                            },
                        ]}
                    />
                    {/* <h1 className="font-semibold text-3xl text-center mb-4 capitalize">
                {collection.name} Collection
            </h1>  */}
                    {collections.length ?
                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        >
                            {
                                collections.map((collection, index: number) => (
                                    <CollectionCard key={index} collection={collection} />
                                ))
                            }

                        </div>
                        :
                        <div className=" grow flex items-center justify-center">
                            <p className="text-xl font-semibold">No collections found!</p>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default CollectionsPage