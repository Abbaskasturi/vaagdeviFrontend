import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa' 
import Header from '../Header'
import BottomHeader from '../BottomHeader'
import './index.css'

const Guidelines = () => (
  <div className="page-container">
    <Header />
    <div className="guidelines-content-container">
      <h1 className="guidelines-main-heading">Platform Guidelines</h1>
      <div className="guidelines-card">
        <p className="guidelines-intro">
          To ensure a safe, fair, and smooth experience for everyone, please
          adhere to the following guidelines when renting or listing products.
        </p>

        <h2 className="section-heading">For Renters</h2>
        <ol className="guidelines-list">
          <li>
            <strong>Inspect Before You Accept:</strong> When you collect the product, you must
            thoroughly check its condition with the owner present.
          </li>
          <li>
            <strong>Provide Security Proofs:</strong> The owner is required to take security
            proofs (like a copy of your College ID). Please provide them as requested.
          </li>
          <li>
            <strong>Return on Time:</strong> Products must be returned to the same collection
            place once your rental period is complete.
          </li>
          <li>
            <strong>Collect Your Proofs:</strong> After returning the product in good
            condition, ensure you collect your security proofs back from the
            owner.
          </li>
        </ol>

        <h2 className="section-heading">For Owners</h2>
        <ol className="guidelines-list">
          <li>
            <strong>Take Security Proofs:</strong> For your safety, you must take security
            proofs (like a copy of the renter's College ID and Aadhar card) before
            handing over your product.
          </li>
          <li>
            <strong>Inspect Upon Return:</strong> When the renter returns the product, you must
            check its condition thoroughly in their presence.
          </li>
          <li>
            <strong>Handle Damages Fairly:</strong> If any damage has occurred, the repair
            cost will be deducted from the security deposit. Discuss this transparently
            with the renter.
          </li>
          <li>
            <strong>Return Proofs:</strong> You must return the renter's security proofs
            immediately after the product is returned safely.
          </li>
        </ol>

        <h2 className="section-heading">General Rules</h2>
        <ol className="guidelines-list">
          <li>
            <strong>Rental Cost Calculation:</strong> The final rental cost is calculated as:
            (Cost Per Day) x (Number of Days).
          </li>
          <li>
            <strong>No Illegal Activities:</strong> The use of rented products for any
            illegal purpose is strictly prohibited and will result in an immediate
            ban.
          </li>
        
          <li>
            <strong>Emergency Protocol:</strong> If any serious criminal issues arise,
            report them to the police by calling{' '}
            <a href="tel:100" className="emergency-call-btn">
              <FaPhoneAlt className="emergency-icon" /> 100
            </a>
            .
          </li>
        </ol>

        <p className="guidelines-trust-statement">
          This is a trusted platform because all members are students of your
          own college community. Let's keep it safe and respectful for
          everyone.
        </p>
      </div>
    </div>
    <BottomHeader />
  </div>
)

export default Guidelines