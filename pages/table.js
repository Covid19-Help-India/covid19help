import { forwardRef, useState, useEffect } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
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

export default function Table() {
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
            title: "CITY",
            field: "City",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray", whiteSpace: "nowrap" },
        },
        { title: "CATEGORY", field: "Category", cellStyle: { whitespace: "nowrap" } },
        {
            title: "UPVOTES",
            field: "Upvotes",
            editable: "never",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
            render: (rowData) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <button
                            id={`d_${rowData.id}`}
                            onClick={() => upvoteHandler(rowData)}
                            className="focus:outline-none vote-button"
                            style={{
                                padding: 4,
                                fontSize: 12,
                                minWidth: "100px",
                                padding: "6px 10px 6px 16px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "#DDFFDD",
                                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                borderRadius: "7px",
                            }}
                        >
                            <div style={{ fontSize: "16px" }}>
                                <b>{rowData.Upvotes}</b>
                            </div>
                            <ArrowUpward className="fill-current text-green-600" />
                        </button>
                    </div>
                );
            },
        },
        {
            title: "DOWNVOTES",
            field: "Downvotes",
            editable: "never",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
            render: (rowData) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            id={`d_${rowData.id}`}
                            onClick={() => downvoteHandler(rowData)}
                            className="focus:outline-none vote-button"
                            style={{
                                padding: 4,
                                fontSize: 12,
                                minWidth: "100px",
                                padding: "6px 10px 6px 16px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "#fbebd8",
                                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                borderRadius: "7px",
                            }}
                        >
                            <div style={{ fontSize: "16px" }}>
                                <b>{rowData.Downvotes}</b>
                            </div>
                            <ArrowDownward style={{ marginLeft: "auto" }} className="fill-current text-red-600" />
                        </button>
                    </div>
                );
            },
        },
        {
            title: "RECENT STATUS",
            field: "Details",
            editable: "never",
            render: (rowData) => {
                return (() => {
                    if (rowData.Details.includes("Downvoted")) return <span style={{ color: "red" }}>{rowData.Details}</span>;
                    if (rowData.Details.includes("Upvoted")) return <span style={{ color: "green" }}>{rowData.Details}</span>;
                    if (rowData.Details.includes("Added")) return <span style={{ color: "blue" }}>{rowData.Details}</span>;
                    if (rowData.Details.includes("Data Edited")) return <span style={{ color: "#800080" }}>{rowData.Details}</span>;
                    else return <span>-</span>;
                })();
            },
        },
        {
            title: "STATE",
            field: "State",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray", whiteSpace: "nowrap" },
        },
        { title: "DISTRIBUTOR NAME", field: "Distributor" },
        { title: "Distributor Contact", field: "DistPhNo", cellStyle: { whitespace: "nowrap" } },
        {
            title: "DISTRIBUTOR ADDRESS",
            field: "DistAddress",
            headerStyle: { width: "10px" },
            cellStyle: { whitespace: "nowrap" },
        },
        {
            title: "PINCODE",
            field: "Pincode",
            cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
        },
        {
            title: "SOURCE OF INFORMATION",
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
    ];

    const options = {
        pageSize: 100,
        pageSizeOptions: [10, 25, 50, 100, 250, 500, 1000],
        showTitle: false,
        minBodyHeight: windowHeight,
        maxBodyHeight: windowHeight,
        filtering: true,
        actionsColumnIndex: 11,
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
            editTooltip: "Login to Edit Data",
            deleteTooltip: "Login to Delete Data",
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

    const upvoteHandler = (rowData) => {
        let formData = new FormData();
        formData.append("id", rowData.id);
        api.post("/upvote", formData)
            .then((res) => {
                if (res.data.status) {
                    const dataUpdate = [...data];
                    const index = rowData.tableData.id;
                    rowData = res.data;
                    dataUpdate[index] = rowData;
                    setData([...dataUpdate]);
                    setError(false);
                    setErrorMessages([]);
                } else {
                    setErrorMessages(["Cannot add data!"]);
                    setError(true);
                    console.log(errorMessage);
                }
            })
            .catch((error) => {
                setErrorMessages(["Cannot add data! " + error]);
                setError(true);
                console.log(errorMessage);
            });
    };

    const downvoteHandler = (rowData) => {
        let formData = new FormData();
        formData.append("id", rowData.id);
        api.post("/downvote", formData)
            .then((res) => {
                if (res.data.status) {
                    const dataUpdate = [...data];
                    const index = rowData.tableData.id;
                    rowData = res.data;
                    dataUpdate[index] = rowData;
                    setData([...dataUpdate]);
                    setError(false);
                    setErrorMessages([]);
                } else {
                    setErrorMessages(["Cannot add data!"]);
                    setError(true);
                    console.log(errorMessage);
                }
            })
            .catch((error) => {
                setErrorMessages(["Cannot add data! " + error]);
                setError(true);
                console.log(errorMessage);
            });
    };

    const handleRowAdd = (newData, resolve) => {
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

    const editable = {
        isEditable: (rowData) => false, // real code uses some logic to make certain rows non editable
        isDeletable: (rowData) => false,
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
