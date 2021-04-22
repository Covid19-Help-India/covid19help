import Nav from "../components/nav.js";
import Footer from "../components/footer.js";
import Search from "../components/Search.js";
import Table from "./table.js";
import Head from "next/head";
import { useState, useEffect } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import "../styles/Table.module.css";

export default function Home() {
    resetServerContext();
    const [windowHeight, setWindowHeight] = useState("");

    useEffect(() => {
        setWindowHeight(window.innerHeight - 56);
    }, []);

    return (
        <div>
            <Head>
                <title>Covid19 Help India</title>
                <link rel="icon" href="/favicon.ico" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-195041793-1" />
                <script
                    dangerouslySetInnerHTML={{
                                        __html: `
                        window.dataLayer = window.dataLayer || []
                        function gtag(){
                            dataLayer.push(arguments)
                        }
                        gtag('js', new Date())
                        gtag('config', 'UA-195041793-1')
                        `,
                    }}
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>

            <Nav />
            <Search />
            <div
                style={{
                    padding: "10px",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Table />
            </div>

            {/* <Footer /> */}
        </div>
    );
}
