import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TileProps } from '../components/Tile';
import { useFetchPuzzle } from '../hooks/useFetchPuzzle';
import Header from '../components/Header';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';

const Game: React.FC = () => {
  const puzzle = useFetchPuzzle();

  const [board, setBoard] = useState<TileProps[]>([]);
  const [pendingTiles, setPendingTiles] = useState<TileProps[]>([]);

  const [isSolved, setIsSolved] = useState(false);

  const getTileColor = useCallback((tile: TileProps, index: number) => {
    const equationChars = puzzle.equation.split('');
    const equationCharsSet = new Set(equationChars);

    if (tile.character === equationChars[index]) {
      // Character is exactly at the right place
      return 'green';
    } else if (equationCharsSet.has(tile.character)) {
      // Character is in the equation but not at the right place
      return 'yellow';
    } else {
      return 'grey';
    }
  }, [puzzle]);

  const submitPendingTiles = useCallback(() => {
    if (pendingTiles.length !== 6) {
      console.error('Error: You must enter 6 characters.');
      return;
    }

    const newTiles = pendingTiles.map((tile, index) => {
      const color = getTileColor(tile, index);
      return { ...tile, backgroundColor: color };
    });

    const allGreen = newTiles.every(tile => tile.backgroundColor === 'green');
    if (allGreen) {
      setIsSolved(true);
    }

    setBoard([...board, ...newTiles]);
    setPendingTiles([]);
  }, [getTileColor, pendingTiles, board]);

  const removeLastPendingTile = useCallback(() => {
    setPendingTiles(pendingTiles.slice(0, -1));
  }, [pendingTiles]);

  const addPendingTile = useCallback((key: string) => {
    if (pendingTiles.length < 6) {
      const pendingTile: TileProps = {
        character: key,
        backgroundColor: 'white',
      };
      setPendingTiles([...pendingTiles, pendingTile]);
    }
  }, [pendingTiles]);

  const handleKeyPress = useCallback((key: string) => {
    if (isSolved) {
      console.log('Puzzle is already solved.');
      return;
    }

    console.log(`Key pressed: ${key}`);

    switch (key) {
      case 'Enter':
        submitPendingTiles();
        break;
      case 'Delete':
        removeLastPendingTile();
        break;
      default:
        addPendingTile(key);
        break;
    }
  }, [submitPendingTiles, removeLastPendingTile, addPendingTile, isSolved]);

  return (
    <View style={styles.game}>
      <Header puzzle={puzzle.value} />
      <Board tiles={[...board, ...pendingTiles]} />
      <Keyboard handleKeyPress={handleKeyPress} isSolved={isSolved}/>
    </View>
  );
};

const styles = StyleSheet.create({
  game: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Game;