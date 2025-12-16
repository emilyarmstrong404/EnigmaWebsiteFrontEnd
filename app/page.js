'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const [encoded, setEncoded] = useState('');
  const [loading, setLoading] = useState(false);

  const [keys, setKeys] = useState(['', '', '']);

  const handleKeyChange = (index, value) => {
    if (!/^[a-zA-Z]?$/.test(value)) return;
  
    const updatedKeys = [...keys];
    updatedKeys[index] = value.toUpperCase();
    setKeys(updatedKeys);
  };

  const handleEncode = async () => {
    setLoading(true);
    setEncoded('');

    try {
      const res = await fetch(
        'https://enigmawebsitebackend-1.onrender.com/encode',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            keys, // <-- three-letter input sent here
          }),
        }
      );

      const data = await res.json();
      setEncoded(data.encoded);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      {/* Navigation tabs */}
      <div className="fixed top-40 left-0 w-full p-4 shadow z-50">
        <div className="flex gap-4 justify-center">
          <Link
            href="/decoder"
            className="px-4 py-2 rounded bg-gray-900 hover:bg-gray-800"
          >
            Bombe Machine
          </Link>
        </div>
      </div>

      <h1 className="text-2xl font-semibold -mt-2">
        Emily's Enigma Emulator
      </h1>

      <div className="max-w-md w-full bg-black-100 p-6 rounded-2xl shadow flex flex-col gap-6 -mt-8">
        {/* Key Inputs */}
        <div className="flex justify-center gap-3">
          {keys.map((key, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={key}
              onChange={(e) => handleKeyChange(i, e.target.value)}
              className="w-12 h-12 text-center text-lg font-semibold border rounded bg-gray-900 text-white"
            />
          ))}
        </div>

        {/* Main Message Input */}
        <input
          type="text"
          placeholder="Type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded bg-gray-900 text-white p-3 text-sm"
        />

        <button
          onClick={handleEncode}
          disabled={loading}
          className={`bg-gray-900 text-white p-2 rounded transition 
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Encoding...' : 'Encode'}
        </button>

        {loading && (
          <p className="text-sm text-gray-400">Loading...</p>
        )}

        {!loading && encoded && (
          <div>
            <h3 className="font-semibold mt-2">Encoded message:</h3>
            <p className="break-words">{encoded}</p>
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold">
        Input alphabetic characters only with no spaces
      </h2>
    </main>
  );
}