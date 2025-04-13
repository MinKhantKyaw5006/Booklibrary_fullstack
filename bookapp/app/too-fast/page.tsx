import React from 'react'

const page = () => {
  return <main className='root-container flex min-h-screen flex-col items-center justify-center'>
    <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>Whoa, Slow Down Fella!</h1>
    <p className='mt-3 max-w-xl text-center text-light-400'>
    You’ve hit the brakes a little too hard — looks like you’ve made too many requests in a short amount of time. Please wait a few seconds and try again. We’re just trying to keep things running smoothly for everyone.
    </p>
  </main>
}

export default page
