import {MigrationInterface, QueryRunner} from "typeorm";

export class laptopAddQuantity1637258755928 implements MigrationInterface {
    name = 'laptopAddQuantity1637258755928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`laptop\` ADD \`quantity\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`laptop\` CHANGE \`price\` \`price\` decimal(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`laptop\` CHANGE \`price\` \`price\` decimal(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`laptop\` DROP COLUMN \`quantity\``);
    }

}
