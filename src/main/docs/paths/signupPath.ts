export const signupPath = {
  post: {
    tags: ['User'],
    summary: 'API para cadastrar usuário',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/signupParamsSchema' } } } },
    responses: {
      200: {
        description: 'Ok',
        content: { 'application/json': { schema: { $ref: '#/schemas/userSchema' } } }
      },
      400: { $ref: '#/components/badRequestComponent' },
      401: { $ref: '#/components/unauthorizedComponent' },
      404: { $ref: '#/components/notFoundComponent' },
      409: { $ref: '#/components/notFoundComponent' },
      500: { $ref: '#/components/serverErrorComponent' }
    }
  }
}
