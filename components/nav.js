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
        boxShadow: "0px 0px 8px -4px rgba(0,0,0,1)",
    };

    if (isLoggedIn) {
        return (
            <div style={style}>
                <Image src="/logo.png" alt="Picture of the author" width={36} height={36} />
                <div style={{ marginRight: "auto", marginLeft: "10px", fontSize: "20px" }}>Covid19 Help India</div>
                <Link href="/about">
                    <Image style={{ padding: "4px" }} src="/logout.png" alt="Picture of the author" width={22} height={22} />
                </Link>
            </div>
        );
    } else {
        return (
            <div style={style}>
                <Image src="/logo.png" alt="Picture of the author" width={36} height={36} />
                <div style={{ marginRight: "auto", marginLeft: "10px", fontSize: "20px" }}>Covid19 Help India</div>
                <Link href="/about">
                    <Image style={{ padding: "4px" }} src="/account.png" alt="Picture of the author" width={22} height={22} />
                </Link>
            </div>
        );
    }
}
