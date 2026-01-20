import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './ReferralForm.css'

interface ReferralFormProps {
  onSubmit: (data: {
    email: string
    fullName: string
    businessOwnerName: string
    companyName: string
  }) => void
}

const ReferralForm = ({ onSubmit }: ReferralFormProps) => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [businessOwnerName, setBusinessOwnerName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'Email er påkrevd'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ugyldig e-postadresse'
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'Fullt navn er påkrevd'
    }

    if (!businessOwnerName.trim()) {
      newErrors.businessOwnerName = 'Bedriftseiers navn er påkrevd'
    }

    if (!companyName.trim()) {
      newErrors.companyName = 'Bedriftens navn er påkrevd'
    }

    if (!agreed) {
      newErrors.agreed = 'Du må godta vilkårene'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // EmailJS configuration - replace these with your credentials
      const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_83hq0el'
      const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_bqn394o'
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8FEJnnbeR9l93wSu4'

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Send email using EmailJS
      const templateParams = {
        to_email: 'daracha777@gmail.com',
        from_name: fullName,
        from_email: email,
        business_owner_name: businessOwnerName,
        company_name: companyName,
        subject: `Ny referanse fra ${fullName}`,
        message: `Hei,\n\nJeg vil gjerne referere en kunde:\n\n` +
          `Mitt navn: ${fullName}\n` +
          `Min e-post: ${email}\n` +
          `Bedriftseiers navn: ${businessOwnerName}\n` +
          `Bedriftens navn: ${companyName}\n\n` +
          `Med vennlig hilsen,\n${fullName}`
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      // Submit form data to parent component after successful email send
      onSubmit({
        email,
        fullName,
        businessOwnerName,
        companyName,
      })
    } catch (error) {
      console.error('Email sending failed:', error)
      alert('Kunne ikke sende e-post. Vennligst prøv igjen eller sjekk EmailJS konfigurasjon.')
    }
  }

  return (
    <form className="referral-form" onSubmit={handleSubmit}>
      <h1 className="form-title">
        Kjenner du folk som trenger en nettside?
      </h1>
      <p className="form-subtitle">
        Tjen 20% gjentagende kommisjon per måned av salget på livstid! samt
        bedriftseier får 10% avslag på nettsiden.
      </p>

      <div className="form-fields">
        <div className="form-row">
          <div className="form-field">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din email adresse"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-field">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ditt fulle navn"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>
        </div>

        <div className="form-field">
          <input
            type="text"
            id="businessOwnerName"
            value={businessOwnerName}
            onChange={(e) => setBusinessOwnerName(e.target.value)}
            placeholder="Fulle navn til person (bedriftseier, daglig leder, styrets leder)"
            className={errors.businessOwnerName ? 'error' : ''}
          />
          {errors.businessOwnerName && (
            <span className="error-message">{errors.businessOwnerName}</span>
          )}
        </div>

        <div className="form-field">
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Navn til bedriften"
            className={errors.companyName ? 'error' : ''}
          />
          {errors.companyName && (
            <span className="error-message">{errors.companyName}</span>
          )}
        </div>
      </div>

      <div className="agreement-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className={errors.agreed ? 'error' : ''}
          />
          <span>
            Ved å trykke her godkjenner du vår{' '}
            <a
              href="https://asoldi.com/vilkar-betingelser"
              target="_blank"
              rel="noopener noreferrer"
              className="terms-link"
            >
              terms of service
            </a>{' '}
            og forsikrer at betalingen kommer til rett sted
          </span>
        </label>
        {errors.agreed && (
          <span className="error-message">{errors.agreed}</span>
        )}
      </div>

      <button type="submit" className="submit-button">
        Send oss en mail
      </button>
    </form>
  )
}

export default ReferralForm
