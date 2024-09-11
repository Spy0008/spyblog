import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h2 className='text-4xl font-semibold'>Projects</h2>
      <p className='text-md text-zinc-600'>learn Reatcjs more with these article</p>
      <CallToAction />
    </div>
  )
}