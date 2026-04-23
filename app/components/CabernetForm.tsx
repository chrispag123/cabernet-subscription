'use client'

import { useState, useEffect } from 'react'

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

  const prices: Record<Product, Record<PackSize, { regular: number; subscribeAndSave: number }>> = {
    franc: { 6: { regular: 179.99, subscribeAndSave: 152.99 }, 12: { regular: 299.99, subscribeAndSave: 254.99 } },
    sauvignon: { 6: { regular: 149.99, subscribeAndSave: 127.49 }, 12: { regular: 284.99, subscribeAndSave: 242.24 } },
  }

  const priceInfo = prices[product][packSize]
  const savingsPercent = Math.round(((priceInfo.regular - priceInfo.subscribeAndSave) / priceInfo.regular) * 100)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Checkout URLs for each product variant and frequency
  const checkoutUrls: Record<Product, Record<PackSize, Record<Frequency, string>>> = {
    franc: {
      6: {
        monthly: 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808206072%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921636600%26return_to%3D%2Fcheckout',
        '2months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808206072%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921669368%26return_to%3D%2Fcheckout',
        '3months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808206072%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921702136%26return_to%3D%2Fcheckout',
        '4months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808206072%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921734904%26return_to%3D%2Fcheckout',
      },
      12: {
        monthly: 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808435448%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921636600%26return_to%3D%2Fcheckout',
        '2months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808435448%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921669368%26return_to%3D%2Fcheckout',
        '3months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808435448%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921702136%26return_to%3D%2Fcheckout',
        '4months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48269808435448%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921734904%26return_to%3D%2Fcheckout',
      },
    },
    sauvignon: {
      6: {
        monthly: 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272577396984%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921636600%26return_to%3D%2Fcheckout',
        '2months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272577396984%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921636600%26return_to%3D%2Fcheckout',
        '3months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272577396984%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921702136%26return_to%3D%2Fcheckout',
        '4months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272577396984%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921734904%26return_to%3D%2Fcheckout',
      },
      12: {
        monthly: 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272578052344%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921636600%26return_to%3D%2Fcheckout',
        '2months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272578052344%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921669368%26return_to%3D%2Fcheckout',
        '3months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272578052344%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921669368%26return_to%3D%2Fcheckout',
        '4months': 'https://www.drinkones.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%5B%5D%5Bid%5D%3D48272578052344%26items%5B%5D%5Bquantity%5D%3D1%26items%5B%5D%5Bselling_plan%5D%3D5921734904%26return_to%3D%2Fcheckout',
      },
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const url = checkoutUrls[product][packSize][frequency]
    window.location.href = url
  }

  useEffect(() => {
    // Wait for Judge.me script to load and initialize
    const checkAndInit = setInterval(() => {
      const w = window as any
      if (w.jdgm) {
        clearInterval(checkAndInit)
        // Trigger widget initialization
        if (w.jdgm.widgets && typeof w.jdgm.widgets.reinitialize === 'function') {
          w.jdgm.widgets.reinitialize()
        }
      }
    }, 100)
    
    // Cleanup
    return () => clearInterval(checkAndInit)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f9f7f3' }}>
      {/* Logo */}
      <div style={{ paddingTop: '40px', paddingBottom: '20px', textAlign: 'center' }}>
        <img src="/ones-logo.png" alt="ONES Logo" style={{ height: '100px', width: 'auto', maxWidth: '100%' }} />
      </div>

      {/* Hero */}
      <div style={{ paddingTop: '20px', paddingBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
          The Cabernet Subscription
        </h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: '#4b5563', padding: '0 16px' }}>
          Premium, sugar-free Cabernet Franc & Cabernet Sauvignon from Canada's finest wine regions.
        </p>
      </div>

      {/* Step 1 */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px', marginBottom: '32px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: '#dbb42b',
          color: '#1a1a1a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 auto 12px',
        }}>
          1
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#1a1a1a' }}>
          Choose Your Non-Alc Wine
        </h2>
      </div>

      {/* Product Cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', padding: '0 16px', marginBottom: '80px' }}>
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
              {p === 'franc' ? 'Non-Alc Cabernet Franc' : 'Non-Alc Cabernet Sauvignon'}
            </h3>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#999999', textDecoration: 'line-through', fontSize: '18px', marginRight: '8px' }}>
                  ${prices[p as Product][packSize].regular}
                </span>
                <span style={{ color: '#dbb42b', fontWeight: 'bold', fontSize: '28px' }}>
                  ${prices[p as Product][packSize].subscribeAndSave}
                </span>
              </div>
              <span style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>
                Save 15%
              </span>
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
              {expandedCards ? '▼ Hide Details' : '▶ About This Wine'}
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
          
          {/* Step 2 */}
          <div style={{ textAlign: 'center', marginTop: '52px', marginBottom: '48px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#dbb42b',
              color: '#1a1a1a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 auto 12px',
            }}>
              2
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#1a1a1a' }}>
              Choose Your Pack Amount
            </h2>
          </div>

          {/* Pack Size */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px' }}>
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
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <img 
                    src={product === 'franc' ? `/cab-franc-${size}.png` : `/cab-sauv-${size}.png`}
                    alt={`${size}-pack`}
                    style={{ height: '120px', width: 'auto', objectFit: 'contain' }}
                  />
                  <span>{size} Pack</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ textAlign: 'center', marginTop: '52px', marginBottom: '48px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#dbb42b',
              color: '#1a1a1a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 auto 12px',
            }}>
              3
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#1a1a1a' }}>
              Choose Your Delivery Schedule
            </h2>
          </div>

          {/* Frequency */}
          <div>
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

          {/* Step 4 */}
          <div style={{ textAlign: 'center', marginTop: '52px', marginBottom: '48px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#dbb42b',
              color: '#1a1a1a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 auto 12px',
            }}>
              4
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#1a1a1a' }}>
              Checkout & Pay
            </h2>
          </div>

          {/* Price Summary */}
          <div style={{ background: '#f5f0e6', border: '1px solid #dbb42b', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
              <div style={{ color: '#666666', fontSize: 'clamp(14px, 3vw, 18px)', lineHeight: '1.6', width: '100%' }}>
                <strong style={{ color: '#1a1a1a', fontSize: 'clamp(16px, 4vw, 20px)' }}>
                  {product === 'franc' ? 'Cabernet Franc' : 'Cabernet Sauvignon'}
                </strong>
                <br />
                {packSize}-pack, delivered{' '}
                {frequency === 'monthly' && 'every month'}
                {frequency === '2months' && 'every 2 months'}
                {frequency === '3months' && 'every 3 months'}
                {frequency === '4months' && 'every 4 months'}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px' }}>
                <span style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 'bold', color: '#999999', textDecoration: 'line-through' }}>
                  ${priceInfo.regular}
                </span>
                <span style={{ fontSize: 'clamp(36px, 8vw, 48px)', fontWeight: 'bold', color: '#dbb42b' }}>
                  ${priceInfo.subscribeAndSave}
                </span>
              </div>
              <div style={{ color: '#2e7d32', fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 'bold' }}>
                Save {savingsPercent}% with Subscribe & Save
              </div>
              <div style={{ color: '#2e7d32', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 'bold' }}>
                + Free Shipping!
              </div>
            </div>
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

        {/* Judge.me Reviews Widget */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '24px', textAlign: 'center' }}>
            Here's what customers are saying
          </h2>
          <div className="jdgm-widget jdgm-all-reviews-widget">
            <div className="jdgm-all-reviews__body"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
