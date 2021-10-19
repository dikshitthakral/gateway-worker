jest.mock('../logger');

const garbageCollector = require('expose-gc/function');

afterEach(() => {
    expect.hasAssertions();
});

afterAll(() => {
    try {
        garbageCollector();
    } catch { }
});