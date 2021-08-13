export interface SubjectStrategy {
  exec: (params: any[]) => any
  fn: () => any
}
