import { Logger } from "./logger";

export const tryCatch = (fn: Function, ...args: any[]) => {
  try {
    return fn(...args);
  } catch (err) {
    Logger.log(err as string, "error");
  }
};
