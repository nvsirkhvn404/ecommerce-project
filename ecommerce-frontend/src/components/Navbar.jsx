import React from 'react'
import { Cart } from './Cart'

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-10 py-5 border">
      <div>Sahara</div>
      <Cart />
    </div>
  )
}
