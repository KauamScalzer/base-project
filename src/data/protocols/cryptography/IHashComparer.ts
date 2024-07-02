export interface IHashComparer {
  compare (compareString: string, hashedString: string): Promise<boolean>
}
