import { MigrationInterface, QueryRunner } from 'typeorm'

export class laptopModelUniq1637256737523 implements MigrationInterface {
  name = 'laptopModelUniq1637256737523'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`laptop\` ADD UNIQUE INDEX \`IDX_dec94bef9b99d8943ead12481c\` (\`model\`)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`laptop\` DROP INDEX \`IDX_dec94bef9b99d8943ead12481c\``
    )
  }
}
