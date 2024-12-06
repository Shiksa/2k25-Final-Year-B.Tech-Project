import React, { useState } from "react";
import styles from "./Faqs.module.css";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is MedBuddy?", answer: "Merclink is a powerful web application tool to help patient to find the right medication easily." },
    { question: "How can I book appointment on MedBuddy?", answer: "You can sign up and apply through our partner program." },
    { question: "How does MedBuddy work?", answer: "MedBuddy connects patient and doctors to get the right treatment at the right time." },
    { question: "How do you make money?", answer: "We earn revenue by charging a small fee on successful transactions." },
    { question: "How do I get access to MedBuddy's network?", answer: "Register on our platform to unlock network access and benefits." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqs}>
      <h2 className={styles.faqsTitle}>All the A's to your Q's</h2>
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
          Book a call with our team to learn how we can help you better manage your e-commerce business—forever.
        </p>
      </div>
    </section>
  );
};

export default FAQs;
