-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationHostname" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
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
    "entryId" INTEGER NOT NULL,
    CONSTRAINT "Tag_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
