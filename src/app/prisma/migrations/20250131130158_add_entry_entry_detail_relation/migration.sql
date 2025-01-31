-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationHostname" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "entryDetailId" INTEGER,
    CONSTRAINT "Entry_entryDetailId_fkey" FOREIGN KEY ("entryDetailId") REFERENCES "EntryDetail" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EntryDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "isDangerous" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "entryDetailId" INTEGER NOT NULL,
    CONSTRAINT "Tag_entryDetailId_fkey" FOREIGN KEY ("entryDetailId") REFERENCES "EntryDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_entryDetailId_key" ON "Entry"("entryDetailId");
