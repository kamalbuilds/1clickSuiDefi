import { Strategy } from '@/types/strategy';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StrategyCardProps {
  strategy: Strategy;
  onExecute: (strategy: Strategy) => void;
}

export function StrategyCard({ strategy, onExecute }: StrategyCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{strategy.name}</h3>
        <p className="text-sm text-muted-foreground">
          Created: {new Date(strategy.createdAt).toLocaleDateString()}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {strategy.blocks.map((block, index) => (
            <div key={index} className="p-2 bg-muted rounded">
              <p className="font-medium">{block.protocolName}</p>
              <p className="text-sm">{block.actionName}</p>
              <p className="text-sm">Amount: {block.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={() => onExecute(strategy)}>
          Execute Strategy
        </Button>
      </CardFooter>
    </Card>
  );
}