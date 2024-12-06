import React from "react";
import styles from "./CustomerSupport.module.css";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const CustomerSupport = () => {
  const phoneNumber = "7478320320";
  const email = "pakhirasayantan123@gmail.com";

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.supportContainer}>
        <h1 className={styles.heading}>Customer Support</h1>
        <p className={styles.description}>
          We're here to help! If your query isn't resolved, feel free to reach out.
        </p>
        <p className={styles.caution}>
          🌟 *Before contacting us, check out our <a href="/faq" className={styles.faqLink}>FAQ page</a> to find quick answers.* 🌟
        </p>
        <div className={styles.options}>
          {/* Call Us */}
          <a href={`tel:${phoneNumber}`} className={styles.optionCard}>
            <FaPhone className={styles.icon} />
            <span>Call Us</span>
          </a>

          {/* Email Us */}
          <a
            href={`mailto:${email}?subject=Customer%20Support%20Inquiry&body=Hello,%20I%20need%20assistance%20with...`}
            className={styles.optionCard}
          >
            <FaEnvelope className={styles.icon} />
            <span>Email Us</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${phoneNumber}?text=Hello%20Support,%20I%20need%20help%20with...`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.optionCard}
          >
            <FaWhatsapp className={styles.icon} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
