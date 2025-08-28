'use client';
import React, { useState } from 'react';

type DayPlan = { morning: string; afternoon: string; evening: string };
type Trip = { city: string; country?: string; summary?: string; days: DayPlan[] };

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Trip[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch('/api/inspire', { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(Array.isArray(data?.top3) ? data.top3 : []);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{maxWidth: 720, margin: '32px auto', padding: 16}}>
      <h1>Trip Inspire (safe build)</h1>
      <form onSubmit={onSubmit}>
        <button type="submit">Fetch Sample</button>
      </form>
      {loading && <p>Working…</p>}
      {error && <p style={{color:'crimson'}}>{error}</p>}
      <div style={{marginTop:24}}>
        {results.map((trip, i) => (
          <div key={i} style={{marginBottom:24, border:'1px solid #ccc', padding:12}}>
            <h2>{trip.city}, {trip.country}</h2>
            <p>{trip.summary}</p>
            <ol>
              {trip.days.map((d, j) => (
                <li key={j}>
                  <div><strong>Morning:</strong> {d.morning}</div>
                  <div><strong>Afternoon:</strong> {d.afternoon}</div>
                  <div><strong>Evening:</strong> {d.evening}</div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </main>
  );
}
