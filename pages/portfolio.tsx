import { useEffect, useState } from 'react';
import { useWalrus } from '@/hooks/useWalrus';
import { Strategy } from '@/types/strategy';
import { StrategyCard } from '@/components/strategy-card';

export default function Portfolio() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const walrus = useWalrus();

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    try {
      // Get all strategy keys
      const keys = await walrus.keys('strategy:*');
      
      // Load all strategies
      const loadedStrategies = await Promise.all(
        keys.map(async (key) => {
          const data = await walrus.get(key);
          return JSON.parse(data);
        })
      );

      setStrategies(loadedStrategies);
    } catch (error) {
      console.error('Failed to load strategies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteStrategy = async (strategy: Strategy) => {
    // Implement strategy execution logic here
    for (const block of strategy.blocks) {
      // Execute each block sequentially
      try {
        // Call your existing swap/action functions
        // You may need to modify them to work with saved block data
      } catch (error) {
        console.error('Failed to execute block:', error);
        break;
      }
    }
  };

  if (loading) {
    return <div>Loading strategies...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Strategies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            onExecute={handleExecuteStrategy}
          />
        ))}
      </div>
    </div>
  );
}