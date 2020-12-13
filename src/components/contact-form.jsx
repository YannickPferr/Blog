import React from "react"

import styles from "./contact-form.module.scss"

const ContactForm = ({ input }) => {

    return (
        <form className={styles.form} action="https://formsubmit.io/send/b3442703-db64-49ca-a5fc-0a45feee3efd" method="post">
            <div>
                <label className="clip" htmlFor="name">Your Name*</label>
                <input
                    className={styles.formInput}
                    placeholder="Your Name*"
                    type="text"
                    name="NAME"
                    id="name"
                    required
                />
            </div>
            <div>
                <label className="clip" htmlFor="email">Your Email Address*</label>
                <input
                    className={styles.formInput}
                    placeholder="Your Email Address*"
                    name="EMAIL"
                    id="email"
                    type="email"
                    required
                />
            </div>
            <div>
                <label className="clip" htmlFor="message">Your Message*</label>
                <textarea
                    className={styles.formInput}
                    placeholder="Your Message*"
                    name="MESSAGE"
                    id="message"
                    type="text"
                    rows="5"
                    required
                />
            </div>
            <input
                className={styles.formSubmit}
                type="submit"
                name="submit"
                value="Submit"
            />
        </form>
    )
}
export default ContactForm