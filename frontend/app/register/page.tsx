/* frontend/app/register/page.tsx */

'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardHeader, CardContent } from '@/components/ui';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form inputs on mount to clear any browser-cached values
  useEffect(() => {
    setEmail('');
    setUsername('');
    setPassword('');
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      console.log('Register Response:', data);
      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.error || data.email?.[0] || data.username?.[0] || JSON.stringify(data) || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to connect to the server: ' + (err instanceof Error ? err.message : 'Unknown error'));
      console.error('Register Error:', err);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2>Create Account</h2>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="mb-4"
            autoComplete="off"
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
            Create Account
          </Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Sign In</a>
        </p>
      </CardContent>
    </Card>
  );
}