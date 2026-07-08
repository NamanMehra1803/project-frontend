import React from 'react'
import Header from '../mainpage/Header'
import Footer from '../mainpage/Footer'
import Categories from './Categories'
import HomeCategories from './HomeCategories'
import Products from './Products'
import Banner from './Banner'
import Services from './Services'
import Instagram from './Instagram'

export default function Home() {
  return (
   <>
   <Header/>
<Categories/>
<HomeCategories/>
<Products/>
<Banner/>
<Services/>
<Instagram/>
   <Footer/>
   
   
   </>
  )
}
