'use client';

import { useCallback, useState } from 'react';
import Login from './Login';
import Register from './Register';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('REGISTER');

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return variant === 'LOGIN' ? <Login toggleVariant={toggleVariant} /> : <Register toggleVariant={toggleVariant} />
};

export default AuthForm;
