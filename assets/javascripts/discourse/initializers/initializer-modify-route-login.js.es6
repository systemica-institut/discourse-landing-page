import { withPluginApi } from "discourse/lib/plugin-api";
import { helperContext } from "discourse-common/lib/helpers";

const PLUGIN_ID = "Discourse-landing-page";

export default {
    name: "initializer-modify-route-login",
    initialize() {
        withPluginApi("0.11.0", api => {
            api.modifyClass('route:login', {
                pluginId: PLUGIN_ID,
                beforeModel() {
                    // do nothing
                },
                renderTemplate() {
                    this.render('login');
                }
            })
        });
    }
}
