import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment'

export default class Dashboard extends Component {
  @service session
  @service workoutApi
  @tracked menuVisible = false
  @tracked currentExercise

  @action
  toggleMenu() {
    this.menuVisible = !this.menuVisible
  }

  @action
  logout() {
    this.session.invalidate()
  }

  @action
  async getSingleSets() {
    this.singleSets = await this.workoutApi.getUserSingleSets()
  }

  @action
  async selectExercise(exercise) {
    this.currentExercise = exercise

    // TODO Move logic to a service or other class
    // filter by exercise
    let singleSets = this.singleSets.filterBy('exercise_id', exercise.id)

    // group by date
    // after this, we have a hash where date is the key and highest 1rm (from singlesets) is the value
    let setsGroupedByDate = singleSets.reduce((dates, singleSet) => {
      let date = moment(singleSet.performed_at).format('YYYY-MM-DD')

      // perform brzycki
      singleSet['1rm'] = this.brzycki(singleSet.weight, singleSet.reps)

      if (!dates[date]) { dates[date] = [singleSet] }

      // store the highest 1rm per day
      if (dates[date][0]['1rm'] < singleSet['1rm']) {
        dates[date] = [singleSet]
      }

      return dates;
    }, {})

    // console.log(setsGroupedByDate)
    // Next step is to change the data so that it can go into a chart
  }

  // TODO Move logic to a service or other class
  brzycki(weight, reps) {
    return Number(((weight * 36) / (37 - reps)).toFixed(1));
  }
}