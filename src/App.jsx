import React, { useState } from 'react'

const questions = [
  "What matters most to you in a relationship?",
  "How do you usually handle conflict in a relationship?",
  "How would you prefer to spend a weekend together?",
  "Do you want to have children in the future?",
  "What is your primary love language?",
]

const options = [
  ['Trust', 'Passion', 'Stability', 'Growth'],
  ['Talk it out', 'Cool off first', 'Avoid it', 'Explode and regret it later'],
  ['Relaxing at home', 'Going on an adventure', 'Hanging out with friends', 'Working on shared goals'],
  ['Yes', 'No', 'Maybe', "I'm not sure yet"],
  ['Words of affirmation', 'Quality time', 'Acts of service', 'Physical touch', 'Receiving gifts'],
]

export default function App() {
  const [step, setStep] = useState(1)
  const [userA, setUserA] = useState(Array(5).fill(''))
  const [userB, setUserB] = useState(Array(5).fill(''))
  const [result, setResult] = useState('')

  const handleChange = (answers, setAnswers, i, value) => {
    const updated = [...answers]
    updated[i] = value
    setAnswers(updated)
  }

  const handleNext = () => {
    if (step === 1 && userA.includes('')) return alert('User A must answer all questions.')
    if (step === 2 && userB.includes('')) return alert('User B must answer all questions.')
    setStep(step + 1)
  }

  const handleSubmit = async () => {
    // Placeholder: integrate OpenAI backend here
    setResult("You are 85% compatible! 🥰")
    setStep(3)
  }
return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
    <div className="max-w-lg bg-white p-6 sm:p-10 rounded-xl shadow-xl">
        {/* ← max-w-lg fixes the card width; mx-auto isn't strictly needed here but doesn't hurt */}
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
          💘 Compatibility Quiz
        </h2>

        {step <= 2 && (
          <>
            <h3 className="text-lg font-semibold text-purple-700 mb-4">
              {step === 1 ? '👤 User A' : '👤 User B'}
            </h3>
            <div className="space-y-6">
              {questions.map((q, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-medium text-gray-800">{q}</p>
                  <select
                    value={(step === 1 ? userA : userB)[i]}
                    onChange={(e) =>
                      handleChange(
                        step === 1 ? userA : userB,
                        step === 1 ? setUserA : setUserB,
                        i,
                        e.target.value
                      )
                    }
                    className="w-full border px-4 py-2 rounded-md text-sm"
                  >
                    <option value="">Select</option>
                    {options[i].map((opt, j) => (
                      <option key={j} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              onClick={step === 1 ? handleNext : handleSubmit}
              className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              {step === 1 ? 'Next' : 'See Compatibility'}
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">🔍 Compatibility Result</h3>
            <p className="text-gray-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
