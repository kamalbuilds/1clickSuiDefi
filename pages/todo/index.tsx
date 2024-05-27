import { NextPage } from 'next';
import Link from 'next/link';
import { Text, Heading } from 'lucide-react';
import { MOCK_LIVE_STRATEGY, MOCK_COMING_SOON } from '@/constants/mockData';
import Card from '@/components/card';

const Home: NextPage = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 72px)',
          flexDirection: 'column',
        }}
      >
        <div>
          <Heading
            style={{
              background: 'linear-gradient(to right, #F0C3EC, #7F6AFF)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '8xl',
              fontWeight: 'extrabold',
            }}
          >
            1ClickSuiDeFi
          </Heading>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px' }}>
          <Heading
            style={{
              color: 'white',
              fontSize: '2xl',
              textAlign: 'center',
            }}
          >
            Drag and Drop for your favorite DeFi protocols on SUI
          </Heading>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px' }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 'xl',
              textAlign: 'center',
            }}
          >
            Optimize your transactions with Programmable Transaction Blocks thanks to &nbsp;
            <span
              style={{
                background: 'linear-gradient(to right, #F0C3EC, #7F6AFF)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              SUI
            </span>
            ’s ecosystem
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', marginTop: '50px' }}>
          <Link href="/sui" passHref legacyBehavior>
            <a
              style={{
                background: 'transparent',
                width: '145px',
                height: '60px',
                borderRadius: '35px',
                border: '1px solid #FFFF',
                color: '#F0C3EC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #F0C3EC, #7F6AFF)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Explore protocols
            </a>
          </Link>

          <Link href="/batch" passHref legacyBehavior>
            <a
              style={{
                background: 'transparent',
                width: '145px',
                height: '60px',
                borderRadius: '35px',
                border: '1px solid #FFFF',
                color: '#F0C3EC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to left, #F0C3EC, #7F6AFF)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Create Strategies
            </a>
          </Link>
        </div>
        <div className='w-full flex flex-col max-md:max-w-full bg-main bg-cover bg-center bg-no-repeat'>
          <div className='flex flex-col overflow-hidden self-stretch relative w-full pt-24 pb-24 px-20 max-md:max-w-full max-md:pb-24 max-md:px-5'>
            <div className='relative self-center mb-0 w-full max-w-[1082px] flex flex-col max-md:max-w-full max-md:mb-2.5'>
              <div className='items-start self-stretch flex flex-col max-md:max-w-full'>
                <div className='text-black text-3xl self-stretch whitespace-nowrap max-md:max-w-full'>
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
              <div className='items-start self-stretch flex-grow flex flex-col mt-40 max-md:max-w-full max-md:mt-10'>
                <div className='text-black text-3xl self-stretch whitespace-nowrap max-md:max-w-full'>
                  Coming Soon
                </div>
                <div className='w-full grid grid-cols-1 xl:grid-cols-[334px_334px_334px] justify-between gap-y-5 xl:gap-y-15 mt-12 max-md:mt-10'>
                  {MOCK_COMING_SOON.map((item, index) => (
                    <Card
                      key={item.name + item.title + index}
                      title={item.title}
                      protocol={item.name}
                      logo={item.logo}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
