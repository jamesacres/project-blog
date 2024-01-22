'use client';
import React from 'react';
import clsx from 'clsx';
import { Pause, Play, RotateCcw } from 'react-feather';
import { MotionConfig, motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);

  React.useEffect(() => {
    if (isPlaying) {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
      const id = window.setInterval(() => {
        setTimeElapsed((timeElapsed) => timeElapsed + 1);
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [isPlaying]);

  React.useEffect(() => {
    setSelectedColorIndex(timeElapsed % COLORS.length);
  }, [timeElapsed]);

  const selectedColor = COLORS[selectedColorIndex];

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId={`${id}-selectedBorder`}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            {!isPlaying && (
              <button onClick={() => setIsPlaying(!isPlaying)}>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </button>
            )}
            {isPlaying && (
              <button onClick={() => setIsPlaying(!isPlaying)}>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>
              </button>
            )}
            <button
              onClick={() => {
                setIsPlaying(false);
                setTimeElapsed(0);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
