import Base from 'ember-simple-auth/authenticators/base';
import { run } from '@ember/runloop';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service'
import { get } from '@ember/object';

export default class BasicAuth extends Base {
  @service workoutApi

  restore(data) {
    return get(data, 'id') ? Promise.resolve(data) : Promise.reject();
  }

  async authenticate(email, password) {
    let user = await this.workoutApi.getUser(email, password)

    return new Promise((resolve, reject) => {
      if (user) {
        run(null, resolve, user)
      } else {
        run(null, reject, 'Invalid email/password')
      }
    })
  }

  invalidate(data) {
    return Promise.resolve();
  }
}