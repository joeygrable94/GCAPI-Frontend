import {
  RouteDefinition,
  RouteSectionProps,
  cache,
  createAsync,
  useParams
} from '@solidjs/router';
import { Show } from 'solid-js';
import {
  WebsiteSitemapsActionsMenu,
  ssrFetchWebsiteSitemapsList
} from '~/entities/sitemaps';
import { ssrFetchWebsitePagesList } from '~/entities/website-pages';
import { ssrFetchWebsiteById } from '~/entities/websites';
import {
  Paginated_WebsiteMapRead_,
  Paginated_WebsitePageRead_,
  WebsiteRead
} from '~/shared/api';
import { WebsiteSitemapsDataTable } from '~/widgets/data-tables';

type WebsiteByIdData = {
  website: WebsiteRead;
  sitemaps: Paginated_WebsiteMapRead_;
  pages: Paginated_WebsitePageRead_;
};

const ssrFetchWebsiteData = cache(
  async (page: number, size: number, websiteId: string, sitemapId: string | null) => {
    'use server';
    let websiteData: WebsiteByIdData = {
      website: await ssrFetchWebsiteById(websiteId),
      sitemaps: await ssrFetchWebsiteSitemapsList(page, size, websiteId, sitemapId),
      pages: await ssrFetchWebsitePagesList(page, size, websiteId, sitemapId)
    };
    return websiteData;
  },
  'ssrFetchWebsiteData'
);

export const route = {
  load({ location, params }) {
    void ssrFetchWebsiteData(
      +location.query.page || 1,
      +location.query.size || 10,
      params.id,
      location.query.sitemapId || null
    );
  }
} satisfies RouteDefinition;

const WebsiteById = (props: RouteSectionProps) => {
  const params = useParams();
  const page = () => +props.location.query.page || 1;
  const size = () => +props.location.query.page || 10;
  const websiteId = () => params.id;
  const sitemapId = () => props.location.query.sitemapId || null;
  const data = createAsync(() =>
    ssrFetchWebsiteData(page(), size(), websiteId(), sitemapId())
  );
  return (
    <main>
      <h1 class="my-2">Website {data()?.website.domain}</h1>
      <pre>{JSON.stringify(data(), null, 2)}</pre>
      <Show when={data() !== undefined}>
        <WebsiteSitemapsActionsMenu website={data()!.website} />
        <WebsiteSitemapsDataTable
          initialData={data()!.sitemaps}
          website={data()!.website}
        />
      </Show>
    </main>
  );
};

export default WebsiteById;
