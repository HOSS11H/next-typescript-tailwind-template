'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { registerSchema } from '../formSchema';

import { signIn } from 'next-auth/react';

import axios from 'axios';

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

import { toast } from 'react-toastify';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"

interface RegisterProps {
  lang: string | undefined;
  toggleVariant: () => void
}


const Register = ({toggleVariant, lang} : RegisterProps) => {

  const { update } = useSession()

  const router = useRouter()

  const [ submitting, setSubmitting ] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { isValid } = form.formState;

  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSubmitting(true);
    axios
      .post('/api/register', values)
      .then(() => signIn('credentials', {
          ...values,
          redirect: false,
        })
      )
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          toast.success('Registered!');
          update()
          router.push('/')
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input required placeholder="shadcn" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
            Creat Account
          </Button>
        </div>
      </form>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>Already have an account?</div>
        <div onClick={toggleVariant} className="underline cursor-pointer">
        Login
        </div>
      </div>
    </Form>
  );
};

export default Register
