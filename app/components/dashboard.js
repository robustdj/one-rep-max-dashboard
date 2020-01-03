import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Dashboard extends Component {
  @service workoutApi
  @tracked menuVisible = false
  @tracked selectedExercise
  @tracked chartData

  @action
  toggleMenu() {
    this.menuVisible = !this.menuVisible
  }

  @action
  async selectFirstExercise() {
    this.selectExercise(this.args.exercises.firstObject)
  }

  @action
  async selectExercise(exercise) {
    this.selectedExercise = exercise
    this.menuVisible = false
    this.chartData = exercise.dataForChart()
  }
}