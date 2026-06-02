import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, FROM_EMAIL } from "@/lib/resend";

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

    if (resend) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: FROM_EMAIL,
        subject: `New Quote Request from ${data.companyName}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Company:</strong> ${data.companyName}</p>
          <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Metal Types:</strong> ${data.metalTypes.join(", ")}</p>
          <p><strong>Estimated Weight:</strong> ${data.estimatedWeight} kg</p>
          <p><strong>Pickup Address:</strong> ${data.pickupAddress}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Notes:</strong> ${data.notes || "N/A"}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
