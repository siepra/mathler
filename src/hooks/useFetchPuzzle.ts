import { useState, useEffect } from 'react';

interface Puzzle {
  value: number;
  equation: string;
}

export function useFetchPuzzle(): Puzzle {
  const [data, setData] = useState<Puzzle>({ value: 0, equation: '' });

  useEffect(() => {
    // Mock the fetched puzzle
    const fetchedData: Puzzle = {
      value: 108,
      equation: '23*5-7',
    };

    setData(fetchedData);
  }, []);

  return data;
}
