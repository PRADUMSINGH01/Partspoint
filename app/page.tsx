import CarPartSearch from "@/components/Carpartsearchbar/Carpartsearchbar";
import ExampleReviewsPage from "@/components/Review/Review";
import FaqSection from "@/components/FANDQ/FANDQ";
import PartsCategories from "@/components/ProductCate/ProductCate";
import ProductSlider from "@/components/ProductSlider /ProductSlider";
import FreeDeliveryBanner from "@/components/Banner/FreeDeliveryBanner";
import WaveMarqueeBanner from "@/components/Banner/WaveMarqueeBanner";
import PromoBanner from "@/components/Banner/Promobanner";
import HeroBanner from "@/components/Banner/AutoPartsBanner/AutoPartsBanner";
export default async function Home() {
  return (
    <>
      <PromoBanner />
      <HeroBanner />

      <FreeDeliveryBanner />

      <div className="bg-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-black mb-8 text-center">
            Find Parts for Your Vehicle
          </h2>
          <CarPartSearch />
        </div>
      </div>
      <div className="Category" id="Categories">
        <PartsCategories />
      </div>

      {/* <div className=" Brand bg-light py-12" id="Brands">
        <CarBrandsShowcase />
      </div> */}

      <ProductSlider />
      <WaveMarqueeBanner />
      <ExampleReviewsPage />

      <div className="" id="faq">
        <FaqSection />
      </div>
    </>
  );
}
