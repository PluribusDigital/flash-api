UPDATE users
   SET role='Admin'
 WHERE id <= 3;

UPDATE users
   SET role='Employee'
 WHERE id >= 41;
