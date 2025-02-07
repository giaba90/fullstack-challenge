-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationHostname" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EntryDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryId" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "isDangerous" BOOLEAN NOT NULL,
    CONSTRAINT "EntryDetail_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "entryDetailId" INTEGER NOT NULL,
    CONSTRAINT "Tag_entryDetailId_fkey" FOREIGN KEY ("entryDetailId") REFERENCES "EntryDetail" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EntryDetail_entryId_key" ON "EntryDetail"("entryId");
-- Impedisce la modifica degli ID nella tabella Entry
CREATE TRIGGER prevent_id_update_entry
BEFORE UPDATE ON Entry
FOR EACH ROW
WHEN OLD.id != NEW.id
BEGIN
    SELECT RAISE(ABORT, 'Modifica dell''ID non consentita');
END;

-- Impedisce la modifica degli ID nella tabella EntryDetail
CREATE TRIGGER prevent_id_update_entry_detail
BEFORE UPDATE ON EntryDetail
FOR EACH ROW
WHEN OLD.id != NEW.id
BEGIN
    SELECT RAISE(ABORT, 'Modifica dell''ID non consentita');
END;

-- Impedisce la modifica degli ID nella tabella Tag
CREATE TRIGGER prevent_id_update_tag
BEFORE UPDATE ON Tag
FOR EACH ROW
WHEN OLD.id != NEW.id
BEGIN
    SELECT RAISE(ABORT, 'Modifica dell''ID non consentita');
END;
