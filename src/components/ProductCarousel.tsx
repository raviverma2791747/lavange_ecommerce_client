'use client';
// import Carousel from 'react-multi-carousel';
// import "react-multi-carousel/lib/styles.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ProductCardShimmer from './ProductCardShimmer';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products = [], loading = true }) => {
    // const responsive = {
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 6,
    //         slidesToSlide: 1
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2,
    //         slidesToSlide: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1,
    //         slidesToSlide: 1
    //     }
    // };

    const slideOptions = {
        // type: "loop",
        perPage: 6,
        gap: "0.5rem",
        pagination: false,
        breakpoints: {
            768: {
                perPage: 4,
                gap: ".7rem",
            },
            640: {
                perPage: 3,
                gap: ".7rem",
            },
            480: {
                perPage: 2,
                gap: ".7rem",
            },
        },
    };

    return (
        <Splide options={slideOptions} aria-label="All Categories" >
            {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <SplideSlide key={index}>
                        <ProductCardShimmer key={index} />
                    </SplideSlide>
                ))
                : products.map((product, index) => (
                    <SplideSlide key={index}>
                        <ProductCard key={index} product={product} />
                    </SplideSlide>
                ))}
        </Splide>
    )
}

export default ProductCarousel