// Future we can extend the same with redis or other cache for scaling out with multi nodes
const cache = new Map();

export const setCache = (key: string, value: string) => {
    cache.set(key, value);
    return;
}

export const getCache = (key: string) => {
    if (cache.has(key)) {
        return cache.get(key);
    }
    return null;
}

export const deleteCache = (key: string) => {
    cache.delete(key);
    return;
}
