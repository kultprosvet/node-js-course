import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOrderPromotion1637254675127 implements MigrationInterface {
  name = 'CreateOrderPromotion1637254675127'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`promotion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`order_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderId\` int NULL, \`laptopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`laptop_promotions\` (\`promotionId\` int NOT NULL, \`laptopId\` int NOT NULL, INDEX \`IDX_4bf290a7ea5fffd8410dd7d1a5\` (\`promotionId\`), INDEX \`IDX_0a266fe4d9d0ca77a667cb447f\` (\`laptopId\`), PRIMARY KEY (\`promotionId\`, \`laptopId\`)) ENGINE=InnoDB`
    )

    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_c1bd4db88e12010068ec4584ed4\` FOREIGN KEY (\`laptopId\`) REFERENCES \`laptop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`laptop_promotions\` ADD CONSTRAINT \`FK_4bf290a7ea5fffd8410dd7d1a5f\` FOREIGN KEY (\`promotionId\`) REFERENCES \`promotion\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE \`laptop_promotions\` ADD CONSTRAINT \`FK_0a266fe4d9d0ca77a667cb447f2\` FOREIGN KEY (\`laptopId\`) REFERENCES \`laptop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`laptop_promotions\` DROP FOREIGN KEY \`FK_0a266fe4d9d0ca77a667cb447f2\``
    )
    await queryRunner.query(
      `ALTER TABLE \`laptop_promotions\` DROP FOREIGN KEY \`FK_4bf290a7ea5fffd8410dd7d1a5f\``
    )
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``
    )
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_c1bd4db88e12010068ec4584ed4\``
    )
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``
    )
    await queryRunner.query(
      `ALTER TABLE \`laptop\` CHANGE \`price\` \`price\` decimal(10) NOT NULL`
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_0a266fe4d9d0ca77a667cb447f\` ON \`laptop_promotions\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_4bf290a7ea5fffd8410dd7d1a5\` ON \`laptop_promotions\``
    )
    await queryRunner.query(`DROP TABLE \`laptop_promotions\``)
    await queryRunner.query(`DROP TABLE \`orders\``)
    await queryRunner.query(`DROP TABLE \`order_items\``)
    await queryRunner.query(`DROP TABLE \`promotion\``)
  }
}
