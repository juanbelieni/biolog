import airtable from '../configs/airtable';

export interface Butterfly {
  id: string;
  name: string;
  popularName: string;
  family: string;
  description: string;
  image: string;
}

export async function getAllButterflies() {
  const records = await airtable('Borboletas')
    .select({
      view: 'Grid view',
    })
    .all();

  const butterflies: Butterfly[] = records.map(({ id, fields }) => ({
    id,
    name: fields['Nome Científico'],
    popularName: fields['Nome Popular'],
    family: fields['Família'],
    description: fields['Descrição'],
    image: fields['Foto'][0].url,
  }));

  return butterflies;
}
