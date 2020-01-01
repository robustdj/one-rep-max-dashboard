export default function() {

  this.urlPrefix = 'http://localhost:3000'
  this.namespace = '/api/v1'

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.get('/users.json', () => {
    return [
      {
          "id": 5,
          "email": "user6@fitbod.me",
          "created_at": "2019-12-31T22:34:01.790Z",
          "updated_at": "2019-12-31T22:34:01.790Z"
      },
      {
          "id": 4,
          "email": "user5@fitbod.me",
          "created_at": "2019-12-31T22:34:01.690Z",
          "updated_at": "2019-12-31T22:34:01.690Z"
      }
    ]
  })

  this.get('/exercises.json', () => {
    return [
      {
          "id": 3,
          "name": "Deadlift",
          "created_at": "2019-12-31T22:34:02.304Z",
          "updated_at": "2019-12-31T22:34:02.304Z"
      },
      {
          "id": 2,
          "name": "Barbell Bench Press",
          "created_at": "2019-12-31T22:34:02.273Z",
          "updated_at": "2019-12-31T22:34:02.273Z"
      },
      {
          "id": 1,
          "name": "Back Squat",
          "created_at": "2019-12-31T22:34:02.254Z",
          "updated_at": "2019-12-31T22:34:02.254Z"
      }
    ]
  })
}
