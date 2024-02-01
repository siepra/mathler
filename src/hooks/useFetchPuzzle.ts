import { useState, useEffect } from 'react';

interface Puzzle {
  value: number;
  equation: string[];
}

export function useFetchPuzzle(): { puzzle: Puzzle, loading: boolean, error: any } {
  const [puzzle, setPuzle] = useState<Puzzle>({ value: 0, equation: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      // Mock the fetched puzzle
      const fetchedData: Puzzle = {
        value: 108,
        equation: ['2', '3', '*', '5', '-', '7'],
      };
      setPuzle(fetchedData);
    } catch (err: any) {
      setError(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { puzzle, loading, error };
}
