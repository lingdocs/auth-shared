import { TimeStamp } from "./types";

export function getTimestamp(): TimeStamp {
  return Date.now() as TimeStamp;
}
