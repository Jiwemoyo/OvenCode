import React from 'react'

export const Contact = () => {
  return (
    <section id="contact">
        <h2>Contact Us</h2>
        <form action="https://www.freecodecamp.com/email-submit" method="post" id="form">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Your Name" required/>
            </div>
            
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Your Email" required/>
            </div>
            
            <div class="form-group">
                <label for="phone">Phone Number:</label>
                <input type="tel" name="phone" id="phone" placeholder="Your Phone Number" required/>
            </div>
            
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea name="message" id="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            
            <input type="submit" id="submit" value="Send"/>
        </form>
    </section>
  )
}
