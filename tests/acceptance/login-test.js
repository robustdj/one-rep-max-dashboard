import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | login', function(hooks) {
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

  test('logging in', async function(assert) {
    await visit('/login')

    await fillIn('[data-test-email]', 'user6@fitbod.me')
    await fillIn('[data-test-password]', 'password')
    await click('[data-test-submit]')

    assert.dom('[data-test-logout]').exists()
  });

});
