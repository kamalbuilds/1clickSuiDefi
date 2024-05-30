"use client";

import Header from '@/components/Header'
import FAQs from '@/components/FAQs'
import Footer from '@/components/Footer'
import Card from '@/components/card'
import { MOCK_LIVE_STRATEGY, MOCK_COMING_SOON } from '@/constants/mockData'


export default function Home() {
  return (
    <div className='relative w-full justify-center items-center flex flex-col xl:pt-25'>
      <Header />
      <div className='flex w-full flex-col max-md:max-w-full bg-main bg-cover bg-center bg-no-repeat'>
        <div className='flex-col overflow-hidden self-stretch relative flex w-full pt-24 pb-24 px-16 max-md:max-w-full max-md:pb-24 max-md:px-5'>
          <div className='relative self-center flex mb-0 w-full max-w-[1200px] flex-col max-md:max-w-full max-md:mb-2.5'>
            <div className='items-start self-stretch flex flex-col max-md:max-w-full'>

              <div>
                <h1 className='text-5xl mb-2 font-bold text-center text-black max-md:text-2xl max-md:max-w-full max-md:mb-2.5'
                >
                  Drag and Drop for your favorite DeFi protocols on SUI
                </h1>
              </div>
              <div className='text-2xl text-zinc-500 mb-12'>
                <div
                >
                  Optimize your transactions with Programmable Transaction Blocks
                </div>
              </div>
              <div className=' text-5xl font-bold self-stretch whitespace-nowrap max-md:max-w-full '>
                Live Strategy Vault
              </div>
              <div className='w-full grid grid-cols-1 xl:grid-cols-[334px_334px_334px] justify-between gap-y-5 xl:gap-y-15 xl:mt-12'>
                {MOCK_LIVE_STRATEGY.map((info, index) => (
                  <Card
                    key={info.protocolName + info.title + index}
                    cardInfo={info}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQs />
      <Footer />
    </div>
  )
}

