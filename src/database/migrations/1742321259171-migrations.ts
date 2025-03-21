import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1742321259171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user (id, username) 
      VALUES 
        (
          'e55a6528-c4f8-4b34-aefd-79cfce2336f4', 
          'amyrobson'
        ), 
        (
          '2aecfe81-f9f8-44b6-8c08-94aef7ffc702', 
          'juliusomo'
        ), 
        (
          'baea2164-700d-42d4-bc57-08f3b2a19c03', 
          'maxblagun'
        ), 
        (
          'b134359f-3d1d-4965-a43e-7bfcf3145629', 
          'ramsesmiron'
        );
    `);

    await queryRunner.query(`
      INSERT INTO comment (
        body, createdAt, id, likes, senderId, 
        updatedAt
      ) 
      VALUES 
        (
          'Woah, your project looks awesome! How long have you been coding for? I''m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!', 
          '2024-05-10 23:52:01.916408', '53720692-21b2-4254-9e1c-2b50ddfb3ad5', 
          'e55a6528-c4f8-4b34-aefd-79cfce2336f4,baea2164-700d-42d4-bc57-08f3b2a19c03', 
          'b134359f-3d1d-4965-a43e-7bfcf3145629', 
          '2024-07-13 13:52:28.000000'
        ), 
        (
          'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You''ve nailed the design and the responsiveness at various breakpoints works really well.', 
          '2024-06-30 12:59:13.604763', 'c10255e9-7804-4188-83da-5ea99a056a8c', 
          'baea2164-700d-42d4-bc57-08f3b2a19c03', 
          '2aecfe81-f9f8-44b6-8c08-94aef7ffc702', 
          '2024-07-02 20:03:39.000000'
        );
    `);

    await queryRunner.query(`
      INSERT INTO response (
        body, commentId, createdAt, id, likes, 
        recipientId, senderId, updatedAt
      ) 
      VALUES 
        (
          'If you''re still new, I''d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It''s very tempting to jump ahead but lay a solid foundation first.', 
          '53720692-21b2-4254-9e1c-2b50ddfb3ad5', 
          '2024-06-17 23:53:11.921336', '73a39d2f-47c2-4a82-b35a-d497a829c18a', 
          'baea2164-700d-42d4-bc57-08f3b2a19c03', 
          'e55a6528-c4f8-4b34-aefd-79cfce2336f4', 
          'baea2164-700d-42d4-bc57-08f3b2a19c03', 
          '2025-03-18 18:02:18.000000'
        ), 
        (
          'I couldn''t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.', 
          '53720692-21b2-4254-9e1c-2b50ddfb3ad5', 
          '2024-06-10 23:53:11.921336', 'a1a8954a-e819-432c-94f4-4d8132c98ab8', 
          '', 'baea2164-700d-42d4-bc57-08f3b2a19c03', 
          'e55a6528-c4f8-4b34-aefd-79cfce2336f4', 
          '2024-07-02 20:00:24.418984'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM response;
    `);

    await queryRunner.query(`
      DELETE FROM comment;
    `);

    await queryRunner.query(`
      DELETE FROM user;
    `);
  }
}
