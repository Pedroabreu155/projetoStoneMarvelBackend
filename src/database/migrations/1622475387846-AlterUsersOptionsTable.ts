import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUsersOptionsTable1622475387846 implements MigrationInterface {
    name = 'AlterUsersOptionsTable1622475387846'

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
