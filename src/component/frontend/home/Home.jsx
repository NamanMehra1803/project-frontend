import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Categories from './Categories'
import HomeCategory from './HomeCategory'
import Product from './Product'
import Banner from './Banner'
import Service from './Service'
import Instagram from './Instagram'

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Categories></Categories>
      <HomeCategory></HomeCategory>
      <Product></Product>
      <Banner></Banner>
      <Service></Service>        
      <Instagram></Instagram>
      <Footer></Footer>
    </div>
  )
}
