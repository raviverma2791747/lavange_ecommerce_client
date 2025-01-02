import AllCategory from "@/components/AllCategory";
import Announcement from "@/components/Announcement";
import CollectionCarousel from "@/components/CollectionCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { homeConfigService } from "@/services";
import { model } from "@/types/model";
import Link from "next/link";

const Home: React.FC = async () => {
  let homeConfig: model.IHomeConfig | null = null;
  let featuredAnnouncements: model.IAnnouncement[] = [];
  let exploreProducts: model.IProduct[] = [];
  let exploreCollections: model.ICollection[] = [];
  let featuredCategories: model.ICategory[] = [];
  let newArrivalProducts: model.IProduct[] = [];
  let bestSellerProducts: model.IProduct[] = [];
  let featuredCollections: model.ICollection[] = [];

  const initHomeConfig = async () => {
    const response = await homeConfigService.getOne();
    if (response && response.status === 200) {
      homeConfig = response.data.homeConfig as model.IHomeConfig ?? null;
      featuredAnnouncements = homeConfig.featuredAnnouncements ?? [];
      exploreProducts = homeConfig.exploreProducts as model.IProduct[] ?? [];
      exploreCollections = homeConfig.exploreCollections as model.ICollection[] ?? [];
      featuredCategories = homeConfig.featuredCategories ?? [];
      newArrivalProducts = homeConfig.newArrivalProducts as model.IProduct[] ?? [];
      bestSellerProducts = homeConfig.bestSellerProducts as model.IProduct[] ?? [];
      featuredCollections = homeConfig.featuredCollections as model.ICollection[] ?? [];
    }
  }

  await initHomeConfig();

  return (
    <div>
      {/* Categories */}
      <div className="border-b border-gray-200 mb-4 sticky top-[64px] z-30 bg-white">
        <div className="bg-white max-w-7xl mx-auto py-4 px-4">
          <AllCategory categories={featuredCategories} loading={false} />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 flex flex-col gap-8 mb-4">
        {/* Announcements */}
        <Announcement announcements={featuredAnnouncements} loading={false} />

        {/* Explore Products */}
        <div className="bg-gradient-to-b from-primary-300 to-primary-50 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="font-semibold text-xl text-gray-800">Explore</h2>
            <p>Explore our wide range of products</p>
          </div>
          <ProductCarousel products={exploreProducts} loading={false} />
          <Link
            href="/search"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700"
          >
            Explore
          </Link>
        </div>

        {/* Explore Collections */}
        <section>
          <h2 className="font-semibold text-xl text-center mb-4">Explore Collections</h2>
          <CollectionCarousel collections={exploreCollections} loading={false} />
        </section>

        {/* Best Sellers */}
        <section>
          <h2 className="font-semibold text-xl text-center mb-4">Best Sellers</h2>
          <ProductCarousel products={bestSellerProducts} loading={false} />
        </section>

        {/* New Arrivals */}
        <section>
          <h2 className="font-semibold text-xl text-center mb-4">New Arrivals</h2>
          <ProductCarousel products={newArrivalProducts} loading={false} />
        </section>

        {/* Featured Collections */}
        {featuredCollections.map((collection, index: number) => (
          <section key={index}>
            <h2 className="font-semibold text-xl text-center mb-4 capitalize">
              {collection.name} Collection
            </h2>
            <ProductCarousel products={collection.products} loading={false} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
