//frontend/app/dashboard/page.tsx

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

type User = {
  id: number;
  username: string;
  email: string;
};

type Project = {
  id: number;
  title: string;
  type: string;
  created_at: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('access_token');
      try {
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/auth/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();
        setUser(userData);

        const projectsResponse = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/projects/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.username || 'User'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>Create Proposal</CardHeader>
          <CardContent>
            <Link href="/dashboard/create?type=proposal">
              <Button>New Proposal</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Create Pitch Deck</CardHeader>
          <CardContent>
            <Link href="/dashboard/create?type=pitch_deck">
              <Button>New Pitch Deck</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-xl mt-8">Recent Projects</h2>
      {projects.length ? (
        <ul className="mt-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 mb-2 rounded">
              <Link href={`/dashboard/results?id=${project.id}`}>
                {project.title} ({project.type}) - {new Date(project.created_at).toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects yet.</p>
      )}
    </div>
  );
}
