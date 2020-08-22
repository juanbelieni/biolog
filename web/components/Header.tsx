import React from 'react';
import styles from './Header.module.scss'

const Header : React.FC = () =>  {
  return (
    <header className={styles.container}>
      <div className={styles.headerLeft}>
        <img src="/logo.svg" alt="logo" />
        <div className={styles.headerNav}>
          <a>Trabalhos</a>
          <a>Galeria</a>
        </div>
      </div>

      <div className={styles.headerRight}>
        <a className={styles.signin}>Cadastrar-se</a>
        <a className={styles.login}>Login</a>
      </div>
    </header>
  )
}

export default Header