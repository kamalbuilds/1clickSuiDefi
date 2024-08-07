import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import FoldedPanel from "@/components/ui/FoldedPanel";
import { FAQ } from "@/constants/mockData";

const FAQs = () => {
  const defaultFoldedState = FAQ.map((item) => true);
  const [isFolded, setIsFolded] = useState(defaultFoldedState);

  const handleFoldedState = (index: number) => {
    const newFoldedState = [...defaultFoldedState];
    if (isFolded[index] === true) {
      newFoldedState[index] = false;
    }
    setIsFolded(newFoldedState);
  };

  return (
    <div className="items-start text-white self-stretch flex w-full flex-col pt-20 pb-24 px-20 max-md:max-w-full max-md:px-5">
      <div className="self-center flex w-[880px] max-w-full flex-col">
        <div className="self-stretch flex flex-col px-5 max-md:max-w-full">
          <div className="text-white text-3xl font-medium self-stretch whitespace-nowrap max-md:max-w-full">
            FAQs regarding 1clickSUIDefi
          </div>
          <Separator className={cn("w-full mt-5.5")} />
          {FAQ.map((item, index) => (
            <FoldedPanel
              key={"faq" + "title" + index}
              title={item.title}
              content={item.content}
              contentHeight={item.contentHeight}
              isFolded={isFolded[index]}
              setIsFolded={() => handleFoldedState(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
