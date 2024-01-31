import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TileProps {
  character: string;
  backgroundColor: string;
}

const Tile: React.FC<TileProps> = React.memo(({ character, backgroundColor }) => (
  <View style={[styles.tile, { backgroundColor }]}>
    <Text>{character}</Text>
  </View>
));

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