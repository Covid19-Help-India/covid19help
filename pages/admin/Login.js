import styles from "../../styles/Login.module.css";
import { useState } from "react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {
		const api = axios.create({
			baseURL: "<BASE_URL>",
		});
		api.post("/login", { username: username, password: password })
			.then((res) => res.json())
			.then((result) => {
				if (result.status) {
					sessionStorage.setItem("user", username);
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
			<input
				className={styles.input}
				id="id"
				type="text"
				placeholder="Username"
				value={username}
				required
				onChange={(e) => setUsername(e.value)}
			/>
			<br />
			<br />
			<input
				className={styles.input}
				id="password"
				type="password"
				placeholder="Password"
				value={password}
				required
				onChange={(e) => setPassword(e.value)}
			/>
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
