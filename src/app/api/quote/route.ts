import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitQuoteForm } from "@/lib/resend";

const schema = z.object({
  companyName: z.string().min(1),
  contactPerson: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  metalTypes: z.array(z.string()).min(1),
  estimatedWeight: z.string().min(1),
  pickupAddress: z.string().min(1),
  preferredDate: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await submitQuoteForm(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
