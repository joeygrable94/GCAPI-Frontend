export const $BdxFeedCreate = {
  properties: {
    username: {
      type: 'string',
      title: 'Username'
    },
    password: {
      type: 'string',
      title: 'Password'
    },
    serverhost: {
      type: 'string',
      title: 'Serverhost'
    },
    xml_file_key: {
      type: 'string',
      title: 'Xml File Key'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['username', 'password', 'serverhost', 'xml_file_key', 'client_id'],
  title: 'BdxFeedCreate'
} as const;

export const $BdxFeedRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    username: {
      type: 'string',
      title: 'Username'
    },
    password: {
      type: 'string',
      title: 'Password'
    },
    serverhost: {
      type: 'string',
      title: 'Serverhost'
    },
    xml_file_key: {
      type: 'string',
      title: 'Xml File Key'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'username',
    'password',
    'serverhost',
    'xml_file_key',
    'client_id'
  ],
  title: 'BdxFeedRead'
} as const;

export const $BdxFeedUpdate = {
  properties: {
    username: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Username'
    },
    password: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Password'
    },
    serverhost: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Serverhost'
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Client Id'
    }
  },
  type: 'object',
  title: 'BdxFeedUpdate'
} as const;

export const $ClientCreate = {
  properties: {
    slug: {
      type: 'string',
      title: 'Slug'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    }
  },
  type: 'object',
  required: ['slug', 'title'],
  title: 'ClientCreate'
} as const;

export const $ClientDelete = {
  properties: {
    message: {
      type: 'string',
      title: 'Message'
    },
    user_id: {
      type: 'string',
      format: 'uuid4',
      title: 'User Id'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    },
    task_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'string'
        },
        {},
        {
          type: 'null'
        }
      ],
      title: 'Task Id'
    }
  },
  type: 'object',
  required: ['message', 'user_id', 'client_id'],
  title: 'ClientDelete'
} as const;

export const $ClientRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    slug: {
      type: 'string',
      title: 'Slug'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'slug', 'title'],
  title: 'ClientRead'
} as const;

export const $ClientReportCreate = {
  properties: {
    title: {
      type: 'string',
      title: 'Title'
    },
    url: {
      type: 'string',
      title: 'Url'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    keys: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Keys'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['title', 'url', 'client_id'],
  title: 'ClientReportCreate'
} as const;

export const $ClientReportRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    url: {
      type: 'string',
      title: 'Url'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    keys: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Keys'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'title', 'url', 'client_id'],
  title: 'ClientReportRead'
} as const;

export const $ClientReportUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    url: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Url'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    keys: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Keys'
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Client Id'
    },
    created: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time'
        },
        {
          type: 'null'
        }
      ],
      title: 'Created'
    }
  },
  type: 'object',
  title: 'ClientReportUpdate'
} as const;

export const $ClientUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active'
    }
  },
  type: 'object',
  title: 'ClientUpdate'
} as const;

export const $ClientWebsiteCreate = {
  properties: {
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['client_id', 'website_id'],
  title: 'ClientWebsiteCreate'
} as const;

export const $ClientWebsiteRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'client_id', 'website_id'],
  title: 'ClientWebsiteRead'
} as const;

export const $CsrfToken = {
  properties: {
    csrf_token: {
      type: 'string',
      title: 'Csrf Token'
    }
  },
  type: 'object',
  required: ['csrf_token'],
  title: 'CsrfToken'
} as const;

export const $EncryptedMessage = {
  properties: {
    message: {
      type: 'string',
      title: 'Message'
    }
  },
  type: 'object',
  required: ['message'],
  title: 'EncryptedMessage'
} as const;

export const $ErrorModel = {
  properties: {
    detail: {
      anyOf: [
        {
          type: 'string'
        },
        {
          additionalProperties: {
            type: 'string'
          },
          type: 'object'
        }
      ],
      title: 'Detail'
    }
  },
  type: 'object',
  required: ['detail'],
  title: 'ErrorModel'
} as const;

