import React from 'react';
import {View, StyleSheet} from 'react-native';
import Tile, {TileProps} from './Tile';

interface RowProps {
  tiles: TileProps[];
  rowIndex: number;
}

const Row: React.FC<RowProps> = React.memo(({tiles, rowIndex}) => (
  <View key={rowIndex} style={styles.row}>
    {tiles.map((tileProps, colIndex) => {
      const tileIndex = `${rowIndex}-${colIndex}`;
      return <Tile key={tileIndex} tileIndex={tileIndex} {...tileProps} />;
    })}
  </View>
));

const blankTile: TileProps = {character: '', backgroundColor: 'white'};

interface BoardProps {
  tiles: TileProps[];
}

const Board: React.FC<BoardProps> = ({tiles}) => {
  const boardTiles = React.useMemo(() => {
    const blankTilesCount = 36 - tiles.length;
    const blankTiles = Array(blankTilesCount).fill(blankTile);

    const allTiles = [...tiles, ...blankTiles];

    return Array.from({length: 6}, (_, rowIndex) => {
      const rowTiles = allTiles.slice(rowIndex * 6, (rowIndex + 1) * 6);
      return <Row key={rowIndex} rowIndex={rowIndex} tiles={rowTiles} />;
    });
  }, [tiles]);

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
