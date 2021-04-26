import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
    let [isLoggedIn, setLoggedIn] = useState(false);

    const style = {
        height: "56px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px 8px",
        boxShadow: "0px 0px 12px -4px rgba(0,0,0,1)",
    };

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("user") ? true : false);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        location.replace("/");
    };

    return (
        <div id="navbar" style={style}>
            <a href="/" style={{ width: "32px", height: "32px" }}>
                <Image className="branding-logo" src="/logo.png" alt="Picture of the author" width={32} height={32} />
            </a>
            <div style={{ marginRight: "auto", marginLeft: "6px", fontSize: "20px" }}>Covid19 Help India</div>
            {/* <div style={{ marginRight: "6px", maxHeight: "28px" }}>
                <a target="_blank" href="https://www.twitter.com/covid19help_in" style={{ width: "28px", height: "28px" }}>
                    <Image className="social-links" src="/twitter.png" alt="Picture of the author" width={28} height={28} />
                </a>
            </div>
            <div style={{ marginRight: "6px", maxHeight: "28px" }}>
                <a target="_blank" href="https://www.instagram.com/covid19help.in" style={{ marginLeft: "10px", width: "28px", height: "28px" }}>
                    <Image className="social-links" src="/instagram.png" alt="Picture of the author" width={28} height={28} />
                </a>
            </div> */}
            <div className="navbar-account" style={{ marginRight: "6px", maxHeight: "28px" }}>
                <a target="_blank" href="https://www.linktr.ee/covid19help" style={{ padding: "4px 6px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 6px 20px", borderRadius: "10px", backgroundColor: "#1da1f2", color: "#ffffff", fontSize: "14", marginLeft: "10px", width: "28px", height: "28px" }}>
                    Linktr.ee
                </a>
            </div>
            <div style={{ marginRight: "2px", maxHeight: "28px" }}>
                {!isLoggedIn || window.location.pathname == "/" ? (
                    <a href="/admin" style={{ marginLeft: "10px", width: "28px", height: "28px" }}>
                        <Image className="navbar-account" src="/account.png" alt="Picture of the author" width={28} height={28} />
                    </a>
                ) : (
                    <button className="navbar-account" style={{ marginLeft: "10px", width: "28px", height: "28px" }} onClick={handleLogout}>
                        <Image src="/logout2.png" alt="Picture of the author" width={28} height={28} />
                    </button>
                )}
            </div>
        </div>
    );
}
