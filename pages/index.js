import Nav from "../components/nav.js";
import Footer from "../components/footer.js";
import Table from "./table.js";
import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>

            <Nav />

            <div style={{ padding: "2rem 10px", maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Table />
            </div>

            <Footer />
        </div>
    );
}