export const $GoAnalytics4PropertyCreate = {
  properties: {
    title: {
      type: 'string',
      title: 'Title'
    },
    measurement_id: {
      type: 'string',
      title: 'Measurement Id'
    },
    property_id: {
      type: 'string',
      title: 'Property Id'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['title', 'measurement_id', 'property_id', 'client_id'],
  title: 'GoAnalytics4PropertyCreate'
} as const;

export const $GoAnalytics4PropertyRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    measurement_id: {
      type: 'string',
      title: 'Measurement Id'
    },
    property_id: {
      type: 'string',
      title: 'Property Id'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'title',
    'measurement_id',
    'property_id',
    'client_id'
  ],
  title: 'GoAnalytics4PropertyRead'
} as const;

export const $GoAnalytics4PropertyUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Client Id'
    }
  },
  type: 'object',
  title: 'GoAnalytics4PropertyUpdate'
} as const;

export const $GoAnalytics4StreamCreate = {
  properties: {
    title: {
      type: 'string',
      title: 'Title'
    },
    stream_id: {
      type: 'string',
      title: 'Stream Id'
    },
    ga4_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Ga4 Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['title', 'stream_id', 'ga4_id', 'website_id'],
  title: 'GoAnalytics4StreamCreate'
} as const;

export const $GoAnalytics4StreamRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    stream_id: {
      type: 'string',
      title: 'Stream Id'
    },
    ga4_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Ga4 Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'title', 'stream_id', 'ga4_id', 'website_id'],
  title: 'GoAnalytics4StreamRead'
} as const;

export const $GoAnalytics4StreamUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    website_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Website Id'
    }
  },
  type: 'object',
  title: 'GoAnalytics4StreamUpdate'
} as const;

export const $GoCloudPropertyCreate = {
  properties: {
    project_name: {
      type: 'string',
      title: 'Project Name'
    },
    project_id: {
      type: 'string',
      title: 'Project Id'
    },
    project_number: {
      type: 'string',
      title: 'Project Number'
    },
    service_account: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Service Account'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['project_name', 'project_id', 'project_number', 'client_id'],
  title: 'GoCloudPropertyCreate'
} as const;

export const $GoCloudPropertyRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    project_name: {
      type: 'string',
      title: 'Project Name'
    },
    project_id: {
      type: 'string',
      title: 'Project Id'
    },
    project_number: {
      type: 'string',
      title: 'Project Number'
    },
    service_account: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Service Account'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'project_name',
    'project_id',
    'project_number',
    'client_id'
  ],
  title: 'GoCloudPropertyRead'
} as const;

export const $GoCloudPropertyUpdate = {
  properties: {
    project_name: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Project Name'
    },
    service_account: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Service Account'
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Client Id'
    }
  },
  type: 'object',
  title: 'GoCloudPropertyUpdate'
} as const;

export const $GoSearchConsoleMetricCreate = {
  properties: {
    title: {
      type: 'string',
      title: 'Title'
    },
    keys: {
      type: 'string',
      title: 'Keys'
    },
    clicks: {
      type: 'integer',
      title: 'Clicks'
    },
    impressions: {
      type: 'integer',
      title: 'Impressions'
    },
    ctr: {
      type: 'number',
      title: 'Ctr'
    },
    position: {
      type: 'number',
      title: 'Position'
    },
    date_start: {
      type: 'string',
      format: 'date-time',
      title: 'Date Start'
    },
    date_end: {
      type: 'string',
      format: 'date-time',
      title: 'Date End'
    },
    gsc_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Gsc Id'
    }
  },
  type: 'object',
  required: [
    'title',
    'keys',
    'clicks',
    'impressions',
    'ctr',
    'position',
    'date_start',
    'date_end',
    'gsc_id'
  ],
  title: 'GoSearchConsoleMetricCreate'
} as const;

export const $GoSearchConsoleMetricPages = {
  properties: {
    searchappearance: {
      anyOf: [
        {
          $ref: '#/components/schemas/Paginated_GoSearchConsoleMetricRead_'
        },
        {
          type: 'null'
        }
      ]
    },
    query: {
      anyOf: [
        {
          $ref: '#/components/schemas/Paginated_GoSearchConsoleMetricRead_'
        },
        {
          type: 'null'
        }
      ]
    },
    page: {
      anyOf: [
        {
          $ref: '#/components/schemas/Paginated_GoSearchConsoleMetricRead_'
        },
        {
          type: 'null'
        }
      ]
    },
    device: {
      anyOf: [
        {
          $ref: '#/components/schemas/Paginated_GoSearchConsoleMetricRead_'
        },
        {
          type: 'null'
        }
      ]
    },
    country: {
      anyOf: [
        {
          $ref: '#/components/schemas/Paginated_GoSearchConsoleMetricRead_'
        },
        {
          type: 'null'
        }
      ]
    }
  },
  type: 'object',
  title: 'GoSearchConsoleMetricPages'
} as const;

export const $GoSearchConsoleMetricRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    keys: {
      type: 'string',
      title: 'Keys'
    },
    clicks: {
      type: 'integer',
      title: 'Clicks'
    },
    impressions: {
      type: 'integer',
      title: 'Impressions'
    },
    ctr: {
      type: 'number',
      title: 'Ctr'
    },
    position: {
      type: 'number',
      title: 'Position'
    },
    date_start: {
      type: 'string',
      format: 'date-time',
      title: 'Date Start'
    },
    date_end: {
      type: 'string',
      format: 'date-time',
      title: 'Date End'
    },
    gsc_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Gsc Id'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'title',
    'keys',
    'clicks',
    'impressions',
    'ctr',
    'position',
    'date_start',
    'date_end',
    'gsc_id'
  ],
  title: 'GoSearchConsoleMetricRead'
} as const;

export const $GoSearchConsoleMetricType = {
  type: 'string',
  enum: ['searchappearance', 'query', 'page', 'device', 'country'],
  title: 'GoSearchConsoleMetricType'
} as const;

export const $GoSearchConsoleMetricUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    keys: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Keys'
    },
    clicks: {
      anyOf: [
        {
          type: 'integer'
        },
        {
          type: 'null'
        }
      ],
      title: 'Clicks'
    },
    impressions: {
      anyOf: [
        {
          type: 'integer'
        },
        {
          type: 'null'
        }
      ],
      title: 'Impressions'
    },
    ctr: {
      anyOf: [
        {
          type: 'number'
        },
        {
          type: 'null'
        }
      ],
      title: 'Ctr'
    },
    position: {
      anyOf: [
        {
          type: 'number'
        },
        {
          type: 'null'
        }
      ],
      title: 'Position'
    },
    date_start: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time'
        },
        {
          type: 'null'
        }
      ],
      title: 'Date Start'
    },
    date_end: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time'
        },
        {
          type: 'null'
        }
      ],
      title: 'Date End'
    }
  },
  type: 'object',
  title: 'GoSearchConsoleMetricUpdate'
} as const;

export const $GoSearchConsolePropertyCreate = {
  properties: {
    title: {
      type: 'string',
      title: 'Title'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['title', 'client_id', 'website_id'],
  title: 'GoSearchConsolePropertyCreate'
} as const;

export const $GoSearchConsolePropertyRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'title', 'client_id', 'website_id'],
  title: 'GoSearchConsolePropertyRead'
} as const;

export const $GoSearchConsolePropertyUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Client Id'
    },
    website_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Website Id'
    }
  },
  type: 'object',
  title: 'GoSearchConsolePropertyUpdate'
} as const;

export const $HTTPValidationError = {
  properties: {
    detail: {
      items: {
        $ref: '#/components/schemas/ValidationError'
      },
      type: 'array',
      title: 'Detail'
    }
  },
  type: 'object',
  title: 'HTTPValidationError'
} as const;

export const $NoteCreate = {
  properties: {
    title: {
      type: 'string',
      title: 'Title'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    },
    user_id: {
      type: 'string',
      format: 'uuid4',
      title: 'User Id'
    }
  },
  type: 'object',
  required: ['title', 'user_id'],
  title: 'NoteCreate'
} as const;

export const $NoteRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    title: {
      type: 'string',
      title: 'Title'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    },
    user_id: {
      type: 'string',
      format: 'uuid4',
      title: 'User Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'title', 'user_id'],
  title: 'NoteRead'
} as const;

