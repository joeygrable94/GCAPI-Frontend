import {
  RouteDefinition,
  RouteSectionProps,
  cache,
  createAsync,
  useParams
} from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Show } from 'solid-js';
import {
  SITEMAP_PAGE_SIZE,
  SITEMAP_PAGE_START,
  ssrFetchWebsiteSitemapsList
} from '~/entities/sitemaps';
import {
  WEBSITEPAGE_PAGE_SIZE,
  WEBSITEPAGE_PAGE_START,
  ssrFetchWebsitePagesList
} from '~/entities/website-pages';
import { ssrFetchWebsiteById } from '~/entities/websites';
import {
  Paginated_WebsiteMapRead_,
  Paginated_WebsitePageRead_,
  WebsiteRead
} from '~/shared/api';

const WebsiteSitemapsActionsMenu = clientOnly(
  () => import('~/entities/sitemaps/ui/action-menu')
);
const WebsitePagesActionsMenu = clientOnly(
  () => import('~/entities/website-pages/ui/action-menu')
);
const WebsiteSitemapsDataTable = clientOnly(
  () => import('~/widgets/data-tables/website-sitemaps-table')
);
const WebsitePagesDataTable = clientOnly(
  () => import('~/widgets/data-tables/website-pages-table')
);

type WebsiteByIdData = {
  website: WebsiteRead;
  sitemaps: Paginated_WebsiteMapRead_;
  pages: Paginated_WebsitePageRead_;
};

const ssrFetchWebsiteData = cache(
  async (websiteId: string, sitemapId: string | null) => {
    'use server';
    const websiteData: WebsiteByIdData = {
      website: await ssrFetchWebsiteById(websiteId),
      sitemaps: await ssrFetchWebsiteSitemapsList(
        SITEMAP_PAGE_START,
        SITEMAP_PAGE_SIZE,
        websiteId,
        sitemapId
      ),
      pages: await ssrFetchWebsitePagesList(
        WEBSITEPAGE_PAGE_START,
        WEBSITEPAGE_PAGE_SIZE,
        websiteId,
        sitemapId
      )
    };
    return websiteData;
  },
  'ssrFetchWebsiteData'
);

export const route = {
  load({ location, params }) {
    void ssrFetchWebsiteData(params.id, location.query.sitemapId || null);
  }
} satisfies RouteDefinition;

export default function WebsiteById(props: RouteSectionProps) {
  const params = useParams();
  const websiteId = () => params.id;
  const sitemapId = () => props.location.query.sitemapId || null;
  const data = createAsync(() => ssrFetchWebsiteData(websiteId(), sitemapId()));
  return (
    <main>
      <Show when={data() !== undefined}>
        <h1 class="my-2">Website {data()!.website.domain}</h1>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
        <WebsiteSitemapsActionsMenu website={data()!.website} />
        <WebsiteSitemapsDataTable
          initialData={data()!.sitemaps}
          website={data()!.website}
        />
        <WebsitePagesActionsMenu website={data()!.website} />
        <WebsitePagesDataTable
          initialData={data()!.pages}
          websiteId={websiteId()}
          sitemapId={sitemapId()}
        />
      </Show>
    </main>
  );
}
