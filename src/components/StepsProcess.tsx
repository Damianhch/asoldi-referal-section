import './StepsProcess.css'

interface StepsProcessProps {
  currentStep: number
}

const StepsProcess = ({ currentStep }: StepsProcessProps) => {
  const steps = [
    {
      number: 1,
      title: 'Kontakt oss',
      description:
        'Den inneholder ditt navn, bedriftseiers navn og bedriftens navn som du skal referere',
    },
    {
      number: 2,
      title: 'Kontakt bedrifts eier',
      description:
        'Led personen du refererer til asoldi.com/booking',
    },
    {
      number: 3,
      title: 'Kunden betaler',
      description:
        'Vi spør hvem som refererte kunden og du blir betalt innen 1. av hver måned',
    },
    {
      number: 4,
      title: 'Du blir betalt',
      description:
        'Vi spør hvem som refererte kunden og du blir betalt innen 1. av hver måned',
    },
  ]

  return (
    <div className="steps-process">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`step-card ${currentStep === step.number ? 'active' : ''} ${
            currentStep > step.number ? 'completed' : ''
          }`}
        >
          <div className="step-number">{step.number}</div>
          <div className="step-content">
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StepsProcess
