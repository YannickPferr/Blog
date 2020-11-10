import React from "react"

import styles from "./contact-form.module.scss"

const ContactForm = ({ input }) => {

    return (
        <form className={styles.form} action="https://formsubmit.io/send/c59aa336-7221-49a2-8838-2585da01783a" method="post">
            <input
                className={styles.formInput}
                placeholder="Your Name"
                type="text"
                name="NAME"
                id="full-name"
            />
            <input
                className={styles.formInput}
                placeholder="Your Email Address"
                name="EMAIL"
                id="email-address"
                type="email"
            />
            <textarea
                className={styles.formInput}
                placeholder="Your Message"
                name="MESSAGE"
                id="message"
                type="text"
                rows="5"
            />
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