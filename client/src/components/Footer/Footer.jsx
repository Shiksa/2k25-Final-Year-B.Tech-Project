import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const phoneNumber = "7478320320";
  const email = "pakhirasayantan123@gmail.com";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Section 1: MedBuddy Info */}
        <div className={styles.section}>
          <h3 className={styles.title}>MedBuddy</h3>
          <ul className={styles.links}>
            <li><a href="#about-us">About us</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="/customer-support">Contact us</a></li>
          </ul>
        </div>

        {/* Section 2: Contact Information */}
        <div className={styles.section}>
          <h3 className={styles.title}>Contact Us</h3>
          <p><FaEnvelope className={styles.iconSmall} /> Email: <a href={`mailto:${email}`} className={styles.contactCredential}>{email}</a></p>
          <p><FaPhoneAlt className={styles.iconSmall} /> Phone: <a href={`tel:${phoneNumber}`} className={styles.contactCredential}> {phoneNumber}</a></p>
          <p><FaWhatsapp className={styles.iconSmall} /> WhatsApp: <a href={`https://wa.me/${phoneNumber}`} className={styles.contactCredential} target="_blank" rel="noopener noreferrer"> {phoneNumber}</a></p>
        </div>

        {/* Section 3: Address */}
        <div className={styles.section}>
          <h3 className={styles.title}>Address</h3>
          <p>
            <FaMapMarkerAlt className={styles.iconSmall} /> Amritalal Apartment, 1/F <br />
            38/A Jannagar Rd, Mahesh Colony, Serampore <br />
            West Bengal - 712201
            <br />
            <br />
          </p>
          <p>Project License: MAKAUT/GCETTS/2K25/IT/GRP-5</p>
        </div>
      </div>

      {/* Social Links */}
      <div className={styles.socialLinks}>
        <a href="#facebook" aria-label="Facebook" title="Facebook">
          <FaFacebook className={styles.socialIcon} />
        </a>
        <a href="#youtube" aria-label="YouTube" title="YouTube">
          <FaYoutube className={styles.socialIcon} />
        </a>
        <a href="#linkedin" aria-label="LinkedIn" title="LinkedIn">
          <FaLinkedin className={styles.socialIcon} />
        </a>
      </div>

      {/* Footer Copy */}
      <p className={styles.copyRight}>
        © 2024-2025 MedBuddy Healthcare Limited. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
