'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const [encoded, setEncoded] = useState('');

  const handleEncode = async () => {
    try {
      const res = await fetch('https://enigmawebsitebackend-1.onrender.com/encode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setEncoded(data.encoded);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      {/* Navigation tabs */}

      <div className="fixed top-40 left-0 w-full p-4 shadow z-50">
        <div className="flex gap-4 justify-center">
          <Link href="/decoder" className="px-4 py-2 rounded bg-gray-900 hover:bg-gray-800">
            Bombe Machine
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold -mt-2">Emily's Enigma Emulator</h1>

      <div className="max-w-md w-full bg-black-100 p-6 rounded-2xl shadow flex flex-col gap-8 -mt-8">
        {/* <h2 className="text-lg font-semibold">Your message:</h2> */}
        <input
          type="text"
          placeholder="Type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded bg-gray-900 text-white p-3 text-sm resize-vertical"
        />
        <button
          onClick={handleEncode}
          className="bg-gray-900 text-white p-2 rounded"
        >
          Encode
        </button>
        {encoded && (
          <div>
            <h3 className="font-semibold mt-2">Encoded message:</h3>
            <p className="break-words">{encoded}</p>
          </div>
        )}
      </div>
    </main>
  );
}