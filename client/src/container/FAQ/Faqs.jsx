import React, { useState } from "react";
import styles from "./Faqs.module.css";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is MedBuddy?", answer: "MedBuddy is a powerful web application tool to help patient to find the right medication easily." },
    { question: "How can I book appointment on MedBuddy?", answer: "You have to register on our platform and go to book appointment section to book an appointment." },
    { question: "How can I get access to MedBuddy?", answer: "You can get access to MedBuddy by registering on our platform." },
    { question: "How does MedBuddy work?", answer: "MedBuddy connects patient and doctors to get the right treatment and medicine at the right time." },
    { question: "How do I get access to MedBuddy's network?", answer: "Register on our platform to unlock network access and benefits." },
    { question: "How do MedBuddy help the patients?", answer: "MedBuddy give multiple options to book appointment and lots of benefits." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqs}>
      <h2 className={styles.faqsTitle}>All the Answer's to your Question's</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div
            className={`${styles.faqItem} ${openIndex === index ? "open" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.faqQuestion}>
              {faq.question}
              <span className={styles.faqToggle}>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
          </div>
        ))}
      </div>
      <div className={styles.faqsFooter}>
        <h3>Still have questions?</h3>
        <p>
          Book a call with our team to learn how we can help you to get better medication—forever.
        </p>
      </div>
    </section>
  );
};

export default FAQs;