-- CreateTable
CREATE TABLE "rates" (
    "id" SERIAL NOT NULL,
    "coin_name" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3),
    "price" DOUBLE PRECISION,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "coin_name" TEXT,
    "difference_percentage" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rates_coin_name_key" ON "rates"("coin_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
