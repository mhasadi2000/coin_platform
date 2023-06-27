/*
  Warnings:

  - A unique constraint covering the columns `[coin_name]` on the table `rates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rates_coin_name_key" ON "rates"("coin_name");
