import { v4 as uuidv4 } from "uuid";
import { UUID } from "./types";

export function getUUID(): UUID {
  return uuidv4() as UUID;
}
