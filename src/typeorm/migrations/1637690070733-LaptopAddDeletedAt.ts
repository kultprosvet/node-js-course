import { MigrationInterface, QueryRunner } from 'typeorm'

export class LaptopAddDeletedAt1637690070733 implements MigrationInterface {
  name = 'LaptopAddDeletedAt1637690070733'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`laptop\`
            ADD \`deletedAt\` datetime(6) NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`laptop\` DROP COLUMN \`deletedAt\``)
  }
}
