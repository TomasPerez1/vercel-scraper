"use client";

// Why use client here? I could have dumped this into its own client component,
// but this is simpler for the sake of the example!

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [result, setResults] = useState<object>();

  async function handleOnClick() {
    const response = await axios.post('/api/scraper', {
      siteUrl: 'https://casa.mercadolibre.com.ar/MLA-1454473537-casa-en-alquiler-permanente-5-amb-con-pileta-y-vista-al-lago-costa-del-sol-bariloche-_JM#polycard_client=search-nordic&position=1&search_layout=grid&type=item&tracking_id=e9835c76-676e-4694-bac2-6829ad1b6f31'
    });

    // const results = await fetch('/api/scraper', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     siteUrl: 'https://casa.mercadolibre.com.ar/MLA-1454473537-casa-en-alquiler-permanente-5-amb-con-pileta-y-vista-al-lago-costa-del-sol-bariloche-_JM#polycard_client=search-nordic&position=1&search_layout=grid&type=item&tracking_id=e9835c76-676e-4694-bac2-6829ad1b6f31'
    //   })
    // }).then(r => r.json()).catch(err => console.log("Then", err))
    setResults(response.data)
  }

  return (
    <main className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-8">Let&apos;s scrape something!</h1>
          <p className="mb-2">
            Click the button to test out your new scraper.
          </p>
          <div className='border-2'>
            <img src="https://public-chromium.s3.us-east-1.amazonaws.com/WIN_20240613_17_55_41_Pro.jpg" />
          </div>
          <p className="text-sm text-zinc-700 italic mb-6">
            Psst. Make sure you <a className="text-blue-500 underline" href="https://spacejelly.dev" target="_blank">build it first</a>!
          </p>
          <p className="mb-6">
            <button className="btn btn-primary" onClick={handleOnClick}>Get Started</button>
          </p>
          {result && (
            <div className="grid">
              <pre className="bg-gray-800 text-white text-left py-4 px-5 rounded overflow-x-scroll">
                <code>{JSON.stringify(result, undefined, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}