import { BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import { NextResponse } from 'next/server';
import RSS from 'rss';

export async function GET(request) {
  const url = new URL(request.url);
  const feed = new RSS({
    feed_url: url.toString(),
    site_url: `${url.protocol}//${url.host}`,
    title: BLOG_TITLE,
  });
  const blogPosts = await getBlogPostList();
  blogPosts.map(({ slug, title, abstract, publishedOn }) =>
    feed.item({
      title,
      date: new Date(publishedOn),
      description: abstract,
      url: `${url.protocol}//${url.host}/${slug}`,
    })
  );
  return new NextResponse(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'text/xml' },
  });
}
