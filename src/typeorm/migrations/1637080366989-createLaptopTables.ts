import {MigrationInterface, QueryRunner} from "typeorm";

export class createLaptopTables1637080366989 implements MigrationInterface {
    name = 'createLaptopTables1637080366989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`screen_sizes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`screen_resolutions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`laptop\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(100) NOT NULL, \`price\` decimal(10) NOT NULL, \`description\` text NOT NULL, \`brandId\` int NULL, \`screenSizeId\` int NULL, \`screenResolutionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`laptopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`laptop\` ADD CONSTRAINT \`FK_1b290617c340c5d756dc66e48bf\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`laptop\` ADD CONSTRAINT \`FK_474646a82946eb7b9293e9c5dbb\` FOREIGN KEY (\`screenSizeId\`) REFERENCES \`screen_sizes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`laptop\` ADD CONSTRAINT \`FK_307b61fc9cea164f23fa708fa98\` FOREIGN KEY (\`screenResolutionId\`) REFERENCES \`screen_resolutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_e876defecd60e0986de12328e1e\` FOREIGN KEY (\`laptopId\`) REFERENCES \`laptop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_e876defecd60e0986de12328e1e\``);
        await queryRunner.query(`ALTER TABLE \`laptop\` DROP FOREIGN KEY \`FK_307b61fc9cea164f23fa708fa98\``);
        await queryRunner.query(`ALTER TABLE \`laptop\` DROP FOREIGN KEY \`FK_474646a82946eb7b9293e9c5dbb\``);
        await queryRunner.query(`ALTER TABLE \`laptop\` DROP FOREIGN KEY \`FK_1b290617c340c5d756dc66e48bf\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`laptop\``);
        await queryRunner.query(`DROP TABLE \`screen_resolutions\``);
        await queryRunner.query(`DROP TABLE \`screen_sizes\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
    }

}
