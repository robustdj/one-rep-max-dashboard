import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Dashboard extends Component {
  @service session
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
}