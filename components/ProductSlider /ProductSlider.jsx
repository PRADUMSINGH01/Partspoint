"use client";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/lib/fetchonly";
import ProductCatalogPage from "../ProductCatalog/ProductCatalog";
import Link from "next/link";
const ProductSlider = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    async function load() {
      const res = await getLatestProducts();
      setproducts(res);
    }
    load();
    return setproducts([]);
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <ProductCatalogPage products={products} />

      <Link
        href={"/Catalog/Maintenance-Service-Parts"}
        className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
      >
        Show More
      </Link>
    </div>
  );
};

export default ProductSlider;
