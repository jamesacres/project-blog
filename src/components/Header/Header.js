'use client';
import React from 'react';
import clsx from 'clsx';
import { Moon, Rss, Sun } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookies from 'js-cookie';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

function Header({ className, theme, ...delegated }) {
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');
  React.useEffect(() => {
    Cookies.set('is-dark-mode', isDarkMode, {
      expires: 1000,
    });
    const root = document.documentElement;
    root.setAttribute('data-color-theme', isDarkMode ? 'dark' : 'light');

    const tokens = !isDarkMode ? LIGHT_TOKENS : DARK_TOKENS;
    Object.entries(tokens).map(([key, value]) =>
      root.style.setProperty(key, value)
    );
  }, [isDarkMode]);

  const Icon = isDarkMode ? Moon : Sun;
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button
          className={styles.action}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <Icon size="1.5rem" />
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
