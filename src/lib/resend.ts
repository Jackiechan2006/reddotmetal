const formspreeContactId = process.env.FORMSPREE_CONTACT_ID;
const formspreeQuoteId = process.env.FORMSPREE_QUOTE_ID;

export async function submitContactForm(data: any) {
  if (!formspreeContactId) throw new Error("FORMSPREE_CONTACT_ID not configured");
  return fetch(`https://formspree.io/f/${formspreeContactId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function submitQuoteForm(data: any) {
  if (!formspreeQuoteId) throw new Error("FORMSPREE_QUOTE_ID not configured");
  return fetch(`https://formspree.io/f/${formspreeQuoteId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
