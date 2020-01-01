import { module, test, skip } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { login } from '../helpers/login';

module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('logging in with invalid credentials should show error message', async function(assert) {
    await visit('/')
    assert.equal(currentURL(), '/login')

    await fillIn('[data-test-email]', 'fakeuser@fitbod.me')
    await fillIn('[data-test-password]', 'fakepw')
    await click('[data-test-submit]')

    assert.dom('[data-test-error-message').hasText('Invalid email/password')
  });

  test('shows exercises in the menu', async function(assert) {
    // TODO assert that exercises have 1RM records

    await login()
    await visit('/')

    assert.dom('[data-test-exercise-menu-item]').exists({ count: 3 })
  });

  skip('clicking on exercise shows 1RM chart', async function(/* assert */) {});
});
