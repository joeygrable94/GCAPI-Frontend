export type BdxFeedCreate = {
  username: string;
  password: string;
  serverhost: string;
  xml_file_key: string;
  client_id: string;
};

export type BdxFeedRead = {
  id: string;
  created: string;
  updated: string;
  username: string;
  password: string;
  serverhost: string;
  xml_file_key: string;
  client_id: string;
};

export type BdxFeedUpdate = {
  username?: string | null;
  password?: string | null;
  serverhost?: string | null;
  client_id?: string | null;
};

export type ClientCreate = {
  slug: string;
  title: string;
  description?: string | null;
  is_active?: boolean;
};

export type ClientDelete = {
  message: string;
  user_id: string;
  client_id: string;
  task_id?: string | unknown | null;
};

export type ClientRead = {
  id: string;
  created: string;
  updated: string;
  slug: string;
  title: string;
  description?: string | null;
  is_active?: boolean;
};

export type ClientReportCreate = {
  title: string;
  url: string;
  description?: string | null;
  keys?: string | null;
  client_id: string;
};

export type ClientReportRead = {
  id: string;
  created: string;
  updated: string;
  title: string;
  url: string;
  description?: string | null;
  keys?: string | null;
  client_id: string;
};

export type ClientReportUpdate = {
  title?: string | null;
  url?: string | null;
  description?: string | null;
  keys?: string | null;
  client_id?: string | null;
  created?: string | null;
};

export type ClientUpdate = {
  title?: string | null;
  description?: string | null;
  is_active?: boolean | null;
};

export type ClientWebsiteCreate = {
  client_id: string;
  website_id: string;
};

export type ClientWebsiteRead = {
  id: string;
  created: string;
  updated: string;
  client_id: string;
  website_id: string;
};

export type CsrfToken = {
  csrf_token: string;
};

export type EncryptedMessage = {
  message: string;
};

export type ErrorModel = {
  detail: string | Record<string, string>;
};

export type GoAnalytics4PropertyCreate = {
  title: string;
  measurement_id: string;
  property_id: string;
  client_id: string;
};

export type GoAnalytics4PropertyRead = {
  id: string;
  created: string;
  updated: string;
  title: string;
  measurement_id: string;
  property_id: string;
  client_id: string;
};

export type GoAnalytics4PropertyUpdate = {
  title?: string | null;
  client_id?: string | null;
};

export type GoAnalytics4StreamCreate = {
  title: string;
  stream_id: string;
  ga4_id: string;
  website_id: string;
};

export type GoAnalytics4StreamRead = {
  id: string;
  created: string;
  updated: string;
  title: string;
  stream_id: string;
  ga4_id: string;
  website_id: string;
};

export type GoAnalytics4StreamUpdate = {
  title?: string | null;
  website_id?: string | null;
};

export type GoCloudPropertyCreate = {
  project_name: string;
  project_id: string;
  project_number: string;
  service_account?: string | null;
  client_id: string;
};

export type GoCloudPropertyRead = {
  id: string;
  created: string;
  updated: string;
  project_name: string;
  project_id: string;
  project_number: string;
  service_account?: string | null;
  client_id: string;
};

export type GoCloudPropertyUpdate = {
  project_name?: string | null;
  service_account?: string | null;
  client_id?: string | null;
};

export type GoSearchConsoleMetricCreate = {
  title: string;
  keys: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date_start: string;
  date_end: string;
  gsc_id: string;
};

export type GoSearchConsoleMetricPages = {
  searchappearance?: Paginated_GoSearchConsoleMetricRead_ | null;
  query?: Paginated_GoSearchConsoleMetricRead_ | null;
  page?: Paginated_GoSearchConsoleMetricRead_ | null;
  device?: Paginated_GoSearchConsoleMetricRead_ | null;
  country?: Paginated_GoSearchConsoleMetricRead_ | null;
};

export type GoSearchConsoleMetricRead = {
  id: string;
  created: string;
  updated: string;
  title: string;
  keys: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date_start: string;
  date_end: string;
  gsc_id: string;
};

export type GoSearchConsoleMetricType =
  | 'searchappearance'
  | 'query'
  | 'page'
  | 'device'
  | 'country';

export type GoSearchConsoleMetricUpdate = {
  title?: string | null;
  keys?: string | null;
  clicks?: number | null;
  impressions?: number | null;
  ctr?: number | null;
  position?: number | null;
  date_start?: string | null;
  date_end?: string | null;
};

export type GoSearchConsolePropertyCreate = {
  title: string;
  client_id: string;
  website_id: string;
};

export type GoSearchConsolePropertyRead = {
  id: string;
  created: string;
  updated: string;
  title: string;
  client_id: string;
  website_id: string;
};

