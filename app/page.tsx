import Hero from "@/components/Home/Hero/Hero";
import MainCategories from "@/components/Home/MainCategories/MainCategories";
import NewArrivals from "@/components/Home/NewArrivals/NewArrivals";
import MainBrands from "@/components/Home/MainBrands/MainBrands";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-1">
      <Hero />
      <MainCategories />
      <NewArrivals />
      <MainBrands />
      <Footer />
    </div>
  );
}
