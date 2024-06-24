export interface IHasher {
  hash (stringToHash: string): Promise<string>
}
