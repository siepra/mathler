import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tile, { TileProps } from './Tile';

interface RowProps {
  tiles: TileProps[];
  rowIndex: number;
}

const Row: React.FC<RowProps> = React.memo(({ tiles, rowIndex }) => (
  <View key={rowIndex} style={styles.row}>
    {tiles.map((tileProps, colIndex) => (
      <Tile key={`${rowIndex}-${colIndex}`} {...tileProps} />
    ))}
  </View>
));

interface BoardProps {
  tiles: TileProps[];
}

const Board: React.FC<BoardProps> = ({ tiles }) => {
  const blankTile: TileProps = { character: '', backgroundColor: 'white' };

  const blankTilesCount = 36 - tiles.length;
  const blankTiles = Array(blankTilesCount).fill(blankTile);
  
  const allTiles = [...tiles, ...blankTiles];

  const boardTiles = Array.from({ length: 6 }, (_, rowIndex) => {
    const rowTiles = allTiles.slice(rowIndex * 6, (rowIndex + 1) * 6);
    return <Row key={rowIndex} rowIndex={rowIndex} tiles={rowTiles} />;
  });

  return <View style={styles.board}>{boardTiles}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  board: {
    flexDirection: 'column',
  },
});

export default Board;