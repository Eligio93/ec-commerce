import Image from "next/image";
import Link from "next/link";
interface MainBrandCardProps {
  index: number;
  brand: {
    name: string;
    image: string;
    link: string;
    isFeatured: boolean;
  };
}

export default function MainBrandCard({ index, brand }: MainBrandCardProps) {
  return (
    <Link
      href={brand.link}
      className={`group h-[250px] rounded-lg bg-cover bg-center sm:${index === 0 || index === 3 ? "col-span-2" : ""}`}
    >
      <div className="group relative h-full w-full overflow-hidden rounded-lg hover:shadow-lg">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:sepia-100 rounded-lg bg-white lg:group-hover:blur-lg lg:group-hover:brightness-50"
        />
        <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-3 text-center font-['Rubik_Dirt'] text-4xl italic text-orange-300 backdrop-blur-sm backdrop-brightness-50 transition-all duration-300 lg:-top-96 lg:w-fit lg:p-0 lg:backdrop-blur-none lg:backdrop-brightness-100 lg:group-hover:top-1/2">
          {brand.name}
        </p>
      </div>
    </Link>
  );
}
