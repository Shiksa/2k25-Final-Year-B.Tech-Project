import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About Section */}
        <div className={styles.section}>
          <h3>About</h3>
          <p>
            This is a dummy text for the About section. You can replace it with
            real content about your website or company. Share your mission,
            vision, or services offered here.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className={styles.section}>
          <h3>Contact Us</h3>
          <p>
            <i className="fas fa-envelope"></i> support@example.com
          </p>
          <p>
            <i className="fas fa-phone"></i> +1 (234) 567-890
          </p>
        </div>

        {/* Quick Links Section */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#book-appointment">Book Appointment</a>
            </li>
            <li>
              <a href="#buy-medicine">Buy Medicine</a>
            </li>
            <li>
              <a href="#faqs">FAQs</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 All Rights Reserved</p>
        <div className={styles.links}>
          <a href="#privacy-policy">Privacy Policy</a> |{" "}
          <a href="#terms-and-conditions">Terms & Conditions</a>
        </div>
        <div className={styles.socialIcons}>
          <a href="#facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#linkedin">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
