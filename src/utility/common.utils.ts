export const setAsyncTimeout = async (time?: number) => {
    await new Promise(resolve => setTimeout(resolve, time || 3000));
}