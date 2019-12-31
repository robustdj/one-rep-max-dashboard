import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Dashboard extends Component {
  @tracked menuVisible = false

  @action
  toggleMenu() {
    this.menuVisible = !this.menuVisible
  }
}