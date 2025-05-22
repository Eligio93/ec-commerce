export default function HomeHeader({ title }: { title: string }) {
  return (
    <>
      <h2 className='text-center font-["Rubik_Dirt"] text-2xl text-orange-800 lg:text-5xl'>
        {title.toUpperCase()}
      </h2>
      <hr className="border-orange-800" />
    </>
  );
}
