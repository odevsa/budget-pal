-- CreateTable
CREATE TABLE "invoice_transaction" (
    "invoice_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "assigned_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("invoice_id", "transaction_id"),
    CONSTRAINT "invoice_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "invoice_transaction_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "invoice_transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
