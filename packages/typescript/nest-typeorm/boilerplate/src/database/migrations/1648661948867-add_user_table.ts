import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserTable1648661948867 implements MigrationInterface {
  name = 'addUserTable1648661948867'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`update_time\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL COMMENT '状态，用于标记删除' DEFAULT 1, \`username\` varchar(32) NULL COMMENT '用户名', \`password\` varchar(32) NULL COMMENT '密码', \`nickname\` varchar(64) NULL COMMENT '昵称', \`avatar\` varchar(512) NULL COMMENT '头像', \`role\` enum ('0', '1', '90', '99') NOT NULL COMMENT '角色' DEFAULT '1', \`last_login_time\` datetime NULL COMMENT '最后登录时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``)
  }
}
