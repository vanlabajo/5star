export interface PagedQuery {
  searchTerm: string,
  pageInfo: PageInfo
}

export interface PageInfo {
  page: number,
  pageSize: number
}
