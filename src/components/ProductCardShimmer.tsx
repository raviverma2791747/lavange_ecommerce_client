import { Heart } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const ProductCardShimmer = ({ hidePrice = false, hideWishlist = false }) => {
  return (
    <a
      href="/"
      className="block rounded-lg bg-white border border-gray-200 w-full"
    >
      <div className="aspect-square bg-gray-200 rounded-t-lg animate-pulse"></div>
      <div className="pb-2 pt-2">
        <div className="flex px-2 h-[30.4px] items-start">
          <div className="font-semibold text-sm grow truncate">
            <div className="bg-gray-200 animate-pulse rounded-lg w-6/12">&nbsp;</div>
          </div>
          {!hideWishlist && (
            <div className="relative">
              <button className="position absolute top-0 right-0 z-50 text-gray-200">
                <Heart size={24} />
              </button>
            </div>
          )}
        </div>
        {/* Optional price placeholder */}
        {!hidePrice && (
          <div className="mx-2">
            <div className="w-3/12 bg-gray-200 animate-pulse rounded-lg">&nbsp;</div>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProductCardShimmer;
