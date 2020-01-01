import Base from 'ember-simple-auth/authenticators/base';
import { run } from '@ember/runloop';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service'
import { get } from '@ember/object';

export default class BasicAuth extends Base {
  @service workoutApi

  restore(data) {
    if (get(data.user, 'id')) {
      this.workoutApi.setEncodedCredentials(data.encodedCredentials)
      return Promise.resolve(data)
    } else {
      return Promise.reject()
    }
  }

  async authenticate(email, password) {
    let encodedCredentials = this._encodeCredentials(email, password)
    this.workoutApi.setEncodedCredentials(encodedCredentials)
    let user = await this.workoutApi.getUser(email)

    return new Promise((resolve, reject) => {
      if (user) {
        run(null, resolve, { user, encodedCredentials })
      } else {
        run(null, reject, 'Invalid email/password')
      }
    })
  }

  invalidate() {
    this.workoutApi.setEncodedCredentials(null)
    return Promise.resolve();
  }

  _encodeCredentials(email, password) {
    return btoa(`${email}:${password}`)
  }
}