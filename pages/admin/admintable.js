import { forwardRef, useState, useEffect } from "react";

import ReactDOM from "react-dom";
import MaterialTable from "material-table";

import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

export default function AdminTable() {
    const [data, setData] = useState([]); //table data
    const [errorMessage, setErrorMessage] = useState(""); //error message
    const [error, setError] = useState(false); //error

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };

    const columns = [
        { title: "id", field: "id", hidden: true },
        { title: "State", field: "State" },
        { title: "City", field: "City" },
        { title: "Category", field: "Category" },
        { title: "Distributor", field: "Distributor" },
        { title: "DistPhNo", field: "DistPhNo" },
        { title: "DistAddress", field: "DistAddress" },
        { title: "Pincode", field: "Pincode" },
        { title: "Upvotes", field: "Upvotes" },
        { title: "Downvotes", field: "Downvotes" },
        { title: "Source", field: "Source" },
    ];

    const options = {
        pageSize: 10,
        pageSizeOptions: [5, 10, 25, 50, 100],
        filtering: true,
    };

    const handleRowAdd = (newData, resolve) => {
        let errorList = [];
        if (newData.first_name === undefined) {
            errorList.push("Please enter first name");
        }
        if (newData.last_name === undefined) {
            errorList.push("Please enter last name");
        }
        if (newData.email === undefined) {
            errorList.push("Please enter a valid email");
        }
        if (errorList.length < 1) {
            api.post("/users", newData)
                .then((res) => {
                    let dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve();
                    setErrorMessages([]);
                    setIserror(false);
                })
                .catch((error) => {
                    setErrorMessages(["Cannot add data. Server error!"]);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        if (errorList.length < 1) {
            api.patch("/users/" + newData.id, newData)
                .then((res) => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                    setIserror(false);
                    setErrorMessages([]);
                })
                .catch((error) => {
                    setErrorMessages(["Update failed! Server error"]);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    const handleRowDelete = (oldData, resolve) => {
        api.delete("/users/" + oldData.id)
            .then((res) => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
            })
            .catch((error) => {
                setErrorMessages(["Delete failed! Server error"]);
                setIserror(true);
                resolve();
            });
    };

    const editable = {
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
            }),
        onRowAdd: (newData) =>
            new Promise((resolve) => {
                handleRowAdd(newData, resolve);
            }),
        onRowDelete: (oldData) =>
            new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
            }),
    };

    useEffect(() => {
        const api = axios.create({
            baseURL: publicRuntimeConfig.BACKEND_URL,
        });
        let formData = new FormData();
        formData.append("City", "Mumbai");
        api.post("/get_info", formData)
            .then((res) => {
                console.log(res.data);
                console.log(typeof res.data);
                setData(res.data);
            })
            .catch((error) => {
                setErrorMessage(["Cannot load user data"]);
                setError(true);
            });
    }, []);

    return (
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable columns={columns} data={data} options={options} title="Covid19 Help India" icons={tableIcons} editable={editable} />
        </div>
    );
}
