import { defineFeature, loadFeature } from 'jest-cucumber'

const feature = loadFeature('./features/test.feature')

defineFeature(feature, test => {
    test('Test', ({ given, then }) => {
        let flag = false
        given('true', () => {
            flag = true            
        });

        then('false', () => {
            expect(flag).toBe(true)
        });
    });
})
