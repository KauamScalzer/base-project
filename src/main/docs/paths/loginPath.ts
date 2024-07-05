export const loginPath = {
  post: {
    tags: ['User'],
    summary: 'API para autenticar usuário',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/loginParamsSchema' } } } },
    responses: {
      200: {
        description: 'Sucesso',
        content: { 'application/json': { schema: { $ref: '#/schemas/userSchema' } } }
      },
      400: { $ref: '#/components/badRequestComponent' },
      401: { $ref: '#/components/unauthorizedComponent' },
      404: { $ref: '#/components/notFoundComponent' },
      500: { $ref: '#/components/serverErrorComponent' }
    }
  }
}
