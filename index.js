const sidebarNavItems = [
	{
		title: "",
		list: [
			{ title: "Dashboard", icon: "assets/chart.svg", selected: false },
		],
	},
	{
		title: "Sales",
		list: [
			{
				title: "Invoices",
				icon: "assets/receipt-plus.svg",
				selected: false,
			},
			{
				title: "Incomes",
				icon: "assets/receipt-search-down.svg",
				selected: true,
			},
			{
				title: "Customers",
				icon: "assets/buildings.svg",
				selected: false,
			},
		],
	},
	{
		title: "Purchase",
		list: [
			{
				title: "Bills",
				icon: "assets/receipt-minus.svg",
				selected: false,
			},
			{
				title: "Expenses",
				icon: "assets/receipt-search-up.svg",
				selected: false,
			},
			{ title: "Vendors", icon: "assets/buildings.svg", selected: false },
		],
	},
	{
		title: "Cash",
		list: [
			{ title: "Cash & Banks", icon: "assets/bank.svg", selected: false },
			{ title: "Cash Flow", icon: "assets/wallet.svg", selected: false },
		],
	},
	{
		title: "Stock",
		list: [
			{
				title: "Products & Services",
				icon: "assets/tag.svg",
				selected: false,
			},
		],
	},
	{
		title: "Accounting",
		list: [
			{
				title: "Transactions",
				icon: "assets/receipt-search.svg",
				selected: false,
			},
			{
				title: "Chart of Accounts",
				icon: "assets/document.svg",
				selected: false,
			},
		],
	},
	{
		title: "Reports",
		list: [
			{
				title: "All Reports",
				icon: "assets/health.svg",
				selected: false,
			},
		],
	},
];

const menuContainer = document.querySelector(".menu-container");

for (let item of sidebarNavItems) {
	if (item.title !== "") {
		const title = document.createElement("p");
		title.textContent = item.title;
		title.classList.add("menu-title");
		menuContainer.appendChild(title);
	}

	const ul = document.createElement("ul");
	ul.classList.add("no-style-list");

	for (let listItem of item.list) {
		const li = document.createElement("li");
		const img = document.createElement("img");
		const div = document.createElement("div");
		const span = document.createElement("span");

		li.classList.add("menu-item");
		li.setAttribute("data-selected", listItem.selected);
		div.classList.add("icon-container");
		img.src = listItem.icon;
		span.textContent = listItem.title;

		div.appendChild(img);
		li.appendChild(div);
		li.appendChild(span);
		ul.appendChild(li);
	}

	menuContainer.appendChild(ul);
}

document.querySelectorAll(".menu-item").forEach((item) => {
	item.addEventListener("click", () => {
		document.querySelectorAll(".menu-item").forEach((el) => {
			el.setAttribute("data-selected", "false");
		});
		item.setAttribute("data-selected", "true");
	});
});

document.querySelectorAll(".badge").forEach((badge) => {
	const badgeColor =
		badge.getAttribute("data-badge-color") || "var(--badge-default-color)";
	const badgeBgColor =
		badge.getAttribute("data-badge-bg-color") ||
		"var(--badge-default-bg-color)";
	const badgeSize =
		badge.getAttribute("data-badge-size") || "var(--badge-default-size)";
	const badgeFontSize =
		badge.getAttribute("data-badge-font-size") ||
		"var(--badge-default-font-size)";
	const badgeFontWeight =
		badge.getAttribute("data-badge-font-weight") ||
		"var(--badge-default-font-weight)";

	badge.style.setProperty("--badge-color", badgeColor);
	badge.style.setProperty("--badge-bg-color", badgeBgColor);
	badge.style.setProperty("--badge-size", badgeSize);
	badge.style.setProperty("--badge-font-size", badgeFontSize);
	badge.style.setProperty("--badge-font-weight", badgeFontWeight);
});

