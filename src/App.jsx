import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './components/About'

export const App = () => {
  return (
    <>
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
