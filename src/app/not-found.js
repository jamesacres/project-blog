import React from 'react';

import styles from './homepage.module.css';
import { BLOG_TITLE } from '@/constants';

export const metadata = {
  title: BLOG_TITLE,
};

async function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}

export default Home;
