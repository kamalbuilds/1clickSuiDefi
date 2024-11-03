export interface ActionBlock {
    protocolName: string;
    actionName: string;
    tokenFrom: any; // Replace with proper token type
    tokenTo: any; // Replace with proper token type
    amount: number;
    timestamp: number;
  }
  
  export interface Strategy {
    id: string;
    name: string;
    description?: string;
    blocks: ActionBlock[];
    createdAt: number;
    updatedAt: number;
  }