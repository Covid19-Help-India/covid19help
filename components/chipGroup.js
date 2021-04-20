import React, { useState, useEffect } from "react";
import styles from "../styles/Search.module.css";

export default function ChipGroup() {
	const [choicesArray, setChoicesArray] = useState([]);

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
					choicesArray.indexOf("oxygen") > -1 ? styles.selected : ""
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
					choicesArray.indexOf("plasma") > -1 ? styles.selected : ""
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
					choicesArray.indexOf("fabiflu") > -1 ? styles.selected : ""
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
	);
}
