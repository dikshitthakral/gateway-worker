import { setAsyncTimeout } from '../common.utils';

describe('Common Utils', () => {
    describe('setAsyncTimeout', () => {
        it('should successfuly wait async', async () => {
            // When
            const result = await setAsyncTimeout(200);
            // Then
            expect(result).toBeUndefined();
        })
    })
})