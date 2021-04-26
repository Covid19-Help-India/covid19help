import Image from "next/image";

export default function Footer() {
    const style = {
        height: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        boxShadow: "0px 0px 8px -4px rgba(0,0,0,1)",
    };
    return (
        <footer style={style}>
            <div className="navbar-account" style={{ marginTop: "auto", paddingLeft: "12px", paddingRight: "12px" }}>
                <a target="_blank" style={{ textDecoration: "none!important" }} href="https://www.twitter.com/covid19help_in">
                    <Image style={{ paddingRight: "4px", paddingLeft: "4px" }} src="/twitter.png" alt="Follow us on Twitter" width={28} height={28} />
                </a>
            </div>
            <div className="navbar-account" style={{ marginTop: "auto", paddingLeft: "12px", paddingRight: "12px" }}>
                <a target="_blank" style={{ textDecoration: "none!important" }} href="https://www.instagram.com/covid19help.in">
                    <Image style={{ paddingRight: "4px", paddingLeft: "4px" }} src="/instagram.png" alt="Follow us on Instagram" width={28} height={28} />
                </a>
            </div>
            <div className="navbar-account" style={{ marginTop: "auto", paddingLeft: "12px", paddingRight: "12px" }}>
                <a target="_blank" style={{ textDecoration: "none!important" }} href="https://t.me/covidhelp123">
                    <Image style={{ paddingRight: "4px", paddingLeft: "4px" }} src="/telegram.png" alt="Join our Telegram Channel" width={28} height={28} />
                </a>
            </div>
            <div className="navbar-account" style={{ marginTop: "auto", paddingLeft: "12px", paddingRight: "12px" }}>
                <a target="_blank" style={{ textDecoration: "none!important" }} href="https://github.com/Covid19-Help-India">
                    <Image style={{ paddingRight: "4px", paddingLeft: "4px" }} src="/github.png" alt="Contribute to our Github Repository" width={28} height={28} />
                </a>
            </div>
        </footer>
    );
}
