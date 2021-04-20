import Image from "next/image";
import Link from "next/link";

export default function Nav() {
    const isLoggedIn = true;

    const style = {
        height: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        boxShadow: "0px 0px 12px -4px rgba(0,0,0,1)",
    };

    if (!isLoggedIn) {
        return (
            <div id="navbar" style={style}>
                <Link href="/">
                    <Image className="branding-logo" src="/logo.png" alt="Picture of the author" width={36} height={36} />
                </Link>
                <div style={{ marginRight: "auto", marginLeft: "10px", fontSize: "20px" }}>Covid19 Help India</div>
                <Link href="/admin">
                    <Image className="navbar-account" style={{ padding: "4px 12px" }} src="/logout.png" alt="Picture of the author" width={22} height={22} />
                </Link>
            </div>
        );
    } else {
        return (
            <div id="navbar" style={style}>
                <Link href="/">
                    <Image className="branding-logo" src="/logo.png" alt="Picture of the author" width={36} height={36} />
                </Link>
                <div style={{ marginRight: "auto", marginLeft: "10px", fontSize: "20px" }}>Covid19 Help India</div>
                <Link href="/admin">
                    <Image className="navbar-account" style={{ padding: "4px 12px" }} src="/account.png" alt="Picture of the author" width={28} height={28} />
                </Link>
            </div>
        );
    }
}
