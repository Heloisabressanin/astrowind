import React, { useState, type FormEvent } from 'react';
// import { FormEvent, useState } from 'react';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);

    //  const response = await fetch('/api/feedback', {
    //    method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json',
    //    },
    //    body: formData,
    //  });
    //  const data = await response.json();
    //  console.log('data : ', data);
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });
    let data;
    if (response.headers.get('content-type')?.includes('text/html')) {
      const errorText = await response.text();
      data = { message: errorText };
    } else {
      data = await response.json();
    }
    console.log('data : ', data);

    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" autoComplete="name" required />
      </label>
      <label htmlFor="email">
        Email
        <input type="email" id="email" name="email" autoComplete="email" required />
      </label>
      <label htmlFor="message">
        Message
        <textarea id="message" name="message" autoComplete="off" required />
      </label>
      <button>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
