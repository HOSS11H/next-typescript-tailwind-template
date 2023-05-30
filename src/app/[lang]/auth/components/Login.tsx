'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { loginSchema } from '../formSchema';

import { signIn } from 'next-auth/react';

import { Button } from '@/app/[lang]/components/UI/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/[lang]/components/UI/form';
import { Input } from '@/app/[lang]/components/UI/input';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const Login = ({toggleVariant} : {toggleVariant: () => void}) => {

  const router = useRouter()

  const [ submitting, setSubmitting ] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isValid } = form.formState;

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSubmitting(true)
    signIn('credentials', {
      ...values,
      redirect: false,
    }).then((callback) => {
      setSubmitting(false);
      if (callback?.ok && !callback?.error) {
        router.replace('/')
        toast.success('Logged in');
        // router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    }).catch(error => {
      toast.error('Something went wrong')
    })
    .finally(() => {
      setSubmitting(false);
    });
  }
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input required placeholder="admin@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="********"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem> 
            )}
          />
        </div>
        <div className="pt-6 ">
          <Button disabled={!isValid || submitting} className="w-full" type="submit">
            Sign In
          </Button>
        </div>
      </form>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          New to Events?
        </div>
        <div onClick={toggleVariant} className="underline cursor-pointer">
          Create an account
        </div>
      </div>
    </Form>
  );
};

export default Login
