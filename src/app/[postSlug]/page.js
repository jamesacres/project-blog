import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import CodeSnippet from '@/components/CodeSnippet';
const DivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo')
);
const CircularColorsDemo = dynamic(
  () => import('@/components/CircularColorsDemo')
);

import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const blogPost = React.cache((slug) => loadBlogPost(slug));

export const generateMetadata = async ({ params }) => {
  const post = await blogPost(params.postSlug);
  if (post) {
    const {
      frontmatter: { title, abstract },
    } = post;
    return {
      title,
      description: abstract,
    };
  }
};

async function BlogPost({ params }) {
  const post = await blogPost(params.postSlug);
  if (!post) {
    return notFound();
  }
  const {
    content,
    frontmatter: { title, publishedOn },
  } = post;
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={new Date(publishedOn)} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            DivisionGroupsDemo,
            CircularColorsDemo,
            pre: CodeSnippet,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
