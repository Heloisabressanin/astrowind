// pages/api/sendEmail.js
import sgMail from '@sendgrid/mail';
import type { APIRoute } from 'astro';
import { contactSchema } from '~/utils/zod/contactSchema';

sgMail.setApiKey(import.meta.env.apiKey);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const result = contactSchema.safeParse(data);
  if (!result.success) return new Response(JSON.stringify({ message: 'Data not validated' }), { status: 500 });

  const msg = {
    to: 'vincent.chabran@hotmail.fr',
    from: 'vincent@helloworldapp.fr',
    templateId: 'd-12ee658aa0974aa99c383a9a56a08cb1',
    dynamicTemplateData: {
      subject: 'A essayer de vous contacter ' + result.data.email,

      name: result.data.name,
      email: result.data.email,
      text: result.data.message,
    },
  };

  try {
    await sgMail.send(msg);
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Email not sent ' }), { status: 500 });
  }
};
