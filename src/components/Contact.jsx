import { useState } from 'react'
import '../assets/styles/contact.css'

export const Contact = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact">
      <span className="code-accent contact-tag">{'> // START_A_PROJECT'}</span>
      <h2>
        Let&apos;s build something{' '}
        <span className="gradient-text">playful.</span>
      </h2>
      <p className="contact-lead">
        Tell us what you want to cook. We will bring the stack, the motion and
        the questionable amount of enthusiasm.
      </p>

      {sent ? (
        <div className="contact-success" role="status">
          <i className="fa-solid fa-check" />
          <strong>Message queued!</strong>
          <span>{'// demo mode — connect a backend to send it for real'}</span>
        </div>
      ) : (
        <form
          action="https://www.freecodecamp.com/email-submit"
          method="post"
          id="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ada Lovelace"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@somewhere.dev"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+1 555 0100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              placeholder="Tell us what you want to cook..."
              rows="5"
              required
            />
          </div>

          <input type="submit" id="submit" value="Send" data-magnetic />
        </form>
      )}

      <p className="form-note code-accent">
        {'// demo form — connect your backend to go live'}
      </p>
    </section>
  )
}
