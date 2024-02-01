import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export interface TileProps {
  character: string;
  backgroundColor: string;
  tileIndex?: string;
}

const Tile: React.FC<TileProps> = React.memo(
  ({character, backgroundColor, tileIndex}) => (
    <View style={[styles.tile, {backgroundColor}]} testID={tileIndex}>
      <Text>{character}</Text>
    </View>
  ),
);

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Tile;
