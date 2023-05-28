/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebsiteKeywordCorpusRead = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    created_on: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    updated_on: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    rawtext: {
      type: 'string',
      isRequired: true,
    },
    corpus: {
      type: 'string',
      isRequired: true,
    },
    website_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
    page_id: {
      type: 'string',
      isRequired: true,
      format: 'uuid4',
    },
  },
} as const;
