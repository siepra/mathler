import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TileProps } from '../components/Tile';
import { useFetchPuzzle } from '../hooks/useFetchPuzzle';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';

const Game: React.FC = () => {
  const puzzle = useFetchPuzzle();

  const [board, setBoard] = useState<TileProps[]>([]);

  const [pendingTiles, setPendingTiles] = useState<TileProps[]>([]);

  const submitPendingTiles = useCallback(() => {
    if (pendingTiles.length !== 6) {
      console.error('Error: You must enter 6 characters.');
      return;
    }

    const equationChars = puzzle.equation.split('');
    const equationCharsSet = new Set(equationChars);

    const newTiles = pendingTiles.map((tile, index) => {
      if (tile.character === equationChars[index]) {
        return { ...tile, backgroundColor: 'green' };
      } else if (equationCharsSet.has(tile.character)) {
        return { ...tile, backgroundColor: 'yellow' };
      } else {
        return { ...tile, backgroundColor: 'grey' };
      }
    });

    setBoard([...board, ...newTiles]);
    setPendingTiles([]);
  }, [board, pendingTiles, puzzle]);

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
  }, [submitPendingTiles, removeLastPendingTile, addPendingTile]);

  return (
    <View style={styles.game}>
      <Board tiles={[...board, ...pendingTiles]} />
      <Keyboard handleKeyPress={handleKeyPress} />
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