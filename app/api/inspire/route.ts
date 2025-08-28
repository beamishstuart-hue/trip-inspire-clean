// app/api/inspire/route.ts
export const runtime = 'nodejs';
export const maxDuration = 60;
// Ensure this endpoint is always dynamic (no static caching)
export const dynamic = 'force-dynamic';

type DayPlan = { morning: string; afternoon: string; evening: string };
type Trip = { city: string; country?: string; summary?: string; days: DayPlan[] };
type InspireResponse = { top3: Trip[] };

function sample(): InspireResponse {
  return {
    top3: [
      {
        city: "Lisbon",
        country: "Portugal",
        summary: "Compact hills, viewpoints, pastry culture; easy 4-day hop from London.",
        days: [
          { morning:"Pastéis de Belém", afternoon:"MAAT riverside walk", evening:"Bairro Alto dinner" },
          { morning:"Tram 28 ride", afternoon:"Tile workshop", evening:"Fado night" },
          { morning:"Day trip to Cascais", afternoon:"Boca do Inferno", evening:"Sunset viewpoint" },
          { morning:"LX Factory", afternoon:"Time Out Market", evening:"Waterfront stroll" }
        ]
      }
    ]
  };
}

export async function GET() {
  return new Response(JSON.stringify(sample()), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST(_req: Request) {
  // We ignore the body for now; just return the sample
  return new Response(JSON.stringify(sample()), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
