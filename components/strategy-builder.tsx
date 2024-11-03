import { useState } from 'react';
import ActionBlock from './action-block';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { type ActionBlock as ActionBlockType } from '@/types/strategy';

export const StrategyBuilder = () => {
  const [lockedBlocks, setLockedBlocks] = useState<ActionBlockType[]>([]);
  const [strategyName, setStrategyName] = useState('');
  const [strategyDescription, setStrategyDescription] = useState('');

  const handleLockBlock = (blockData: ActionBlockType) => {
    setLockedBlocks(prev => [...prev, blockData]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Build Your Strategy</h2>
        
        {/* Pass all required props including onLockBlock */}
        <ActionBlock 
          actionName=""
          protocolName=""
          onActionChange={() => {}}
          onProtocolChange={() => {}}
          onLockBlock={handleLockBlock}  // Pass the handler function
        />
      </div>

      {/* Locked Blocks Display */}
      {lockedBlocks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Locked Blocks ({lockedBlocks.length})</h3>
          <div className="space-y-2">
            {lockedBlocks.map((block) => (
              <div key={block.id} className="p-3 border rounded-md">
                <p className="font-medium">{block.protocolName} - {block.actionName}</p>
                <p className="text-sm text-gray-600">
                  {block.tokenFrom?.symbol} → {block.tokenTo?.symbol}
                </p>
                <p className="text-sm text-gray-600">Amount: {block.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategy Details */}
      {lockedBlocks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Strategy Details</h3>
          <Input
            placeholder="Strategy Name"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
          />
          <Input
            placeholder="Strategy Description (optional)"
            value={strategyDescription}
            onChange={(e) => setStrategyDescription(e.target.value)}
          />
          <Button onClick={() => console.log('Save strategy')}>
            Save Strategy
          </Button>
        </div>
      )}
    </div>
  );
};