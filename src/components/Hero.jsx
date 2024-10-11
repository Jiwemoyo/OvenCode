import React from 'react'

export const Hero = () => {
  return (
    <section id='hero'>
      <div className='content-hero'>
        <h2>Welcome to OvenCode</h2>
        <p>Aqui va el parrafo de hero pero es tan largo que no quiero escribirlo XD</p>
      </div>
      <video controls id='video'>
        <source />
        Su navegador no soporta este tipo de videos lo sentimos :C
      </video>
    </section>
  )
}
