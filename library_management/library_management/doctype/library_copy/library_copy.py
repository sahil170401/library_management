import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class LibraryCopy(Document):
    def autoname(self):
        if self.accession_no:
            self.name = self.accession_no
        elif not self.name or self.name.startswith("New Library Copy"):
            self.name = make_autoname("LIB-CPY-.#####")

    def validate(self):
        self.sync_item_flags()
        if self.is_reference_only:
            self.status = "Reference Only"
            self.is_borrowable = 0

    def sync_item_flags(self):
        if not self.item:
            return
        values = frappe.db.get_value(
            "Item",
            self.item,
            ["item_name", "library_is_reference_only", "library_is_borrowable"],
            as_dict=True,
        )
        if values:
            self.item_name = values.item_name
            if not self.is_reference_only:
                self.is_reference_only = values.library_is_reference_only
            if not self.is_borrowable:
                self.is_borrowable = values.library_is_borrowable
