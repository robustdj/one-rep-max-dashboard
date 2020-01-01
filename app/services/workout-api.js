import Service from '@ember/service';
import fetch from 'fetch'

export default class WorkoutApiService extends Service {
  async getUser(email, password) {
    let credentials = `${email}:${password}`
    let response = await fetch('http://localhost:3000/api/v1/users.json', {
      headers: {
        'Authorization': `Basic ${btoa(credentials)}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      return
    }

    let json = await response.json()
    let [ user ] = json.filterBy('email', email)
    return user
  }
}
