import brands from "@/schemas/json/mainBrands.json";
import MainBrandCard from "./MainBrandCard";
import HomeHeader from "../HomeHeader";

export default function MainBrands() {
  return (
    <div className="flex flex-col gap-5">
      <HomeHeader title={"OUR MAIN BRANDS"} />
      <div className="grid gap-6 p-1 sm:grid-cols-3 lg:grid-rows-2">
        {brands.map((brand, index) => (
          <MainBrandCard brand={brand} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
