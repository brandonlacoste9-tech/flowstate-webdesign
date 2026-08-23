import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "brandonlacoste9@gmail.com";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof json === "object" &&
    json !== null &&
    "company" in json &&
    typeof (json as { company?: unknown }).company === "string" &&
    (json as { company: string }).company.trim().length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ fallback: true });
  }

  const data = parsed.data;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Project: ${data.projectType}`,
    `Budget: ${data.budget}`,
    `Locale: ${data.locale ?? "n/a"}`,
    "",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0b1220">
      <h2 style="margin:0 0 12px;font-size:18px">New Flowstate inquiry</h2>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin:0 0 8px"><strong>Project:</strong> ${escapeHtml(data.projectType)}</p>
      <p style="margin:0 0 8px"><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
      <p style="margin:0 0 16px"><strong>Locale:</strong> ${escapeHtml(data.locale ?? "n/a")}</p>
      <div style="padding:12px 14px;background:#f4f7fb;border-radius:10px;white-space:pre-wrap">${escapeHtml(data.message)}</div>
    </div>
  `;

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Flowstate <onboarding@resend.dev>";
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from,
    to: [TO_EMAIL],
    replyTo: data.email,
    subject: `[Flowstate] ${data.projectType} — ${data.name}`,
    text,
    html,
  });

  if (result.error) {
    console.error(result.error);
    return NextResponse.json({ fallback: true });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
