import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ActionBlock from "../components/action-block";
import { ACTIONS, ProtocolNames } from "../constants/constants";
import styles from "../styles/batch.module.css";
import { Reorder } from "framer-motion";
import { useWallet } from "@suiet/wallet-kit";

const initBlockState = {
  id: 1,
  action: Object.keys(ACTIONS)[1],
  protocol: Object.keys(ProtocolNames)[1],
};

const Batch = () => {
  //TODO: Here is the useState for storing the states information
  const [batchActions, setBatchActions] = useState([]);

  const wallet = useWallet();
  const [actionBlocks, setActionBlocks] = useState([initBlockState]);

  const addActionBlock = () => {
    const newBlock = {
      id: actionBlocks.length + 1,
      action: Object.keys(ACTIONS)[1], // Default to the first action
      protocol: Object.keys(ProtocolNames)[1], // Default to the first protocol
    };
    setActionBlocks([...actionBlocks, newBlock]);
  };

  const removeActionBlock = (id) => {
    const updatedBlocks = actionBlocks.filter((block) => block.id !== id);
    setActionBlocks(updatedBlocks);
  };

  const updateActionBlock = (id, field, value) => {
    const updatedBlocks = actionBlocks.map((block) =>
      block.id === id ? { ...block, [field]: value } : block
    );
    setActionBlocks(updatedBlocks);
  };

  console.log("BAtch Actions >>>>", batchActions);

  const renderDisconnected = () => {
    return <div className="marginTop=50">Connect your Wallet to start</div>;
  };
  const renderConnected = () => {
    return (
      <div className={styles.container}>
        <div className="flex gap-8">
          <Button onClick={addActionBlock} className="mt-8">
            ➕ Action Block
          </Button>
          <Button
            onClick={() => removeActionBlock(actionBlocks.length)}
            className="mt-8 flex items-center justify-center"
          >
            ❌ Latest Block
          </Button>
          <Button
            onClick={() => {
              setBatchActions(null);
              setActionBlocks([initBlockState]);
            }}
            className="mt-8"
          >
            🗑️ Clear Batch
          </Button>
        </div>
        <Reorder.Group
          as="ul"
          className="w-full flex justify-start items-start flex-nowrap overflow-auto pt-8 gap-10"
          axis="x"
          values={actionBlocks}
          onReorder={setActionBlocks}
          layoutScroll
        >
          {actionBlocks.map((block) => (
            <Reorder.Item key={block.id} value={block}>
              <ActionBlock
                key={block.id}
                actionName={ACTIONS[block.action]?.type}
                protocolName={ProtocolNames[block.protocol]}
                onActionChange={(action) =>
                  updateActionBlock(block.id, "action", action)
                }
                onProtocolChange={(protocol) =>
                  updateActionBlock(block.id, "protocol", protocol)
                }
                setBatchActions={setBatchActions}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    );
  };

  return (
    <>
      {wallet && renderConnected()}
      {!wallet && renderDisconnected()}
    </>
  );
};
export default Batch;
