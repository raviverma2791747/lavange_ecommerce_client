'use client';
import Slider from 'react-slick';
import ProductCardShimmer from './ProductCardShimmer';
import ProductCard from './ProductCard';
import { model } from '@/types/model';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

interface IProductCarouselProps {
    products: model.IProduct[];
    loading?: boolean;
}

function SampleNextArrow(props: {
    clasName?: string;
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
    clasName?: string;
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

const ProductCarousel: React.FC<IProductCarouselProps> = ({ products = [], loading = true }) => {
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
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div className={`w-full px-1`} key={index}>
                        <ProductCardShimmer key={index} />
                    </div>
                ))
                : products.map((product, index) => (
                    <div className={`w-full px-1`} key={index}>
                        <ProductCard key={index} product={product} />
                    </div>
                ))}
        </Slider>
    )
}

export default ProductCarousel