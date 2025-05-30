"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2300,
  },
  {
    name: "Mar",
    total: 3200,
  },
  {
    name: "Apr",
    total: 3800,
  },
  {
    name: "May",
    total: 4100,
  },
  {
    name: "Jun",
    total: 4300,
  },
  {
    name: "Jul",
    total: 4700,
  },
  {
    name: "Aug",
    total: 5200,
  },
  {
    name: "Sep",
    total: 5600,
  },
  {
    name: "Oct",
    total: 6100,
  },
  {
    name: "Nov",
    total: 6500,
  },
  {
    name: "Dec",
    total: 7000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value: number) => [`$${value}`, 'Revenue']}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            fontSize: '12px'
          }}
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}