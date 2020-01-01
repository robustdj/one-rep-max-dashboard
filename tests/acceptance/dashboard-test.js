import { module, test, skip } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
// import { login, logout } from '../helpers/login';

module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks);

  test('logging in with invalid credentials should show error message', async function(assert) {
    await visit('/')
    assert.equal(currentURL(), '/login')

    await fillIn('[data-test-email]', 'fakeuser@fitbod.me')
    await fillIn('[data-test-password]', 'fakepw')
    await click('[data-test-submit]')

    assert.dom('[data-test-error-message').hasText('Invalid email/password')
  });

  skip('shows exercises with 1RM records', async function(/* assert */) {});

  skip('clicking on exercise shows 1RM chart', async function(/* assert */) {});
});
