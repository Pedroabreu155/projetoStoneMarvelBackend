import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUsersTable1622469170017 implements MigrationInterface {
    name = 'ChangeUsersTable1622469170017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "favoriteCharacters" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "favoriteComics" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favoriteComics"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favoriteCharacters"`);
    }

}
