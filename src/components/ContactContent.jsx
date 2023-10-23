import React from "react";
import "../styles/Contact.css";

function ContactContent() {
  return (
    <main className="contact-content">
      <section className="contact-content__container">
        <h1 className="contact-content__header">Contact us</h1>
        <p className="contact-content__paragraph">
          Dear visitors, your feedback is invaluable to us! If you have tried
          any of our Ukrainian recipes and would like to share your thoughts, or
          if you have any other information you'd like to send our way, please
          feel free to use our contact form. Your input helps us improve and
          ensures that our recipes continue to delight your taste buds. We
          appreciate your participation and look forward to hearing from you!
        </p>
        <div className="contact-content__modal">
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
