import { type UseDisclosureProps } from "@/hooks/useDisclosure";
import {
  useConnectWallet,
  useCurrentAccount,
  useWallets,
} from "@mysten/dapp-kit";
import { LOGIN_PAGE_PATH } from "@shinami/nextjs-zklogin";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../button";

type ConnectProps = UseDisclosureProps;

const Connect = (props: ConnectProps) => {
  const { onClose } = props;
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();
  const account = useCurrentAccount();
  useEffect(() => {
    if (account) {
      onClose?.();
    }
  }, [account, onClose]);
  return (
    <div
      className={`w-110 flex flex-col gap-4 bg-black px-16 py-10 text-white`}
    >
      <span className="flex w-full items-center justify-center text-3xl font-semibold">
        Connect Wallet
      </span>
      <div className="flex flex-col gap-8 my-8">
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.name} className="w-full">
              <button
                className="my-2 flex h-[3rem] w-full items-center rounded-lg bg-blue-500 pl-4 text-white"
                onClick={() => {
                  connect({ wallet });
                }}
              >
                {wallet.icon ? (
                  <Image
                    src={wallet.icon}
                    alt={`${wallet.name} icon`}
                    className="mr-2 inline-block"
                    width={24}
                    height={24}
                  />
                ) : null}
                {wallet.name}
              </button>
            </li>
          ))}
        </ul>
        <Button variant="secondary">
          <Link href={LOGIN_PAGE_PATH}>Sign in with Zklogin 🥷🥷</Link>
        </Button>
        <Button
          variant="destructive"
          className="text-white hover:cursor-pointer"
          onClick={() => onClose?.()}
        >
          Close
        </Button>
      </div>

    </div>
  );
};

export default Connect;
