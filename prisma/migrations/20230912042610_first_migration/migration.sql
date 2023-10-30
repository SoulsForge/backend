-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtributeCategory" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "AtributeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Atribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtributeOnCharacter" (
    "id" SERIAL NOT NULL,
    "atributeId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "AtributeOnCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AtributeOnCharacter_atributeId_key" ON "AtributeOnCharacter"("atributeId");

-- CreateIndex
CREATE UNIQUE INDEX "AtributeOnCharacter_characterId_key" ON "AtributeOnCharacter"("characterId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtributeCategory" ADD CONSTRAINT "AtributeCategory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atribute" ADD CONSTRAINT "Atribute_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AtributeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtributeOnCharacter" ADD CONSTRAINT "AtributeOnCharacter_atributeId_fkey" FOREIGN KEY ("atributeId") REFERENCES "Atribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtributeOnCharacter" ADD CONSTRAINT "AtributeOnCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
