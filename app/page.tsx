import Hero from "@/components/Hero/Hero";
import MainCategories from "@/components/MainCategories/MainCategories";
export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <MainCategories />
    </div>
  );
}
