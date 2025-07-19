export async function handler(event) {
  return {
    statusCode: 200,
    body: JSON.stringnify({
      hello: 'Deu boa, vamos criar conta'
    }),
  }
};
