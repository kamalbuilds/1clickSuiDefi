import { cn } from "../lib/utils";
import Image from "next/image";
import { useState } from "react";
import { IStrategyCard } from "../type";
import FormatNumber from "../components/formats/formatNumber";
import Link from "next/link";

interface ICardProps {
  cardInfo: IStrategyCard;
}

const Card = ({ cardInfo }: ICardProps) => {

  const [isHover, setIsHover] = useState(false);
  const nativeAPR = 3.98;
  const maxLeverage = 3;

  return (
    <Link
      href={cardInfo?.link ?? "#"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={cn(
          "items-start shadow-lg bg-slate-100 bg-opacity-90 flex w-full xl:w-83.5 max-w-83.5 grow flex-col mx-auto px-10 py-11 rounded-xl border-[0.5px] border-solid border-white max-md:mt-10 max-md:px-5 xl:transform xl:transition-transform xl:duration-300",
          isHover
            ? "xl:-translate-y-3 xl:shadow-lg shadow-md"
            : "xl:translate-y-0 shadow-md"
        )}
      >
        <div className="items-start self-stretch flex flex-col">
          <div className="text-black text-3xl self-stretch whitespace-nowrap">
            {cardInfo?.title}
          </div>
          <div className="items-start self-stretch flex gap-4 mt-3.5">
            <Image
              className="aspect-square object-contain object-center w-[25px] overflow-hidden self-stretch max-w-full rounded-[50%]"
              src={cardInfo?.logo}
              alt={`${cardInfo?.protocolName} cardInfo?.logo`}
              width={25}
              height={25}
            />
            <div className="text-black text-base self-stretch whitespace-nowrap">
              {cardInfo?.protocolName}
            </div>
          </div>
        </div>
        <div className="self-stretch flex w-full items-start justify-between gap-5 mt-8">
          <div className="items-start self-stretch flex flex-col">
            <div className="text-neutral-400 text-xs self-stretch whitespace-nowrap">
              APR
            </div>
            <div className="flex items-center gap-1.5">
              <FormatNumber
                value={nativeAPR}
                unit="%"
                skeletonClass="w-14.5 h-7.5"
                numberClass="text-black text-xl self-stretch whitespace-nowrap mt-2.5"
              />
              <span className="mt-2">~</span>
              <FormatNumber
                value={nativeAPR * maxLeverage}
                unit="%"
                skeletonClass="w-14.5 h-7.5"
                numberClass="text-black text-xl self-stretch whitespace-nowrap mt-2.5"
              />
            </div>
          </div>
          <div className="items-end self-stretch flex flex-col">
            <div className="text-neutral-400 text-xs whitespace-nowrap self-end">
              AUM
            </div>
            <div className="justify-end items-start flex w-[72px] max-w-full gap-1.5 mt-2.5 self-end">
              <FormatNumber
                value={1070}
                skeletonClass="w-12 h-7.5"
                numberClass="text-black text-xl self-start"
              />
              <div className="text-black text-xs whitespace-nowrap mt-2.5 self-start">
                SUI
              </div>
            </div>
          </div>
        </div>
        {/* <div className="text-neutral-400 text-xs self-stretch mt-8">
          {description}
        </div> */}
      </div>
    </Link>
  );
};

export default Card;
