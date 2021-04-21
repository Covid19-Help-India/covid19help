import Nav from "../../components/nav.js";
import Footer from "../../components/footer.js";
import AdminTable from "./admintable.js";
import Login from "./login.js";
import { useState, useEffect } from "react";

export default function Admin() {
    const isLoggedIn = true;
    const [windowHeight, setWindowHeight] = useState("");

    useEffect(() => {
        setWindowHeight(window.innerHeight - 110);
    }, []);

    if (isLoggedIn) {
        return (
            <div>
                <Nav />

                <div style={{ minHeight: windowHeight, padding: "2rem 10px", maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
                    <AdminTable />
                </div>

                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <Nav />

                <div style={{ minHeight: windowHeight, backgroundColor: "#1DA1F2", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "4rem", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                    <Login />
                </div>

                <Footer />
            </div>
        );
    }
}
