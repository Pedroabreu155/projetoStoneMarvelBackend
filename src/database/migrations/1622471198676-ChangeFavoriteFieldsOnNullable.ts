import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFavoriteFieldsOnNullable1622471198676 implements MigrationInterface {
    name = 'ChangeFavoriteFieldsOnNullable1622471198676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteComics" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "favoriteCharacters" SET NOT NULL`);
    }

}
