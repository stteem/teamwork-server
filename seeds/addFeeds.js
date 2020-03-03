
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          itemid: 108,
          imageurl: 'http://res.cloudinary.com/dk02ty1w8/image/upload/v1581246968/bjr071glnykfeg1ccja0.jpg',
          article: null,
          title: 'meetup',
          userid: 106,
          createdon: '2020-02-09T10:15:52.165Z',
          firstname: 'Ubong',
          lastname: 'Umoh'
        },
        {
          itemid: 2,
          imageurl: null,
          article: 'Lorem ipsum ipsum lorem foo bar bar foo.',
          title: 'The man who saw tommorow',
          userid: 106,
          createdon: '2020-01-25T18:15:04.990Z',
          firstname: 'Ubong',
          lastname: 'Umoh'
        },
        {
          itemid: 7,
          imageurl: null,
          article: 'The beautiful ones are not yet born',
          title: 'Beauty',
          userid: 107,
          createdon: '2019-12-04T18:30:31.831Z',
          firstname: 'Ekong',
          lastname: 'Udoh'
        }
      ]);
    });
};