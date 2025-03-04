import { NextRequest, NextResponse } from "next/server";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const run = await client.actor("8NmXJISbPNjQiPYCz").call({
      cookies: process.env.APIFY_SESSION_ID,
      username,
    });

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Apify API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
