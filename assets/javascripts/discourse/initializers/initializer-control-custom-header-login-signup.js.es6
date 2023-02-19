import { withPluginApi } from "discourse/lib/plugin-api";
import { getOwner } from "discourse-common/lib/get-owner";

const { iconNode } = require("discourse-common/lib/icon-library");

export default {
    name: "initializer-control-custom-header-login-signup",
    initialize(container) {
        withPluginApi("0.11.0", api => {
            let appEvents = container.lookup('service:app-events');
            appEvents.on('page:changed', data => {
                if (data.currentRouteName == "login"
                    || data.currentRouteName == "signup"
                    || data.currentRouteName == "home"
                ) {
                    $(".below-site-header-outlet .custom-header-login-signup").show();
                } else {
                    $(".below-site-header-outlet .custom-header-login-signup").hide();
                }
            });
        });
    }
}
