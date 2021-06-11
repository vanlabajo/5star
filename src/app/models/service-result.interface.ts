import { Dictionary } from "./dictionary.interface";

export interface ServiceResult {
  success: boolean,
  id?: number,
  validationErrors: Dictionary<string>
}
