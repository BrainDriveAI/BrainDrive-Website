import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "free-guide-subscribers.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(SUBSCRIBERS_FILE);
  } catch {
    await fs.writeFile(SUBSCRIBERS_FILE, "[]", "utf8");
  }
}

export async function POST(request: Request) {
  try {
    await ensureStore();

    const { email } = (await request.json().catch(() => ({}))) as {
      email?: string;
    };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(SUBSCRIBERS_FILE, "utf8");
    const subscribers: Array<{ email: string; subscribedAt: string }> =
      JSON.parse(fileContent);

    const alreadySubscribed = subscribers.some(
      (subscriber) => subscriber.email === trimmedEmail
    );

    if (!alreadySubscribed) {
      subscribers.push({
        email: trimmedEmail,
        subscribedAt: new Date().toISOString(),
      });
      await fs.writeFile(
        SUBSCRIBERS_FILE,
        JSON.stringify(subscribers, null, 2),
        "utf8"
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to store subscriber", error);
    return NextResponse.json(
      { error: "Unable to save your email right now. Please try again later." },
      { status: 500 }
    );
  }
}
