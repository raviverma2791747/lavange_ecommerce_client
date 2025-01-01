'use client';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import CollectionCard from './CollectionCard';
import CollectionCardShimmer from './CollectionCardShimmer';
import { model } from '@/types/model';

interface ICollectionCarouselProps {
    collections: model.ICollection[];
    loading?: boolean;
}

const CollectionCarousel: React.FC<ICollectionCarouselProps> =({ collections = [], loading = true }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    return (
        <Carousel responsive={responsive}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            showDots={false}
            itemClass='px-1'
        >
            {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <CollectionCardShimmer key={index} />
                ))
                : collections.map((collection, index) => (
                    <CollectionCard key={index} collection={collection} />
                ))}
        </Carousel>
    )
}

export default CollectionCarousel