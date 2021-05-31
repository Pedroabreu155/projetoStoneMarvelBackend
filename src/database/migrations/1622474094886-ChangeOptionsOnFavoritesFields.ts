import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeOptionsOnFavoritesFields1622474094886 implements MigrationInterface {
    name = 'ChangeOptionsOnFavoritesFields1622474094886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" DROP DEFAULT`);
    }

}
