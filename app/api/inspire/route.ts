// app/api/inspire/route.ts
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST() {
  return new Response(JSON.stringify({
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
  }), { status: 200, headers: { "Content-Type": "application/json" }});
}
