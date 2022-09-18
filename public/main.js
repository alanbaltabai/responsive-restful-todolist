let body = document.querySelector("body");
let inputText = document.querySelector("[data-name = 'input-text']"); // returns an element
inputText.focus(); // focus the input
let addBtn = document.querySelector("[data-name = 'add-button']");

let container = document.querySelectorAll("[data-name = 'container']");
let mainNotes = document.querySelectorAll("[data-name = 'note']");
let mainContents = document.querySelectorAll("[data-name = 'content']");
let editBtns = document.querySelectorAll("[data-name = 'edit-button']"); // returns a static NodeList consisting elements
let deleteBtns = document.querySelectorAll("[data-name = 'delete-button']");

addBtn.addEventListener("click", addNote);

inputText.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		addNote();
	}
});

if (container) {
	for (let i = 0; i < mainNotes.length; i++) {
		editBtns[i].addEventListener("click", () => {
			let overlay = document.createElement("div");
			let screamer = document.createElement("div");
			let screamerInput = document.createElement("input");
			let screamerButton = document.createElement("button");

			body.appendChild(screamer);
			body.appendChild(overlay);
			screamer.appendChild(screamerInput);
			screamerInput.focus();
			screamer.appendChild(screamerButton);

			overlay.classList.add("overlay-on");
			screamer.classList.add("screamer--on");
			screamerInput.classList.add("header__input", "screamer__input");
			screamerButton.classList.add("header__button", "screamer__button");

			screamerInput.placeholder =
				editBtns[i].parentElement.previousElementSibling.innerText;
			screamerButton.textContent = "Edit";

			overlay.addEventListener("click", () => {
				overlay.classList.remove("overlay-on");
				screamer.remove();
			});

			screamerButton.addEventListener("click", () => {
				if (screamerInput.value === "") {
					return;
				} /* prevents from adding empty value */

				const _id = editBtns[i].parentElement.previousElementSibling.id;
				fetch("/", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						_id,
						content: screamerInput.value,
					}),
				})
					.then((response) => {
						response.json().then(() => {
							window.location.reload();
						});
					})
					.catch((error) => console.log(error));
			});

			screamerInput.addEventListener("keyup", (event) => {
				if (event.key === "Enter") {
					if (screamerInput.value === "") {
						return;
					} /* prevents from adding empty value */

					const _id = editBtns[i].parentElement.previousElementSibling.id;
					fetch("/", {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							_id,
							content: screamerInput.value,
						}),
					})
						.then((response) => {
							response.json().then(() => {
								window.location.reload();
							});
						})
						.catch((error) => console.log(error));
				}
			});
		});

		deleteBtns[i].addEventListener("click", () => {
			const _id = deleteBtns[i].parentElement.previousElementSibling.id;
			fetch("/", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					_id,
				}),
			})
				.then((response) => {
					response.json().then(() => {
						deleteBtns[i].parentElement.parentElement.remove();
						window.location.reload();
					});
				})
				.catch((error) => console.log(error));
		});
	}
}

function addNote() {
	if (inputText.value === "") {
		return;
	} /* prevents from adding empty value */

	fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			content: inputText.value,
		}),
	})
		.then((response) => {
			response.json().then(() => {
				window.location.reload();
			});
		})
		.catch((error) => {
			console.log(error);
		});

	inputText.value = ""; // to remove the typed text in input field after click event
}
