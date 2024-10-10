import React from 'react'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'


export const App = () => {
  return (
    <>
    <Header/>
    <Hero/>
    <Services/>
    <Contact/>
    <Footer/>
    </>
  )
}
