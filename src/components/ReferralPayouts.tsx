import './ReferralPayouts.css'

const ReferralPayouts = () => {
  return (
    <div className="referral-payouts">
      <h2 className="payouts-title">Referanse utbetalings mengde</h2>
      <div className="payouts-visualization">
        <div className="payout-line"></div>
        <div className="payout-tiers">
          <div className="payout-tier">
            <div className="payout-amount">800,-</div>
            <div className="payout-circle"></div>
            <div className="payout-label">1 referanse</div>
          </div>
          <div className="payout-tier">
            <div className="payout-amount">10%/mnd</div>
            <div className="payout-circle"></div>
            <div className="payout-label">5 referanser</div>
          </div>
          <div className="payout-tier">
            <div className="payout-amount">20%/mnd</div>
            <div className="payout-circle"></div>
            <div className="payout-label">7+ referanser</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralPayouts
