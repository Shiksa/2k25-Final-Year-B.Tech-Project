import React, { useState } from 'react';
import styles from './CustomerSupport.module.css';
import { PiPhoneCall } from "react-icons/pi";
import { TbMail } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";

const CustomerSupport = () => {

  const mobileNo = 7478320320;
  const emailId = "pakhirasayantan123@gmail.com";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwGqnhI-lzSRwEpY6OHOwBLtBRfQe4yR-4LQh-fslUvjck3a7s1kiVt-AXJqn0lJSdd0Q/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData).toString()
      });

      const result = await response.json();

      if (result.result === "success") {
        alert("Thanks for contacting us! We will reach out soon.");
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Error!", error.message);
      alert("Submission failed. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.infoSection}>
          <h2 className={styles.heading}>Get in Touch with Us</h2>
          <p className={styles.subheading}>Before contacting us, check out our <a href="/faqs" className={styles.faqLink}> <strong>FAQ page</strong></a> to find quick answers.</p>
          <p className={styles.description}>
            If still facing issue feel free to reach us on below <strong>Contact Details</strong><br />
            We'd love to hear from you! Fill out the Form or contact us via email/phone/WhatsApp.<br /> Your input matters a lot and helps us to improve.<br />
          </p>

          <div className={styles.contactDetails}>

            <div className={styles.contactItem}>
              <PiPhoneCall className={styles.icon} />
              <div>
                <a href={`tel:${mobileNo}`} className={styles.link}>
                  <div className={styles.contactTitle}>Call Us</div>
                  <div className={styles.contactValue}>+91 {mobileNo}</div>
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <TbMail className={styles.icon} />
              <div>
                <a href={`mailto:${emailId}?subject=Customer%20Support%20Inquiry&body=Hello,%20I%20need%20assistance%20with...`} className={styles.link}>
                  <div className={styles.contactTitle}>Email Us</div>
                  <div className={styles.contactValue}>{emailId}</div>
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <FaWhatsapp className={styles.icon} />
              <div>
                <a
                  href={`https://wa.me/${mobileNo}?text=Hello%20Support,%20I%20need%20help%20with...`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.link}
                >
                  <div className={styles.contactTitle}>WhatsApp Us</div>
                  <div className={styles.contactValue}>{mobileNo}</div>
                </a>
              </div>
            </div>

          </div>

          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7358.757419944616!2d88.35129640966178!3d22.751322779278684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b0332447d5b%3A0x783ac24cb2925342!2sGovernment%20College%20of%20Engineering%20%26%20Textile%20Technology!5e0!3m2!1sen!2sus!4v1749124193300!5m2!1sen!2sus"
            loading="lazy"
          ></iframe>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formHeading}>Drop Us Your Query</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <input
              type="number"
              name="phone"
              placeholder="Enter your Phone Number"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}

            <textarea
              name="message"
              placeholder="Write your message"
              className={styles.textarea}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className={styles.error}>{errors.message}</p>}

            <button type="submit" className={styles.button}>SUBMIT NOW</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
