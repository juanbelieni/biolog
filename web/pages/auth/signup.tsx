import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { useAlert } from 'react-alert';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

import AuthPage from '../../components/AuthPage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useToken from '../../hooks/useToken';
import api from '../../services/api';
import styles from './signup.module.scss';

interface Data {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const { setToken } = useToken();
  const router = useRouter();
  const alert = useAlert();
  const [disableButton, setDisableButton] = useState(false);

  const [data, setData] = useState<Data>({
    name: '',
    email: '',
    password: '',
  });

  function changeData(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  }

  function submitData(event: FormEvent) {
    event.preventDefault();
    setDisableButton(true);
    api
      .post('auth/signup', data)
      .then((response) => {
        setToken(response.data.token);
        router.push('/auth/login');
      })
      .catch((err: AxiosError) => {
        alert.show(err.response?.data?.message || 'Erro desconhecido');
        setDisableButton(false);
      });
  }

  return (
    <AuthPage
      title="Cadastre-se"
      greeting="Bem-vindo de volta!"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    >
      <form className={styles.form} onSubmit={submitData}>
        <h1>Cadastre-se</h1>

        <fieldset>
          <Input
            Icon={FiUser}
            type="text"
            name="name"
            minLength={4}
            placeholder="Nome"
            onChange={changeData}
            required
          />

          <Input
            Icon={FiMail}
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeData}
            required
          />

          <Input
            Icon={FiLock}
            type="password"
            name="password"
            minLength={8}
            placeholder="Senha"
            onChange={changeData}
            required
          />
        </fieldset>
        <Button type="submit" disabled={disableButton}>
          Entrar
        </Button>
      </form>
      <p className={styles.navigateToLogin}>
        Já possui uma conta?{' '}
        <Link href="/auth/login">
          <a>Login</a>
        </Link>
      </p>
    </AuthPage>
  );
}
