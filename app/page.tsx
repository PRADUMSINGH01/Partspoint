import CarPartSearch from "@/components/Carpartsearchbar/Carpartsearchbar";
import CarBrandsShowcase from "@/components/CarBrandsShowcase/CarBrandsShowcase";
import ExampleReviewsPage from "@/components/Review/Review";
import FaqSection from "@/components/FANDQ/FANDQ";
import PartsCategories from "@/components/ProductCate/ProductCate";

export default async function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-light to-white md:mt-10">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral mb-6">
              Premium Auto Parts
              <br />
              <span className="text-primary">Expertly Curated</span>
            </h1>
            <div className="max-w-xl mx-auto mb-8">
              <p className="text-lg text-gray-600 font-body">
                Find genuine parts for your vehicle with our comprehensive
                catalog
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all">
                Browse Catalog
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all">
                Search by Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>

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

      <div className=" Brand bg-light py-12">
        <CarBrandsShowcase />
      </div>

      <ExampleReviewsPage />

      <FaqSection />
    </>
  );
}
