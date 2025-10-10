'use server';

import { NextResponse } from "next/server";

// Set BREVO_API_KEY (required) and optionally BREVO_LIST_ID in your environment.

export async function POST(request: Request) {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = process.env.BREVO_LIST_ID;

    if (!brevoApiKey) {
      return NextResponse.json(
        {
          error:
            "Email subscription temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

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

    const payload: Record<string, unknown> = {
      email: trimmedEmail,
      updateEnabled: true,
    };

    if (brevoListId) {
      const parsedListId = Number.parseInt(brevoListId, 10);
      if (!Number.isNaN(parsedListId)) {
        payload.listIds = [parsedListId];
      }
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!brevoResponse.ok) {
      const data = await brevoResponse.json().catch(() => null);

      // Brevo returns 400 with errorCode "duplicate_parameter" if the contact already exists.
      const errorCode = data?.code ?? data?.errorCode;
      if (brevoResponse.status === 400 && errorCode === "duplicate_parameter") {
        return NextResponse.json({ success: true, duplicate: true });
      }

      throw new Error(
        data?.message ||
          data?.error ||
          `Brevo responded with status ${brevoResponse.status}`
      );
    }

    return NextResponse.json({ success: true, duplicate: false });
  } catch (error) {
    console.error("Failed to store subscriber", error);
    return NextResponse.json(
      { error: "Unable to save your email right now. Please try again later." },
      { status: 500 }
    );
  }
}
