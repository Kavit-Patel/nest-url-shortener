/*
  Warnings:

  - You are about to drop the column `countryStats` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `deviceStats` on the `Analytics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[urlId,osName,deviceName]` on the table `Analytics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ipAddress,userAgent,urlId]` on the table `Click` will be added. If there are existing duplicate values, this will fail.
  - Made the column `lastAccessed` on table `Analytics` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Analytics_urlId_key";

-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "countryStats",
DROP COLUMN "deviceStats",
ADD COLUMN     "deviceName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "osName" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "lastAccessed" SET NOT NULL,
ALTER COLUMN "lastAccessed" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_urlId_osName_deviceName_key" ON "Analytics"("urlId", "osName", "deviceName");

-- CreateIndex
CREATE UNIQUE INDEX "Click_ipAddress_userAgent_urlId_key" ON "Click"("ipAddress", "userAgent", "urlId");
