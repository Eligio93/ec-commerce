export default function HomeHeader({ title }: { title: string }) {

    return <>
        <h2 className='text-2xl font-["Rubik_Dirt"] text-center text-orange-800 lg:text-5xl'>{title.toUpperCase()}</h2>
        <hr className="border-orange-800" />
    </>
}