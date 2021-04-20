import Image from "next/image";

export default function Nav() {
    const style = {
        height: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        boxShadow: "0px 0px 8px -4px rgba(0,0,0,1)",
    };
    return (
        <div style={style}>
            <Image src="/logo.png" alt="Picture of the author" width={50} height={50} />
            <div style={{ marginRight: "10px", marginLeft: "10px", fontSize: "24px" }}>Covid19 Help India</div>
        </div>
    );
}
