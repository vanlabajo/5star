export interface Product {
  id: number,
  name: string,
  upc: string
  price: number,
  cost: number,
  quantity: number,
  lastUpdateTimeUtc?: Date,
  lastUpdatedBy?: string,
  createdTimeUtc?: Date,
  createdBy?: string,
  timestamp?: number[]
}
