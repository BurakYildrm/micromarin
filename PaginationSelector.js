const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="pagination-style.css">
    <div class="pagination">
       <button
            type="button"
            class="no-style-button pagination-button prev"
            >
            <div class="colorized-svg">
                <img
                    src="assets/arrow-left-sharp.svg"
                    alt="arrow left sharp icon" />
            </div>
        </button>
        <div class="page-numbers"></div>
        <button
            type="button"
            class="no-style-button pagination-button next"
            >
            <div class="colorized-svg">
                <img
                    src="assets/arrow-right-sharp.svg"
                    alt="arrow right sharp icon" />
            </div>
        </button>
    </div>
`;

class PaginationSelector extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		const customVars = {
			"--color": this.getAttribute("color"),
			"--bg-color": this.getAttribute("bg-color"),
			"--active-color": this.getAttribute("active-color"),
			"--active-bg-color": this.getAttribute("active-bg-color"),
		};
		this.currentPage = parseInt(this.getAttribute("current-page")) || 1;
		this.totalPages = parseInt(this.getAttribute("total-pages")) || 1;
		this.siblingCount = parseInt(this.getAttribute("sibling-count")) || 1;
		this.boundaryCount = parseInt(this.getAttribute("boundary-count")) || 1;

		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.pageNumbersContainer =
			this.shadowRoot.querySelector(".page-numbers");
		this.prevButton = this.shadowRoot.querySelector(".prev");
		this.nextButton = this.shadowRoot.querySelector(".next");

		this.prevButton.style.setProperty(
			"--mask-image",
			"url(assets/arrow-left-sharp.svg)"
		);
		this.nextButton.style.setProperty(
			"--mask-image",
			"url(assets/arrow-right-sharp.svg)"
		);

		this.prevButton.addEventListener("click", () => {
			this.setAttribute(
				"current-page",
				Math.max(this.currentPage - 1, 1)
			);
		});
		this.nextButton.addEventListener("click", () => {
			this.setAttribute(
				"current-page",
				Math.min(this.currentPage + 1, this.totalPages)
			);
		});

		this.setCustomVariables(customVars);
		this.render();
	}

	static get observedAttributes() {
		return ["current-page"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.currentPage = parseInt(newValue);
			this.render();
		}
	}

	disconnectedCallback() {
		const paginationItems =
			this.pageNumbersContainer.querySelectorAll(".pagination-item");
		paginationItems.forEach((item) => item.removeEventListener("click"));
		this.prevButton.removeEventListener("click");
		this.nextButton.removeEventListener("click");
	}

	setCustomVariables(vars) {
		for (const [key, value] of Object.entries(vars)) {
			if (value) {
				this.style.setProperty(key, value);
			} else {
				this.style.removeProperty(key);
			}
		}
	}

	createPaginationItem(page) {
		const button = document.createElement("button");
		button.classList.add("no-style-button", "pagination-item");
		page === this.currentPage ? button.classList.add("active") : null;
		button.textContent = page;
		button.type = "button";
		button.addEventListener("click", () => {
			this.setAttribute("current-page", page);
		});
		return button;
	}

	createEllipsis() {
		const ellipsis = document.createElement("span");
		ellipsis.textContent = "...";
		ellipsis.classList.add("pagination-item");
		ellipsis.classList.add("ellipsis");
		return ellipsis;
	}

	render() {
		this.pageNumbersContainer.innerHTML = "";
		this.prevButton.disabled = this.currentPage === 1;
		this.nextButton.disabled = this.currentPage === this.totalPages;
		const itemNum = this.siblingCount + this.boundaryCount * 2 + 3;

		if (this.totalPages <= itemNum) {
			for (let i = 1; i <= this.totalPages; i++) {
				this.pageNumbersContainer.appendChild(
					this.createPaginationItem(i)
				);
			}
		} else {
			let visibleStart = Math.max(
				this.boundaryCount + 1,
				this.currentPage - this.siblingCount
			);
			let visibleEnd = Math.min(
				this.totalPages - this.boundaryCount,
				this.currentPage + this.siblingCount
			);
			let startEllipsis = true;
			let endEllipsis = true;

			if (visibleStart <= this.boundaryCount + 2) {
				startEllipsis = false;
				visibleStart = 1;
				visibleEnd = this.boundaryCount + this.siblingCount * 2 + 2;
			}

			if (visibleEnd >= this.totalPages - this.boundaryCount - 1) {
				endEllipsis = false;
				visibleStart =
					this.totalPages -
					this.boundaryCount -
					this.siblingCount * 2 -
					1;
				visibleEnd = this.totalPages;
			}

			if (startEllipsis) {
				for (let i = 1; i <= this.boundaryCount; i++) {
					this.pageNumbersContainer.appendChild(
						this.createPaginationItem(i)
					);
				}

				this.pageNumbersContainer.appendChild(this.createEllipsis());
			}

			for (let i = visibleStart; i <= visibleEnd; i++) {
				this.pageNumbersContainer.appendChild(
					this.createPaginationItem(i)
				);
			}

			if (endEllipsis) {
				this.pageNumbersContainer.appendChild(this.createEllipsis());

				for (
					let i = this.totalPages - this.boundaryCount + 1;
					i <= this.totalPages;
					i++
				) {
					this.pageNumbersContainer.appendChild(
						this.createPaginationItem(i)
					);
				}
			}
		}
	}
}

customElements.define("pagination-selector", PaginationSelector);
