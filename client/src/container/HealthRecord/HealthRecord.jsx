import React, { useState } from "react";
import styles from "./HealthRecord.module.css";

const HealthRecord = () => {
    const [formData, setFormData] = useState({
        bloodPressure: "",
        bodyTemperature: "",
        height: "",
        weight: "",
        bmi: "",
        smokingStatus: "",
        alcoholConsumption: "",
    });

    const [records, setRecords] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRecords([...records, formData]);
        setFormData({
            bloodPressure: "",
            bodyTemperature: "",
            height: "",
            weight: "",
            bmi: "",
            smokingStatus: "",
            alcoholConsumption: "",
        });
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Health Record Form</h2>

                <label>
                    Blood Pressure (Systolic/Diastolic):
                    <input
                        type="text"
                        name="bloodPressure"
                        value={formData.bloodPressure}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    Body Temperature:
                    <input
                        type="number"
                        step="0.1"
                        name="bodyTemperature"
                        value={formData.bodyTemperature}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    Height:
                    <input
                        type="number"
                        step="0.1"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    Weight:
                    <input
                        type="number"
                        step="0.1"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    BMI:
                    <input
                        type="number"
                        step="0.1"
                        name="bmi"
                        value={formData.bmi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    Smoking Status:
                    <select
                        name="smokingStatus"
                        value={formData.smokingStatus}
                        onChange={handleChange}
                        className={styles.input}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>

                <label>
                    Alcohol Consumption:
                    <select
                        name="alcoholConsumption"
                        value={formData.alcoholConsumption}
                        onChange={handleChange}
                        className={styles.input}
                    >
                        <option value="">Select</option>
                        <option value="Never">Never</option>
                        <option value="Occasional">Occasional</option>
                        <option value="Regular">Regular</option>
                    </select>
                </label>

                <button type="submit" className={styles.button}>Save Record</button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Blood Pressure</th>
                        <th>Body Temp (°C)</th>
                        <th>Height (cm)</th>
                        <th>Weight (kg)</th>
                        <th>BMI</th>
                        <th>Smoking</th>
                        <th>Alcohol</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.bloodPressure}</td>
                            <td>{record.bodyTemperature}</td>
                            <td>{record.height}</td>
                            <td>{record.weight}</td>
                            <td>{record.bmi}</td>
                            <td>{record.smokingStatus}</td>
                            <td>{record.alcoholConsumption}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HealthRecord;
