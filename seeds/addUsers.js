
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          firstname: "John", 
          lastname: "Cleton", 
          email: "cleton@gmail.com", 
          password: "password", 
          gender: "male", 
          jobrole: "manager", 
          department: "finance", 
          address: "Ikot ekpene", 
          maritalstatus: "Married", 
          isadmin: false
        },
        {
          id: 2, 
          firstname: "Uwem",
          lastname: "Uke", 
          email: "ekon@gmail.com", 
          password: "password", 
          gender: "male", 
          jobrole: "manager", 
          department: "Engineering", 
          address: "Lagos", 
          maritalstatus: "Single", 
          isadmin: true
        },
        {
          id: 3, 
          firstname: "Etieno",
          lastname: "Udofa", 
          email: "eti@gmail.com", 
          password: "password", 
          gender: "Female", 
          jobrole: "Nurse", 
          department: "Health", 
          address: "Port Harcourt", 
          maritalstatus: "Single", 
          isadmin: false
        }
      ]);
    });
};