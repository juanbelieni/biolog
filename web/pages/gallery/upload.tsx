import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAlert } from 'react-alert';
import { FiTag } from 'react-icons/fi';

import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import Input from '../../components/Input';
import Page from '../../components/Page';
import useToken from '../../hooks/useToken';
import api from '../../services/api';
import styles from './upload.module.scss';

interface Data {
  name: string;
  image?: File;
}

const Gallery: React.FC = () => {
  const [disableButton, setDisableButton] = useState(false);
  const [data, setData] = useState<Data>({
    name: '',
  });

  const { token } = useToken();
  const router = useRouter();
  const alert = useAlert();

  function changeData(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  }

  function changeImage(image: File) {
    setData((oldData) => ({
      ...oldData,
      image,
    }));
  }

  function submitData(event: FormEvent) {
    event.preventDefault();
    setDisableButton(true);

    const { name, image } = data;

    const formData = new FormData();
    formData.append('name', name);

    if (image) {
      formData.append('image', image);
    }

    api
      .post('image', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        router.push('/gallery');
      })
      .catch((err: AxiosError) => {
        alert.show(err.response?.data?.message || 'Erro desconhecido');
        setDisableButton(false);
      });
  }

  return (
    <Page title="Galeria">
      <h1 className={styles.title}>Enviar imagem</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <form className={styles.form} onSubmit={submitData}>
        <fieldset>
          <div className={styles.inputs}>
            <Input
              Icon={FiTag}
              type="text"
              name="name"
              minLength={4}
              placeholder="Nome"
              value={data.name}
              onChange={changeData}
              required
            />
            <FileInput onChange={changeImage} required />
          </div>
        </fieldset>
        <Button type="submit" disabled={disableButton}>
          Enviar
        </Button>
      </form>
    </Page>
  );
};

export default Gallery;
