'use client'

import { useState } from 'react'

type Product = 'franc' | 'sauvignon'
type PackSize = 6 | 12
type Frequency = 'monthly' | '2months' | '3months' | '4months'

export default function CabernetForm() {
  const [product, setProduct] = useState<Product>('franc')
  const [packSize, setPackSize] = useState<PackSize>(6)
  const [frequency, setFrequency] = useState<Frequency>('monthly')
  const [expandedCards, setExpandedCards] = useState(false)
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

  const productDetails: Record<Product, { description: string; pairing: string; tasting: string; serving: string; nutrition: string; alcohol: string; calories: string }> = {
    franc: {
      description: 'Bright and composed, this non-alcoholic Cab Franc opens with lifted notes of violet and currants before settling into layers of fresh berries. The texture is supple yet structured, with fine tannins that echo the gentle grip of black tea. Lively acidity keeps everything precise, carrying the fruit through to a clean, persistent finish that feels polished without losing its energy. Graceful, yet expressive, this still red is a flavourful experience of ripeness and depth.',
      pairing: 'Roasted chicken, pasta with white sauce, fish',
      tasting: 'Violets & currants on the nose with the texture of black tea & a mouthful of berries on the finish',
      serving: 'Room temperature or slightly chilled',
      nutrition: '0g sugar',
      alcohol: '<0.5%',
      calories: '<20/glass',
    },
    sauvignon: {
      description: 'Picked at peak ripeness, this Cabernet Sauvignon opens with an inviting, almost playful nose—think black currants layered with warm spice and sweets. The palate is subtle with medium acidity and soft tannins. There\'s a gentle raspberry-like juiciness to the mouthfeel that keeps each sip feeling fresh. The fruit carries cleanly through the finish, adding brightness and lift to a grape that\'s often known for its weight and intensity.',
      pairing: 'Roasted chicken, aged cheese, duck confit',
      tasting: 'Spices & currants on the nose with the texture of black tea and a mouthful of berries on the finish',
      serving: 'Room temperature',
      nutrition: '0g sugar',
      alcohol: '<0.5%',
      calories: '<20/glass',
    },
  }

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
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              {p === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'}
            </h3>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={{ color: '#dbb42b', fontWeight: 'bold', fontSize: '32px' }}>${prices[p as Product][packSize]}</span>
            </div>
            
            {/* Expandable Details */}
            <button
              type="button"
              onClick={() => setExpandedCards(!expandedCards)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#dbb42b',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '8px 0',
                textAlign: 'center',
              }}
            >
              {expandedCards ? '▼ Hide Details' : '▶ About This 0.5% Wine'}
            </button>

            {expandedCards && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e0e0e0', fontSize: '13px', color: '#666666', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#1a1a1a' }}>Description:</strong><br />
                  {productDetails[p as Product].description}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#1a1a1a' }}>Pairing:</strong> {productDetails[p as Product].pairing}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#1a1a1a' }}>Tasting:</strong> {productDetails[p as Product].tasting}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#1a1a1a' }}>Serving:</strong> {productDetails[p as Product].serving}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#1a1a1a' }}>Nutrition:</strong> {productDetails[p as Product].nutrition}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#1a1a1a' }}>Alcohol:</strong> {productDetails[p as Product].alcohol}
                </p>
                <p>
                  <strong style={{ color: '#1a1a1a' }}>Calories:</strong> {productDetails[p as Product].calories}
                </p>
              </div>
            )}
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
                    padding: '24px 16px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '18px',
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
                <label key={freq} style={{ display: 'flex', alignItems: 'center', padding: '16px', background: frequency === freq ? '#f5f0e6' : '#ffffff', border: frequency === freq ? '2px solid #dbb42b' : '1px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', color: '#1a1a1a', fontWeight: 'bold' }}>
                  <input
                    type="radio"
                    name="frequency"
                    checked={frequency === freq}
                    onChange={() => setFrequency(freq)}
                    style={{ marginRight: '12px', accentColor: '#dbb42b', width: '18px', height: '18px', cursor: 'pointer' }}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
              <div style={{ color: '#666666', fontSize: '18px', lineHeight: '1.6', flex: 1 }}>
                <strong style={{ color: '#1a1a1a', fontSize: '20px' }}>
                  {product === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'}
                </strong>
                <br />
                {packSize}-pack, delivered{' '}
                {frequency === 'monthly' && 'every month'}
                {frequency === '2months' && 'every 2 months'}
                {frequency === '3months' && 'every 3 months'}
                {frequency === '4months' && 'every 4 months'}
              </div>
              <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#dbb42b', textAlign: 'right', whiteSpace: 'nowrap' }}>
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