document.querySelectorAll(".table-tabs-item").forEach((item) => {
	item.addEventListener("click", () => {
		document.querySelectorAll(".table-tabs-item").forEach((el) => {
			el.setAttribute("data-selected", "false");
		});
		item.setAttribute("data-selected", "true");
	});
});

const colors = {
	DANGER: "danger",
	SUCCESS: "success",
	NEUTRAL: "neutral",
};

const numberFormatOptions = {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
};

const date = new Date(2023, 0, 12);
const formattedDate = date.toLocaleDateString("en-GB");

const tableData = [
	{
		detailInfo: {
			name: "#SD-6598236",
			invoiceDate: formattedDate,
			indicatorType: colors.SUCCESS,
		},
		dateInfo: {
			paymentStatus: "paid",
			chipType: colors.SUCCESS,
			dueDate: formattedDate,
			description: "",
			descriptionType: "",
		},
		statusInfo: { statusText: "approved", statusType: colors.SUCCESS },
		amountInfo: {
			amount: 3140.1,
			outstanding: 0.0,
			currency: "tl",
		},
	},
	{
		detailInfo: {
			name: "#SD-4345459",
			invoiceDate: formattedDate,
			indicatorType: colors.DANGER,
		},
		dateInfo: {
			paymentStatus: "partially paid",
			chipType: colors.NEUTRAL,
			dueDate: formattedDate,
			description: "Overdue by 43 days",
			descriptionType: colors.DANGER,
		},
		statusInfo: { statusText: "approved", statusType: colors.SUCCESS },
		amountInfo: {
			amount: 8100.0,
			outstanding: 500.0,
			currency: "usd",
		},
	},
	{
		detailInfo: {
			name: "#SD-6568954",
			invoiceDate: formattedDate,
			indicatorType: colors.NEUTRAL,
		},
		dateInfo: {
			paymentStatus: "Unpaid",
			chipType: colors.NEUTRAL,
			dueDate: formattedDate,
			description: "In 50 Days",
			descriptionType: colors.NEUTRAL,
		},
		statusInfo: { statusText: "draft", statusType: colors.NEUTRAL },
		amountInfo: {
			amount: 10250.0,
			outstanding: 10250.0,
			currency: "usd",
		},
	},
	{
		detailInfo: {
			name: "#SD-4345459",
			invoiceDate: formattedDate,
			indicatorType: colors.DANGER,
		},
		dateInfo: {
			paymentStatus: "unpaid",
			chipType: colors.NEUTRAL,
			dueDate: formattedDate,
			description: "Overdue by 3 days",
			descriptionType: colors.DANGER,
		},
		statusInfo: { statusText: "rejected", statusType: colors.DANGER },
		amountInfo: {
			amount: 2540.0,
			outstanding: 2540.0,
			currency: "eur",
		},
	},
	{
		detailInfo: {
			name: "#SD-4345459",
			invoiceDate: formattedDate,
			indicatorType: colors.DANGER,
		},
		dateInfo: {
			paymentStatus: "Unpaid",
			chipType: colors.NEUTRAL,
			dueDate: formattedDate,
			description: "Overdue by 3 days",
			descriptionType: colors.DANGER,
		},
		statusInfo: { statusText: "cancelled", statusType: colors.DANGER },
		amountInfo: {
			amount: 140.0,
			outstanding: 140.0,
			currency: "eur",
		},
	},
];

const tableContent = document.querySelector(".table-content");

