import { withPluginApi } from "discourse/lib/plugin-api";

const { iconNode } = require("discourse-common/lib/icon-library");

export default {
    name: "initializer-control-custom-header-login-signup",
    initialize(container) {
        withPluginApi("0.11.0", api => {
            api.onAppEvent("page:changed", (data) => {
                if (data.currentRouteName == "login"
                    || data.currentRouteName == "signup"
                    || data.currentRouteName == "home"
                    || data.currentRouteName == "forgot-password"
                ) {
                    $(".below-site-header-outlet .custom-header-login-signup").show();
                } else {
                    $(".below-site-header-outlet .custom-header-login-signup").hide();
                }
            });
        });
    }
}
