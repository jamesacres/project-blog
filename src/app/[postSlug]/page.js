import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

const blogPost = React.cache((slug) => loadBlogPost(slug));

export const generateMetadata = async ({ params }) => {
  const {
    frontmatter: { title, abstract },
  } = await blogPost(params.postSlug);
  return {
    title,
    description: abstract,
  };
};

async function BlogPost({ params }) {
  const {
    content,
    frontmatter: { title, publishedOn },
  } = await blogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={new Date(publishedOn)} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
