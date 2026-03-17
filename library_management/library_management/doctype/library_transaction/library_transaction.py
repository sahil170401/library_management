import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class LibraryTransaction(Document):
    def autoname(self):
        if not self.name or self.name.startswith("New Library Transaction"):
            self.name = make_autoname("LIB-TXN-.YYYY.-.#####")

    def validate(self):
        if self.member and not self.member_category:
            self.member_category = frappe.db.get_value("Library Member", self.member, "member_category")
        if self.copy and not self.valuation_rate:
            self.valuation_rate = frappe.db.get_value("Library Copy", self.copy, "purchase_price") or 0
