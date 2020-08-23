import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAlert } from 'react-alert';
import { FiMail, FiLock } from 'react-icons/fi';

import AuthPage from '../../components/AuthPage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useToken from '../../hooks/useToken';
import api from '../../services/api';
import styles from './login.module.scss';

interface Data {
  email: string;
  password: string;
}

export default function Login() {
  const { setToken } = useToken();
  const router = useRouter();
  const alert = useAlert();
  const [disableButton, setDisableButton] = useState(false);
  const [data, setData] = useState<Data>({
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
      .post('user/login', data)
      .then((response) => {
        setToken(response.data.token);
        router.push('/');
      })
      .catch((err: AxiosError) => {
        alert.show(err.response?.data?.message || 'Erro desconhecido');
        setDisableButton(false);
      });
  }

  return (
    <AuthPage
      title="Login"
      greeting="Olá, amigo!"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    >
      <form className={styles.form} onSubmit={submitData}>
        <h1>Login</h1>

        <fieldset>
          <Input
            Icon={FiMail}
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={changeData}
            required
          />

          <Input
            Icon={FiLock}
            type="password"
            name="password"
            minLength={8}
            placeholder="Senha"
            value={data.password}
            onChange={changeData}
            required
          />
        </fieldset>
        <Button type="submit" disabled={disableButton}>
          Entrar
        </Button>
      </form>
      <p className={styles.redirectSignup}>
        Ainda não possui uma conta?{' '}
        <Link href="/auth/signup">
          <a>Cadastre-se</a>
        </Link>
      </p>
    </AuthPage>
  );
}
