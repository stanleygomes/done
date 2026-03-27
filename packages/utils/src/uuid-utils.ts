import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export function isUUID(id: string): boolean {
  return uuidValidate(id);
}

export function generateUUID(): string {
  return uuidv4();
}
