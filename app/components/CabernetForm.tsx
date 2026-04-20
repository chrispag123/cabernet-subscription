'use client'

import { useState } from 'react'

type Product = 'franc' | 'sauvignon'
type PackSize = 6 | 12
type Frequency = 'monthly' | '2months' | '3months' | '4months'

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

  const prices: Record<Product, Record<PackSize, number>> = {
    franc: { 6: 149.99, 12: 284.99 },
    sauvignon: { 6: 149.99, 12: 284.99 },
  }

  const price = prices[product][packSize]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ product, packSize, frequency, price, ...formData })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9f7f3' }}>
      {/* Logo */}
      <div style={{ paddingTop: '40px', paddingBottom: '20px', textAlign: 'center' }}>
        <img src="/ones-logo.png" alt="ONES Logo" style={{ height: '100px', width: 'auto' }} />
      </div>

      {/* Hero */}
      <div style={{ paddingTop: '20px', paddingBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
          The Cabernet Collection
        </h1>
        <p style={{ fontSize: '20px', color: '#4b5563' }}>
          Premium non-alcoholic red wines. Zero sugar, pure flavor.
        </p>
      </div>

      {/* Product Cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '0 16px', marginBottom: '48px' }}>
        {['franc', 'sauvignon'].map((p) => (
          <button
            key={p}
            onClick={() => setProduct(p as Product)}
            style={{
              background: product === p ? '#f5f0e6' : '#ffffff',
              border: product === p ? '2px solid #dbb42b' : '1px solid #e0e0e0',
              borderRadius: '16px',
              padding: '32px',
              cursor: 'pointer',
              textAlign: 'left',
              color: '#1a1a1a',
            }}
          >
            <img 
              src={p === 'franc' ? `/cab-franc-${packSize}.png` : `/cab-sauv-${packSize}.png`}
              alt={`${p === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'} ${packSize}-pack`}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '16px' }}
            />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              {p === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'}
            </h3>
            <p style={{ color: '#666666', fontSize: '14px', marginBottom: '16px' }}>
              {p === 'franc' ? 'Violets & currants. Velvety finish.' : 'Black currant & spices. Full-bodied.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888888', fontSize: '14px' }}>0g Sugar</span>
              <span style={{ color: '#dbb42b', fontWeight: 'bold' }}>$149.99</span>
            </div>
          </button>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Pack Size */}
          <div>
            <h3 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>How Many Bottles?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[6, 12].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPackSize(size as PackSize)}
                  style={{
                    background: packSize === size ? '#dbb42b' : '#ffffff',
                    border: packSize === size ? '2px solid #dbb42b' : '1px solid #e0e0e0',
                    color: packSize === size ? '#1a1a1a' : '#1a1a1a',
                    padding: '16px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {size} Pack
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <h3 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Delivery Schedule</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(['monthly', '2months', '3months', '4months'] as Frequency[]).map((freq) => (
                <label key={freq} style={{ display: 'flex', alignItems: 'center', padding: '16px', background: frequency === freq ? '#f5f0e6' : '#ffffff', border: frequency === freq ? '2px solid #dbb42b' : '1px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', color: '#1a1a1a' }}>
                  <input
                    type="radio"
                    name="frequency"
                    checked={frequency === freq}
                    onChange={() => setFrequency(freq)}
                    style={{ marginRight: '12px' }}
                  />
                  {freq === 'monthly' && 'Every Month'}
                  {freq === '2months' && 'Every 2 Months'}
                  {freq === '3months' && 'Every 3 Months'}
                  {freq === '4months' && 'Every 4 Months'}
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ background: '#f5f0e6', border: '1px solid #dbb42b', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ color: '#666666', fontSize: '14px' }}>
                {packSize}-pack every month
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#dbb42b' }}>
                ${price}
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <h3 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Shipping Address</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{ padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a' }}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{ padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a' }}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a', marginBottom: '16px' }}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a', marginBottom: '16px' }}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                style={{ padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a' }}
                required
              />
              <input
                type="text"
                name="province"
                placeholder="Province"
                value={formData.province}
                onChange={handleInputChange}
                style={{ padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a' }}
                required
              />
            </div>

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#1a1a1a', marginBottom: '16px' }}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #dbb42b 0%, #b89a1f 100%)',
              color: '#1a1a1a',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Start Your Subscription
          </button>

          <p style={{ color: '#666666', textAlign: 'center', fontSize: '14px' }}>
            No commitment. Cancel anytime.
          </p>
        </form>
      </div>
    </div>
  )
}
