-- CreateTable
CREATE TABLE "Cat" (
    "id" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "temperament" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cat_breed_key" ON "Cat"("breed");
