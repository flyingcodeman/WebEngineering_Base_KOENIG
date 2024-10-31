import { describe, it, expect } from 'vitest';
import { extractBears } from '../dataProcessor';

describe('extractBears', () => {
  it('should correctly extract bear data from wikitext', async () => {
    const sampleWikitext = `
      {{Species table/row
      |name=[[Polar Bear]]
      |binomial=Ursus maritimus
      |image=polar_bear.jpg
      |range=[[Arctic Circle]]
      }}
      {{Species table/end}}
    `;

    const expectedBears = [
      {
        name: 'Polar Bear',
        binomial: 'Ursus maritimus',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/3/35/Polar_bear.jpg',
        range: 'Arctic Circle',
      },
    ];

    const bears = await extractBears(sampleWikitext);

    expect(bears).toEqual(expectedBears);
  });

  it('should handle empty wikitext gracefully', async () => {
    const emptyWikitext = '';

    const bears = await extractBears(emptyWikitext);

    expect(bears).toEqual([]);
  });
});
