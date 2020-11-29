import React from "react"

import styles from "./contact-form.module.scss"

const ContactForm = ({ input }) => {

    return (
        <form className={styles.form} action="https://formsubmit.io/send/c59aa336-7221-49a2-8838-2585da01783a" method="post">
            <div>
                <label className="clip" htmlFor="name">Your Name</label>
                <input
                    className={styles.formInput}
                    placeholder="Your Name"
                    type="text"
                    name="NAME"
                    id="name"
                />
            </div>
            <div>
                <label className="clip" htmlFor="email">Your Email Address</label>
                <input
                    className={styles.formInput}
                    placeholder="Your Email Address"
                    name="EMAIL"
                    id="email"
                    type="email"
                />
            </div>
            <div>
                <label className="clip" htmlFor="message">Your Message</label>
                <textarea
                    className={styles.formInput}
                    placeholder="Your Message"
                    name="MESSAGE"
                    id="message"
                    type="text"
                    rows="5"
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