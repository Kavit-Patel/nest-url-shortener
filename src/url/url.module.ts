import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UrlService } from "./url.service";
import { UrlsController } from "./url.controller";

@Module({
    providers:[PrismaService,UrlService],
    controllers:[UrlsController],
    exports:[UrlService]
})
export class UrlModule {}