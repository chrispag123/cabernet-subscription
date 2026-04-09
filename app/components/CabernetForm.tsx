'use client'

import { useState } from 'react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const price = PRICING[product][packSize]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          packSize,
          frequency,
          price,
          ...formData,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          province: '',
          postalCode: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🍷</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              The Cabernet<br />Collection
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Premium non-alcoholic red wines. Zero sugar, pure flavor. Delivered to your door.
            </p>
          </div>

          {/* Product Preview Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className={`p-8 rounded-2xl backdrop-blur-sm transition-all cursor-pointer ${product === 'franc' ? 'bg-red-500/30 border-2 border-red-400' : 'bg-white/5 border border-white/10 hover:border-red-400/50'}`} onClick={() => setProduct('franc')}>
              <div className="h-64 bg-gradient-to-b from-red-600 to-red-900 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🍇</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cabernet Franc</h3>
              <p className="text-gray-300 text-sm mb-4">Violets & currants on the nose with a velvety finish. Pairs with roasted meats and aged cheese.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">0g Sugar • <0.5% ABV</span>
                <span className="text-red-400 font-semibold">$149.99</span>
              </div>
            </div>

            <div className={`p-8 rounded-2xl backdrop-blur-sm transition-all cursor-pointer ${product === 'sauvignon' ? 'bg-red-500/30 border-2 border-red-400' : 'bg-white/5 border border-white/10 hover:border-red-400/50'}`} onClick={() => setProduct('sauvignon')}>
              <div className="h-64 bg-gradient-to-b from-red-700 to-red-950 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🍷</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cabernet Sauvignon</h3>
              <p className="text-gray-300 text-sm mb-4">Black currant, spices & subtle raspberries. Full-bodied with soft tannins and a bright finish.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">0g Sugar • <0.5% ABV</span>
                <span className="text-red-400 font-semibold">$149.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Form Section */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Pack Size */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">How Many Bottles?</h3>
            <div className="grid grid-cols-2 gap-4">
              {[6, 12].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPackSize(size as PackSize)}
                  className={`p-4 rounded-xl transition-all border-2 font-semibold ${
                    packSize === size
                      ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/50'
                      : 'bg-white/5 border-white/20 text-white hover:border-red-400/50'
                  }`}
                >
                  <div className="text-xl mb-1">{size} Pack</div>
                  <div className="text-sm opacity-80">750mL bottles</div>
                </button>
              ))}
            </div>
          </div>

          {/* Subscription Frequency */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Delivery Schedule</h3>
            <div className="space-y-3">
              {(Object.entries(FREQUENCY_LABELS) as Array<[Frequency, string]>).map(([freq, label]) => (
                <label key={freq} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  frequency === freq
                    ? 'bg-red-600/20 border-red-400 text-white'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:border-red-400/50'
                }`}>
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={frequency === freq}
                    onChange={(e) => setFrequency(e.target.value as Frequency)}
                    className="w-5 h-5"
                  />
                  <span className="ml-3 font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Every shipment includes:</span>
              <span className="text-gray-400 text-sm">Free shipping</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-400 text-sm mb-1">{packSize}-pack of {product === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'}</p>
                <p className="text-red-400 text-sm">{FREQUENCY_LABELS[frequency]}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-white">${price}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Shipping Address</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all mb-4"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all mb-4"
            />

            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all mb-4"
              required
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
              <input
                type="text"
                name="province"
                placeholder="Province"
                value={formData.province}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
              <p className="text-green-300 font-medium">✓ Subscription created! Check your email for confirmation.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
              <p className="text-red-300 font-medium">Something went wrong. Please try again.</p>
            </div>
          )}

          {/* CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/50 disabled:shadow-none"
          >
            {isSubmitting ? 'Processing...' : 'Start Your Subscription'}
          </button>

          <p className="text-gray-400 text-center text-sm">
            No commitment. Cancel anytime. First shipment charged upon order.
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Made in Canada • Zero Sugar • <0.5% ABV • 18-20 Calories/Glass
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © 2026 ONES • Canada's First Non-Alcoholic Winery
          </p>
        </div>
      </div>
    </div>
  )
}
