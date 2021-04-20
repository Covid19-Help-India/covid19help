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
            <div style={{ marginTop: "auto", paddingLeft: "12px", paddingRight: "12px" }}>
                <a target="_blank" style={{ textDecoration: "none!important" }} href="https://www.twitter.com/covid19help_in">
                    <Image style={{ paddingRight: "4px", paddingLeft: "4px" }} src="/twitter.png" alt="Picture of the author" width={32} height={32} />
                </a>
            </div>
            <div style={{ marginTop: "auto", paddingLeft: "12px", paddingRight: "12px" }}>
                <a target="_blank" style={{ textDecoration: "none!important" }} href="https://www.instagram.com/covid19help.in">
                    <Image style={{ paddingRight: "4px", paddingLeft: "4px" }} src="/instagram.png" alt="Picture of the author" width={32} height={32} />
                </a>
            </div>
        </footer>
    );
}
