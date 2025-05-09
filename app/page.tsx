import Hero from "@/components/Home/Hero/Hero";
import MainCategories from "@/components/Home/MainCategories/MainCategories";
import NewArrivals from "@/components/Home/NewArrivals/NewArrivals";
import MainBrands from "@/components/Home/MainBrands/MainBrands";
export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <MainCategories />
      <NewArrivals />
      <MainBrands />
    </div>
  );
}
