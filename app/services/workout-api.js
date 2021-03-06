import Service from '@ember/service';
import fetch from 'fetch'
import Exercise from '../models/exercise'

const BASE_URL = 'https://one-rep-dashboard-api.herokuapp.com/api/v1'

export default class WorkoutApiService extends Service {
  setEncodedCredentials(encodedCredentials) {
    this.encodedCredentials = encodedCredentials
  }

  setCurrentUser(user) {
    this.currentUser = user
  }

  async getUser(email) {
    let response = await this._apiGet('users')

    if (response.status === 401) {
      return
    }

    let json = await response.json()
    let [ user ] = json.filterBy('email', email)
    this.setCurrentUser(user)

    return user
  }

  async getExercisesWithOneRepMax() {
    let exercises = await this.getExercises()
    let allSingleSets = await this.getUserSingleSets()

    for (const exercise of exercises) {
      let singleSets = allSingleSets.filterBy('exercise_id', exercise.id)
      exercise.processData(singleSets)
    }

    return exercises
  }

  async getExercises() {
    let response = await this._apiGet('exercises')
    let exercises = await response.json()
    return exercises.map((exercise) => new Exercise(exercise))
  }

  async getUserWorkouts() {
    let { id } = this.currentUser
    let response = await this._apiGet(`users/${id}/workouts`)
    return response.json()
  }

  async getUserSingleSets() {
    let workouts = await this.getUserWorkouts()
    let singleSets = []

    for (const workout of workouts) {
      // console.log(`making API call to: users/${this.currentUser.id}/workouts/${workout.id}/single_sets`)
      let response = await this._apiGet(`users/${this.currentUser.id}/workouts/${workout.id}/single_sets`)
      let json = await response.json()
      singleSets.push(...json)
    }

    return singleSets
  }

  _apiHeaders() {
    return {
      'Authorization': `Basic ${this.encodedCredentials}`,
      'Content-Type': 'application/json'
    }
  }

  async _apiGet(endpoint) {
    return fetch(`${BASE_URL}/${endpoint}.json`, { headers: this._apiHeaders() })
  }
}
