import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://mohammad:husain@cluster0.iulslwa.mongodb.net/`, {
      dbName: 'nest-crud',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
