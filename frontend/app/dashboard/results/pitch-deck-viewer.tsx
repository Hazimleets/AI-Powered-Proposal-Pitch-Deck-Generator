/* frontend/app/dashboard/results/pitch-deck-viewer.tsx */

'use client';
'use client';
import { Card, CardHeader, CardContent } from '@/components/ui';

interface PitchDeckViewerProps {
  slides: Record<string, string>;
}

export default function PitchDeckViewer({ slides }: PitchDeckViewerProps) {
  return (
    <div>
      {Object.entries(slides || {}).map(([key, value]) => (
        <Card key={key} className="mb-4">
          <CardHeader>{key.replace('_', ' ').toUpperCase()}</CardHeader>
          <CardContent>{value}</CardContent>
        </Card>
      ))}
    </div>
  );
}

