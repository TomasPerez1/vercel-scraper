"use client";

// Why use client here? I could have dumped this into its own client component,
// but this is simpler for the sake of the example!

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [result, setResults] = useState<object>();
  const [siteUrl, setSiteUrl] = useState("https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-impecable-departamento-en-alquiler-permanente-54509063.html")


  async function handleOnClick() {
    console.log(siteUrl)
    
    const property = await  axios.post('/api/scraper/mercado-libre', {
      siteUrl
    })
    console.log("UNA PROPERTY", property.data)
    setResults(property.data)
  }

   async function handleZp() {
    console.log(siteUrl)
    
    const property = await  axios.post('/api/scraper/zona-prop', {
      siteUrl
    })
    console.log("UNA PROPERTY", property.data)
    setResults(property.data)
    // const buffer = property.data.screenshot; // Recibe el Buffer
    // const blob = new Blob([buffer], { type: 'image/png' }); // Crea un Blob a partir del Buffer
    // const url = URL.createObjectURL(blob); 
    // console.log("URL GENERADA")
    // setScreenshot(url)
  }
  

  async function handleOnClickAll() {
    const _urls2 = [
  'https://casa.mercadolibre.com.ar/MLA-1454473537-casa-en-alquiler-permanente-5-amb-con-pileta-y-vista-al-lago-costa-del-sol-bariloche-_JM#polycard_client=search-nordic&position=1&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1935164278-duplex-2-dormitorios-en-alquiler-permanente-en-km-5-contrato-por-8-meses-con-pago-anticipado-del-total-del-contrato-opcion-de-renovacion-en-iguales-terminos-_JM#polycard_client=search-nordic&position=2&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1941903856-alquiler-temporal-casa-3-amb-km-12-bariloche-_JM#polycard_client=search-nordic&position=3&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1940537574-alquiler-temporal-6-meses1-ano-cabana-en-san-carlos-de-bariloche-barrio-llao-llao-_JM#polycard_client=search-nordic&position=4&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1939933606-amplia-comoda-y-con-hermosa-vista-al-lago-_JM#polycard_client=search-nordic&position=5&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',   
  'https://casa.mercadolibre.com.ar/MLA-1456463289-alquiler-temporario-casa-de-categoria-_JM#polycard_client=search-nordic&position=6&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',       
  'https://casa.mercadolibre.com.ar/MLA-1455097391-casa-en-alquiler-ideal-para-renta-turistica-hostel-_JM#polycard_client=search-nordic&position=7&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1931322930-casa-en-alquiler-altos-del-pinar-bariloche-_JM#polycard_client=search-nordic&position=8&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',  
  'https://casa.mercadolibre.com.ar/MLA-1442153521-alquiler-en-barrio-las-vertientes-bariloche-_JM#polycard_client=search-nordic&position=9&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86', 
  'https://casa.mercadolibre.com.ar/MLA-1885211058-alquiler-permanente-excelente-casa-con-acceso-al-lago-amoblada-a-5-minutos-del-centro-quincho-_JM#polycard_client=search-nordic&position=10&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',     
  'https://casa.mercadolibre.com.ar/MLA-1448229099-casa-en-alquiler-temporal--_JM#polycard_client=search-nordic&position=11&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1450483717-casa-en-alquiler-permanente-barrio-cerrado-_JM#polycard_client=search-nordic&position=12&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86', 
  'https://casa.mercadolibre.com.ar/MLA-1448085241-casa-en-alquiler-temporal-san-carlos-de-bariloche-_JM#polycard_client=search-nordic&position=13&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1450483697-alquiler-permanente-en-bariloche-_JM#polycard_client=search-nordic&position=14&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1455150127-casa-en-alquiler-permanente-villa-los-coihues-exclusivo-para-empresas-_JM#polycard_client=search-nordic&position=15&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1452695557-casa-de-2-dormitorios-con-vista-al-lago-en-el-km-6-bariloch-_JM#polycard_client=search-nordic&position=16&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1931310562-alquiler-permanente-casa-3-dormitorios-amoblada-barrio-las-margaritas-bariloche-_JM#polycard_client=search-nordic&position=17&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1928171350-cabana-en-alquiler-permanente-en-bariloche-_JM#polycard_client=search-nordic&position=18&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86', 
  'https://casa.mercadolibre.com.ar/MLA-1877384580-cabana-en-alquiler-por-1-ano-solo-parejas-o-persona-sola-sin-mascotas-_JM#polycard_client=search-nordic&position=19&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1932617880-alquiler-de-casa-en-lomas-del-cauquen-_JM#polycard_client=search-nordic&position=20&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',      
  'https://casa.mercadolibre.com.ar/MLA-1450916767-casa-en-alquiler-comercial-bariloche-_JM#polycard_client=search-nordic&position=21&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',       
  'https://casa.mercadolibre.com.ar/MLA-1923211672-alquiler-cabana-a-estrenar-_JM#polycard_client=search-nordic&position=22&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1455765521-casa-de-3-dormitorios-2banos-living-comedor-y-cocina--_JM#polycard_client=search-nordic&position=23&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1927469304-cabana-alquiler-bariloche-_JM#polycard_client=search-nordic&position=24&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1455033481-casa-alq-turistico-permanente-o-comercial-ideal-hostel-_JM#polycard_client=search-nordic&position=25&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1928221072-casa-en-alquiler-solo-enero-para-6-personas-en-bariloche-_JM#polycard_client=search-nordic&position=26&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86',
  'https://casa.mercadolibre.com.ar/MLA-1454843591-alquiler-permanente-monoambiente-b-frutillar-_JM#polycard_client=search-nordic&position=27&search_layout=grid&type=item&tracking_id=2b39b4a1-67ed-4e1c-afdb-bf56fb253f86'
]
    const promises = _urls2.map(url => {
      return axios.post('/api/scraper/mercado-libre', {
      siteUrl: url
    })
    });
    console.log("promises", promises)
    const responses = await Promise.all(promises)
    console.log("responses", responses)
    const parsed = responses.map(res => res.data)
    setResults(parsed)
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
          <input type="text" onChange={(evt) => setSiteUrl(evt.target.value)} />
          {/* <p className="mb-6">
            <button className="btn btn-primary" onClick={handleOnClickAll}>SCRAP ALL</button>
          </p> */}
          <p className="mb-6">
            <button className="btn  btn-primary" onClick={handleZp}>SCRAP ONE</button>
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