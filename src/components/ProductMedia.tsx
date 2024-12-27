'use client';
import React, { useEffect, useRef, useState } from 'react'
// import '@splidejs/react-splide/css';
// import Carousel from 'react-multi-carousel';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductMediaProps {
    assets: any
}
const ProductMedia: React.FC<ProductMediaProps> = ({ assets }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <img src={assets[i].url} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    console.log(assets);

    // return (
    //     <div className="slider-container">
    //         <Slider {...settings} >
    //             {
    //                 assets.map((asset: any, index: number) => (
    //                     <img
    //                         key={index}
    //                         className="rounded-lg border border-gray-200 w-full h-auto aspect-[5/3] object-contain"
    //                         src={asset.url}
    //                     />
    //                 ))
    //             }
    //         </Slider>
    //         {/* <div className="mb-4 grow">

    //   <img
    //     className="rounded-lg border border-gray-200 w-full h-auto aspect-[5/3] object-contain"
    //     src={product.assets[0].url}
    //     alt={`${product.title}-${0}`}
    //   />
    // </div> */}

    //         {/* {#if product.assets.length > 1}
    // <Splide options={productSlideOptions}>
    //   {#each product.assets as asset, index}
    //   <SplideSlide>
    //     <button
    //       class="hover:scale-105 transition cursor-pointer shrink-0"
    //       on:click={() => {
    //         active_asset = index;
    //       }}
    //     >
    //       <img
    //         class="rounded-lg border border-gray-200 w-full aspect-square object-contain"
    //         src={asset.url}
    //         alt={`${product.title}-${index}`}
    //       />
    //     </button>
    //   </SplideSlide>
    //   {/each}
    // </Splide>
    // {/if} */}
    //     </div>
    // )


    return (
        <div className='grid grid-cols-8 gap-4'>
            <div className="slider-containers col-span-1">
                <Slider
                    slidesToScroll={1}
                    slidesToShow={5}
                    vertical={true}
                    verticalSwiping={true}
                    infinite={true}
                    asNavFor={nav1}
                    ref={slider => (sliderRef2 = slider)}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    {
                        assets.map((asset: any, index: number) => (
                            <img
                                key={index}
                                className="rounded-lg border border-gray-200 w-full h-auto aspect-square object-contain"
                                src={asset.url}
                            />
                        ))
                    }
                </Slider>
            </div>
            <div className="slider-containers col-span-7">
                <Slider
                    asNavFor={nav2} ref={slider => (sliderRef1 = slider)}
                    arrows={false}
                >
                    {
                        assets.map((asset: any, index: number) => (
                            <img
                                key={index}
                                className="rounded-lg border border-gray-200 w-full h-auto aspect-[5/3] object-contain"
                                src={asset.url}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>

    )
}

export default ProductMedia