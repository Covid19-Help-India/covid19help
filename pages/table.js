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
		"& th": {
			width: "200px",
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
		Delete: forwardRef((props, ref) => (
			<DeleteOutline {...props} ref={ref} />
		)),
		DetailPanel: forwardRef((props, ref) => (
			<ChevronRight {...props} ref={ref} />
		)),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => (
			<FirstPage {...props} ref={ref} />
		)),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => (
			<ChevronRight {...props} ref={ref} />
		)),
		PreviousPage: forwardRef((props, ref) => (
			<ChevronLeft {...props} ref={ref} />
		)),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => (
			<ArrowDownward {...props} ref={ref} />
		)),
		ThirdStateCheck: forwardRef((props, ref) => (
			<Remove {...props} ref={ref} />
		)),
		ViewColumn: forwardRef((props, ref) => (
			<ViewColumn {...props} ref={ref} />
		)),
	};

	const columns = [
		{ title: "id", field: "id", hidden: true },
		{ title: "Category", field: "Category" },
		{
			title: "Upvotes",
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
						<div>{rowData.Upvotes}</div>
						<button
							onClick={upvoteHandler}
							className="focus:outline-none"
							style={{
								padding: 4,
								borderRadius: 5,
								fontSize: 12,
								marginLeft: "auto",
							}}
						>
							<ArrowUpward className="fill-current text-green-600" />
						</button>
					</div>
				);
			},
		},
		{
			title: "Downvotes",
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
							justifyContent: "space-between",
						}}
					>
						<div>{rowData.Downvotes}</div>
						<button
							onClick={downvoteHandler}
							className="focus:outline-none"
							style={{
								padding: 4,
								borderRadius: 5,
								fontSize: 12,
								marginLeft: "auto",
							}}
						>
							<ArrowDownward className="fill-current text-red-600" />
						</button>
					</div>
				);
			},
		},
		{
			title: "City",
			field: "City",
			cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
		},
		{
			title: "State",
			field: "State",
			cellStyle: { textAlign: "center", border: "0.5px solid lightgray" },
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
			title: "Source",
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
							{rowData.Source == "NaN" ? (
								<p>-</p>
							) : (
								<a
									href={rowData.Source}
									target="_blank"
									className="text-blue-400 underline"
								>
									{rowData.Source}
								</a>
							)}
						</div>
					</div>
				);
			},
		},
		{
			title: "Details",
			field: "Details",
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
		pageSize: 10,
		pageSizeOptions: [10, 25, 50, 100],
		showTitle: false,
		maxBodyHeight: windowHeight,
		headerStyle: {
			border: "0.5px solid lightgray",
			background: "#1da1f2",
			color: "#f5f5f5",
			textAlign: "left",
			whiteSpace: "nowrap",
		},
		cellStyle: {
			border: "0.5px solid lightgray",
			whiteSpace: "nowrap",
		},
		paginationType: "stepped",
		addRowPosition: "first",
	};

	const localization = {
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
	};

	const components = {
		Toolbar: (props) => (
			<div className={classes.toolbarWrapper}>
				<MTableToolbar {...props} />
			</div>
		),
		Container: (props) => <Paper {...props} elevation={0} />,
	};

	const upvoteHandler = () => {
		let formData = new FormData();
		formData.append("entry_id", "<id>");
		api.post("/upvote", formData)
			.then((res) => {
				if (res.status) {
					const dataUpdate = [...data];
					const index = oldData.tableData.id;
					dataUpdate[index] = newData;
					setData([...dataUpdate]);
					setError(false);
					setErrorMessages([]);
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
	};

	const downvoteHandler = () => {
		let formData = new FormData();
		formData.append("entry_id", "<id>");
		api.post("/downvote", formData)
			.then((res) => {
				if (res.status) {
					const dataUpdate = [...data];
					const index = oldData.tableData.id;
					dataUpdate[index] = newData;
					setData([...dataUpdate]);
					setError(false);
					setErrorMessages([]);
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
	};

    const handleRowAdd = (newData, resolve) => {
        let errorList = [];
        console.log(newData);
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
                    console.log(res.data);
                    if (res.data.status) {
                        let dataToAdd = [...data];
                        newData['id'] = res.data.id;
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
		onRowAdd: (newData) =>
			new Promise((resolve) => {
				handleRowAdd(newData, resolve);
			}),
	};

	useEffect(() => {
		setWindowHeight(window.innerHeight - 174);
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
				setErrorMessage(["Cannot load user data"]);
				setError(true);
			});
	}, []);

	return (
		<div style={{ maxWidth: "100%" }}>
			<MaterialTable
				columns={columns}
				components={components}
				localization={localization}
				data={data}
				options={options}
				title="Covid19 Help India"
				icons={tableIcons}
				editable={editable}
			/>
		</div>
	);
}
