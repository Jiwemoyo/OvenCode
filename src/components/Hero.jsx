import '../assets/styles/hero.css'

export const Hero = () => {
  return (
    <section id='hero'>
      <div className='content'>
        <h2>Welcome to OvenCode</h2>
        <p>In a digital world filled with distractions, your landing page is the key to standing out. At <span>OvenCode</span>, we specialize in creating irresistible landing pages that not only attract visitors but also convert them into loyal customers. We use intuitive design, persuasive content, and optimization strategies to maximize your conversion rate. Let us help you transform interest into action and take your business to the next level. Together, we’ll make every click count!</p>
      </div>
      <video controls id='video'>
        <source src='videin.mp4' />
        Su navegador no soporta este tipo de videos lo sentimos :C
      </video>
    </section>
  )
}
