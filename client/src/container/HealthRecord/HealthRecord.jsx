import React, { useState } from "react";
import styles from "./HealthRecord.module.css";

const HealthRecord = () => {
    const [formData, setFormData] = useState({
        bloodGroup: "",
        bloodPressure: "",
        bodyTemperature: "",
        heartRate: "",
        cholesterolLevel: "",
        height: "",
        weight: "",
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
            bloodGroup: "",
            bloodPressure: "",
            bodyTemperature: "",
            heartRate: "",
            cholesterolLevel: "",
            height: "",
            weight: "",
        });
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Health Record Form</h2>

                <label>
                    Blood Group:
                    <input
                        type="text"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

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
                    Heart Rate (bpm):
                    <input
                        type="number"
                        name="heartRate"
                        value={formData.heartRate}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    Cholesterol Level (mg/dL):
                    <input
                        type="number"
                        step="0.1"
                        name="cholesterolLevel"
                        value={formData.cholesterolLevel}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <label>
                    Height (cm):
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
                    Weight (kg):
                    <input
                        type="number"
                        step="0.1"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>

                <button type="submit" className={styles.button}>Save Record</button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Blood Group</th>
                        <th>Blood Pressure</th>
                        <th>Body Temp (°C)</th>
                        <th>Heart Rate (bpm)</th>
                        <th>Cholesterol Level (mg/dL)</th>
                        <th>Height (cm)</th>
                        <th>Weight (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.bloodGroup}</td>
                            <td>{record.bloodPressure}</td>
                            <td>{record.bodyTemperature}</td>
                            <td>{record.heartRate}</td>
                            <td>{record.cholesterolLevel}</td>
                            <td>{record.height}</td>
                            <td>{record.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HealthRecord;
