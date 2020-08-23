import React, { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
}

const Input: React.FC<Props> = ({ Icon, ...attrs }) => (
  <div className={styles.container}>
    <Icon />
    <input {...attrs} />
  </div>
);

export default Input;
