export const emulateDelay = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
