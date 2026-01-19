import { useState } from 'react'
import './App.css'

const serviceRatings = [
  {
    text: "Dissastified",
    percentage: 0
  },
  {
    text: "It was okay",
    percentage: 0.05
  },
  {
    text: "It was good",
    percentage: 0.1
  },
  {
    text: "Absolutely amazing!",
    percentage: 0.2
  },
]

function App() {

  const [bill, setBill] = useState(0)
  const [rating, setRating] = useState(serviceRatings[0].percentage)
  const [friendRating, setFriendRating] = useState(serviceRatings[0].percentage)

  const tip = (rating + friendRating) / 2

  function handleBillChange(newBill) {
    setBill(newBill || 0)
  }

  function handlePersonalInput(e) {
    setRating(parseFloat(e.target.value))
  }

  function handleFriendInput(e) {
    setFriendRating(parseFloat(e.target.value))
  }

  return (
    <>
      <BillInput bill={bill} onBillChange={handleBillChange}/>
      <ServiceSelector rating={rating} onSelect={handlePersonalInput} >
        How did you like the service?
      </ServiceSelector>
      <ServiceSelector rating={friendRating} onSelect={handleFriendInput} >
        How did your friend like the service?
      </ServiceSelector>
      <TotalBill bill={bill} tip={tip}/>
    </>
  )
}

function BillInput({ bill, onBillChange }) {
  function handleInput(e) {
    const bill = e.target.valueAsNumber
    onBillChange(bill)
  }

  return (
    <div>
      <p>How much was the bill?</p>
      <input type="number" name="bill" id="" min={0} value={bill} onInput={handleInput} />
    </div>
  )
}

function ServiceSelector({rating, onSelect, children}) {
  return (
    <div>
      <p>{children}</p>
      <select type="number" name="personal-rating" id="personal-rating" onChange={onSelect} value={rating}>
        {serviceRatings.map((service, i) => {
          return <option key={`ps-${i}`} value={service.percentage}>{service.text} ({service.percentage * 100}%)</option>
        })}
      </select>
    </div>
  )
}

function TotalBill({ bill, tip }) {
  const total = bill + (bill * tip)

  return (
    <div>
      <p>You pay ${total} (${bill} + ${bill * tip} tip)</p>
    </div>
  )
}

export default App