export const $NoteUpdate = {
  properties: {
    title: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Title'
    },
    description: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Description'
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active'
    }
  },
  type: 'object',
  title: 'NoteUpdate'
} as const;

export const $Paginated_BdxFeedRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/BdxFeedRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[BdxFeedRead]'
} as const;

export const $Paginated_ClientRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/ClientRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[ClientRead]'
} as const;

export const $Paginated_ClientReportRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/ClientReportRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[ClientReportRead]'
} as const;

export const $Paginated_GoAnalytics4PropertyRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/GoAnalytics4PropertyRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[GoAnalytics4PropertyRead]'
} as const;

export const $Paginated_GoAnalytics4StreamRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/GoAnalytics4StreamRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[GoAnalytics4StreamRead]'
} as const;

export const $Paginated_GoCloudPropertyRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/GoCloudPropertyRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[GoCloudPropertyRead]'
} as const;

export const $Paginated_GoSearchConsoleMetricRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/GoSearchConsoleMetricRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[GoSearchConsoleMetricRead]'
} as const;

export const $Paginated_GoSearchConsolePropertyRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/GoSearchConsolePropertyRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[GoSearchConsolePropertyRead]'
} as const;

export const $Paginated_NoteRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/NoteRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[NoteRead]'
} as const;

export const $Paginated_SharpspringRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/SharpspringRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[SharpspringRead]'
} as const;

export const $Paginated_UserReadAsAdmin_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/UserReadAsAdmin'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[UserReadAsAdmin]'
} as const;

export const $Paginated_UserReadAsManager_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/UserReadAsManager'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[UserReadAsManager]'
} as const;

export const $Paginated_WebsiteKeywordCorpusRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/WebsiteKeywordCorpusRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[WebsiteKeywordCorpusRead]'
} as const;

export const $Paginated_WebsiteMapRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/WebsiteMapRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[WebsiteMapRead]'
} as const;

export const $Paginated_WebsitePageRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/WebsitePageRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[WebsitePageRead]'
} as const;

export const $Paginated_WebsitePageSpeedInsightsRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/WebsitePageSpeedInsightsRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[WebsitePageSpeedInsightsRead]'
} as const;

export const $Paginated_WebsiteRead_ = {
  properties: {
    total: {
      type: 'integer',
      title: 'Total'
    },
    page: {
      type: 'integer',
      title: 'Page'
    },
    size: {
      type: 'integer',
      title: 'Size'
    },
    results: {
      items: {
        $ref: '#/components/schemas/WebsiteRead'
      },
      type: 'array',
      title: 'Results'
    }
  },
  type: 'object',
  required: ['total', 'page', 'size', 'results'],
  title: 'Paginated[WebsiteRead]'
} as const;

export const $PlainMessage = {
  properties: {
    message: {
      type: 'string',
      title: 'Message'
    }
  },
  type: 'object',
  required: ['message'],
  title: 'PlainMessage'
} as const;

export const $SharpspringCreate = {
  properties: {
    api_key: {
      type: 'string',
      title: 'Api Key'
    },
    secret_key: {
      type: 'string',
      title: 'Secret Key'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['api_key', 'secret_key', 'client_id'],
  title: 'SharpspringCreate'
} as const;

export const $SharpspringRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    api_key: {
      type: 'string',
      title: 'Api Key'
    },
    secret_key: {
      type: 'string',
      title: 'Secret Key'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'api_key', 'secret_key', 'client_id'],
  title: 'SharpspringRead'
} as const;

export const $SharpspringUpdate = {
  properties: {
    api_key: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Api Key'
    },
    secret_key: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Secret Key'
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Client Id'
    }
  },
  type: 'object',
  title: 'SharpspringUpdate'
} as const;

export const $SitemapPageChangeFrequency = {
  type: 'string',
  enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
  title: 'SitemapPageChangeFrequency',
  description: 'Change frequency of a sitemap URL.'
} as const;

