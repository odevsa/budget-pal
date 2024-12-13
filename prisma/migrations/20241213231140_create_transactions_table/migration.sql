-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "transacted_at" DATETIME NOT NULL,
    "caterogy_id" INTEGER,
    "input_id" INTEGER,
    "output_id" INTEGER,
    "value" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transactions_input_id_fkey" FOREIGN KEY ("input_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transactions_input_id_fkey" FOREIGN KEY ("input_id") REFERENCES "accounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transactions_output_id_fkey" FOREIGN KEY ("output_id") REFERENCES "accounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
