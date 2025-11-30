import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CTASection = () => {
  return (
    <div className='text-center mx-auto my-10 mb-20'>
        <h2 className='font-bold text-3xl '>Ready to Save Hours of Reading Time?</h2>
        <p className='text-gray-600'>Transform lengthy documents into clear, actionable insights, with our AI powered summarizer.</p>
        <Button className='bg-linear-to-r from-slate-900 to-rose-500 px-12  my-4'>
            <Link href={'/#pricing'}>Get Started</Link>
            <ArrowRight />
        </Button>
    </div>
  )
}

export default CTASection