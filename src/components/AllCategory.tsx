
'use client';
import { model } from '@/types/model';
import dynamic from 'next/dynamic';
// import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
const Slider = dynamic(() => import('react-slick'), { ssr: false })

interface IAllCategory {
  categories: model.ICategory[];
  loading?: boolean
}

// function SampleNextArrow(props: any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`z-50 absolute -right-8 p-1.5  top-1/2 -translate-y-1/2 cursor-pointer bg-white shadow border border-gray-300 rounded-full`}
//       onClick={onClick}
//     >
//       <CaretRight size={20} className='text-black' />
//     </div>
//   );
// }

// function SamplePrevArrow(props: any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`z-50 absolute -left-8 p-1.5  top-1/2 -translate-y-1/2 cursor-pointer bg-white shadow border border-gray-300 rounded-full`}
//       onClick={onClick}
//     >
//       <CaretLeft size={20} className='text-black' />
//     </div>
//   );
// }

const AllCategory: React.FC<IAllCategory> = ({ categories, loading = true }) => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  return (
    <div>
      {loading ? (
        <Slider {...settings} >
          {Array.from({ length: 10 }).map((_, index) => (
            <div className={`bg-gray-200 animate-pulse w-[110px] rounded-lg  ${index === 0 ? 'pr-1' : index === categories.length - 1 ? 'pl-1' : 'px-1'}`} key={index}>
              &nbsp;
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings} >
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className={`font-semibold uppercase hover:text-primary-500  ${index === 0 ? 'pr-1' : index === categories.length - 1 ? 'pl-1' : 'px-1'}`}>
              {category.name}
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default AllCategory;
