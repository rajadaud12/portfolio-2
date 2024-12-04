import emailjs from 'emailjs-com';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Initialize EmailJS with your User ID (replace with your actual keys)
    const userID = 'C22PWP2rI3WBsfJAT';
    const serviceID = 'service_azaq1hi';
    const templateID = 'template_elc7ftf';

    // Parse form data from the request body
    const { firstName, lastName, email, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Send email via EmailJS
    const response = await emailjs.send(serviceID, templateID, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: message,
    }, userID);

    // Respond with success
    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}

