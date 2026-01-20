import { useState } from 'react'
import ReferralForm from './components/ReferralForm'
import PostSubmissionOptions from './components/PostSubmissionOptions'
import ReferralPayouts from './components/ReferralPayouts'
import StepsProcess from './components/StepsProcess'
import './App.css'

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<{
    email: string
    fullName: string
    businessOwnerName: string
    companyName: string
  } | null>(null)

  const handleFormSubmit = (data: {
    email: string
    fullName: string
    businessOwnerName: string
    companyName: string
  }) => {
    setFormData(data)
    setFormSubmitted(true)
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="left-column">
          <div className="form-section">
            {!formSubmitted ? (
              <ReferralForm onSubmit={handleFormSubmit} />
            ) : (
              <PostSubmissionOptions formData={formData!} />
            )}
          </div>
          <ReferralPayouts />
        </div>
        <div className="right-column">
          <StepsProcess currentStep={formSubmitted ? 2 : 1} />
        </div>
      </div>
    </div>
  )
}

export default App