export type GoSearchConsolePropertyUpdate = {
  title?: string | null;
  client_id?: string | null;
  website_id?: string | null;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type NoteCreate = {
  title: string;
  description?: string | null;
  is_active?: boolean;
  user_id: string;
};

export type NoteRead = {
  id: string;
  created: string;
  updated: string;
  title: string;
  description?: string | null;
  is_active?: boolean;
  user_id: string;
};

export type NoteUpdate = {
  title?: string | null;
  description?: string | null;
  is_active?: boolean | null;
};

export type Paginated_BdxFeedRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<BdxFeedRead>;
};

export type Paginated_ClientRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<ClientRead>;
};

export type Paginated_ClientReportRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<ClientReportRead>;
};

export type Paginated_GoAnalytics4PropertyRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<GoAnalytics4PropertyRead>;
};

export type Paginated_GoAnalytics4StreamRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<GoAnalytics4StreamRead>;
};

export type Paginated_GoCloudPropertyRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<GoCloudPropertyRead>;
};

export type Paginated_GoSearchConsoleMetricRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<GoSearchConsoleMetricRead>;
};

export type Paginated_GoSearchConsolePropertyRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<GoSearchConsolePropertyRead>;
};

export type Paginated_NoteRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<NoteRead>;
};

export type Paginated_SharpspringRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<SharpspringRead>;
};

export type Paginated_UserReadAsAdmin_ = {
  total: number;
  page: number;
  size: number;
  results: Array<UserReadAsAdmin>;
};

export type Paginated_UserReadAsManager_ = {
  total: number;
  page: number;
  size: number;
  results: Array<UserReadAsManager>;
};

export type Paginated_WebsiteKeywordCorpusRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<WebsiteKeywordCorpusRead>;
};

export type Paginated_WebsiteMapRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<WebsiteMapRead>;
};

export type Paginated_WebsitePageRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<WebsitePageRead>;
};

export type Paginated_WebsitePageSpeedInsightsRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<WebsitePageSpeedInsightsRead>;
};

export type Paginated_WebsiteRead_ = {
  total: number;
  page: number;
  size: number;
  results: Array<WebsiteRead>;
};

export type PlainMessage = {
  message: string;
};

export type SharpspringCreate = {
  api_key: string;
  secret_key: string;
  client_id: string;
};

export type SharpspringRead = {
  id: string;
  created: string;
  updated: string;
  api_key: string;
  secret_key: string;
  client_id: string;
};

export type SharpspringUpdate = {
  api_key?: string | null;
  secret_key?: string | null;
  client_id?: string | null;
};

/**
 * Change frequency of a sitemap URL.
 */
export type SitemapPageChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export type TaskState = {
  task_id: string;
  task_status?: TaskStatus;
  task_time?: number | null;
  task_result?: unknown | null;
};

export type TaskStatus = 'PENDING' | 'SUCCESS' | 'ERROR';

export type UserClientCreate = {
  user_id: string;
  client_id: string;
};

export type UserClientRead = {
  id: string;
  created: string;
  updated: string;
  user_id: string;
  client_id: string;
};

export type UserRead = {
  id: string;
  created: string;
  updated: string;
  auth_id: string;
  email: string;
  username: string;
  picture: string;
};

export type UserReadAsAdmin = {
  id: string;
  created: string;
  updated: string;
  auth_id: string;
  email: string;
  username: string;
  picture: string;
  is_active: boolean;
  is_verified: boolean;
  is_superuser: boolean;
  scopes: Array<string>;
};

export type UserReadAsManager = {
  id: string;
  created: string;
  updated: string;
  auth_id: string;
  email: string;
  username: string;
  picture: string;
  is_active: boolean;
  is_verified: boolean;
  scopes: Array<string>;
};

export type UserUpdate = {
  username?: string | null;
  picture?: string | null;
};

export type UserUpdateAsAdmin = {
  username?: string | null;
  picture?: string | null;
  is_active?: boolean | null;
  is_verified?: boolean | null;
  is_superuser?: boolean | null;
};

export type UserUpdateAsManager = {
  username?: string | null;
  picture?: string | null;
  is_active?: boolean | null;
  is_verified?: boolean | null;
};

export type UserUpdatePrivileges = {
  scopes?: Array<string> | null;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type WebsiteCreate = {
  domain: string;
  is_secure?: boolean;
  is_active?: boolean;
};

export type WebsiteKeywordCorpusCreate = {
  corpus: string;
  rawtext: string;
  website_id: string;
  page_id: string;
};

export type WebsiteKeywordCorpusRead = {
  id: string;
  created: string;
  updated: string;
  corpus: string;
  rawtext: string;
  website_id: string;
  page_id: string;
};

export type WebsiteMapCreate = {
  url: string;
  is_active?: boolean;
  website_id: string;
};

export type WebsiteMapProcessing = {
  url: string;
  website_id: string;
  sitemap_id: string;
  task_id?: string | null;
};

export type WebsiteMapRead = {
  id: string;
  created: string;
  updated: string;
  url: string;
  is_active?: boolean;
  website_id: string;
};

export type WebsiteMapUpdate = {
  url?: string | null;
  is_active?: boolean | null;
};

export type WebsitePageCreate = {
  url: string;
  status: number;
  priority: number | string;
  last_modified?: string | null;
  change_frequency?: SitemapPageChangeFrequency | null;
  is_active?: boolean;
  website_id: string;
  sitemap_id?: string | null;
};

export type WebsitePagePSIProcessing = {
  page: WebsitePageRead;
  psi_mobile_task_id: string | unknown | null;
  psi_desktop_task_id: string | unknown | null;
};

export type WebsitePageRead = {
  id: string;
  created: string;
  updated: string;
  url: string;
  status: number;
  priority: number | string;
  last_modified?: string | null;
  change_frequency?: SitemapPageChangeFrequency | null;
  is_active: boolean;
  website_id: string;
  sitemap_id?: string | null;
};

export type WebsitePageSpeedInsightsBase = {
  strategy: string;
  ps_weight: number;
  ps_grade: number;
  ps_value: string;
  ps_unit: string;
  fcp_weight: number;
  fcp_grade: number;
  fcp_value: number;
  fcp_unit: string;
  lcp_weight: number;
  lcp_grade: number;
  lcp_value: number;
  lcp_unit: string;
  cls_weight: number;
  cls_grade: number;
  cls_value: number;
  cls_unit: string;
  si_weight: number;
  si_grade: number;
  si_value: number;
  si_unit: string;
  tbt_weight: number;
  tbt_grade: number;
  tbt_value: number;
  tbt_unit: string;
};

export type WebsitePageSpeedInsightsRead = {
  id: string;
  created: string;
  updated: string;
  strategy: string;
  ps_weight: number;
  ps_grade: number;
  ps_value: string;
  ps_unit: string;
  fcp_weight: number;
  fcp_grade: number;
  fcp_value: number;
  fcp_unit: string;
  lcp_weight: number;
  lcp_grade: number;
  lcp_value: number;
  lcp_unit: string;
  cls_weight: number;
  cls_grade: number;
  cls_value: number;
  cls_unit: string;
  si_weight: number;
  si_grade: number;
  si_value: number;
  si_unit: string;
  tbt_weight: number;
  tbt_grade: number;
  tbt_value: number;
  tbt_unit: string;
  page_id: string;
  website_id: string;
};

export type WebsitePageUpdate = {
  url?: string | null;
  status?: number | null;
  priority?: number | string | null;
  last_modified?: string | null;
  change_frequency?: SitemapPageChangeFrequency | null;
  is_active?: boolean | null;
  website_id?: string | null;
  sitemap_id?: string | null;
};

export type WebsiteRead = {
  id: string;
  created: string;
  updated: string;
  domain: string;
  is_secure?: boolean;
  is_active?: boolean;
};

export type WebsiteUpdate = {
  domain?: string | null;
  is_secure?: boolean | null;
  is_active?: boolean | null;
};

export type PublicData = {
  payloads: {
    PublicStatusApiV1StatusGet: {
      message?: string | null;
    };
    PublicRateLimitedMultipleApiV1RateLimitedMultipleGet: {
      message?: string | null;
    };
  };

  responses: {
    PublicStatusApiV1StatusGet: Record<string, unknown>;
    PublicRateLimitedMultipleApiV1RateLimitedMultipleGet: Record<string, unknown>;
  };
};

export type SecurityData = {
  payloads: {
    SecureSecureEncryptMessageApiV1EncryptMessagePost: {
      requestBody: PlainMessage;
    };
    SecureSecureDecryptMessageApiV1DecryptMessagePost: {
      requestBody: EncryptedMessage;
    };
  };

  responses: {
    SecureTestSecurityScopeApiV1TestScopeGet: unknown;
    SecureGetCsrfApiV1CsrfGet: CsrfToken;
    SecureCheckCsrfApiV1CsrfPost: unknown;
    SecureSecureEncryptMessageApiV1EncryptMessagePost: EncryptedMessage;
    SecureSecureDecryptMessageApiV1DecryptMessagePost: PlainMessage;
  };
};

export type TasksData = {
  payloads: {
    TasksGetStatusApiV1TasksTaskIdGet: {
      taskId: string;
    };
  };

  responses: {
    TasksGetStatusApiV1TasksTaskIdGet: TaskState;
  };
};

export type UsersData = {
  payloads: {
    UsersListApiV1UsersGet: {
      page?: number | null;
      size?: number | null;
    };
    UsersReadApiV1UsersUserIdGet: {
      userId: unknown;
    };
    UsersUpdateApiV1UsersUserIdPatch: {
      requestBody: UserUpdateAsAdmin | UserUpdateAsManager | UserUpdate;
      userId: unknown;
    };
    UsersDeleteApiV1UsersUserIdDelete: {
      userId: unknown;
    };
    UsersAddPrivilegesApiV1UsersUserIdPrivilegesAddPost: {
      requestBody: UserUpdatePrivileges;
      userId: unknown;
    };
    UsersRemovePrivilegesApiV1UsersUserIdPrivilegesRemovePost: {
      requestBody: UserUpdatePrivileges;
      userId: unknown;
    };
  };

  responses: {
    UsersCurrentApiV1UsersMeGet: UserReadAsAdmin | UserReadAsManager | UserRead;
    UsersListApiV1UsersGet: Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_;
    UsersReadApiV1UsersUserIdGet: UserReadAsAdmin | UserReadAsManager | UserRead;
    UsersUpdateApiV1UsersUserIdPatch: UserReadAsAdmin | UserReadAsManager | UserRead;
    UsersDeleteApiV1UsersUserIdDelete: unknown;
    UsersAddPrivilegesApiV1UsersUserIdPrivilegesAddPost:
      | UserReadAsAdmin
      | UserReadAsManager;
    UsersRemovePrivilegesApiV1UsersUserIdPrivilegesRemovePost:
      | UserReadAsAdmin
      | UserReadAsManager;
  };
};

export type ClientsData = {
  payloads: {
    ClientsListApiV1ClientsGet: {
      page?: number | null;
      size?: number | null;
      userId?: string | null;
    };
    ClientsCreateApiV1ClientsPost: {
      requestBody: ClientCreate;
    };
    ClientsReadApiV1ClientsClientIdGet: {
      clientId: unknown;
    };
    ClientsUpdateApiV1ClientsClientIdPatch: {
      clientId: unknown;
      requestBody: ClientUpdate;
    };
    ClientsDeleteApiV1ClientsClientIdDelete: {
      clientId: unknown;
    };
    ClientsAssignUserApiV1ClientsClientIdAssignUserPost: {
      clientId: unknown;
      requestBody: UserClientCreate;
    };
    ClientsRemoveUserApiV1ClientsClientIdRemoveUserPost: {
      clientId: unknown;
      requestBody: UserClientCreate;
    };
    ClientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost: {
      clientId: unknown;
      requestBody: ClientWebsiteCreate;
    };
    ClientsRemoveWebsiteApiV1ClientsClientIdRemoveWebsitePost: {
      clientId: unknown;
      requestBody: ClientWebsiteCreate;
    };
  };

  responses: {
    ClientsListApiV1ClientsGet: Paginated_ClientRead_;
    ClientsCreateApiV1ClientsPost: ClientRead;
    ClientsReadApiV1ClientsClientIdGet: ClientRead;
    ClientsUpdateApiV1ClientsClientIdPatch: ClientRead;
    ClientsDeleteApiV1ClientsClientIdDelete: ClientDelete;
    ClientsAssignUserApiV1ClientsClientIdAssignUserPost: UserClientRead;
    ClientsRemoveUserApiV1ClientsClientIdRemoveUserPost: UserClientRead;
    ClientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost: ClientWebsiteRead;
    ClientsRemoveWebsiteApiV1ClientsClientIdRemoveWebsitePost: ClientWebsiteRead;
  };
};

export type ClientReportsData = {
  payloads: {
    ClientReportsListApiV1ClientsReportsClientIdGet: {
      clientId: unknown;
      page?: number | null;
      size?: number | null;
    };
    ClientReportsCreateApiV1ClientsReportsClientIdPost: {
      clientId: unknown;
      requestBody: ClientReportCreate;
    };
    ClientReportsReadApiV1ClientsReportsClientIdReportIdGet: {
      clientId: unknown;
      reportId: unknown;
    };
    ClientReportsUpdateApiV1ClientsReportsClientIdReportIdPatch: {
      clientId: unknown;
      reportId: unknown;
      requestBody: ClientReportUpdate;
    };
    ClientReportsDeleteApiV1ClientsReportsClientIdReportIdDelete: {
      clientId: unknown;
      reportId: unknown;
    };
    ClientReportNotesListApiV1ClientsReportsClientIdReportIdNotesGet: {
      clientId: unknown;
      page?: number | null;
      reportId: unknown;
      size?: number | null;
    };
    ClientReportNotesCreateApiV1ClientsReportsClientIdReportIdNotesPost: {
      clientId: unknown;
      reportId: unknown;
      requestBody: NoteCreate;
    };
  };

  responses: {
    ClientReportsListApiV1ClientsReportsClientIdGet: Paginated_ClientReportRead_;
    ClientReportsCreateApiV1ClientsReportsClientIdPost: ClientReportRead;
    ClientReportsReadApiV1ClientsReportsClientIdReportIdGet: ClientReportRead;
    ClientReportsUpdateApiV1ClientsReportsClientIdReportIdPatch: ClientReportRead;
    ClientReportsDeleteApiV1ClientsReportsClientIdReportIdDelete: unknown;
    ClientReportNotesListApiV1ClientsReportsClientIdReportIdNotesGet: Paginated_NoteRead_;
    ClientReportNotesCreateApiV1ClientsReportsClientIdReportIdNotesPost: NoteRead;
  };
};

export type NotesData = {
  payloads: {
    NotesListApiV1NotesGet: {
      page?: number | null;
      size?: number | null;
      userId?: string | null;
    };
    NotesCreateApiV1NotesPost: {
      requestBody: NoteCreate;
    };
    NotesReadApiV1NotesNoteIdGet: {
      noteId: unknown;
    };
    NotesUpdateApiV1NotesNoteIdPatch: {
      noteId: unknown;
      requestBody: NoteUpdate;
    };
    NotesDeleteApiV1NotesNoteIdDelete: {
      noteId: unknown;
    };
  };

  responses: {
    NotesListApiV1NotesGet: Paginated_NoteRead_;
    NotesCreateApiV1NotesPost: NoteRead;
    NotesReadApiV1NotesNoteIdGet: NoteRead;
    NotesUpdateApiV1NotesNoteIdPatch: NoteRead;
    NotesDeleteApiV1NotesNoteIdDelete: unknown;
  };
};

export type BdxFeedsData = {
  payloads: {
    BdxFeedListApiV1BdxGet: {
      clientId?: string | null;
      page?: number | null;
      size?: number | null;
    };
    BdxFeedCreateApiV1BdxPost: {
      requestBody: BdxFeedCreate;
    };
    BdxFeedReadApiV1BdxBdxIdGet: {
      bdxId: unknown;
    };
    BdxFeedUpdateApiV1BdxBdxIdPatch: {
      bdxId: unknown;
      requestBody: BdxFeedUpdate;
    };
    BdxFeedDeleteApiV1BdxBdxIdDelete: {
      bdxId: unknown;
    };
  };

  responses: {
    BdxFeedListApiV1BdxGet: Paginated_BdxFeedRead_;
    BdxFeedCreateApiV1BdxPost: BdxFeedRead;
    BdxFeedReadApiV1BdxBdxIdGet: BdxFeedRead;
    BdxFeedUpdateApiV1BdxBdxIdPatch: BdxFeedRead;
    BdxFeedDeleteApiV1BdxBdxIdDelete: unknown;
  };
};

export type SharpSpringAccountsData = {
  payloads: {
    SharpspringListApiV1SharpspringGet: {
      clientId?: string | null;
      page?: number | null;
      size?: number | null;
      userId?: string | null;
    };
    SharpspringCreateApiV1SharpspringPost: {
      requestBody: SharpspringCreate;
    };
    SharpspringReadApiV1SharpspringSsIdGet: {
      ssId: unknown;
    };
    SharpspringUpdateApiV1SharpspringSsIdPatch: {
      requestBody: SharpspringUpdate;
      ssId: unknown;
    };
    SharpspringDeleteApiV1SharpspringSsIdDelete: {
      ssId: unknown;
    };
  };

  responses: {
    SharpspringListApiV1SharpspringGet: Paginated_SharpspringRead_;
    SharpspringCreateApiV1SharpspringPost: SharpspringRead;
    SharpspringReadApiV1SharpspringSsIdGet: SharpspringRead;
    SharpspringUpdateApiV1SharpspringSsIdPatch: SharpspringRead;
    SharpspringDeleteApiV1SharpspringSsIdDelete: unknown;
  };
};

export type GoogleCloudAccountsData = {
  payloads: {
    GoCloudPropertyListApiV1GoCloudGet: {
      clientId?: string | null;
      page?: number | null;
      size?: number | null;
    };
    GoCloudPropertyCreateApiV1GoCloudPost: {
      requestBody: GoCloudPropertyCreate;
    };
    GoCloudPropertyReadApiV1GoCloudGoCloudIdGet: {
      goCloudId: unknown;
    };
    GoCloudPropertyUpdateApiV1GoCloudGoCloudIdPatch: {
      goCloudId: unknown;
      requestBody: GoCloudPropertyUpdate;
    };
    GoCloudPropertyDeleteApiV1GoCloudGoCloudIdDelete: {
      goCloudId: unknown;
    };
  };

  responses: {
    GoCloudPropertyListApiV1GoCloudGet: Paginated_GoCloudPropertyRead_;
    GoCloudPropertyCreateApiV1GoCloudPost: GoCloudPropertyRead;
    GoCloudPropertyReadApiV1GoCloudGoCloudIdGet: GoCloudPropertyRead;
    GoCloudPropertyUpdateApiV1GoCloudGoCloudIdPatch: GoCloudPropertyRead;
    GoCloudPropertyDeleteApiV1GoCloudGoCloudIdDelete: unknown;
  };
};

export type GoogleAnalytics4PropertiesData = {
  payloads: {
    Ga4PropertyListApiV1Ga4PropertyGet: {
      clientId?: string | null;
      page?: number | null;
      size?: number | null;
    };
    Ga4PropertyCreateApiV1Ga4PropertyPost: {
      requestBody: GoAnalytics4PropertyCreate;
    };
    Ga4PropertyReadApiV1Ga4PropertyGa4IdGet: {
      ga4Id: unknown;
    };
    Ga4PropertyUpdateApiV1Ga4PropertyGa4IdPatch: {
      ga4Id: unknown;
      requestBody: GoAnalytics4PropertyUpdate;
    };
    Ga4PropertyDeleteApiV1Ga4PropertyGa4IdDelete: {
      ga4Id: unknown;
    };
  };

  responses: {
    Ga4PropertyListApiV1Ga4PropertyGet: Paginated_GoAnalytics4PropertyRead_;
    Ga4PropertyCreateApiV1Ga4PropertyPost: GoAnalytics4PropertyRead;
    Ga4PropertyReadApiV1Ga4PropertyGa4IdGet: GoAnalytics4PropertyRead;
    Ga4PropertyUpdateApiV1Ga4PropertyGa4IdPatch: GoAnalytics4PropertyRead;
    Ga4PropertyDeleteApiV1Ga4PropertyGa4IdDelete: unknown;
  };
};

export type GoogleAnalytics4PropertyStreamsData = {
  payloads: {
    Ga4StreamListApiV1Ga4StreamGet: {
      ga4Id?: string | null;
      page?: number | null;
      size?: number | null;
      websiteId?: string | null;
    };
    Ga4StreamCreateApiV1Ga4StreamPost: {
      requestBody: GoAnalytics4StreamCreate;
    };
    Ga4StreamReadApiV1Ga4StreamGa4StreamIdGet: {
      ga4StreamId: unknown;
    };
    Ga4StreamUpdateApiV1Ga4StreamGa4StreamIdPatch: {
      ga4StreamId: unknown;
      requestBody: GoAnalytics4StreamUpdate;
    };
    Ga4StreamDeleteApiV1Ga4StreamGa4StreamIdDelete: {
      ga4StreamId: unknown;
    };
  };

  responses: {
    Ga4StreamListApiV1Ga4StreamGet: Paginated_GoAnalytics4StreamRead_;
    Ga4StreamCreateApiV1Ga4StreamPost: GoAnalytics4StreamRead;
    Ga4StreamReadApiV1Ga4StreamGa4StreamIdGet: GoAnalytics4StreamRead;
    Ga4StreamUpdateApiV1Ga4StreamGa4StreamIdPatch: GoAnalytics4StreamRead;
    Ga4StreamDeleteApiV1Ga4StreamGa4StreamIdDelete: unknown;
  };
};

export type GoogleSearchConsolePropertiesData = {
  payloads: {
    GoSearchConsolePropertyListApiV1GoSearchPropertyGet: {
      clientId?: string | null;
      page?: number | null;
      size?: number | null;
      websiteId?: string | null;
    };
    GoSearchConsolePropertyCreateApiV1GoSearchPropertyPost: {
      requestBody: GoSearchConsolePropertyCreate;
    };
    GoSearchConsolePropertyReadApiV1GoSearchPropertyGscIdGet: {
      gscId: unknown;
    };
    GoSearchConsolePropertyUpdateApiV1GoSearchPropertyGscIdPatch: {
      gscId: unknown;
      requestBody: GoSearchConsolePropertyUpdate;
    };
    GoSearchConsolePropertyDeleteApiV1GoSearchPropertyGscIdDelete: {
      gscId: unknown;
    };
  };

  responses: {
    GoSearchConsolePropertyListApiV1GoSearchPropertyGet: Paginated_GoSearchConsolePropertyRead_;
    GoSearchConsolePropertyCreateApiV1GoSearchPropertyPost: GoSearchConsolePropertyRead;
    GoSearchConsolePropertyReadApiV1GoSearchPropertyGscIdGet: GoSearchConsolePropertyRead;
    GoSearchConsolePropertyUpdateApiV1GoSearchPropertyGscIdPatch: GoSearchConsolePropertyRead;
    GoSearchConsolePropertyDeleteApiV1GoSearchPropertyGscIdDelete: unknown;
  };
};

export type GoogleSearchConsolePropertyMetricsData = {
  payloads: {
    GoSearchConsolePropertyMetricListAllMetricTypesApiV1GoSearchMetricGscIdGet: {
      dateEnd?: string | null;
      dateStart?: string | null;
      gscId: unknown;
      metricTypes?: string | null;
      page?: number | null;
      size?: number | null;
    };
    GoSearchConsolePropertyMetricListByMetricTypeApiV1GoSearchMetricGscIdMetricTypeGet: {
      dateEnd?: string | null;
      dateStart?: string | null;
      gscId: unknown;
      metricType: GoSearchConsoleMetricType;
      metricTypes?: string | null;
      page?: number | null;
      size?: number | null;
    };
    GoSearchConsolePropertyMetricCreateApiV1GoSearchMetricGscIdMetricTypePost: {
      gscId: unknown;
      metricType: GoSearchConsoleMetricType;
      requestBody: GoSearchConsoleMetricCreate;
    };
    GoSearchConsolePropertyMetricReadApiV1GoSearchMetricGscIdMetricTypeMetricIdGet: {
      gscId: unknown;
      metricId: unknown;
      metricType: GoSearchConsoleMetricType;
    };
    GoSearchConsolePropertyMetricUpdateApiV1GoSearchMetricGscIdMetricTypeMetricIdPatch: {
      gscId: unknown;
      metricId: unknown;
      metricType: GoSearchConsoleMetricType;
      requestBody: GoSearchConsoleMetricUpdate;
    };
    GoSearchConsolePropertyMetricDeleteApiV1GoSearchMetricGscIdMetricTypeMetricIdDelete: {
      gscId: unknown;
      metricId: unknown;
      metricType: GoSearchConsoleMetricType;
    };
  };

  responses: {
    GoSearchConsolePropertyMetricListAllMetricTypesApiV1GoSearchMetricGscIdGet: GoSearchConsoleMetricPages;
    GoSearchConsolePropertyMetricListByMetricTypeApiV1GoSearchMetricGscIdMetricTypeGet: Paginated_GoSearchConsoleMetricRead_;
    GoSearchConsolePropertyMetricCreateApiV1GoSearchMetricGscIdMetricTypePost: GoSearchConsoleMetricRead;
    GoSearchConsolePropertyMetricReadApiV1GoSearchMetricGscIdMetricTypeMetricIdGet: GoSearchConsoleMetricRead;
    GoSearchConsolePropertyMetricUpdateApiV1GoSearchMetricGscIdMetricTypeMetricIdPatch: GoSearchConsoleMetricRead;
    GoSearchConsolePropertyMetricDeleteApiV1GoSearchMetricGscIdMetricTypeMetricIdDelete: unknown;
  };
};

export type WebsitesData = {
  payloads: {
    WebsitesListApiV1WebsitesGet: {
      clientId?: string | null;
      page?: number | null;
      size?: number | null;
      websiteId?: string | null;
    };
    WebsitesCreateApiV1WebsitesPost: {
      requestBody: WebsiteCreate;
    };
    WebsitesReadApiV1WebsitesWebsiteIdGet: {
      websiteId: unknown;
    };
    WebsitesUpdateApiV1WebsitesWebsiteIdPatch: {
      requestBody: WebsiteUpdate;
      websiteId: unknown;
    };
    WebsitesDeleteApiV1WebsitesWebsiteIdDelete: {
      websiteId: unknown;
    };
  };

  responses: {
    WebsitesListApiV1WebsitesGet: Paginated_WebsiteRead_;
    WebsitesCreateApiV1WebsitesPost: WebsiteRead;
    WebsitesReadApiV1WebsitesWebsiteIdGet: WebsiteRead;
    WebsitesUpdateApiV1WebsitesWebsiteIdPatch: WebsiteRead;
    WebsitesDeleteApiV1WebsitesWebsiteIdDelete: unknown;
  };
};

export type WebsitePagesData = {
  payloads: {
    WebsitePagesListApiV1WebpagesGet: {
      page?: number | null;
      sitemapId?: string | null;
      size?: number | null;
      websiteId?: string | null;
    };
    WebsitePagesCreateApiV1WebpagesPost: {
      requestBody: WebsitePageCreate;
    };
    WebsitePagesReadApiV1WebpagesPageIdGet: {
      pageId: unknown;
    };
    WebsitePagesUpdateApiV1WebpagesPageIdPatch: {
      pageId: unknown;
      requestBody: WebsitePageUpdate;
    };
    WebsitePagesDeleteApiV1WebpagesPageIdDelete: {
      pageId: unknown;
    };
    WebsitePagesProcessWebsitePageSpeedInsightsApiV1WebpagesPageIdProcessPsiPost: {
      pageId: unknown;
    };
  };

  responses: {
    WebsitePagesListApiV1WebpagesGet: Paginated_WebsitePageRead_;
    WebsitePagesCreateApiV1WebpagesPost: WebsitePageRead;
    WebsitePagesReadApiV1WebpagesPageIdGet: WebsitePageRead;
    WebsitePagesUpdateApiV1WebpagesPageIdPatch: WebsitePageRead;
    WebsitePagesDeleteApiV1WebpagesPageIdDelete: unknown;
    WebsitePagesProcessWebsitePageSpeedInsightsApiV1WebpagesPageIdProcessPsiPost: WebsitePagePSIProcessing;
  };
};

export type WebsiteSitemapsData = {
  payloads: {
    WebsiteSitemapsListApiV1SitemapsGet: {
      page?: number | null;
      sitemapId?: string | null;
      size?: number | null;
      websiteId?: string | null;
    };
    WebsiteSitemapsCreateApiV1SitemapsPost: {
      requestBody: WebsiteMapCreate;
    };
    WebsiteSitemapsReadApiV1SitemapsSitemapIdGet: {
      sitemapId: unknown;
    };
    WebsiteSitemapsUpdateApiV1SitemapsSitemapIdPatch: {
      requestBody: WebsiteMapUpdate;
      sitemapId: unknown;
    };
    WebsiteSitemapsDeleteApiV1SitemapsSitemapIdDelete: {
      sitemapId: unknown;
    };
    WebsiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet: {
      sitemapId: unknown;
    };
  };

  responses: {
    WebsiteSitemapsListApiV1SitemapsGet: Paginated_WebsiteMapRead_;
    WebsiteSitemapsCreateApiV1SitemapsPost: WebsiteMapRead;
    WebsiteSitemapsReadApiV1SitemapsSitemapIdGet: WebsiteMapRead;
    WebsiteSitemapsUpdateApiV1SitemapsSitemapIdPatch: WebsiteMapRead;
    WebsiteSitemapsDeleteApiV1SitemapsSitemapIdDelete: unknown;
    WebsiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet: WebsiteMapProcessing;
  };
};

export type WebsitePageSpeedInsightsData = {
  payloads: {
    WebsitePageSpeedInsightsListApiV1PsiGet: {
      page?: number | null;
      pageId?: string | null;
      size?: number | null;
      strategy?: Array<string> | null;
      websiteId?: string | null;
    };
    WebsitePageSpeedInsightsCreateApiV1PsiPost: {
      page?: number | null;
      pageId?: string | null;
      requestBody: WebsitePageSpeedInsightsBase;
      size?: number | null;
      strategy?: Array<string> | null;
      websiteId?: string | null;
    };
    WebsitePageSpeedInsightsReadApiV1PsiPsiIdGet: {
      psiId: unknown;
    };
    WebsitePageSpeedInsightsDeleteApiV1PsiPsiIdDelete: {
      psiId: unknown;
    };
  };

  responses: {
    WebsitePageSpeedInsightsListApiV1PsiGet: Paginated_WebsitePageSpeedInsightsRead_;
    WebsitePageSpeedInsightsCreateApiV1PsiPost: WebsitePageSpeedInsightsRead;
    WebsitePageSpeedInsightsReadApiV1PsiPsiIdGet: WebsitePageSpeedInsightsRead;
    WebsitePageSpeedInsightsDeleteApiV1PsiPsiIdDelete: unknown;
  };
};

export type WebsitePageKeywordCorpusData = {
  payloads: {
    WebsitePageKeywordCorpusListApiV1KwcGet: {
      page?: number | null;
      pageId?: string | null;
      size?: number | null;
      websiteId?: string | null;
    };
    WebsitePageKeywordCorpusCreateApiV1KwcPost: {
      requestBody: WebsiteKeywordCorpusCreate;
    };
    WebsitePageKeywordCorpusReadApiV1KwcKwcIdGet: {
      kwcId: unknown;
    };
    WebsitePageKeywordCorpusDeleteApiV1KwcKwcIdDelete: {
      kwcId: unknown;
    };
  };

  responses: {
    WebsitePageKeywordCorpusListApiV1KwcGet: Paginated_WebsiteKeywordCorpusRead_;
    WebsitePageKeywordCorpusCreateApiV1KwcPost: WebsiteKeywordCorpusRead;
    WebsitePageKeywordCorpusReadApiV1KwcKwcIdGet: WebsiteKeywordCorpusRead;
    WebsitePageKeywordCorpusDeleteApiV1KwcKwcIdDelete: unknown;
  };
};
