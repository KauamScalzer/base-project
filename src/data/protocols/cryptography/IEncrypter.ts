export interface IEncrypter {
  encrypt (string: string): Promise<string>
}
