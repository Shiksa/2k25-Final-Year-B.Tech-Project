import React, { useState, useEffect } from "react";
import styles from "./HealthRecord.module.css";
import { FaTrash } from "react-icons/fa";
// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from '../../contexts/AuthContext';


const HealthRecord = () => {
    const { user, isAuthenticated } = useAuth();


    // console.log("Auth0 user:", user);
    // console.log("Is Authenticated:", isAuthenticated);


    const [formData, setFormData] = useState({
        bloodGroup: "",
        bloodPressure: "",
        bodyTemperature: "",
        heartRate: "",
        cholesterolLevel: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        bloodSugar: "",
        oxygenSaturation: "",
        notes: "",
    });

    const [records, setRecords] = useState([]);
    const [diagnosis, setDiagnosis] = useState("");

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/api/health-records/${user.email}`)
                .then(res => res.json())
                .then(data => setRecords(data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDelete = async (idToDelete) => {
        try {
            await fetch(`http://localhost:5000/api/health-records/${idToDelete}`, {
                method: "DELETE",
            });
            setRecords(records.filter(record => record._id !== idToDelete));
        } catch (err) {
            console.error("Error deleting record:", err);
        }
    };

    const generateDiagnosis = () => {
        const {
            bodyTemperature,
            cholesterolLevel,
            heartRate,
            bloodSugar,
            oxygenSaturation,
            weight,
            heightFeet,
            heightInches,
        } = formData;

        let result = [];

        const temp = parseFloat(bodyTemperature);
        const chol = parseFloat(cholesterolLevel);
        const heart = parseInt(heartRate);
        const sugar = parseFloat(bloodSugar);
        const oxy = parseFloat(oxygenSaturation);
        const weightKg = parseFloat(weight);
        const heightFt = parseInt(heightFeet);
        const heightIn = parseInt(heightInches);
        const heightInMeters = ((heightFt * 12) + heightIn) * 0.0254;
        const bmi = weightKg / (heightInMeters * heightInMeters);

        if (!isNaN(temp) && temp > 100.4) result.push("Fever");
        if (!isNaN(chol) && chol > 200) result.push("High Cholesterol");
        if (!isNaN(heart) && (heart < 60 || heart > 100)) result.push("Abnormal Heart Rate");
        if (!isNaN(sugar) && sugar > 140) result.push("Possible Diabetes");
        if (!isNaN(oxy) && oxy < 95) result.push("Low Oxygen Level");
        if (!isNaN(bmi) && bmi > 25) result.push("Overweight");
        if (!isNaN(bmi) && bmi < 18.5) result.push("Underweight");

        return result.length > 0 ? result.join(", ") : "All values seem normal.";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is authenticated
        if (!isAuthenticated || !user.email) {
            alert("Please log in to save your health record.");
            return;
        }

        const finalHeight = `${formData.heightFeet}ft ${formData.heightInches}inch`;
        const diagnosisResult = generateDiagnosis();

        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-GB"); // dd/mm/yyyy
        const shortDate = formattedDate.split("/").map((part, i) => (i === 2 ? part.slice(2) : part)).join("/");

        const newRecord = {
            bloodGroup: formData.bloodGroup,
            bloodPressure: formData.bloodPressure,
            bodyTemperature: parseFloat(formData.bodyTemperature),
            heartRate: parseInt(formData.heartRate),
            cholesterolLevel: parseFloat(formData.cholesterolLevel),
            height: finalHeight,
            weight: parseFloat(formData.weight),
            bloodSugar: parseFloat(formData.bloodSugar),
            oxygenSaturation: parseFloat(formData.oxygenSaturation),
            notes: formData.notes,
            diagnosis: diagnosisResult,
            date: shortDate,
            userEmail: user.email, // ✅ This fixes the 400 Bad Request error
        };

        try {
            const response = await fetch("http://localhost:5000/api/health-records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRecord),
            });

            if (!response.ok) {
                throw new Error("Failed to save record");
            }

            const savedRecord = await response.json();
            setRecords([...records, savedRecord]);
            setDiagnosis(diagnosisResult);

            // Reset form
            setFormData({
                bloodGroup: "",
                bloodPressure: "",
                bodyTemperature: "",
                heartRate: "",
                cholesterolLevel: "",
                heightFeet: "",
                heightInches: "",
                weight: "",
                bloodSugar: "",
                oxygenSaturation: "",
                notes: "",
            });
        } catch (error) {
            console.error("Error saving record:", error);
            alert("Failed to save health record. Please check console for details.");
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}>Health Record Form</h2>

                    <label>Blood Group:
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className={styles.input}>
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </label>

                    <label>Blood Pressure (e.g., 120/80):
                        <input name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Body Temperature (°F):
                        <input type="number" step="0.1" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Heart Rate (bpm):
                        <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Cholesterol Level (mg/dL):
                        <input type="number" step="0.1" name="cholesterolLevel" value={formData.cholesterolLevel} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Height:
                        <div className={styles.flex}>
                            <input type="number" name="heightFeet" placeholder="Feet" value={formData.heightFeet} onChange={handleChange} required className={styles.inputHalf} />
                            <input type="number" name="heightInches" placeholder="Inches" value={formData.heightInches} onChange={handleChange} required className={styles.inputHalf} />
                        </div>
                    </label>

                    <label>Weight (kg):
                        <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Blood Sugar (mg/dL):
                        <input type="number" step="0.1" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Oxygen Saturation (%):
                        <input type="number" step="0.1" name="oxygenSaturation" value={formData.oxygenSaturation} onChange={handleChange} required className={styles.input} />
                    </label>

                    <label>Notes:
                        <textarea name="notes" value={formData.notes} onChange={handleChange} required className={styles.textarea}></textarea>
                    </label>

                    <button type="submit" className={styles.button}>Save Record</button>
                </form>
            </div>

            {diagnosis && (
                <div className={styles.diagnosis}>
                    <strong>Latest Diagnosis:</strong> {diagnosis}
                </div>
            )}

            <div class="table-wrapper">
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Blood Group</th>
                            <th>BP</th>
                            <th>Temp (°F)</th>
                            <th>Heart Rate</th>
                            <th>Cholesterol</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Blood Sugar</th>
                            <th>O₂ Saturation</th>
                            <th>Diagnosis</th>
                            <th>Notes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={record._id || index}>
                                <td>{record.date}</td>
                                <td>{record.bloodGroup}</td>
                                <td>{record.bloodPressure}</td>
                                <td>{record.bodyTemperature}</td>
                                <td>{record.heartRate}</td>
                                <td>{record.cholesterolLevel}</td>
                                <td>{record.height}</td>
                                <td>{record.weight}</td>
                                <td>{record.bloodSugar}</td>
                                <td>{record.oxygenSaturation}</td>
                                <td>{record.diagnosis}</td>
                                <td>{record.notes}</td>
                                <td>
                                    <button onClick={() => handleDelete(record._id)} className={styles.deleteBtn}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HealthRecord;