export const $TaskState = {
  properties: {
    task_id: {
      type: 'string',
      title: 'Task Id'
    },
    task_status: {
      allOf: [
        {
          $ref: '#/components/schemas/TaskStatus'
        }
      ],
      default: 'PENDING'
    },
    task_time: {
      anyOf: [
        {
          type: 'number'
        },
        {
          type: 'null'
        }
      ],
      title: 'Task Time'
    },
    task_result: {
      anyOf: [
        {},
        {
          type: 'null'
        }
      ],
      title: 'Task Result'
    }
  },
  type: 'object',
  required: ['task_id'],
  title: 'TaskState'
} as const;

export const $TaskStatus = {
  type: 'string',
  enum: ['PENDING', 'SUCCESS', 'ERROR'],
  title: 'TaskStatus'
} as const;

export const $UserClientCreate = {
  properties: {
    user_id: {
      type: 'string',
      format: 'uuid4',
      title: 'User Id'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['user_id', 'client_id'],
  title: 'UserClientCreate'
} as const;

export const $UserClientRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    user_id: {
      type: 'string',
      format: 'uuid4',
      title: 'User Id'
    },
    client_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Client Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'user_id', 'client_id'],
  title: 'UserClientRead'
} as const;

export const $UserRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    auth_id: {
      type: 'string',
      title: 'Auth Id'
    },
    email: {
      type: 'string',
      title: 'Email'
    },
    username: {
      type: 'string',
      title: 'Username'
    },
    picture: {
      type: 'string',
      title: 'Picture'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'auth_id', 'email', 'username', 'picture'],
  title: 'UserRead'
} as const;

export const $UserReadAsAdmin = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    auth_id: {
      type: 'string',
      title: 'Auth Id'
    },
    email: {
      type: 'string',
      title: 'Email'
    },
    username: {
      type: 'string',
      title: 'Username'
    },
    picture: {
      type: 'string',
      title: 'Picture'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active'
    },
    is_verified: {
      type: 'boolean',
      title: 'Is Verified'
    },
    is_superuser: {
      type: 'boolean',
      title: 'Is Superuser'
    },
    scopes: {
      items: {
        type: 'string'
      },
      type: 'array',
      title: 'Scopes'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'auth_id',
    'email',
    'username',
    'picture',
    'is_active',
    'is_verified',
    'is_superuser',
    'scopes'
  ],
  title: 'UserReadAsAdmin'
} as const;

export const $UserReadAsManager = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    auth_id: {
      type: 'string',
      title: 'Auth Id'
    },
    email: {
      type: 'string',
      title: 'Email'
    },
    username: {
      type: 'string',
      title: 'Username'
    },
    picture: {
      type: 'string',
      title: 'Picture'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active'
    },
    is_verified: {
      type: 'boolean',
      title: 'Is Verified'
    },
    scopes: {
      items: {
        type: 'string'
      },
      type: 'array',
      title: 'Scopes'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'auth_id',
    'email',
    'username',
    'picture',
    'is_active',
    'is_verified',
    'scopes'
  ],
  title: 'UserReadAsManager'
} as const;

export const $UserUpdate = {
  properties: {
    username: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Username'
    },
    picture: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Picture'
    }
  },
  type: 'object',
  title: 'UserUpdate'
} as const;

export const $UserUpdateAsAdmin = {
  properties: {
    username: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Username'
    },
    picture: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Picture'
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active'
    },
    is_verified: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Verified'
    },
    is_superuser: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Superuser'
    }
  },
  type: 'object',
  title: 'UserUpdateAsAdmin'
} as const;

export const $UserUpdateAsManager = {
  properties: {
    username: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Username'
    },
    picture: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Picture'
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active'
    },
    is_verified: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Verified'
    }
  },
  type: 'object',
  title: 'UserUpdateAsManager'
} as const;

export const $UserUpdatePrivileges = {
  properties: {
    scopes: {
      anyOf: [
        {
          items: {
            type: 'string'
          },
          type: 'array'
        },
        {
          type: 'null'
        }
      ],
      title: 'Scopes'
    }
  },
  type: 'object',
  title: 'UserUpdatePrivileges'
} as const;

export const $ValidationError = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: 'string'
          },
          {
            type: 'integer'
          }
        ]
      },
      type: 'array',
      title: 'Location'
    },
    msg: {
      type: 'string',
      title: 'Message'
    },
    type: {
      type: 'string',
      title: 'Error Type'
    }
  },
  type: 'object',
  required: ['loc', 'msg', 'type'],
  title: 'ValidationError'
} as const;

export const $WebsiteCreate = {
  properties: {
    domain: {
      type: 'string',
      title: 'Domain'
    },
    is_secure: {
      type: 'boolean',
      title: 'Is Secure',
      default: false
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    }
  },
  type: 'object',
  required: ['domain'],
  title: 'WebsiteCreate'
} as const;

export const $WebsiteKeywordCorpusCreate = {
  properties: {
    corpus: {
      type: 'string',
      title: 'Corpus'
    },
    rawtext: {
      type: 'string',
      title: 'Rawtext'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    },
    page_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Page Id'
    }
  },
  type: 'object',
  required: ['corpus', 'rawtext', 'website_id', 'page_id'],
  title: 'WebsiteKeywordCorpusCreate'
} as const;

export const $WebsiteKeywordCorpusRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    corpus: {
      type: 'string',
      title: 'Corpus'
    },
    rawtext: {
      type: 'string',
      title: 'Rawtext'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    },
    page_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Page Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'corpus', 'rawtext', 'website_id', 'page_id'],
  title: 'WebsiteKeywordCorpusRead'
} as const;

export const $WebsiteMapCreate = {
  properties: {
    url: {
      type: 'string',
      title: 'Url'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['url', 'website_id'],
  title: 'WebsiteMapCreate'
} as const;

export const $WebsiteMapProcessing = {
  properties: {
    url: {
      type: 'string',
      title: 'Url'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    },
    sitemap_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Sitemap Id'
    },
    task_id: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Task Id'
    }
  },
  type: 'object',
  required: ['url', 'website_id', 'sitemap_id'],
  title: 'WebsiteMapProcessing'
} as const;

export const $WebsiteMapRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    url: {
      type: 'string',
      title: 'Url'
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'url', 'website_id'],
  title: 'WebsiteMapRead'
} as const;

export const $WebsiteMapUpdate = {
  properties: {
    url: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Url'
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active'
    }
  },
  type: 'object',
  title: 'WebsiteMapUpdate'
} as const;

export const $WebsitePageCreate = {
  properties: {
    url: {
      type: 'string',
      title: 'Url'
    },
    status: {
      type: 'integer',
      title: 'Status'
    },
    priority: {
      anyOf: [
        {
          type: 'number'
        },
        {
          type: 'string'
        }
      ],
      title: 'Priority'
    },
    last_modified: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time'
        },
        {
          type: 'null'
        }
      ],
      title: 'Last Modified'
    },
    change_frequency: {
      anyOf: [
        {
          $ref: '#/components/schemas/SitemapPageChangeFrequency'
        },
        {
          type: 'null'
        }
      ]
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    },
    sitemap_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Sitemap Id'
    }
  },
  type: 'object',
  required: ['url', 'status', 'priority', 'website_id'],
  title: 'WebsitePageCreate'
} as const;

export const $WebsitePagePSIProcessing = {
  properties: {
    page: {
      $ref: '#/components/schemas/WebsitePageRead'
    },
    psi_mobile_task_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'string'
        },
        {},
        {
          type: 'null'
        }
      ],
      title: 'Psi Mobile Task Id'
    },
    psi_desktop_task_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'string'
        },
        {},
        {
          type: 'null'
        }
      ],
      title: 'Psi Desktop Task Id'
    }
  },
  type: 'object',
  required: ['page', 'psi_mobile_task_id', 'psi_desktop_task_id'],
  title: 'WebsitePagePSIProcessing'
} as const;

