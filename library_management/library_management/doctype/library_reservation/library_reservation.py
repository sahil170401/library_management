import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.utils import today

from library_management.services.reservation import reorder_queue


class LibraryReservation(Document):
    def autoname(self):
        if not self.name or self.name.startswith("New Library Reservation"):
            self.name = make_autoname("LIB-RES-.YYYY.-.#####")

    def validate(self):
        if not self.reservation_date:
            self.reservation_date = today()

    def after_insert(self):
        reorder_queue(self.item, self.copy)

    def on_update(self):
        reorder_queue(self.item, self.copy)
