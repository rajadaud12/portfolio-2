import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import './ContactSection.css'

const ContactSection = () => {
  // Form state to track input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Focus state
  const [focusedField, setFocusedField] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  // In your React component

const handleSubmit = async (e) => {
  e.preventDefault();

  // Reset previous submission status
  setSubmitStatus(null);

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Start submission process
  setIsSubmitting(true);

  try {
    // Call the Vercel serverless function to send the message
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), 
    });
    

    if (response.ok) {
      // Success
      setSubmitStatus('success');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    } else {
      // Error from server
      setSubmitStatus('error');
    }
  } catch (error) {
    // Network or other errors
    console.error('Submission error:', error);
    setSubmitStatus('error');
  } finally {
    // Always stop submitting
    setIsSubmitting(false);
  }
};

  
  return (
    <div className='contact-section-container'>
      <footer className="contact-section">
        <div className="headings-container">
          <h2 className="section-heading-1">Contact</h2>
          <h2 className="section-heading-2">Me</h2>
        </div>
           
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <div className="contact-header">
                <h2>Code is my canvas; innovation is my art.</h2>
                <p>Have an idea? Let's make it happen. Get in touch to start your next project!</p>
              </div>

              {/* Submission Status Messages */}
              {submitStatus === 'success' && (
                <div className="success-message">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="error-message">
                  Oops! There was a problem sending your message. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className={`form-group ${focusedField === 'firstName' ? 'focused' : ''} ${errors.firstName ? 'error' : ''}`}>
                    <label>First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                    <div className="input-border"></div>
                  </div>
                  <div className={`form-group ${focusedField === 'lastName' ? 'focused' : ''} ${errors.lastName ? 'error' : ''}`}>
                    <label>Last Name</label>
                    <input 
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                    <div className="input-border"></div>
                  </div>
                </div>

                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                  <label>Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.email && <div className="error-text">{errors.email}</div>}
                  <div className="input-border"></div>
                </div>

                <div className={`form-group ${focusedField === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''}`}>
                  <label>Message</label>
                  <textarea 
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  ></textarea>
                  {errors.message && <div className="error-text">{errors.message}</div>}
                  <div className="input-border"></div>
                </div>

                <button 
                  type="submit" 
                  className="submit-button" 
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <ArrowRight className="button-icon" size={20} />}
                </button>
              </form>
            </div>

            {/* Rest of the contact details remain the same */}
            <div className="contact-details">
              <div className="contact-info-header">
                <h3>Connect With Us</h3>
                <p>Reach out through any of these channels</p>
              </div>

              <div className="detail-items">
                <div className="detail-item">
                  <div className="icon-wrapper">
                    <Phone size={20} />
                  </div>
                  <div className="content">
                    <span className="label">Call us at</span>
                    <a href="tel:+40321654876" className="value">(+92) 321 7155090</a>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="icon-wrapper">
                    <Mail size={20} />
                  </div>
                  <div className="content">
                    <span className="label">Email us at</span>
                    <a href="mailto:contact@example.com" className="value">daudnasar16@gmail.com</a>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="icon-wrapper">
                    <MapPin size={20} />
                  </div>
                  <div className="content">
                    <span className="label">Visit us at</span>
                    <span className="value">Chatta Rd, Chatta Bakhtawar, Islamabad</span>
                  </div>
                </div>
              </div>

              <div className="availability">
                <div className="status-indicator"></div>
                <p>Available every day from 4:00 AM to 3:00 PM UTC.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactSection;