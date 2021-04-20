import { useState, useEffect } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import styles from "../styles/Search.module.css";

export default function Search() {
	const [query, setQuery] = useState("");
	const [choicesArray, setChoicesArray] = useState([]);
	var input;

	useEffect(() => {
		input = document.querySelector("#search");
		input.onfocus = () => {
			cities.style.display = "block";
		};
		for (let option of cities.options) {
			option.onclick = () => {
				setQuery(option.value);
				cities.style.display = "none";
			};
		}

		input.oninput = () => {
			var text = input.value.toUpperCase();
			var c = 0;
			for (let option of cities.options) {
				if (option.value.toUpperCase().indexOf(text) > -1) {
					option.style.display = "block";
					c++;
				} else {
					option.style.display = "none";
				}
			}
			c === 0
				? (cities.style.display = "none")
				: (cities.style.display = "block");
		};
	}, []);

	const handleChoices = (choice) => {
		const tempChoices = [...choicesArray];
		const index = tempChoices.indexOf(choice);
		if (index < 0) {
			tempChoices.push(choice);
		} else {
			tempChoices.splice(index, 1);
		}
		setChoicesArray(tempChoices);
	};

	return (
		<div className="my-4">
			<div className="sm:w-6/12 w-9/12 mx-auto flex justify-items-center bg-gray-100 rounded-full">
				<input
					type="text"
					value={query}
					id="search"
					list=""
					autocomplete="off"
					name="city"
					onChange={(e) => setQuery(e.value)}
					placeholder="Search City"
					className="h-10 w-full bg-transparent focus:outline-none p-4"
				/>
				<datalist
					id="cities"
					className={`z-50 absolute mt-11 ml-4 w-5/12 bg-gray-100 ${styles.cityList}`}
				>
					<option
						className={styles.cityOption}
						value="Internet Explorer"
					>
						Internet Explorer
					</option>
					<option className={styles.cityOption} value="Chrome">
						Chrome
					</option>
					<option className={styles.cityOption} value="Safari">
						Safari
					</option>
					<option
						className={styles.cityOption}
						value="Microsoft Edge"
					>
						Microsoft Edge
					</option>
					<option className={styles.cityOption} value="Firefox">
						Firefox
					</option>
					<option className={styles.cityOption} value="Safari">
						Safari
					</option>
					<option
						className={styles.cityOption}
						value="Microsoft Edge"
					>
						Microsoft Edge
					</option>
					<option className={styles.cityOption} value="Firefox">
						Firefox
					</option>
					<option className={styles.cityOption} value="Safari">
						Safari
					</option>
					<option
						className={styles.cityOption}
						value="Microsoft Edge"
					>
						Microsoft Edge
					</option>
					<option className={styles.cityOption} value="Firefox">
						Firefox
					</option>
					<option className={styles.cityOption} value="Safari">
						Safari
					</option>
					<option
						className={styles.cityOption}
						value="Microsoft Edge"
					>
						Microsoft Edge
					</option>
					<option className={styles.cityOption} value="Firefox">
						Firefox
					</option>
					<option className={styles.cityOption} value="Safari">
						Safari
					</option>
					<option
						className={styles.cityOption}
						value="Microsoft Edge"
					>
						Microsoft Edge
					</option>
					<option className={styles.cityOption} value="Firefox">
						Firefox
					</option>
				</datalist>
				<div className="py-2 pr-2">
					<SearchRoundedIcon className="fill-current text-gray-600" />
				</div>
			</div>
			<div className="w-full sm:w-6/12 flex grid-flow-col gap-2 mx-auto py-4 justify-evenly">
				<div
					onClick={() => handleChoices("remdesivir")}
					className={`rounded-full border-green-400 border-2 bg-gradient-to-r py-1 px-3 cursor-pointer ${
						choicesArray.indexOf("remdesivir") > -1
							? styles.selected
							: ""
					}`}
				>
					<span
						className={`text-green-400  ${
							choicesArray.indexOf("remdesivir") > -1
								? styles.selectedText
								: ""
						}`}
					>
						Remdesivir
					</span>
				</div>
				<div
					onClick={() => handleChoices("oxygen")}
					className={`rounded-full border-green-400 border-2 bg-gradient-to-r py-1 px-2 cursor-pointer ${
						choicesArray.indexOf("oxygen") > -1
							? styles.selected
							: ""
					}`}
				>
					<span
						className={`text-green-400 ${
							choicesArray.indexOf("oxygen") > -1
								? styles.selectedText
								: ""
						}`}
					>
						Oxygen
					</span>
				</div>
				<div
					onClick={() => handleChoices("plasma")}
					className={`rounded-full border-green-400 border-2 bg-gradient-to-r py-1 px-2 cursor-pointer ${
						choicesArray.indexOf("plasma") > -1
							? styles.selected
							: ""
					}`}
				>
					<span
						className={`text-green-400 ${
							choicesArray.indexOf("plasma") > -1
								? styles.selectedText
								: ""
						}`}
					>
						Plasma
					</span>
				</div>
				<div
					onClick={() => handleChoices("tocilizumab")}
					className={`rounded-full border-green-400 border-2 bg-gradient-to-r py-1 px-2 cursor-pointer ${
						choicesArray.indexOf("tocilizumab") > -1
							? styles.selected
							: ""
					}`}
				>
					<span
						className={`text-green-400 ${
							choicesArray.indexOf("tocilizumab") > -1
								? styles.selectedText
								: ""
						}`}
					>
						Tocilizumab
					</span>
				</div>
				<div
					onClick={() => handleChoices("fabiflu")}
					className={`rounded-full border-green-400 border-2 bg-gradient-to-r py-1 px-2 cursor-pointer ${
						choicesArray.indexOf("fabiflu") > -1
							? styles.selected
							: ""
					}`}
				>
					<span
						className={`text-green-400 ${
							choicesArray.indexOf("fabiflu") > -1
								? styles.selectedText
								: ""
						}`}
					>
						Fabiflu
					</span>
				</div>
			</div>
		</div>
	);
}
