UPDATE users
   SET role='Supervisor'
 WHERE id <= 3;

 UPDATE users
   SET role='Admin'
 WHERE id >= 41;
