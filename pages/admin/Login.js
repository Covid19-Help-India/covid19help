import styles from "../../styles/Login.module.css";
import { useState } from "react";

import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const api = axios.create({
            baseURL: publicRuntimeConfig.BACKEND_URL,
        });
        let formData = new FormData();
        formData.append("username", e.target.id.value);
        formData.append("password", e.target.pass.value);
        api.post("/login", formData)
            .then((result) => {
                console.log(result);
                if (result.status) {
                    sessionStorage.setItem("user", e.target.id.value);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <p className={styles.title}>LOGIN</p>
            <br />
            <input className={styles.input} id="id" name="id" type="text" placeholder="Username" value={username} required onChange={(e) => setUsername(e.value)} />
            <br />
            <br />
            <input className={styles.input} id="password" name="pass" type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.value)} />
            <br />
            <br />
            <div style={{ width: "100%", textAlign: "center" }}>
                <button className={styles.btn} type="submit">
                    Register
                </button>
            </div>
        </form>
    );
}
