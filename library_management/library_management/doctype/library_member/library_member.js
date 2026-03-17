frappe.ui.form.on("Library Member", {
	refresh(frm) {
		if (!frm.is_new()) {
			frm.add_custom_button(__("Reserve Title"), () => {
				frappe.new_doc("Library Reservation", { member: frm.doc.name });
			});
			frm.add_custom_button(__("Issue Item"), () => {
				frappe.new_doc("Library Transaction", { member: frm.doc.name });
			});
		}
	}
});
