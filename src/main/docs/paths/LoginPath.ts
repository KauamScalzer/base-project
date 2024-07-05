export const LoginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar usuário',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/loginParamsSchema' } } } },
    responses: {
      200: {
        description: 'Sucesso',
        content: { 'application/json': { schema: { $ref: '#/schemas/userSchema' } } }
      }
    }
  }
}
