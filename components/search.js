import { useState, useEffect } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import styles from "../styles/Search.module.css";

export default function Search() {
	const [query, setQuery] = useState("");
	var input;

	const handleSearch = (searchText) => {
		setQuery(searchText);
		var text = searchText.toUpperCase();
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
	}

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
	}, []);

	return (
		<div className="my-4">
			<div className="w-6/12 mx-auto flex justify-items-center bg-gray-200 rounded-full">
				<input
					type="text"
					value={query}
					id="search"
					list=""
					autocomplete="off"
					name="city"
					placeholder="Search City"
					onChange={(e) => handleSearch(e.value)}
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
				</datalist>
				<div className="py-2 pr-2">
					<SearchRoundedIcon className="bg" />
				</div>
			</div>
		</div>
	);
}
