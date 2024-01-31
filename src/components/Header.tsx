import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
    puzzle: number;
}

const Header: React.FC<HeaderProps> = React.memo(({ puzzle }) => {
    return (
        <View style={styles.header}>
            <Text>Find the hidden calculation that equals {puzzle}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 20,
    },
});

export default Header;
