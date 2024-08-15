import { NextRequest, NextResponse } from "next/server";

const URL_REGEX = /^http[s]?:\/\/.*$/;

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url, "https://example.com");
  const mediumUrl = url.searchParams.get("url");

  if (!mediumUrl) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  if (!URL_REGEX.test(mediumUrl)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const res = await fetch(
    `https://tools.revesery.com/medium/process.php?articleLink=${encodeURIComponent(
      mediumUrl
    )}`,
    {
      referrer: "https://tools.revesery.com/medium/",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      },
    }
  );

  try {
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 400 }
    );
  }
};
