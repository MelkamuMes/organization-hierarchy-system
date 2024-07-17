import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { OrganizationModule } from './organization-2/organization.module';
// import { OrganizationModule } from './organization/organization.module';



@Module({
  imports: [    
    
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: 'root',
    //     database: 'testdb',
    //     entities: /* [Todo] */ [join(process.cwd(), 'dist/**/*.entity.js')],
    //     synchronize: true,
    //   }),
    //   inject:[ConfigService],
    // }),

    // TodosModule

/*   If you want to secure the database info we can use the dotenv configuration*/

ConfigModule.forRoot(),

TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'), 
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true, // you should not use it like this fro real time migration system
      }),
      inject:[ConfigService],
    }), 

    OrganizationModule,
  
  ],
    
})
export class AppModule {}