for (let data of tableData) {
	const divRow = document.createElement("div");
	const divDetailCell = document.createElement("div");
	const divDateCell = document.createElement("div");
	const divStatusCell = document.createElement("div");
	const divAmountCell = document.createElement("div");
	const divActionCell = document.createElement("div");
	const pDetailName = document.createElement("p");
	const pDetailDate = document.createElement("p");
	const divChipContainer = document.createElement("div");
	const divChip = document.createElement("div");
	const pDescription = document.createElement("p");
	const pDateDate = document.createElement("p");
	const divStatus = document.createElement("div");
	const divAmountContainer = document.createElement("div");
	const pAmountCurrency = document.createElement("p");
	const pAmount = document.createElement("p");
	const pOutstanding = document.createElement("p");
	const buttonAction = document.createElement("button");
	const imgAction = document.createElement("img");

	divDetailCell.classList.add(
		"table-cell",
		"detail-cell",
		data.detailInfo.indicatorType
	);
	pDetailName.classList.add("detail-name");
	pDetailDate.classList.add("date-text");
	pDetailName.textContent = data.detailInfo.name;
	pDetailDate.textContent = "Invoice Date : " + data.detailInfo.invoiceDate;
	divDetailCell.appendChild(pDetailName);
	divDetailCell.appendChild(pDetailDate);

	divDateCell.classList.add("table-cell", "date-cell");
	divChipContainer.classList.add("date-chip-container");
	divChip.classList.add("chip", data.dateInfo.chipType);
	pDescription.classList.add(
		"date-description",
		data.dateInfo.descriptionType || null
	);
	pDateDate.classList.add("date-text");
	divChip.textContent = data.dateInfo.paymentStatus;
	pDescription.textContent = data.dateInfo.description;
	pDateDate.textContent = "Due Date : " + data.dateInfo.dueDate;
	divDateCell.appendChild(divChipContainer);
	divChipContainer.appendChild(divChip);
	divChipContainer.appendChild(pDescription);
	divDateCell.appendChild(pDateDate);

	divStatusCell.classList.add("table-cell", "status-cell");
	divStatus.classList.add("status", data.statusInfo.statusType);
	divStatus.textContent = data.statusInfo.statusText;
	divStatusCell.appendChild(divStatus);

	divAmountCell.classList.add("table-cell", "amount-cell");
	divAmountContainer.classList.add("amount-container");
	pAmountCurrency.classList.add("amount-currency");
	pAmount.classList.add("amount");
	pOutstanding.classList.add("amount-outstanding");
	pAmountCurrency.textContent = data.amountInfo.currency;
	pAmount.textContent = data.amountInfo.amount.toLocaleString(
		"de-DE",
		numberFormatOptions
	);
	pOutstanding.textContent =
		"Outstanding : " +
		(data.amountInfo.outstanding != 0
			? data.amountInfo.currency.toUpperCase()
			: "") +
		" " +
		data.amountInfo.outstanding.toLocaleString(
			"de-DE",
			numberFormatOptions
		);
	divAmountContainer.appendChild(pAmountCurrency);
	divAmountContainer.appendChild(pAmount);
	divAmountCell.appendChild(divAmountContainer);
	divAmountCell.appendChild(pOutstanding);

	divActionCell.classList.add("table-cell", "action-cell");
	buttonAction.classList.add(
		"no-style-button",
		"action-button",
		"icon-container"
	);
	buttonAction.style.setProperty("--icon-padding", "2px");
	buttonAction.type = "button";
	imgAction.src = "assets/vertical-dots.svg";
	imgAction.alt = "vertical dots icon";
	buttonAction.appendChild(imgAction);
	divActionCell.appendChild(buttonAction);

	divRow.classList.add("table-row");
	divRow.appendChild(divDetailCell);
	divRow.appendChild(divDateCell);
	divRow.appendChild(divStatusCell);
	divRow.appendChild(divAmountCell);
	divRow.appendChild(divActionCell);

	tableContent.appendChild(divRow);
}

const paginationText = document.querySelector(".pagination-text");
const currentPage = paginationText.getAttribute("data-current-page");
const pageSize = paginationText.getAttribute("data-page-size");
const totalItems = paginationText.getAttribute("data-total-items");
paginationText.textContent = `Showing ${(currentPage - 1) * pageSize + 1} - ${
	currentPage * pageSize
} of ${totalItems} total results`;
