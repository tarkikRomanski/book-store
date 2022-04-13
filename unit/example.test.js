function sum(a, b) {
    return a + b;
}

describe('sum function tests: ', () => {
    test('adds 1 + n to equal (1 + n)', () => {
        const numbers = [2, 4, 6, 8, 10]

        for (const item of numbers) {
            expect(sum(1, item)).toBe(1 + item)
        }
    })

    test('adds prev numbers with next', () => {
        for (let i = 1; i < 1000; i++) {
            expect(sum(i, i + 1)).toBe(i + i + 1)
        }
    })
})
