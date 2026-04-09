'use client'

import { useState } from 'react'
import Image from 'next/image'

type Product = 'franc' | 'sauvignon'
type PackSize = 6 | 12
type Frequency = 'monthly' | '2months' | '3months' | '4months'

const PRICING = {
  franc: { 6: 149.99, 12: 284.99 },
  sauvignon: { 6: 149.99, 12: 284.99 },
}

const FREQUENCY_LABELS = {
  monthly: 'Every Month',
  '2months': 'Every 2 Months',
  '3months': 'Every 3 Months',
  '4months': 'Every 4 Months',
}

export default function CabernetForm() {
  const [product, setProduct] = useState<Product>('franc')
  const [packSize, setPackSize] = useState<PackSize>(6)
  const [frequency, setFrequency] = useState<Frequency>('monthly')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  })

  const price = PRICING[product][packSize]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      product,
      packSize,
      frequency,
      price,
      ...formData,
    })
    // TODO: Submit to Shopify API
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-full"></div>
            <h1 className="text-xl font-light text-gray-900">ONES</h1>
          </div>
          <p className="text-sm text-gray-600 mt-2">Cabernet Collection Subscription</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        
        {/* Product Selection */}
        <section>
          <h2 className="text-lg font-light text-gray-900 mb-4">Select Your Wine</h2>
          <div className="grid grid-cols-2 gap-4">
            {['franc', 'sauvignon'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProduct(p as Product)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  product === p
                    ? 'border-green-700 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-light text-gray-900 text-sm">
                  {p === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'}
                </div>
                <div className="text-xs text-gray-500 mt-1">Premium Blend</div>
              </button>
            ))}
          </div>
        </section>

        {/* Pack Size */}
        <section>
          <h2 className="text-lg font-light text-gray-900 mb-4">Bottle Count</h2>
          <div className="grid grid-cols-2 gap-4">
            {[6, 12].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setPackSize(size as PackSize)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  packSize === size
                    ? 'border-green-700 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-light text-gray-900 text-sm">{size} Bottles</div>
                <div className="text-xs text-gray-500 mt-1">750 mL each</div>
              </button>
            ))}
          </div>
        </section>

        {/* Subscription Frequency */}
        <section>
          <h2 className="text-lg font-light text-gray-900 mb-4">Delivery Frequency</h2>
          <div className="space-y-2">
            {(Object.entries(FREQUENCY_LABELS) as Array<[Frequency, string]>).map(([freq, label]) => (
              <label key={freq} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="frequency"
                  value={freq}
                  checked={frequency === freq}
                  onChange={(e) => setFrequency(e.target.value as Frequency)}
                  className="w-4 h-4 text-green-700"
                />
                <span className="ml-3 text-sm text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Price Summary */}
        <section className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Every shipment</p>
              <p className="text-xs text-gray-500 mt-1">Free shipping included</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-green-700">${price}</p>
            </div>
          </div>
        </section>

        {/* Customer Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-light text-gray-900">Delivery Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <input
              type="text"
              name="province"
              placeholder="Province"
              value={formData.province}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
        </section>

        {/* CTA */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg font-light text-base hover:bg-green-800 transition-colors"
        >
          Start Your Subscription
        </button>

        <p className="text-xs text-gray-500 text-center">
          No commitment. Cancel anytime. First shipment charged upon order.
        </p>
      </form>
    </div>
  )
}
