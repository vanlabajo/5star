import { AuditLog } from "../models/audit-log.interface";

export interface Product {
  id: number,
  name: string,
  upc: string
  price: number,
  cost: number,
  quantity: number,
  auditLog: AuditLog,
  timeStamp?: number[]
}
