// import type { APIRoute } from 'astro';

// export const POST: APIRoute = async ({ request }) => {
//   const data = await request.formData();
//   const name = data.get('name');
//   const email = data.get('email');
//   const message = data.get('message');
//   // Validate the data - you'll probably want to do more than this
//   if (!name || !email || !message) {
//     return new Response(
//       JSON.stringify({
//         message: 'Missing required fields',
//       }),
//       { status: 400 }
//     );
//   }
//   console.log(name, email, message);

//   // Do something with the data, then return a success response
//   return new Response(
//     JSON.stringify({
//       message: 'Success!',
//     }),
//     { status: 200 }
//   );
// };

import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

// Set up SendGrid with your API key
sgMail.setApiKey('');

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  console.log(name, email, message);

  const emailString = email.toString();
  // Construct the email
  const msg = {
    to: '',
    from: '', // Change this to your verified sender
    subject: 'Subject of your email',
    text: `Hello ${name},\n\n${message}`,
  };

  try {
    // Send the email using SendGrid
    await sgMail.send(msg);

    // If the email was sent successfully, return a success response
    return new Response(
      JSON.stringify({
        message: 'Email sent successfully!',
      }),
      { status: 200 }
    );
  } catch (error) {
    // If there was an error sending the email, return an error response
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to send email',
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
