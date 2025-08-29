/* frontend/app/login/page.tsx */

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button, Input, Card, CardHeader, CardContent } from '@/components/ui';

export default function Login() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, password }),
      });
      const data = await response.json();
      console.log('Login Response:', data);
      if (response.ok) {
        Cookies.set('access_token', data.access, { expires: 7 });
        router.push('/dashboard');
      } else {
        setError(data.detail || data.error || JSON.stringify(data) || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to the server: ' + (err instanceof Error ? err.message : 'Unknown error'));
      console.error('Login Error:', err);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2>Sign In</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredential(e.target.value)}
            className="mb-4"
            autoComplete="off"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="mb-4"
            autoComplete="new-password"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-center">
          No account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </CardContent>
    </Card>
  );
}