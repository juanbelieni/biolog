import React, { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...attrs
}) => (
  <button className={styles.container} {...attrs}>
    {children}
  </button>
);

export default Button;
