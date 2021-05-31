import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDefaultValueOnFavoritesFields1622473987397 implements MigrationInterface {
    name = 'ChangeDefaultValueOnFavoritesFields1622473987397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" DROP NOT NULL`);
    }

}
