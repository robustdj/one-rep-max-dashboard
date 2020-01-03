export default function() {

  this.urlPrefix = 'https://my-workout-turtle.herokuapp.com'
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

  this.get('/users/:user_id/workouts.json', () => {
    return [
      {
          "id": 43,
          "user_id": 1,
          "workout_date": "2018-06-19T00:00:00.000Z",
          "workout_duration": 86,
          "created_at": "2019-12-31T22:34:01.957Z",
          "updated_at": "2019-12-31T22:34:01.957Z"
      }
    ]
  });

  this.get('/users/:user_id/workouts/:workout_id/single_sets.json', () => {
    return [
      {
          "id": 1683,
          "weight": 215.0,
          "reps": 3,
          "performed_at": "2018-06-19T11:13:51.727Z",
          "workout_id": 43,
          "created_at": "2019-12-31T22:34:06.281Z",
          "updated_at": "2019-12-31T22:34:06.281Z",
          "exercise_id": 2
      },
      {
          "id": 1682,
          "weight": 215.0,
          "reps": 3,
          "performed_at": "2018-06-19T11:11:51.727Z",
          "workout_id": 43,
          "created_at": "2019-12-31T22:34:06.279Z",
          "updated_at": "2019-12-31T22:34:06.279Z",
          "exercise_id": 2
      },
      {
        "id": 1679,
        "weight": 285.0,
        "reps": 5,
        "performed_at": "2018-06-19T11:05:51.727Z",
        "workout_id": 43,
        "created_at": "2019-12-31T22:34:06.273Z",
        "updated_at": "2019-12-31T22:34:06.273Z",
        "exercise_id": 3
    },
    {
      "id": 1675,
      "weight": 265.0,
      "reps": 2,
      "performed_at": "2018-06-19T10:58:51.727Z",
      "workout_id": 43,
      "created_at": "2019-12-31T22:34:06.265Z",
      "updated_at": "2019-12-31T22:34:06.265Z",
      "exercise_id": 1
    }]
  });
}
