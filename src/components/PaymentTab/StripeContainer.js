import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MbfzNLlfbjWJ6bQHhWR4gLBA381DRjR7LtI4k0YL2KotRFgjnLuFJsZ7DnXyEDJysGPeECE6EGzodNL7WcgTsz400t5IsVHNz"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
}