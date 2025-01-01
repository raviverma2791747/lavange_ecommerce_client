'use client';
import CollectionCard from './CollectionCard';
import CollectionCardShimmer from './CollectionCardShimmer';
import { model } from '@/types/model';
import Slider from 'react-slick';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

interface ICollectionCarouselProps {
    collections: model.ICollection[];
    loading?: boolean;
}

function SampleNextArrow(props: {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}) {
    const { onClick } = props;
    return (
        <div
            className={`z-10 absolute right-0 p-1.5  top-1/2 -translate-y-1/2 cursor-pointer bg-white shadow border border-gray-300 rounded-full`}
            onClick={onClick}
        >
            <CaretRight size={20} className='text-black' />
        </div>
    );
}

function SamplePrevArrow(props: {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}) {
    const { onClick } = props;
    return (
        <div
            className={`z-10 absolute left-0 p-1.5  top-1/2 -translate-y-1/2 cursor-pointer bg-white shadow border border-gray-300 rounded-full`}
            onClick={onClick}
        >
            <CaretLeft size={20} className='text-black' />
        </div>
    );
}

const CollectionCarousel: React.FC<ICollectionCarouselProps> = ({ collections = [], loading = true }) => {
    const settings = {
        className: "slider",
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    return (
        <Slider {...settings}>
            {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div className={`w-full px-1`} key={index}><CollectionCardShimmer key={index} /></div>
                ))
                : collections.map((collection, index) => (
                    <div className={`w-full px-1`} key={index}><CollectionCard key={index} collection={collection} /></div>
                ))}
        </Slider>
    )
}

export default CollectionCarousel