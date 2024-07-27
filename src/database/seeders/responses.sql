-- ##### POPULAR TABLE

INSERT INTO
  response (
    body,
    commentId,
    createdAt,
    id,
    likes,
    recipientId,
    senderId,
    updatedAt
  )
VALUES
  (
    'If you\'re still new, I\'d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It\'s very tempting to jump ahead but lay a solid foundation first. #Edited',
    '53720692-21b2-4254-9e1c-2b50ddfb3ad5',
    '2024-06-17 23:53:11.921336',
    '73a39d2f-47c2-4a82-b35a-d497a829c18a',
    'baea2164-700d-42d4-bc57-08f3b2a19c03',
    'e55a6528-c4f8-4b34-aefd-79cfce2336f4',
    'baea2164-700d-42d4-bc57-08f3b2a19c03',
    '2024-07-13 14:31:09.000000'
  ),
  (
    'I couldn\'t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.',
    '53720692-21b2-4254-9e1c-2b50ddfb3ad5',
    '2024-06-10 23:53:11.921336',
    'a1a8954a-e819-432c-94f4-4d8132c98ab8',
    '',
    'baea2164-700d-42d4-bc57-08f3b2a19c03',
    'e55a6528-c4f8-4b34-aefd-79cfce2336f4',
    '2024-07-02 20:00:24.418984'
  );

-- ##### CLEAR TABLE

DELETE FROM response;
