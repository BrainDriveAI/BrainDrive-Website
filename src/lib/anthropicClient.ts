type AnthropicMessageResponse = {
  content?: Array<{ text?: string }>;
};

type AnthropicOptions = {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
};

export async function callAnthropicForText(
  options: AnthropicOptions
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const endpoint =
    process.env.ANTHROPIC_API_URL ?? "https://api.anthropic.com/v1/messages";
  const model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest";

  const body = {
    model,
    max_tokens: options.maxTokens ?? 400,
    temperature: options.temperature ?? 0.2,
    system: options.system,
    messages: [{ role: "user", content: options.user }],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(
        `Anthropic API responded with status ${response.status}: ${errText}`
      );
      return null;
    }

    const data = (await response.json()) as AnthropicMessageResponse;
    const text = data.content?.[0]?.text;
    return typeof text === "string" && text.trim().length > 0
      ? text.trim()
      : null;
  } catch (error) {
    console.error("Anthropic request failed", error);
    return null;
  }
}
