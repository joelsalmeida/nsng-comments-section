import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717971296313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user (id, username) VALUES ('b134359f-3d1d-4965-a43e-7bfcf3145629', 'adan.smith'),
        ('e55a6528-c4f8-4b34-aefd-79cfce2336f4', 'beth.smith'),
        ('baea2164-700d-42d4-bc57-08f3b2a19c03', 'jhon.smith');
    
        INSERT INTO comment (body, id, likes, senderId) VALUES ('An amazing comment.', '53720692-21b2-4254-9e1c-2b50ddfb3ad5', 'e55a6528-c4f8-4b34-aefd-79cfce2336f4,baea2164-700d-42d4-bc57-08f3b2a19c03', 'b134359f-3d1d-4965-a43e-7bfcf3145629'),
        ('Other nice comment.', 'e8041aff-beb7-4711-945c-7c734ad17fde', '', 'baea2164-700d-42d4-bc57-08f3b2a19c03'),
        ('Just a nice comment.', 'fad43c33-bffe-4bec-9773-76d80a1ed0ae', '', 'e55a6528-c4f8-4b34-aefd-79cfce2336f4');
    
        INSERT INTO response (body, commentId, id, likes, recipientId, senderId) VALUES ('Other nice response.', '53720692-21b2-4254-9e1c-2b50ddfb3ad5', '73a39d2f-47c2-4a82-b35a-d497a829c18a', '', 'e55a6528-c4f8-4b34-aefd-79cfce2336f4', 'baea2164-700d-42d4-bc57-08f3b2a19c03'),
        ('Just a nice response.', '53720692-21b2-4254-9e1c-2b50ddfb3ad5', 'a1a8954a-e819-432c-94f4-4d8132c98ab8', '', 'baea2164-700d-42d4-bc57-08f3b2a19c03', 'e55a6528-c4f8-4b34-aefd-79cfce2336f4'),
        ('An amazing response.', '53720692-21b2-4254-9e1c-2b50ddfb3ad5', 'fa1b838c-c146-40ed-9771-ac15a6d43670', '', 'e55a6528-c4f8-4b34-aefd-79cfce2336f4', 'b134359f-3d1d-4965-a43e-7bfcf3145629');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM response WHERE id IN ('73a39d2f-47c2-4a82-b35a-d497a829c18a', 'a1a8954a-e819-432c-94f4-4d8132c98ab8', 'fa1b838c-c146-40ed-9771-ac15a6d43670');
        DELETE FROM comment WHERE id IN ('53720692-21b2-4254-9e1c-2b50ddfb3ad5', 'e8041aff-beb7-4711-945c-7c734ad17fde', 'fad43c33-bffe-4bec-9773-76d80a1ed0ae');
        DELETE FROM user WHERE id IN ('b134359f-3d1d-4965-a43e-7bfcf3145629', 'e55a6528-c4f8-4b34-aefd-79cfce2336f4', 'baea2164-700d-42d4-bc57-08f3b2a19c03');
    `);
  }
}
