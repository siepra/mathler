import { arraysContainSameElements } from "../src/utils/functions/arraysContainSameElements";

describe('arraysContainSameElements', () => {
    it('should return true for two identical arrays', () => {
        const arr1 = ['a', 'b', 'c'];
        const arr2 = ['a', 'b', 'c'];
        expect(arraysContainSameElements(arr1, arr2)).toBe(true);
    });

    it('should return true for two arrays with the same elements in different orders', () => {
        const arr1 = ['a', 'b', 'c'];
        const arr2 = ['c', 'a', 'b'];
        expect(arraysContainSameElements(arr1, arr2)).toBe(true);
    });

    it('should return false for two arrays with different elements', () => {
        const arr1 = ['a', 'b', 'c'];
        const arr2 = ['d', 'e', 'f'];
        expect(arraysContainSameElements(arr1, arr2)).toBe(false);
    });

    it('should return false for two arrays with the same elements but different counts', () => {
        const arr1 = ['a', 'b', 'b'];
        const arr2 = ['a', 'b', 'c'];
        expect(arraysContainSameElements(arr1, arr2)).toBe(false);
    });
});
