import React from 'react';
import { AlertComponentPropsWithStyle } from 'react-alert';

import styles from './AlertTemplate.module.scss';

const AlertTemplate: React.ComponentType<AlertComponentPropsWithStyle> = ({
  style,
  options,
  message,
  close,
}) => (
  <div style={style} className={styles.container}>
    {/* {options.type === 'info' && '!'}
    {options.type === 'success' && ':)'}
    {options.type === 'error' && ':('} */}
    {message}
    <button onClick={close}>X</button>
  </div>
);

export default AlertTemplate;
