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

  }


  async function handleOnClickAll() {

    const _urls2 = [
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-impecable-departamento-en-alquiler-permanente-54509063.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-en-alquiler-permanente-54657596.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-temporal-2-dorm.-54051639.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-bariloche.-alquiler-por-2-a-6-54701171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-monoambiente-en-alquiler-en-kilom-54767936.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-52718960.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54795020.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamentos-y-cocheras-54765428.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-barrio-belgrano-alquiler-permanente.-51024990.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-pajaro-azul-bariloche-54138723.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-depto-c-costa-de-lago-bustillouno-1-dorm-54583309.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-barrio-belgrano-vista-un-dormitorio-54764075.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-145-54679465.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-permanenete-54678858.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-51856744.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-dto-1-dorm-en-barrio-cerrado-con-costa-al-lago-nahuel-52845203.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54588181.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-las-marias-bariloche-53854352.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-permanente-bariloche-54707171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-monohambiente-centrico-54089625.html',        
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-dpto.-en-el-centro-con-expensan-y-servicios-incluidos-53904315.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-departamento-bariloche-solo-turismo-contactarse-53286493.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-divino-monoambiente-54594101.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-impecable-departamento-en-alquiler-permanente-54509063.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-en-alquiler-permanente-54657596.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-temporal-2-dorm.-54051639.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-bariloche.-alquiler-por-2-a-6-54701171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-monoambiente-en-alquiler-en-kilom-54767936.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-52718960.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54795020.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamentos-y-cocheras-54765428.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-barrio-belgrano-alquiler-permanente.-51024990.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-pajaro-azul-bariloche-54138723.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-depto-c-costa-de-lago-bustillouno-1-dorm-54583309.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-barrio-belgrano-vista-un-dormitorio-54764075.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-145-54679465.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-permanenete-54678858.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-51856744.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-dto-1-dorm-en-barrio-cerrado-con-costa-al-lago-nahuel-52845203.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54588181.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-las-marias-bariloche-53854352.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-permanente-bariloche-54707171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-monohambiente-centrico-54089625.html',        
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-dpto.-en-el-centro-con-expensan-y-servicios-incluidos-53904315.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-departamento-bariloche-solo-turismo-contactarse-53286493.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-divino-monoambiente-54594101.html'
    ]
      const promises = _urls2.map(url => {
        return axios.post('/api/scraper/zona-prop', {
        siteUrl: url
      })
    });
    console.log("promises", promises)
    const responses = await Promise.all(promises)
    console.log("responses", responses)
    const okRes = responses.filter(r => r.data.isAvaliable === true).length
    const failedRes = responses.filter(r => r.data.isAvaliable === false).length

    console.log("OK RES", okRes)
    console.log("FAILED RES", failedRes)


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
          <div className='flex gap-4'>

          <p className="mb-6">
            <button className="btn btn-primary" onClick={handleOnClickAll}>SCRAP ALL</button>
          </p> 
          <hr />
          <p className="mb-6">
            <button className="btn  btn-primary" onClick={handleZp}>SCRAP ONE</button>
          </p>
          </div>
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