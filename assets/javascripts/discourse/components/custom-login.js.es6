import { getOwner } from "@ember/application";
import { action } from "@ember/object";
import Login from "discourse/components/modal/login";
import DiscourseURL from "discourse/lib/url";

export default class extends Login {
  @action
  handleForgotPassword(event) {
    event?.preventDefault();
    const forgotPasswordController = getOwner(this).lookup(
      "controller:forgot-password"
    );
    if (forgotPasswordController) {
      forgotPasswordController.set("model", {
        emailOrUsername: this.loginName,
      });
    }
    DiscourseURL.routeTo(`/password-reset`);
  }
}
