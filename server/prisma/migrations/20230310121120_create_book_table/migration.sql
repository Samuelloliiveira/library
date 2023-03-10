-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "book_release_date" TEXT NOT NULL,
    "crated_at" DATETIME NOT NULL
);
