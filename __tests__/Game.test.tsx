import '@testing-library/react-native/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react-native';
import * as hooks from '../src/hooks/useFetchPuzzle';
import Game from '../src/screens/Game';

describe('Game', () => {

    beforeAll(() => {
        jest.spyOn(hooks, 'useFetchPuzzle').mockReturnValue({
            puzzle: {
                value: 108,
                equation: ['2', '3', '*', '5', '-', '7']
            },
            loading: false,
            error: null
        });
    })

    test('Tiles gets proper colors assigned', () => {
        render(<Game />);

        fireEvent.press(screen.getByTestId('key-2'));
        fireEvent.press(screen.getByTestId('key-5'));
        fireEvent.press(screen.getByTestId('key-*'));
        fireEvent.press(screen.getByTestId('key-4'));
        fireEvent.press(screen.getByTestId('key--'));
        fireEvent.press(screen.getByTestId('key-7'));
        fireEvent.press(screen.getByTestId('key-Enter'));

        expect(screen.getByTestId('0-0')).toHaveStyle({ backgroundColor: 'green' });    // 2
        expect(screen.getByTestId('0-1')).toHaveStyle({ backgroundColor: 'yellow' });   // 5
        expect(screen.getByTestId('0-2')).toHaveStyle({ backgroundColor: 'green' });    // *
        expect(screen.getByTestId('0-3')).toHaveStyle({ backgroundColor: 'grey' });     // 4
        expect(screen.getByTestId('0-4')).toHaveStyle({ backgroundColor: 'green' });    // -
        expect(screen.getByTestId('0-5')).toHaveStyle({ backgroundColor: 'green' });    // 7
    });

    test('Winning the game disables keyboard', () => {
        render(<Game />);

        fireEvent.press(screen.getByTestId('key-2'));
        fireEvent.press(screen.getByTestId('key-3'));
        fireEvent.press(screen.getByTestId('key-*'));
        fireEvent.press(screen.getByTestId('key-5'));
        fireEvent.press(screen.getByTestId('key--'));
        fireEvent.press(screen.getByTestId('key-7'));
        fireEvent.press(screen.getByTestId('key-Enter'));

        expect(screen.getByTestId('key-2')).toBeDisabled();
    })

    test('Commutative solutions are automatically rearanged', () => {
        render(<Game />);

        fireEvent.press(screen.getByTestId('key-5'));
        fireEvent.press(screen.getByTestId('key-*'));
        fireEvent.press(screen.getByTestId('key-2'));
        fireEvent.press(screen.getByTestId('key-3'));
        fireEvent.press(screen.getByTestId('key--'));
        fireEvent.press(screen.getByTestId('key-7'));
        fireEvent.press(screen.getByTestId('key-Enter'));

        expect(screen.getByTestId('0-0')).toHaveTextContent('2');
        expect(screen.getByTestId('0-1')).toHaveTextContent('3');
        expect(screen.getByTestId('0-2')).toHaveTextContent('*');
        expect(screen.getByTestId('0-3')).toHaveTextContent('5');
        expect(screen.getByTestId('0-4')).toHaveTextContent('-');
        expect(screen.getByTestId('0-5')).toHaveTextContent('7');
    })
});
