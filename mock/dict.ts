export default {
  '/versions/fusion': ['versions1', 'versions2', 'versions3'],

  '/metrics/fusion': [1, 2, 3, 4, 5],

  '/cases/fusion': [6, 7, 8, 9, 10],

  '/calculate/fusion': [11, 12, 13, 14],

  'POST /send': {
    versions: [
      'versions1',
      'versions2',
      'versions3',
      'versions1',
      'versions2',
      'versions3',
      'versions1',
      'versions2',
      'versions3',
      'versions1',
      'versions2',
      'versions3',
      'versions2',
      'versions3',
      'versions1',
      'versions2',
      'versions3',
    ],
    metrics: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
    cases: [6, 7, 8, 9, 10, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10],
    calculate: [11, 12, 13, 14, 11, 12, 13, 14, 11, 12, 13, 14, 11, 12, 13, 14],
  },

  '/table': [
    {
      predictable: null,
      version: 'version1',
      reason: 'reason1',
    },
    {
      predictable: true,
      version: 'version2',
      reason: 'reason3',
    },
    {
      predictable: false,
      version: 'version3',
      reason: 'reason3',
    },
  ],

  'POST /setStatus': {
    code: 1,
  },
};
