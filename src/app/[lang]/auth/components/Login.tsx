'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { loginSchema } from '../formSchema';

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


const Login = ({toggleVariant} : {toggleVariant: () => void}) => {
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
    console.log(values);
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
          <Button disabled={!isValid} className="w-full" type="submit">
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
