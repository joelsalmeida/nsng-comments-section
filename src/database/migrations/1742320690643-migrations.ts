import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1742320690643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`user\` (
        \`id\` VARCHAR(36) NOT NULL,
        \`username\` VARCHAR(255) NOT NULL,
        CONSTRAINT \`UQ_username\` UNIQUE (\`username\`),
        CONSTRAINT \`PK_user_id\` PRIMARY KEY (\`id\`)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`comment\` (
        \`id\` VARCHAR(36) NOT NULL,
        \`body\` TEXT NOT NULL,
        \`sender\` VARCHAR(36),
        \`likes\` TEXT,
        \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT \`PK_comment_id\` PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_comment_sender\` FOREIGN KEY (\`sender\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`response\` (
        \`id\` VARCHAR(36) NOT NULL,
        \`comment\` VARCHAR(36),
        \`sender\` VARCHAR(36),
        \`recipient\` VARCHAR(36),
        \`body\` TEXT NOT NULL,
        \`likes\` TEXT,
        \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT \`PK_response_id\` PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_response_comment\` FOREIGN KEY (\`comment\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`FK_response_sender\` FOREIGN KEY (\`sender\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`FK_response_recipient\` FOREIGN KEY (\`recipient\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`response\``);

    await queryRunner.query(`DROP TABLE \`comment\``);

    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
