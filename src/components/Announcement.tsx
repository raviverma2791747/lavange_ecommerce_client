'use client';
import { model } from '@/types/model';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import Slider from 'react-slick';

interface AnnouncementProps {
  announcements: model.IAnnouncement[];
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

const Announcement: React.FC<AnnouncementProps> = ({ announcements, loading = true }) => {
  const settings = {
    className: "slider",
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  };

  return (
    <div>
      <Slider {...settings} >
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={`transition duration-1000 ease-in-out bg-gray-200 h-64 animate-pulse px-1`}></div>
          ))
        ) : (
          announcements.map((announcement, index: number) => (
            <div className={`w-full px-1`} key={index}>
              <Link href={announcement.ctaUrl}>
                {announcement.asset ? (
                  <img
                    src={announcement.asset.url}
                    alt={announcement.title}
                    className="transition duration-1000 ease-in-out bg-gray-400 h-64 object-cover object-center w-full rounded-lg"
                  />
                ) : (
                  <div className="transition duration-1000 ease-in-out bg-gray-400 h-64 w-full rounded-lg"></div>
                )}
              </Link>
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default Announcement;
