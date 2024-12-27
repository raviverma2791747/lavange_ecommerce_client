
'use client';
// import Carousel from 'react-multi-carousel';
// import "react-multi-carousel/lib/styles.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const AllCategory = ({ categories, loading = true }: any) => {
  // const responsive = {
  //   all: {
  //     breakpoint: { max: 3000, min: 0 },
  //     items: 10,
  //     slidesToSlide: 1,
  //   }
  // };

  const slideOptions = {
    gap: "0.75rem",
    pagination: false,
    arrows: false,
    autoWidth: true,
    autoplay: true,
    rewind: true,
    // breakpoints: {
    //   1024: {
    //     perMove: 1,
    //     perPage: 6,
    //     gap: ".7rem",
    //     autoplay: true,
    //   },
    //   768: {
    //     perPage: 5,
    //     gap: ".7rem",
    //     autoplay: true,
    //   },
    //   640: {
    //     perPage: 4,
    //     gap: ".7rem",
    //     autoplay: true,
    //   },
    //   480: {
    //     perPage: 3,
    //     gap: ".7rem",
    //     autoplay: true,
    //   },
    // },
  };
  return (
    <div>
      {loading ? (
        <Splide  options={slideOptions} aria-label="All Categories" >
          {Array.from({ length: 10 }).map((_, index) => (
             <SplideSlide key={index}>
            <div className="bg-gray-200 animate-pulse w-[110px] rounded-lg">
              &nbsp;
            </div></SplideSlide>
          ))}
        </Splide>
      ) : (
        <Splide  options={slideOptions} aria-label="All Categories" >
          {categories.map((category: any) => (
            <SplideSlide key={category.slug}>
              <div>
                <a href={`/category/${category.slug}`} className="font-semibold uppercase hover:text-primary-500">
                  {category.name}
                </a>
              </div></SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
};

export default AllCategory;
