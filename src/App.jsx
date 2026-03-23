import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './components/About'

export const App = () => {
  return (
    <>
      <div className="border-tracers">
        <div className="tracer right"></div>
        <div className="tracer bottom"></div>
        <div className="tracer left"></div>
      </div>
      <div className="app-content">
        <Header/>
        <Hero/>
        <About/>
        <Services/>
        <Contact/>
        <Footer/>
      </div>
    </>
  )
}
