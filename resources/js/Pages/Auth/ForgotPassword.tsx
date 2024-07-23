import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/shadcn/ui/card';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.email'));
  }

  return (
    <AuthenticationCard>
      <Head title="Forgot Password" />

      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardDescription>
              Forgot your password? No problem. Just let us know
              your email address and we will email you a password
              reset link that will allow you to choose a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <div className="mb-4 font-medium text-sm text-green-600">
                {status}
              </div>
            )}
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              value={form.data.email}
              onChange={e => form.setData('email', e.currentTarget.value)}
              autoFocus
            />

            <InputError className="mt-2" message={form.errors.email} />
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button disabled={form.processing}>
              Email Password Reset Link
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AuthenticationCard>
  );
}
