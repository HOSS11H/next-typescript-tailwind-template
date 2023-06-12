'use client';

import { useCallback, useState } from 'react';
import Login from './Login';
import Register from './Register';

type Variant = 'LOGIN' | 'REGISTER';

interface AuthFormProps {
  lang: string | undefined
}

const AuthForm = ({lang} : AuthFormProps) => {
  const [variant, setVariant] = useState<Variant>('REGISTER');

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return variant === 'LOGIN' ? <Login lang={lang} toggleVariant={toggleVariant} /> : <Register lang={lang} toggleVariant={toggleVariant} />
};

export default AuthForm;
