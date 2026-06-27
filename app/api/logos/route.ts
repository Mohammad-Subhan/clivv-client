import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  // Use the secret key on the server side
  const secretKey = process.env.LOGO_DEV_SECRET_KEY || process.env.NEXT_PUBLIC_LOGO_DEV_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Logo.dev secret key is not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.logo.dev/search?q=${encodeURIComponent(q)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from Logo.dev" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
