export interface IUpdateUserAccessTokenRepository {
  update (id: number, token: string): Promise<void>
}