export const $WebsitePageRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    url: {
      type: 'string',
      title: 'Url'
    },
    status: {
      type: 'integer',
      title: 'Status'
    },
    priority: {
      anyOf: [
        {
          type: 'number'
        },
        {
          type: 'string'
        }
      ],
      title: 'Priority'
    },
    last_modified: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time'
        },
        {
          type: 'null'
        }
      ],
      title: 'Last Modified'
    },
    change_frequency: {
      anyOf: [
        {
          $ref: '#/components/schemas/SitemapPageChangeFrequency'
        },
        {
          type: 'null'
        }
      ]
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    },
    sitemap_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Sitemap Id'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'url',
    'status',
    'priority',
    'is_active',
    'website_id'
  ],
  title: 'WebsitePageRead'
} as const;

export const $WebsitePageSpeedInsightsBase = {
  properties: {
    strategy: {
      type: 'string',
      title: 'Strategy'
    },
    ps_weight: {
      type: 'integer',
      title: 'Ps Weight'
    },
    ps_grade: {
      type: 'number',
      title: 'Ps Grade'
    },
    ps_value: {
      type: 'string',
      title: 'Ps Value'
    },
    ps_unit: {
      type: 'string',
      title: 'Ps Unit'
    },
    fcp_weight: {
      type: 'integer',
      title: 'Fcp Weight'
    },
    fcp_grade: {
      type: 'number',
      title: 'Fcp Grade'
    },
    fcp_value: {
      type: 'number',
      title: 'Fcp Value'
    },
    fcp_unit: {
      type: 'string',
      title: 'Fcp Unit'
    },
    lcp_weight: {
      type: 'integer',
      title: 'Lcp Weight'
    },
    lcp_grade: {
      type: 'number',
      title: 'Lcp Grade'
    },
    lcp_value: {
      type: 'number',
      title: 'Lcp Value'
    },
    lcp_unit: {
      type: 'string',
      title: 'Lcp Unit'
    },
    cls_weight: {
      type: 'integer',
      title: 'Cls Weight'
    },
    cls_grade: {
      type: 'number',
      title: 'Cls Grade'
    },
    cls_value: {
      type: 'number',
      title: 'Cls Value'
    },
    cls_unit: {
      type: 'string',
      title: 'Cls Unit'
    },
    si_weight: {
      type: 'integer',
      title: 'Si Weight'
    },
    si_grade: {
      type: 'number',
      title: 'Si Grade'
    },
    si_value: {
      type: 'number',
      title: 'Si Value'
    },
    si_unit: {
      type: 'string',
      title: 'Si Unit'
    },
    tbt_weight: {
      type: 'integer',
      title: 'Tbt Weight'
    },
    tbt_grade: {
      type: 'number',
      title: 'Tbt Grade'
    },
    tbt_value: {
      type: 'number',
      title: 'Tbt Value'
    },
    tbt_unit: {
      type: 'string',
      title: 'Tbt Unit'
    }
  },
  type: 'object',
  required: [
    'strategy',
    'ps_weight',
    'ps_grade',
    'ps_value',
    'ps_unit',
    'fcp_weight',
    'fcp_grade',
    'fcp_value',
    'fcp_unit',
    'lcp_weight',
    'lcp_grade',
    'lcp_value',
    'lcp_unit',
    'cls_weight',
    'cls_grade',
    'cls_value',
    'cls_unit',
    'si_weight',
    'si_grade',
    'si_value',
    'si_unit',
    'tbt_weight',
    'tbt_grade',
    'tbt_value',
    'tbt_unit'
  ],
  title: 'WebsitePageSpeedInsightsBase'
} as const;

export const $WebsitePageSpeedInsightsRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    strategy: {
      type: 'string',
      title: 'Strategy'
    },
    ps_weight: {
      type: 'integer',
      title: 'Ps Weight'
    },
    ps_grade: {
      type: 'number',
      title: 'Ps Grade'
    },
    ps_value: {
      type: 'string',
      title: 'Ps Value'
    },
    ps_unit: {
      type: 'string',
      title: 'Ps Unit'
    },
    fcp_weight: {
      type: 'integer',
      title: 'Fcp Weight'
    },
    fcp_grade: {
      type: 'number',
      title: 'Fcp Grade'
    },
    fcp_value: {
      type: 'number',
      title: 'Fcp Value'
    },
    fcp_unit: {
      type: 'string',
      title: 'Fcp Unit'
    },
    lcp_weight: {
      type: 'integer',
      title: 'Lcp Weight'
    },
    lcp_grade: {
      type: 'number',
      title: 'Lcp Grade'
    },
    lcp_value: {
      type: 'number',
      title: 'Lcp Value'
    },
    lcp_unit: {
      type: 'string',
      title: 'Lcp Unit'
    },
    cls_weight: {
      type: 'integer',
      title: 'Cls Weight'
    },
    cls_grade: {
      type: 'number',
      title: 'Cls Grade'
    },
    cls_value: {
      type: 'number',
      title: 'Cls Value'
    },
    cls_unit: {
      type: 'string',
      title: 'Cls Unit'
    },
    si_weight: {
      type: 'integer',
      title: 'Si Weight'
    },
    si_grade: {
      type: 'number',
      title: 'Si Grade'
    },
    si_value: {
      type: 'number',
      title: 'Si Value'
    },
    si_unit: {
      type: 'string',
      title: 'Si Unit'
    },
    tbt_weight: {
      type: 'integer',
      title: 'Tbt Weight'
    },
    tbt_grade: {
      type: 'number',
      title: 'Tbt Grade'
    },
    tbt_value: {
      type: 'number',
      title: 'Tbt Value'
    },
    tbt_unit: {
      type: 'string',
      title: 'Tbt Unit'
    },
    page_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Page Id'
    },
    website_id: {
      type: 'string',
      format: 'uuid4',
      title: 'Website Id'
    }
  },
  type: 'object',
  required: [
    'id',
    'created',
    'updated',
    'strategy',
    'ps_weight',
    'ps_grade',
    'ps_value',
    'ps_unit',
    'fcp_weight',
    'fcp_grade',
    'fcp_value',
    'fcp_unit',
    'lcp_weight',
    'lcp_grade',
    'lcp_value',
    'lcp_unit',
    'cls_weight',
    'cls_grade',
    'cls_value',
    'cls_unit',
    'si_weight',
    'si_grade',
    'si_value',
    'si_unit',
    'tbt_weight',
    'tbt_grade',
    'tbt_value',
    'tbt_unit',
    'page_id',
    'website_id'
  ],
  title: 'WebsitePageSpeedInsightsRead'
} as const;

export const $WebsitePageUpdate = {
  properties: {
    url: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Url'
    },
    status: {
      anyOf: [
        {
          type: 'integer'
        },
        {
          type: 'null'
        }
      ],
      title: 'Status'
    },
    priority: {
      anyOf: [
        {
          type: 'number'
        },
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Priority'
    },
    last_modified: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time'
        },
        {
          type: 'null'
        }
      ],
      title: 'Last Modified'
    },
    change_frequency: {
      anyOf: [
        {
          $ref: '#/components/schemas/SitemapPageChangeFrequency'
        },
        {
          type: 'null'
        }
      ]
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active',
      default: true
    },
    website_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Website Id'
    },
    sitemap_id: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid4'
        },
        {
          type: 'null'
        }
      ],
      title: 'Sitemap Id'
    }
  },
  type: 'object',
  title: 'WebsitePageUpdate'
} as const;

export const $WebsiteRead = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid4',
      title: 'Id'
    },
    created: {
      type: 'string',
      format: 'date-time',
      title: 'Created'
    },
    updated: {
      type: 'string',
      format: 'date-time',
      title: 'Updated'
    },
    domain: {
      type: 'string',
      title: 'Domain'
    },
    is_secure: {
      type: 'boolean',
      title: 'Is Secure',
      default: false
    },
    is_active: {
      type: 'boolean',
      title: 'Is Active',
      default: true
    }
  },
  type: 'object',
  required: ['id', 'created', 'updated', 'domain'],
  title: 'WebsiteRead'
} as const;

export const $WebsiteUpdate = {
  properties: {
    domain: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'null'
        }
      ],
      title: 'Domain'
    },
    is_secure: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Secure'
    },
    is_active: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          type: 'null'
        }
      ],
      title: 'Is Active'
    }
  },
  type: 'object',
  title: 'WebsiteUpdate'
} as const;