import Service from '@ember/service';
import fetch from 'fetch'

const BASE_URL = 'http://localhost:3000/api/v1'

export default class WorkoutApiService extends Service {
  setEncodedCredentials(encodedCredentials) {
    this.encodedCredentials = encodedCredentials
  }

  async getUser(email) {
    let response = await this._apiGet('users')

    if (response.status === 401) {
      return
    }

    let json = await response.json()
    let [ user ] = json.filterBy('email', email)
    return user
  }

  async getExercises() {
    return this._apiGet('exercises')
  }

  _apiHeaders() {
    return {
      'Authorization': `Basic ${this.encodedCredentials}`,
      'Content-Type': 'application/json'
    }
  }

  _apiGet(endpoint) {
    return fetch(`${BASE_URL}/${endpoint}.json`, { headers: this._apiHeaders() })
  }
}
