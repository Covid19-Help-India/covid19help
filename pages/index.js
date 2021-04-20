import Nav from "../components/nav.js";
import Table from "../components/table.js";
import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>

            <Nav />
            <Table />

            <footer></footer>
        </div>
    );
}
