import { withPluginApi } from "discourse/lib/plugin-api";
import { schedule, next } from "@ember/runloop";
import { defaultHomepage } from "discourse/lib/utilities";
import { action } from "@ember/object";

const PLUGIN_ID = "Discourse-landing-page";

export default {
    name: "initializer-modify-route-login",
    initialize() {
        withPluginApi("0.11.0", api => {
            api.modifyClass('route:login', {
                pluginId: PLUGIN_ID,
                showFooter: true,
                beforeModel() {
                    if (this.currentUser) {
                        this.replaceWith(`/${defaultHomepage()}`);
                    }
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
                    if (this.currentUser) {
                        this.replaceWith(`/${defaultHomepage()}`);
                    }
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

            api.modifyClass('controller:login', {
                pluginId: PLUGIN_ID,
                showLoginForm: false,
            })
        });
    }
}
