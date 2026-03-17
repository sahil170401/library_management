frappe.pages["library-desk"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Library Desk"),
		single_column: true
	});

	const state = {
		payload: null
	};

	const body = $(`
		<div class="library-desk-page">
			<style>
				.library-desk-page { padding: 12px 8px 24px; }
				.library-desk-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.9fr); gap: 18px; }
				.library-card { background: linear-gradient(180deg, #ffffff 0%, #fbfcf7 100%); border: 1px solid #dbe4d1; border-radius: 18px; padding: 18px; box-shadow: 0 12px 28px rgba(39, 60, 17, 0.06); }
				.library-card--hero { background: radial-gradient(circle at top right, rgba(150, 168, 78, 0.15), transparent 28%), linear-gradient(160deg, #fcf8ef 0%, #f7fbf0 100%); }
				.library-eyebrow { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #6d7b4f; font-weight: 700; margin-bottom: 8px; }
				.library-title { font-size: 28px; line-height: 1.1; font-weight: 700; color: #26351a; margin: 0 0 8px; }
				.library-subtitle { color: #5c6751; margin-bottom: 18px; }
				.library-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
				.library-form-grid .full-span { grid-column: 1 / -1; }
				.library-stat-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
				.library-stat { background: #f4f7ef; border-radius: 14px; padding: 12px; border: 1px solid #e4ecda; }
				.library-stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #788567; margin-bottom: 4px; }
				.library-stat-value { font-size: 22px; font-weight: 700; color: #1f2d15; }
				.library-panel-title { font-size: 16px; font-weight: 700; color: #26351a; margin: 0 0 12px; }
				.library-kv { display: grid; grid-template-columns: 120px 1fr; row-gap: 8px; column-gap: 10px; font-size: 13px; }
				.library-kv-label { color: #6c7565; }
				.library-kv-value { font-weight: 600; color: #26351a; }
				.library-action-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
				.library-result { margin-top: 16px; }
				.library-muted { color: #6c7565; }
				.library-control .form-group { margin-bottom: 0; }
				.library-chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
				.library-chip { background: #eef4e6; color: #496131; border: 1px solid #d9e4ca; border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 600; }
				@media (max-width: 991px) {
					.library-desk-grid, .library-form-grid, .library-stat-grid { grid-template-columns: 1fr; }
				}
			</style>
			<div class="library-desk-grid">
				<div class="library-card library-card--hero">
					<div class="library-eyebrow">${__("Circulation Console")}</div>
					<h2 class="library-title">${__("Issue, Return, and Reserve")}</h2>
					<div class="library-subtitle">${__("Lookup a member and copy, then the desk will expose only the actions that make sense for the current state.")}</div>
					<div class="library-form-grid">
						<div class="full-span library-control" data-control="member"></div>
						<div class="full-span library-control" data-control="item"></div>
						<div class="full-span library-control" data-control="scan_value"></div>
						<div class="library-control" data-control="condition_status"></div>
						<div class="library-control" data-control="notes"></div>
					</div>
					<div class="library-chip-row" data-role="state_chips"></div>
					<div class="library-action-row">
						<button class="btn btn-primary" data-action="lookup">${__("Lookup")}</button>
						<button class="btn btn-primary hidden" data-action="issue">${__("Issue")}</button>
						<button class="btn btn-secondary hidden" data-action="return">${__("Return")}</button>
						<button class="btn btn-default hidden" data-action="reserve">${__("Reserve")}</button>
					</div>
					<div class="library-result" data-role="result"></div>
				</div>
				<div class="library-card">
					<div class="library-panel-title">${__("Member Details")}</div>
					<div class="library-kv" style="margin-bottom: 18px;">
						<div class="library-kv-label">${__("Member")}</div>
						<div class="library-kv-value" data-role="member_name">-</div>
						<div class="library-kv-label">${__("Category")}</div>
						<div class="library-kv-value" data-role="member_category">-</div>
						<div class="library-kv-label">${__("Status")}</div>
						<div class="library-kv-value" data-role="member_status">-</div>
						<div class="library-kv-label">${__("Issued Count")}</div>
						<div class="library-kv-value" data-role="member_issued_count">-</div>
						<div class="library-kv-label">${__("Outstanding Fines")}</div>
						<div class="library-kv-value" data-role="member_fines">-</div>
					</div>
					<hr>
					<div class="library-panel-title">${__("Copy Details")}</div>
					<div class="library-kv">
						<div class="library-kv-label">${__("Copy")}</div>
						<div class="library-kv-value" data-role="copy_name">-</div>
						<div class="library-kv-label">${__("Title")}</div>
						<div class="library-kv-value" data-role="item_name">-</div>
						<div class="library-kv-label">${__("Authors")}</div>
						<div class="library-kv-value" data-role="authors">-</div>
						<div class="library-kv-label">${__("Material Type")}</div>
						<div class="library-kv-value" data-role="material_type">-</div>
						<div class="library-kv-label">${__("Status")}</div>
						<div class="library-kv-value" data-role="copy_status">-</div>
						<div class="library-kv-label">${__("Accession")}</div>
						<div class="library-kv-value" data-role="accession_no">-</div>
						<div class="library-kv-label">${__("Borrower")}</div>
						<div class="library-kv-value" data-role="current_member">-</div>
					</div>
					<hr>
					<div class="library-panel-title">${__("Availability")}</div>
					<div class="library-stat-grid">
						<div class="library-stat">
							<div class="library-stat-label">${__("Total Copies")}</div>
							<div class="library-stat-value" data-role="total_copies">0</div>
						</div>
						<div class="library-stat">
							<div class="library-stat-label">${__("Available")}</div>
							<div class="library-stat-value" data-role="available_copies">0</div>
						</div>
						<div class="library-stat">
							<div class="library-stat-label">${__("Issued")}</div>
							<div class="library-stat-value" data-role="issued_copies">0</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`);

	$(page.body).append(body);

	const makeControl = (df, parent) => {
		const control = frappe.ui.form.make_control({ df, parent, render_input: true });
		control.refresh();
		return control;
	};

	const controls = {
		member: makeControl(
			{ fieldtype: "Link", label: __("Member"), fieldname: "member", options: "Library Member" },
			body.find("[data-control='member']")
		),
		item: makeControl(
			{ fieldtype: "Link", label: __("Item"), fieldname: "item", options: "Item" },
			body.find("[data-control='item']")
		),
		scan_value: makeControl(
			{ fieldtype: "Data", label: __("Barcode / Accession / Copy ID"), fieldname: "scan_value", placeholder: __("Scan or enter barcode") },
			body.find("[data-control='scan_value']")
		),
		condition_status: makeControl(
			{ fieldtype: "Select", label: __("Return Condition"), fieldname: "condition_status", options: "Good\nFair\nDamaged", default: "Good" },
			body.find("[data-control='condition_status']")
		),
		notes: makeControl(
			{ fieldtype: "Data", label: __("Return Notes"), fieldname: "notes" },
			body.find("[data-control='notes']")
		)
	};

	const getValue = (fieldname) => controls[fieldname].get_value();
	const setValue = (fieldname, value) => controls[fieldname].set_value(value || "");

	const renderResult = (message, indicator = "blue") => {
		body.find("[data-role='result']").html(
			`<div class="alert alert-light border"><span class="indicator ${indicator}"></span> ${frappe.utils.escape_html(message)}</div>`
		);
	};

	const setRoleValue = (role, value) => body.find(`[data-role='${role}']`).text(value ?? "-");
	const setActionVisible = (action, visible) => body.find(`[data-action='${action}']`).toggleClass("hidden", !visible);

	const renderStateChips = (payload) => {
		const chips = [];
		const copyStatus = payload?.copy?.status;
		const memberStatus = payload?.member?.status;
		if (copyStatus) chips.push(copyStatus);
		if (memberStatus) chips.push(`Member: ${memberStatus}`);
		if (payload?.availability?.reserved_copies) chips.push(`${payload.availability.reserved_copies} reserved`);
		body.find("[data-role='state_chips']").html(chips.map((chip) => `<span class="library-chip">${frappe.utils.escape_html(chip)}</span>`).join(""));
	};

	const renderActions = () => {
		const payload = state.payload || {};
		const copyStatus = payload.copy?.status;
		const hasMember = !!getValue("member");
		const hasItem = !!getValue("item");
		const hasScan = !!getValue("scan_value");

		setActionVisible("lookup", hasItem || hasScan || hasMember);
		setActionVisible("issue", hasMember && (copyStatus === "Available" || (!copyStatus && (hasItem || hasScan))));
		setActionVisible("return", !!copyStatus && ["Issued", "Overdue"].includes(copyStatus));
		setActionVisible("reserve", hasMember && hasItem && copyStatus !== "Available");
	};

	const updatePanel = (payload) => {
		state.payload = payload || null;
		const availability = payload?.availability || {};
		const copy = payload?.copy || {};
		const item = payload?.item || {};
		const member = payload?.member || {};

		setRoleValue("member_name", member.member_name || member.name);
		setRoleValue("member_category", member.member_category);
		setRoleValue("member_status", member.status);
		setRoleValue("member_issued_count", member.current_issued_count);
		setRoleValue("member_fines", member.outstanding_fines);

		setRoleValue("copy_name", copy.name);
		setRoleValue("item_name", item.item_name || copy.item);
		setRoleValue("authors", item.library_authors);
		setRoleValue("material_type", item.library_material_type);
		setRoleValue("copy_status", copy.status);
		setRoleValue("accession_no", copy.accession_no);
		setRoleValue("current_member", copy.current_member);

		setRoleValue("total_copies", availability.total_copies || 0);
		setRoleValue("available_copies", availability.available_copies || 0);
		setRoleValue("issued_copies", availability.issued_copies || 0);

		if (copy.item) setValue("item", copy.item);
		renderStateChips(payload);
		renderActions();
	};

	const refreshLookup = (opts = {}) => {
		const scanValue = opts.scan_value ?? getValue("scan_value");
		const itemValue = opts.item ?? getValue("item");
		const memberValue = opts.member ?? getValue("member");
		return frappe.call("library_management.api.barcode_lookup", {
			scan_value: scanValue,
			item: itemValue,
			member: memberValue
		}).then((r) => {
			updatePanel(r.message);
			return r.message;
		});
	};

	body.find("[data-action='lookup']").on("click", () => {
		refreshLookup().then((payload) => {
			renderResult(__("Loaded {0}.", [payload.copy?.name || payload.item?.name]), "green");
		});
	});

	body.find("[data-action='issue']").on("click", () => {
		frappe.call("library_management.api.issue_library_copy", {
			member: getValue("member"),
			scan_value: getValue("scan_value"),
			item: getValue("item")
		}).then((r) => {
			renderResult(__("Issued transaction {0} with due date {1}.", [r.message.name, r.message.due_date]), "green");
			return refreshLookup({ scan_value: r.message.copy, item: r.message.item, member: r.message.member });
		});
	});

	body.find("[data-action='return']").on("click", () => {
		frappe.call("library_management.api.return_library_copy", {
			scan_value: getValue("scan_value") || state.payload?.copy?.name,
			condition_status: getValue("condition_status"),
			notes: getValue("notes")
		}).then((r) => {
			renderResult(__("Returned transaction {0} with status {1}.", [r.message.name, r.message.status]), "green");
			return refreshLookup({ scan_value: r.message.copy, item: r.message.item, member: r.message.member });
		});
	});

	body.find("[data-action='reserve']").on("click", () => {
		frappe.call("library_management.api.reserve_library_item", {
			member: getValue("member"),
			item: getValue("item")
		}).then((r) => {
			renderResult(__("Reservation {0} created successfully.", [r.message.name]), "orange");
			renderActions();
		});
	});

	["member", "item", "scan_value"].forEach((fieldname) => {
		controls[fieldname].$input && controls[fieldname].$input.on("change", () => {
			if (fieldname === "item" && getValue("item")) {
				setValue("scan_value", "");
			}
			renderActions();
		});
	});

	renderActions();
};
