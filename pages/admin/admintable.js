import { forwardRef, useState, useEffect } from "react";

import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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

const useStyles = makeStyles({
    toolbarWrapper: {
        "& .MuiPaper-root": {
            border: "none",
        },
        "& .MuiToolbar-gutters": {
            paddingLeft: 20,
            paddingRight: 20,
        },
        "& .MTableToolbar-searchField-11": {
            minWidth: "90%",
            paddingLeft: 0,
            paddingRight: 0,
        },
        "& .MuiTablePagination-caption": {
            display: "none",
        },
        "& .MuiTablePagination-toolbar": {
            minHeight: "54px",
            maxHeight: "54px",
        },
    },
});

export default function AdminTable() {
    const classes = useStyles();
    const api = axios.create({
        baseURL: publicRuntimeConfig.BACKEND_URL,
    });
    const [data, setData] = useState([]); //table data
    const [errorMessage, setErrorMessages] = useState(""); //error message
    const [error, setError] = useState(false); //error
    const [windowHeight, setWindowHeight] = useState("");

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
        {
            title: "City",
            field: "City",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray", whiteSpace: "nowrap" },
        },
        { title: "Category", field: "Category" },
        {
            title: "Upvotes",
            field: "Upvotes",
            editable: "never",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
        },
        {
            title: "Downvotes",
            field: "Downvotes",
            editable: "never",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
        },
        {
            title: "State",
            field: "State",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray", whiteSpace: "nowrap" },
        },
        { title: "Distributor Name", field: "Distributor" },
        { title: "Distributor Contact", field: "DistPhNo" },
        {
            title: "Distributor Address",
            field: "DistAddress",
            headerStyle: { width: "10px" },
        },
        {
            title: "Pincode",
            field: "Pincode",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
        },
        {
            title: "Source Link",
            field: "Source",
            render: (rowData) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "left",
                        }}
                    >
                        <div>
                            {rowData.Source == "NaN" || rowData.Source == "-" || rowData.Source == " " ? (
                                <p>-</p>
                            ) : (
                                // <a href={rowData.Source} target="_blank" className="text-blue-400 underline">
                                <p>{rowData.Source}</p>
                                // </a>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Details",
            field: "Details",
            editable: "never",
            render: (rowData) => {
                return (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: rowData.Details,
                        }}
                    />
                );
            },
        },
    ];

    const options = {
        pageSize: 100,
        pageSizeOptions: [10, 25, 50, 100, 250, 500, 1000],
        showTitle: false,
        minBodyHeight: windowHeight,
        maxBodyHeight: windowHeight,
        filtering: true,
        headerStyle: {
            border: "0.5px solid lightgray",
            background: "#1da1f2",
            color: "#ffffff",
            textAlign: "left",
            fontSize: "16px",
            whiteSpace: "nowrap",
        },
        searchFieldStyle: {
            width: "100%",
            border: "none",
        },
        cellStyle: {
            border: "0.5px solid lightgray",
            whiteSpace: "nowrap",
        },
        paginationType: "stepped",
        addRowPosition: "first",
        padding: "dense",
    };

    const localization = {
        body: {
            addTooltip: "Add data",
            editTooltip: "Edit Data",
            deleteTooltip: "Delete Data",
            emptyDataSourceMessage: "Sorry, We currently have NO resources available to display.",
        },
        pagination: {
            labelDisplayedRows: "",
            labelRowsSelect: "",
            labelRowsPerPage: "",
            firstAriaLabel: "First Page",
            firstTooltip: "First Page",
            previousAriaLabel: "Previous Page",
            previousTooltip: "Previous Page",
            nextAriaLabel: "Next Page",
            nextTooltip: "Next Page",
            lastAriaLabel: "Last Page",
            lastTooltip: "Last Page",
        },
        toolbar: {
            searchPlaceholder: "Search Categories, Locations, Distributors",
        },
    };

    const components = {
        Toolbar: (props) => (
            <div
                className={classes.toolbarWrapper}
                style={{
                    height: "56px",
                    width: "100%",
                }}
            >
                <MTableToolbar {...props} />
            </div>
        ),
        Container: (props) => <Paper {...props} elevation={0} />,
    };

    const style = {
        borderRadius: "0px",
        boxShadow: "0px 0px white",
        borderBottom: "none",
        borderTop: "0.5px solid lightgray",
        width: "100%",
    };

    const handleRowAdd = (newData, resolve) => {
        let errorList = [];
        if (newData.City === undefined) {
            alert("Please add City. For Eg.: Mumbai");
            errorList.push("Please enter city");
        }
        if (newData.Category === undefined) {
            alert("Please add Category. For Eg.: Remdesivir (7) or Beds (100)");
            errorList.push("Please enter category of resource");
        }
        if (newData.Distributor === undefined) {
            alert("Please add Distributor Name.");
            errorList.push("Please enter distributor name");
        }
        if (newData.DistPhNo === undefined) {
            alert("Please add Distributor Phone Number.");
            errorList.push("Please enter distributor contact info");
        }
        let formData = new FormData();
        for (var key in newData) {
            formData.append(key, newData[key]);
        }
        if (errorList.length < 1) {
            api.post("/add_info", formData)
                .then((res) => {
                    if (res.data.status) {
                        let dataToAdd = [...data];
                        newData["id"] = res.data.id;
                        newData = res.data;
                        dataToAdd.push(newData);
                        setData(dataToAdd);
                        setErrorMessages([]);
                        setError(false);
                    } else {
                        setErrorMessages(["Cannot add data!"]);
                        setError(true);
                        console.log(errorMessage);
                    }
                    resolve();
                })
                .catch((error) => {
                    setErrorMessages(["Cannot add data! " + error]);
                    setError(true);
                    console.log(errorMessage);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setError(true);
            resolve();
        }
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = [];
        if (newData.City === undefined) {
            errorList.push("Please enter city");
        }
        if (newData.Category === undefined) {
            errorList.push("Please enter category of resource");
        }
        if (newData.Distributor === undefined) {
            errorList.push("Please enter distributor name");
        }
        if (newData.DistPhNo === undefined) {
            errorList.push("Please enter distributor contact info");
        }
        let formData = new FormData();
        for (var key in newData) {
            formData.append(key, newData[key]);
        }
        if (errorList.length < 1) {
            api.post("/edit_info", formData)
                .then((res) => {
                    if (res.data.status) {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        setError(false);
                        setErrorMessages([]);
                    } else {
                        setErrorMessages(["Update failed! " + error]);
                        setError(true);
                    }
                    resolve();
                })
                .catch((error) => {
                    setErrorMessages(["Update failed! " + error]);
                    setError(true);
                    console.log(errorMessage);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setError(true);
            resolve();
        }
    };

    const handleRowDelete = (oldData, resolve) => {
        let formData = new FormData();
        formData.append("id", oldData["id"]);
        api.post("/del_info", formData)
            .then((res) => {
                if (res.data.status) {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                } else {
                    setErrorMessages(["Delete failed!"]);
                    setError(true);
                }
                resolve();
            })
            .catch((error) => {
                setErrorMessages(["Delete failed! " + error]);
                setError(true);
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
        setWindowHeight(window.innerHeight - 216);
        const api = axios.create({
            baseURL: publicRuntimeConfig.BACKEND_URL,
        });
        let formData = new FormData();
        formData.append("City", "Mumbai");
        api.post("/get_info", formData)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                setErrorMessages(["Cannot load user data"]);
                setError(true);
            });
    }, []);

    return (
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable style={style} columns={columns} components={components} localization={localization} data={data} options={options} title="Covid19 Help India" icons={tableIcons} editable={editable} />
        </div>
    );
}
