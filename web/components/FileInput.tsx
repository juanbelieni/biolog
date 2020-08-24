import React, {
  MouseEvent,
  InputHTMLAttributes,
  ChangeEvent,
  useRef,
  useState,
} from 'react';
import { FiUpload, FiCheck } from 'react-icons/fi';

import styles from './FileInput.module.scss';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange(file: File | undefined): void;
}

const FileInput: React.FC<Props> = ({ onChange, ...attrs }) => {
  const [filename, setFilename] = useState<string>();
  const hiddenFileInput = useRef(null);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    hiddenFileInput.current.click();
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0] as File | undefined;
    if (file) {
      setFilename(file?.name);
      onChange(file);
    }
  };
  return (
    <div
      className={`${styles.container} ${filename ? styles.filled : ''}`}
      onClick={handleClick}
    >
      {filename ? <FiCheck /> : <FiUpload />}
      <p>{filename || 'Enviar arquivo'}</p>
      <input
        {...attrs}
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileInput;
