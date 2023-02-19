import { withPluginApi } from "discourse/lib/plugin-api";
import { schedule, next } from "@ember/runloop";

const PLUGIN_ID = "Discourse-landing-page";

export default {
    name: "initializer-modify-route-login",
    initialize() {
        withPluginApi("0.11.0", api => {
            api.modifyClass('route:login', {
                pluginId: PLUGIN_ID,
                showFooter: true,
                beforeModel() {
                    // do nothing
                },
                renderTemplate() {
                    this.render('login');
                },
                afterModel(model, transition) {
                    schedule("afterRender", () => {
                        next(() => window.scrollTo(0, 0));
                    });
                }
            })

            api.modifyClass('route:signup', {
                pluginId: PLUGIN_ID,
                showFooter: true,
                beforeModel() {
                    // do nothing
                },
                renderTemplate() {
                    this.render('create-account');
                },
                afterModel(model, transition) {
                    schedule("afterRender", () => {
                        next(() => window.scrollTo(0, 0));
                    });
                }
            })
        });
    }
}
