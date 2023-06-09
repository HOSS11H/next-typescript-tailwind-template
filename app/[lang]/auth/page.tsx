'use client';

import { Button } from '@/app/[lang]/components/UI/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/[lang]/components/UI/card';
import { Icons } from '@/app/[lang]/components/UI/icons';
import AuthForm from './components/AuthForm';

import { signIn } from 'next-auth/react';

export default async function Auth({params: { lang }} : { params : { lang : string | undefined }} ) {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container">
        <Card className="max-w-lg  mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" onClick={() => signIn('github')}>
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" onClick={() => signIn('google')}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <AuthForm lang={lang} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
