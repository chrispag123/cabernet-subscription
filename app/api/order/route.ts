import { NextRequest, NextResponse } from 'next/server'

const SHOPIFY_STORE = 'ones-876a.myshopify.com'
const SHOPIFY_API_VERSION = '2024-01'

// TODO: Add Shopify API credentials to environment variables
// SHOPIFY_ACCESS_TOKEN should be set in Vercel environment

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Implement Shopify API call to create subscription order
    // This will:
    // 1. Create a customer if new
    // 2. Create a draft order with subscription metadata
    // 3. Return confirmation to client

    console.log('Order received:', {
      product: body.product,
      packSize: body.packSize,
      frequency: body.frequency,
      price: body.price,
      customer: `${body.firstName} ${body.lastName}`,
      email: body.email,
    })

    // Temporary response - replace with actual Shopify API call
    return NextResponse.json(
      {
        success: true,
        message: 'Order received. Shopify integration pending.',
        orderId: `pending-${Date.now()}`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
