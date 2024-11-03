import { useEffect, useState } from 'react';
import { Strategy } from '@/types/strategy';

const WALRUS_URL = process.env.NEXT_PUBLIC_WALRUS_URL || 'http://localhost:8000';

export const useWalrus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Store a strategy
  const storeStrategy = async (strategy: Strategy) => {
    try {
      setLoading(true);
      const response = await fetch(`${WALRUS_URL}/v1/store`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(strategy),
      });

      if (!response.ok) {
        throw new Error('Failed to store strategy');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Retrieve all strategies
  const getStrategies = async (): Promise<Strategy[]> => {
    try {
      setLoading(true);
      const response = await fetch(`${WALRUS_URL}/v1/strategies`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch strategies');
      }

      const strategies = await response.json();
      return strategies;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a specific strategy
  const getStrategy = async (id: string): Promise<Strategy> => {
    try {
      setLoading(true);
      const response = await fetch(`${WALRUS_URL}/v1/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch strategy');
      }

      const strategy = await response.json();
      return strategy;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a strategy
  const deleteStrategy = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${WALRUS_URL}/v1/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete strategy');
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    storeStrategy,
    getStrategies,
    getStrategy,
    deleteStrategy,
  };
};