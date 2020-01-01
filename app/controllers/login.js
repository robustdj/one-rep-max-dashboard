import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session
  @tracked email = ''
  @tracked password = ''

  @action
  async authenticate() {
    try {
      await this.session.authenticate('authenticator:basic', this.email, this.password);
    } catch(error) {
      this.set('errorMessage', error.error || error);
    }

    if (this.session.isAuthenticated) {
      this.transitionToRoute('index')
    }
  }
}
