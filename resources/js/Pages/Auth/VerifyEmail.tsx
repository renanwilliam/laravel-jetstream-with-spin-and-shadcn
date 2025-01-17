import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/shadcn/ui/card';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'));
  }

  return (
    <AuthenticationCard>
      <Head title="Email Verification" />

      <Card>
        <CardHeader>
          <CardDescription>
            Thanks for signing up! Before getting started, could you
            verify your email address by clicking on the link we
            just emailed to you? If you didn't receive the email, we
            will gladly send you another.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {status === 'verification-link-sent' && (
            <div className="mb-4 font-medium text-sm text-green-600">
              A new verification link has been sent to the email
              address you provided during registration.
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mt-4 flex items-center justify-between">
              <Button disabled={form.processing}>
                Resend Verification Email
              </Button>

              <div>
                <Link
                  href={route('profile.show')}
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Edit Profile
                </Link>
              </div>

              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log Out
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthenticationCard>
  );
}
