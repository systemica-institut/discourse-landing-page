import LocalLoginForm from "discourse/components/modal/login/local-login-form";
import { action } from "@ember/object";

export default class extends LocalLoginForm {
  @action
  loginOnEnter(event) {
    if (this.args.flash) {
      this.args.flashChanged("");
      this.args.flashTypeChanged("");
    }

    if (event.key === "Enter") {
      this.args.login();
    }
  }
}
