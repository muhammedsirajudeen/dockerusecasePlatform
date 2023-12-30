import Navbar from '@/components/Navbar'
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start">
      <Navbar/>
      <h1 className='mt-10 font-bold text-xl' >DOCKER USE CASE PLATFORM</h1>
      <p className='mt-10 font-light text-xs' > Custom Use Cases For All Your Solutions Tailored to your needs</p>
    </div>
  )
}
