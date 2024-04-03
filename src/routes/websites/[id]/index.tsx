import {
  RouteDefinition,
  RouteSectionProps,
  cache,
  createAsync,
  useParams
} from '@solidjs/router';
import { Show } from 'solid-js';
import {
  SITEMAP_PAGE_SIZE,
  SITEMAP_PAGE_START,
  WebsiteSitemapsActionsMenu,
  ssrFetchWebsiteSitemapsList
} from '~/entities/sitemaps';
import {
  WEBSITEPAGE_PAGE_SIZE,
  WEBSITEPAGE_PAGE_START,
  WebsitePagesActionsMenu,
  ssrFetchWebsitePagesList
} from '~/entities/website-pages';
import { ssrFetchWebsiteById } from '~/entities/websites';
import {
  Paginated_WebsiteMapRead_,
  Paginated_WebsitePageRead_,
  WebsiteRead
} from '~/shared/api';
import { WebsitePagesDataTable, WebsiteSitemapsDataTable } from '~/widgets/data-tables';

type WebsiteByIdData = {
  website: WebsiteRead;
  sitemaps: Paginated_WebsiteMapRead_;
  pages: Paginated_WebsitePageRead_;
};

const ssrFetchWebsiteData = cache(
  async (websiteId: string, sitemapId: string | null) => {
    'use server';
    let websiteData: WebsiteByIdData = {
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

const WebsiteById = (props: RouteSectionProps) => {
  const params = useParams();
  const websiteId = () => params.id;
  const sitemapId = () => props.location.query.sitemapId || null;
  const data = createAsync(() => ssrFetchWebsiteData(websiteId(), sitemapId()));
  return (
    <main>
      <Show when={data() !== undefined}>
        <h1 class="my-2">Website {data()?.website.domain}</h1>
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
};

export default WebsiteById;