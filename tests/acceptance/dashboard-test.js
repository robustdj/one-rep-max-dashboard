import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { login } from '../helpers/login';

const singleSets = [
  { // 227.6 1rm
    "id": 1683,
    "weight": 215.0,
    "reps": 3,
    "performed_at": "2018-06-19T11:13:51.727Z",
    "workout_id": 43,
    "created_at": "2019-12-31T22:34:06.281Z",
    "updated_at": "2019-12-31T22:34:06.281Z",
    "exercise_id": 2
  },
  { // 231.4 1rm
      "id": 1682,
      "weight": 225.0,
      "reps": 2,
      "performed_at": "2018-06-19T11:11:51.727Z",
      "workout_id": 43,
      "created_at": "2019-12-31T22:34:06.279Z",
      "updated_at": "2019-12-31T22:34:06.279Z",
      "exercise_id": 2
  }
]

const toggleBurgerMenu = () => {
  return click('[data-test-burger-menu')
}

module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('shows exercises in the menu and chart in main content area', async function(assert) {
    await login(this)
    await visit('/')

    assert.dom('[data-test-exercise-menu-item]').exists({ count: 3 })
    assert.dom('[data-test-1rm-chart').exists()
  });

  test('exercises show 1RM in the menu and in the main content area', async function(assert) {
    this.server.get('/users/:user_id/workouts/:workout_id/single_sets.json', () => singleSets)
    await login(this)
    await visit('/')

    await toggleBurgerMenu()

    assert.dom('[data-test-exercise-menu-item="Barbell Bench Press"] [data-test-1rm-record]').hasText('231.4', 'Highest 1rm should be shown')
    assert.dom('[data-test-top-nav-selected-exercise]').hasText('Deadlift', 'First exercise should be selected by default')
    assert.dom('[data-test-main-content-area] [data-test-1rm-record]').hasText('0', 'First exercise should have a 0 1rm')

    await click('[data-test-exercise-menu-item="Barbell Bench Press"]')

    assert.dom('[data-test-top-nav-selected-exercise]').hasText('Barbell Bench Press')
    assert.dom('[data-test-main-content-area] [data-test-1rm-record]').hasText('231.4')
  });
});
