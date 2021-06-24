import { InvoiceItem } from "./invoice-item.interface";

export interface Invoice {
  id: number,
  referenceNumber: string,
  createdTime: Date,
  items: InvoiceItem[]
}
