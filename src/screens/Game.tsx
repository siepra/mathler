import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TileProps } from '../components/Tile';
import { useFetchPuzzle } from '../hooks/useFetchPuzzle';
import Header from '../components/Header';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';
import { arraysContainSameElements } from '../utils/functions/arraysContainSameElements';
import { evaluate } from 'mathjs';

const Game: React.FC = () => {
  const puzzle = useFetchPuzzle();

  const [board, setBoard] = useState<TileProps[]>([]);
  const [pendingSolution, setPendingSolution] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  const compareEquasions = useCallback((): boolean => {
    const hasSameCharacters = arraysContainSameElements(pendingSolution, puzzle.equation);
    const pendingEquation = pendingSolution.join('');
    return hasSameCharacters && evaluate(pendingEquation) === puzzle.value
  }, [pendingSolution, puzzle]);

  const getTileColor = useCallback((character: string, index: number) => {
    const equationSet = new Set(puzzle.equation);

    if (character === puzzle.equation[index]) {
      // Character is exactly at the right place
      return 'green';
    } else if (equationSet.has(character)) {
      // Character is in the equation but not at the right place
      return 'yellow';
    } else {
      return 'grey';
    }
  }, [puzzle]);

  const submitPendingTiles = useCallback(() => {
    if (pendingSolution.length !== 6) {
      console.error('Error: You must enter 6 characters.');
      return;
    }

    let solution = compareEquasions() ? puzzle.equation : pendingSolution

    if (solution == puzzle.equation) {
      setIsSolved(true);
    }

    const newTiles = solution.map((character, index) => {
      const color = getTileColor(character, index);
      return { character: character, backgroundColor: color };
    });

    setBoard([...board, ...newTiles]);
    setPendingSolution([]);
  }, [compareEquasions, getTileColor, pendingSolution, board]);

  const removeLastPendingCharacter = useCallback(() => {
    setPendingSolution(pendingSolution.slice(0, -1));
  }, [pendingSolution]);

  const addPendingCharacter = useCallback((key: string) => {
    if (pendingSolution.length < 6) {
      setPendingSolution([...pendingSolution, key]);
    }
  }, [pendingSolution]);

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
        removeLastPendingCharacter();
        break;
      default:
        addPendingCharacter(key);
        break;
    }
  }, [submitPendingTiles, removeLastPendingCharacter, addPendingCharacter, isSolved]);

  return (
    <View style={styles.game}>
      <Header puzzle={puzzle.value} />
      <Board tiles={[...board, ...pendingSolution.map(character => ({ character, backgroundColor: 'white' }))]} />
      <Keyboard handleKeyPress={handleKeyPress} isSolved={isSolved} />
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