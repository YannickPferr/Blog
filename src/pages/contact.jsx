import React from "react"

import Layout from "../components/layout"
import ContactForm from "../components/contact-form"

import styles from "./contact.module.scss"

const ContactPage = ({ data }) => {
  return (
    <Layout title="Contact" pathName="/contact">
      <h1 className="page-heading">Contact</h1>

      <section id="contactUs" className={styles.contactSection}>
        <h2>Tell us whatever you want to tell us!</h2>
        <p>Let us know your opinion about recipes you tried! Was it good? Was it horrible? Did it make you full?</p>
        <ContactForm></ContactForm>
      </section>
    </Layout>
  )
}

export default ContactPage
