import Nav from "../components/nav.js";
import Footer from "../components/footer.js";
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
				<link rel="icon" href="/covid19icon.ico" />
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=UA-195041793-1"
				/>
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

                <title>Covid19 Help India</title>
                <meta name="keywords" content="Covid19 Help India" />
                <meta name="language" content="EN" />
                <meta name="robots" content="INDEX, FOLLOW" />
                <meta name="author" content="Covid19 Help India" />
                <meta name="designer" content="Covid19 Help India" />
                <meta name="copyright" content="Covid19 Help India" />
                <meta name="owner" content="Covid19 Help India" />
                <meta name="geo.region" content="IN" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <meta name="og:locality" content="Mumbai" />
                <meta name="og:region" content="IN" />
                <meta name="og:title" content="Covid19 Help India" />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Covid19 Help India" />
                <meta property="og:title" content="Covid19 Help India" />
                <meta property="og:description" content="Covid19 Help India" />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://covid19help-in.herokuapp.com/" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:site" content="https://www.twitter.com/covid19help_in/" />
                <meta property="twitter:title" content="Covid19 Help India" />
                <meta property="twitter:description" content="Covid19 Help India" />
                <meta property="twitter:url" content="https://www.twitter.com/covid19help_in/" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>

            <Nav />
            {/* <Search /> */}
            <div
                style={{
                    // padding: "10px",
                    maxWidth: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Table />
            </div>
        </div>
    );
}
