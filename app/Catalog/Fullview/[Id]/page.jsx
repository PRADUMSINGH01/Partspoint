"use client";
import ProductReviewPage from "@/components/FullProduct/FullProduct";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const id = params?.Id;
  return <ProductReviewPage Id={id} />;
};
export default page;
