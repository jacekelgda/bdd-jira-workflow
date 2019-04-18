import { defineFeature, loadFeature } from 'jest-cucumber'

const feature = loadFeature('./features/test-new.feature')

defineFeature(feature, test => {
    test('Test', ({ given, then }) => {
        let flag = false
        given('something is true', () => {
            flag = true
        });

        then('it should be true', () => {
            expect(flag).toBe(true)
        });
    });
})
