'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { SkinConditions } from '@/types';

const LABELS: Record<keyof SkinConditions, string> = {
  oil: 'Minyak',
  dryness: 'Kering',
  hydration: 'Hidrasi',
  pores: 'Pori-pori',
  acne: 'Jerawat',
  redness: 'Kemerahan',
  texture: 'Tekstur',
};

export function SkinRadarChart({ conditions }: { conditions: SkinConditions }) {
  const data = (Object.keys(conditions) as (keyof SkinConditions)[]).map((key) => ({
    subject: LABELS[key],
    value: conditions[key],
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="hsl(214 32% 91%)" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar
          name="Kondisi Kulit"
          dataKey="value"
          stroke="hsl(217 91% 60%)"
          fill="hsl(217 91% 60%)"
          fillOpacity={0.35}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
