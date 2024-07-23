import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/shadcn/ui/card';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardDescription>
              This is a secure area of the application. Please
              confirm your password before continuing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                name="password"
                value={form.data.password}
                className="mt-1 block w-full"
                required
                autoComplete="current-password"
                autoFocus
                onChange={e => form.setData('password', e.currentTarget.value)}
              />

              <InputError className="mt-2" message={form.errors.password} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end mt-4">
            <Button className="ms-4" disabled={form.processing}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AuthenticationCard>
  );
}
