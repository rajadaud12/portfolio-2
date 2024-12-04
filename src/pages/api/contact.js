import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  // Enhanced CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Explicitly check for POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    // Detailed logging of incoming request
    console.log('Incoming request body:', JSON.stringify(req.body, null, 2));
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));

    // Parse JSON body
    const { firstName, lastName, email, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      console.error('Validation Error: Missing fields', { firstName, lastName, email, message });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      console.error('Validation Error: Invalid email format', { email });
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // EmailJS configuration
    const templateParams = {
      first_name: firstName,
      last_name: lastName,
      reply_to: email,
      message: message,
    };

    // Send email with enhanced error handling
    try {
      const response = await emailjs.send(
        'service_azaq1hi',     // Service ID
        'template_elc7ftf',    // Template ID
        templateParams,
        {
          publicKey: 'C22PWP2rI3WBsfJAT',    // User ID / Public Key
          privateKey: process.env.EMAILJS_PRIVATE_KEY, // Private key from .env
        }
      );

      console.log('EmailJS response:', JSON.stringify(response, null, 2));

      // Respond with success
      res.status(200).json({ 
        message: 'Email sent successfully', 
        responseDetails: response 
      });
    } catch (emailError) {
      // Comprehensive error logging for EmailJS send
      console.error('EmailJS Send Error:', {
        message: emailError.message,
        name: emailError.name,
        stack: emailError.stack,
        code: emailError.code,
        details: JSON.stringify(emailError, Object.getOwnPropertyNames(emailError))
      });

      res.status(500).json({ 
        error: 'Failed to send email', 
        details: emailError.message || 'Unknown EmailJS error',
        fullError: JSON.stringify(emailError, Object.getOwnPropertyNames(emailError))
      });
    }
  } catch (generalError) {
    // Catch-all error handler
    console.error('General Error:', {
      message: generalError.message,
      name: generalError.name,
      stack: generalError.stack,
      details: JSON.stringify(generalError, Object.getOwnPropertyNames(generalError))
    });

    res.status(500).json({ 
      error: 'Unexpected error occurred', 
      details: generalError.message || 'Unknown error',
      fullError: JSON.stringify(generalError, Object.getOwnPropertyNames(generalError))
    });
  }
}