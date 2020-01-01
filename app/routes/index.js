import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service workoutApi

  async model() {
    let exercises = await this.workoutApi.getExercises()
    return exercises.json()
  }
}
