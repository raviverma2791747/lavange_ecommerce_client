'use client';
import { model } from '@/types/model';
// import Carousel from 'react-multi-carousel';
// import "react-multi-carousel/lib/styles.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface AnnouncementProps {
  announcements: model.IAnnouncement[];
  loading?: boolean;
}

const Announcement: React.FC<AnnouncementProps> = ({ announcements, loading = true }) => {
  const slideOptions = {
    perPage: 3,
    gap: "1rem",
    autoplay: true,
    rewind: true,
    // focus  : 'center',
    breakpoints: {
      1024: {
        perPage: 2,
        gap: ".7rem",
      },
      768: {
        perPage: 2,
        gap: ".7rem",
      },
      640: {
        perPage: 1,
        gap: ".7rem",
      },
      480: {
        perPage: 1,
        gap: ".7rem",
      },
    },
  };

  // const responsive = {
  //   all: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 1
  //   },
  //   desktop: {
  //     breakpoint: { max: 1024, min: 768 },
  //     items: 2,
  //     slidesToSlide: 1
  //   },
  //   tablet: {
  //     breakpoint: { max: 768, min: 640 },
  //     items: 2,
  //     slidesToSlide: 1
  //   },
  //   mobile: {
  //     breakpoint: { max: 640, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1
  //   }
  // };
  return (
    <div>
      <Splide options={slideOptions} aria-label="All Categories" >
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SplideSlide key={index}>
              <div className="transition duration-1000 ease-in-out bg-gray-200 h-64 animate-pulse"></div>
            </SplideSlide>
          ))
        ) : (
          announcements.map((announcement, index: number) => (
            <SplideSlide key={index}>
              <div className='w-full'>
                <a href={announcement.ctaUrl}>
                  {announcement.asset ? (
                    <img
                      src={announcement.asset.url}
                      alt={announcement.title}
                      className="transition duration-1000 ease-in-out bg-gray-400 h-64 object-cover object-center w-full rounded-lg"
                    />
                  ) : (
                    <div className="transition duration-1000 ease-in-out bg-gray-400 h-64 w-full rounded-lg"></div>
                  )}
                </a>
              </div></SplideSlide>
          ))
        )}
      </Splide>
    </div>
  );
};

export default Announcement;
