import styles from "../../styles/Login.module.css";

export default function Login() {
    return (
        <form className={styles.loginForm}>
            <p className={styles.title}>LOGIN</p>
            <br />
            <input className={styles.input} id="id" type="text" placeholder="id" autoComplete="userid" required />
            <br />
            <br />
            <input className={styles.input} id="password" type="password" placeholder="password" autoComplete="password" required />
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
