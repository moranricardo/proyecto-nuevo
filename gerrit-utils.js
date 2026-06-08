export async function parseGerritResponse(response) {
  const rawData = await response.text();
  const cleanData = rawData.replace(/^\)\]\}'\n/, '');
  return JSON.parse(cleanData);
}
