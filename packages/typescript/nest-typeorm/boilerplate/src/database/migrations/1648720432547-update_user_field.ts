import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateUserField1648720432547 implements MigrationInterface {
  name = 'updateUserField1648720432547'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`refresh_token\` varchar(255) NULL COMMENT '刷新令牌'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refresh_token\``)
  }
}
