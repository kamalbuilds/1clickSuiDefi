import React, { useState } from "react";
import styles from "../../styles/batch.module.css";
import { useWallet } from "@suiet/wallet-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ACTIONS, ProtocolNames } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SUI_NETWORK = "testnet";
const SUI_VIEW_TX_URL = `https://suiscan.xyz/${SUI_NETWORK}/tx`;
const SUI_VIEW_OBJECT_URL = `https://suiscan.xyz/${SUI_NETWORK}/object`;
const publicPublisherURL = "https://publisher.walrus-testnet.walrus.space";
const publicAggregatorURL = "https://aggregator.walrus-testnet.walrus.space";
const initBlockState = {
  id: 1,
  action: Object.keys(ACTIONS)[1],
  protocol: Object.keys(ProtocolNames)[1],
};
console.log("Init Block State", initBlockState);

const numEpochs = 5; //number of epochs to save the data

const WalrusIndex = () => {
  const address = useCurrentAccount()?.address;
  console.log("Wallet address", address);

  const [publisherUrl, setPublisherUrl] = useState<string>(publicPublisherURL);
  const [aggregatorUrl, setAggregatorUrl] =
    useState<string>(publicAggregatorURL);
  //   const [actionBlocks, setActionBlocks] = useState(); //action strategy
  const [storageInfo, setStorageInfo] = useState<{
    info: unknown;
  } | null>(null);

  const handleUploadStrategy = async () => {
    try {
      const response = await fetch(
        `${publisherUrl}/v1/blobs?epochs=${numEpochs}&send_object_to=${address}`,
        {
          method: "PUT",
          body: JSON.stringify(initBlockState),
        }
      );

      if (!response.ok)
        throw new Error("Something went wrong when storing the blob!");

      const storage_info = await response.json();
      console.log("storage_info >>>", storage_info);

      console.log("Storage info: ", storage_info);
      setStorageInfo(storage_info);
      displayBlob(storage_info);
    } catch (error) {
      console.log("Error >>>", error);
    }
  };

  const [uploadBlobInfo, setUploadBlobInfo] = useState<any>();

  const displayBlob = async (storage_info: any) => {
    let info: any;

    console.log("Displaying upload >>>", storage_info);

    if ("alreadyCertified" in storage_info) {
      info = {
        status: "Already certified",
        blobId: storage_info.alreadyCertified.blobId,
        endEpoch: storage_info.alreadyCertified.endEpoch,
        suiRefType: "Previous Sui Certified Event",
        suiRef: storage_info.alreadyCertified.event.txDigest,
        suiBaseUrl: SUI_VIEW_TX_URL,
      };
    } else if ("newlyCreated" in storage_info) {
      info = {
        status: "Newly created",
        blobId: storage_info.newlyCreated.blobObject.blobId,
        endEpoch: storage_info.newlyCreated.blobObject.storage.endEpoch,
        suiRefType: "Associated Sui Object",
        suiRef: storage_info.newlyCreated.blobObject.id,
        suiBaseUrl: SUI_VIEW_OBJECT_URL,
      };
    } else {
      throw new Error("Unhandled successful response!");
    }

    console.log("Info", info);
    setUploadBlobInfo(info);

    const blob_object_url = `${aggregatorUrl}/v1/blobs/${info.blobId}`;
    const suiUrl = `${info.suiBaseUrl}/${info.suiRef}`;

    console.log("SUI URL Image >>", suiUrl);
    console.log("blobUrl Image >>", blob_object_url);
    // setBlobURL(blob_object_url);
  };

  return (
    <div className="w-full h-[93vh] mt-20">
      <h2>Walrus Upload</h2>

      <Button onClick={handleUploadStrategy}>Upload Walrus</Button>
      {storageInfo && uploadBlobInfo && (
        <div>
          Uploaded successfully
          <object
            data={
              "https://aggregator.walrus-testnet.walrus.space/v1/blobs/pZWHTEtJInjhGrcDBfTBoIZWM08FrW3qG8lAnUPvmAU"
            }
          ></object>
          {/* <object
            data={`${aggregatorUrl}/v1/blobs/${uploadBlobInfo.blobId}`}
          ></object>
          <Image
            alt=""
            src={`${aggregatorUrl}/v1/blobs/${uploadBlobInfo.blobId}`}
          /> */}
          <Image
            alt=""
            width={40}
            height={40}
            src={
              "https://aggregator.walrus-testnet.walrus.space/v1/blobs/pZWHTEtJInjhGrcDBfTBoIZWM08FrW3qG8lAnUPvmAU"
            }
          />
        </div>
      )}
    </div>
  );
};

export default WalrusIndex;
