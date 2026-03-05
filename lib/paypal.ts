import { client, Environment } from '@paypal/paypal-server-sdk';

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';

if (!clientId || !clientSecret) {
  console.warn('PayPal credentials not configured. Using demo mode.');
}

// Configure PayPal client
const paypalClient = client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: clientId,
    oAuthClientSecret: clientSecret,
  },
  environment: process.env.PAYPAL_MODE === 'live' 
    ? Environment.Production 
    : Environment.Sandbox,
  logging: {
    logLevel: 'info',
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

export default paypalClient;
