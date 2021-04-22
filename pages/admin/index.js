import Nav from "../../components/nav.js";
import Footer from "../../components/footer.js";
import AdminTable from "./admintable.js";
import Login from "./Login.js";
import { useState, useEffect } from "react";

export default function Admin() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [windowHeight, setWindowHeight] = useState("");

    useEffect(() => {
        setWindowHeight(window.innerHeight - 56);
        setLoggedIn(sessionStorage.getItem("user") ? true : false);
    }, []);

    if (isLoggedIn) {
        return (
            <div>
                <Nav />

                <div
                    style={{
                        // padding: "1rem 10px",
                        maxWidth: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <AdminTable />
                </div>

                {/* <Footer /> */}
            </div>
        );
    } else {
        return (
            <div>
                <Nav />

                <div
                    style={{
                        minHeight: windowHeight,
                        backgroundColor: "#1DA1F2",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem 10px",
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <Login />
                </div>

                {/* <Footer /> */}
            </div>
        );
    }
}
