/*
  Warnings:

  - You are about to drop the `VisitorsNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VisitorsNumber" DROP CONSTRAINT "VisitorsNumber_linkId_fkey";

-- DropTable
DROP TABLE "VisitorsNumber";

-- CreateTable
CREATE TABLE "visitors_number" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "visitors_number_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitors_number_linkId_key" ON "visitors_number"("linkId");

-- AddForeignKey
ALTER TABLE "visitors_number" ADD CONSTRAINT "visitors_number_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
