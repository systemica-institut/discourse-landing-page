import DiscourseRoute from 'discourse/routes/discourse';
import { defaultHomepage } from "discourse/lib/utilities";

export default DiscourseRoute.extend({
  showFooter: true,
  beforeModel() {
    if (this.currentUser) {
      this.replaceWith(`/${defaultHomepage()}`);
    }
  },
  renderTemplate() {
    this.render('home');
  }
});