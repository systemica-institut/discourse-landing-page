import { defaultHomepage } from "discourse/lib/utilities";
import DiscourseRoute from 'discourse/routes/discourse';

export default DiscourseRoute.extend({
  showFooter: true,
  beforeModel() {
    if (this.currentUser) {
      this.replaceWith(`/${defaultHomepage()}`);
    }
  },
});