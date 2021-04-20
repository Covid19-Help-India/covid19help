import Nav from "../../components/nav.js";
import Footer from "../../components/footer.js";
import AdminTable from "./admintable.js";

export default function Admin() {
    return (
        <div>
            <Nav />

            <div style={{ padding: "2rem 10px", maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <AdminTable />
            </div>

            <Footer />
        </div>
    );
}
