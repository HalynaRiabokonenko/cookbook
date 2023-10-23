import React from "react";
import "../styles/Contact.css";

function ContactContent() {
  return (
    <main className="contact-content">
      <section className="contact-content__container">
        <h1 className="contact-content__header">Contact us</h1>
        <div className="contact-content__modal">
          <h2 className="contact-content__modal-header">Send message</h2>
          <form
            action=""
            method="get"
            id="contact-content__form"
            className="contact-content__modal-form"
          >
            <label htmlFor="title" className="contact-content__form-label">
              Title
            </label>
            <input
              placeholder=""
              type="text"
              id="title"
              name="title"
              className="contact-content__form-input contact-content__form-input--text"
              minLength="3"
              required
            />
            <label htmlFor="email" className="contact-content__form-label">
              Email
            </label>
            <input
              placeholder=""
              type="email"
              id="email"
              name="email"
              className="contact-content__form-input contact-content__form-input--email"
              required
            />
            <label htmlFor="message" className="contact-content__form-label">
              Message
            </label>
            <textarea
              placeholder=""
              id="message"
              className="contact-content__form-input contact-content__form-input--textarea"
              name="message"
              rows="4"
              cols="50"
              minLength="3"
              maxLength="500"
              required
            ></textarea>
            <input
              type="submit"
              value="Send"
              className="contact-content__form-input contact-content__form-input--submit"
            />
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactContent;
