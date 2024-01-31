import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface KeyProps {
  character: string;
  onPress: (char: string) => void;
}

const Key: React.FC<KeyProps> = React.memo(({ character, onPress }) => (
  <View style={styles.key}>
    <Button title={character} onPress={() => onPress(character)} />
  </View>
));

interface KeyboardProps {
    handleKeyPress: (char: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ handleKeyPress }) => {
  const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '+', '-', 'Enter', 'Delete'];

  const keyComponents = keys.map((key, index) => <Key key={index} character={key} onPress={handleKeyPress} />);

  return <View style={styles.keyboard}>{keyComponents}</View>;
};

const styles = StyleSheet.create({
  key: {
    margin: 5,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Keyboard;