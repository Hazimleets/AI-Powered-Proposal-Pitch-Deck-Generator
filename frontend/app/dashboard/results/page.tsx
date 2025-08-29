/* frontend/app/dashboard/results/page.tsx */

'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { Card, CardHeader, CardContent, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
import PitchDeckViewer from './pitch-deck-viewer';

interface ProjectData {
  type: 'proposal' | 'pitch_deck';
  ai: Record<string, string>;
  formData: any;
  title: string;
  template: string;
}

export default function Results() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern'>('classic');

  useEffect(() => {
    const fetchResults = async () => {
      const token = Cookies.get('access_token');
      if (!token || !projectId) return setLoading(false);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/projects/${projectId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || 'Failed to load results');
        setData(result as ProjectData);
      } catch (err: any) {
        setError(err.message || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [projectId]);

  const handleDownload = async () => {
    if (!data) return;
    const token = Cookies.get('access_token');
    const endpoint =
      data.type === 'proposal'
        ? `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/generate/proposal/download/`
        : `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/generator/generate/pitchdeck/download/`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ project_id: projectId, template: selectedTemplate }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Download failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title}_${selectedTemplate}.${data.type === 'proposal' ? 'pdf' : 'pptx'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {data.type === 'proposal' ? 'Proposal' : 'Pitch Deck'} Results
      </h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Template:</label>
        <Select
          value={selectedTemplate}
          onValueChange={(value: string) => setSelectedTemplate(value as 'classic' | 'modern')}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.type === 'proposal' ? (
        <div>
          {Object.entries(data.ai).map(([key, value]) => (
            <Card key={key} className="mb-4">
              <CardHeader>{key.replace('_', ' ').toUpperCase()}</CardHeader>
              <CardContent>{value}</CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <PitchDeckViewer slides={data.ai} />
      )}

      <Button onClick={handleDownload} className="mt-4">
        Download {data.type === 'proposal' ? 'PDF' : 'PPTX'} ({selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)})
      </Button>
    </div>
  );
}
