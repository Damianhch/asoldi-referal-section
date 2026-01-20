import { useState } from 'react'
import './PostSubmissionOptions.css'

interface PostSubmissionOptionsProps {
  formData: {
    email: string
    fullName: string
    businessOwnerName: string
    companyName: string
  }
}

const PostSubmissionOptions = ({ formData }: PostSubmissionOptionsProps) => {
  const [copied, setCopied] = useState(false)
  const bookingUrl = 'asoldi.com/booking'

  const handleGmailClick = () => {
    const subject = encodeURIComponent('Nettside booking via Asoldi')
    const body = encodeURIComponent(
      `Hei ${formData.businessOwnerName},\n\n` +
      `Jeg vil gjerne anbefale deg å sjekke ut Asoldi for din nettside. ` +
      `Du kan booke en time her: ${bookingUrl}\n\n` +
      `Med vennlig hilsen,\n${formData.fullName}`
    )
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      '_blank'
    )
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`https://${bookingUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = `https://${bookingUrl}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="post-submission-options">
      <h2 className="options-title">Hvordan vil du kontakte bedriftseieren?</h2>

      <div className="options-container">
        <div className="option-card">
          <h3 className="option-title">Via e-post (Gmail)</h3>
          <p className="option-description">
            Send en e-post til bedriftseieren med linken til booking
          </p>
          <button className="option-button gmail-button" onClick={handleGmailClick}>
            Åpne Gmail
          </button>
        </div>

        <div className="option-card disabled">
          <h3 className="option-title">Via melding</h3>
          <p className="option-description">
            Send melding direkte til bedriftseieren
          </p>
          <button className="option-button disabled-button" disabled>
            Ikke tilgjengelig
          </button>
        </div>

        <div className="option-card">
          <h3 className="option-title">Gjør det IRL</h3>
          <p className="option-description">
            Del linken direkte med bedriftseieren
          </p>
          <div className="url-container">
            <span className="url-label">Booking link:</span>
            <div className="url-display">
              <code className="url-text">{bookingUrl}</code>
              <button className="copy-button" onClick={handleCopyUrl}>
                {copied ? '✓ Kopiert!' : 'Kopier'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSubmissionOptions
