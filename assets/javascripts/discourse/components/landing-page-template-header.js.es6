import Component from "@ember/component";
import { action } from "@ember/object";
import { getOwner } from "@ember/application";
import DiscourseURL from "discourse/lib/url";

export default Component.extend({
  @action
  showLoginForm(event) {
    event?.preventDefault();
    DiscourseURL.routeTo(`/login`);
    getOwner(this).lookup("controller:login-page").setProperties({
      isShowLoginForm: true,
    });
  },
});
