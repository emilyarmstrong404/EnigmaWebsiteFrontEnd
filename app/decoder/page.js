'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function About() {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResults(null); 
    try {
      const res = await fetch('https://enigmawebsitebackend-1.onrender.com/crib', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plaintext, ciphertext }),
      });
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-6 ">
      {/* Navigation */}
      <div className="fixed top-40 left-0 w-full p-4 shadow z-50">
        <div className="flex gap-4 justify-center">
          <Link href="/" className="px-4 py-2 rounded bg-gray-900 hover:bg-gray-800">
            Enigma Machine
          </Link>
        </div>
      </div>

      <h1 className="text-2xl font-semibold">Emily's Bombe Emulator</h1>

      {/* Form */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Ciphertext"
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          className="w-full border rounded bg-gray-900 text-white p-3 text-sm resize-vertical"
        />
        <input
          type="text"
          placeholder="Plaintext (crib)"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="w-full border rounded bg-gray-900 text-white p-3 text-sm resize-vertical"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-gray-900 text-white p-2 rounded transition 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Decoding...' : 'Decode'}
        </button>
      </div>

      {/* Loading / Results */}
      {isLoading ? (
        <p className="mt-4 text-gray-500">Loading results...</p>
      ) : results && results.length > 0 ? (
        <div className="mt-4 w-full max-w-md">
          {results.map((r, idx) => (
            <div key={idx} className="p-2 border rounded mb-2">
              <p><strong>Offset:</strong> {r.offset}</p>
              <p><strong>Rotors:</strong> L-{r.rotor_positions.left}, M-{r.rotor_positions.middle}, R-{r.rotor_positions.right}</p>
              <p><strong>Decoded message:</strong></p>
              <p className="break-words">{r.decoded}</p>
            </div>
          ))}
        </div>
      ) : results && results.length === 0 ? (
        <p className="mt-4 text-gray-500">No results found</p>
      ) : null}


      <h2 className="text-lg font-semibold">Input alphabetic characters only with no spaces</h2>
    </main>
  );
}