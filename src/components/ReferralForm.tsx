import { useState } from 'react'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Submit form data to parent component first
    onSubmit({
      email,
      fullName,
      businessOwnerName,
      companyName,
    })

    // Create email content
    const subject = encodeURIComponent('Ny referanse fra ' + fullName)
    const body = encodeURIComponent(
      `Hei,\n\nJeg vil gjerne referere en kunde:\n\n` +
      `Mitt navn: ${fullName}\n` +
      `Min e-post: ${email}\n` +
      `Bedriftseiers navn: ${businessOwnerName}\n` +
      `Bedriftens navn: ${companyName}\n\n` +
      `Med vennlig hilsen,\n${fullName}`
    )

    // Send email via mailto (open in new window/tab if possible)
    setTimeout(() => {
      window.location.href = `mailto:damian@asoldi.com?subject=${subject}&body=${body}`
    }, 100)
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
