//frontend/app/dashboard/create/page.tsx

'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';
import { templates } from './templates';

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Card,
  CardHeader,
  CardContent
} from '@/components/ui';

export default function Create() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const documentType = searchParams.get('type') || 'proposal';

  const [formData, setFormData] = useState({
    company: '',
    industry: 'technology',
    projectDescription: '',
    targetMarket: '',
    budget: '',
    goals: '',
    competitors: '',
    template: 'classic',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projectId, setProjectId] = useState<number | null>(null);

  const token = Cookies.get('access_token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint =
        documentType === 'proposal'
          ? `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/generate/proposal/`
          : `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/generate/pitchdeck/`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setProjectId(data.project_id);
        router.push(`/dashboard/results?id=${data.project_id}`);
      } else {
        setError(data.message || data.error || 'Generation failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!projectId) return;

    const downloadEndpoint =
      documentType === 'proposal'
        ? `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/generate/proposal/download/`
        : `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/generate/pitchdeck/download/`;

    try {
      const res = await fetch(downloadEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Download failed');
      }

      const blob = await res.blob();
      const filename = `${formData.company}_${formData.template}.${documentType === 'proposal' ? 'pdf' : 'pptx'}`;
      saveAs(blob, filename);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <h2>Create {documentType === 'proposal' ? 'Proposal' : 'Pitch Deck'}</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="mb-4"
          />

          <Select
            value={formData.industry}
            onValueChange={(value) => setFormData({ ...formData, industry: value })}
            defaultValue="technology"
          >
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Project Description"
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            className="mb-4"
          />
          <Input
            placeholder="Target Market"
            value={formData.targetMarket}
            onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
            className="mb-4"
          />
          <Input
            placeholder="Budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="mb-4"
          />
          <Input
            placeholder="Goals"
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            className="mb-4"
          />
          <Input
            placeholder="Competitors (optional)"
            value={formData.competitors}
            onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
            className="mb-4"
          />

          {/* Template Selector */}
          <Select
            value={formData.template}
            onValueChange={(value) => setFormData({ ...formData, template: value })}
          >
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {(templates[documentType] || []).map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full mb-2">
            {loading ? 'Generating...' : 'Generate'}
          </Button>

          {projectId && (
            <Button onClick={handleDownload} className="w-full">
              Download {documentType === 'proposal' ? 'PDF' : 'PPTX'}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
