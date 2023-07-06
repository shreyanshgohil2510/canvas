import { FC, useEffect } from 'react';
import styles from './index.module.scss';
import { SideDrawerProps } from './types';
// For handle the side drawer

// Created the wrapper for the side drawer
const SideDrawerWrapper: FC<SideDrawerProps> = (props) => {
  // Inits
  const {
    children,
    isOpen,
    closeDrawerByAnimation,
    removeDrawerFromDom,
    headerTitle,
  } = props;
  //for handle the key press of keyboard
  const keyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDrawerByAnimation();
    }
  };

  // use effect for the close the on the sideDrawer on the esc button click
  useEffect(() => {
    window.addEventListener('keydown', keyPressHandler);
    return () => window.removeEventListener('keydown', keyPressHandler);
  });
  // JSX
  return (
    <>
      <div
        className={`${'stop-scroll-x'} ${styles['side-drawer']} ${
          isOpen ? styles['slide-in'] : styles['slide-out']
        }`}
        onAnimationEnd={() => {
          !isOpen && removeDrawerFromDom();
        }}
      >
        <div
          className={`flex items-center justify-between ${styles['side-drawer__header']}`}
        >
          <div>
            <h4 className={styles['side-drawer__header--heading']}>
              {headerTitle}
            </h4>
          </div>
          <div>
            <img
              src="/images/close.png"
              className={styles['side-drawer__header--close-icon']}
              onClick={closeDrawerByAnimation}
            />
          </div>
        </div>
        <div className={styles['side-drawer__body']}>{children}</div>
      </div>
      <div
        className={styles['side-drawer__backdrop']}
        onClick={closeDrawerByAnimation}
      />
    </>
  );
};

export default SideDrawerWrapper;
