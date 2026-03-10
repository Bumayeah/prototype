export async function parseJson<T>(request: Request): Promise<T> {
  const text = request.body ? await request.text() : '{}'
  return JSON.parse(text) as T
}
