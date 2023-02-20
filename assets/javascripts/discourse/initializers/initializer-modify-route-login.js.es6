import { withPluginApi } from "discourse/lib/plugin-api";
import { schedule, next } from "@ember/runloop";
import { defaultHomepage } from "discourse/lib/utilities";
import DiscourseURL from "discourse/lib/url";
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

            api.modifyClass('route:forgot-password', {
                pluginId: PLUGIN_ID,
                showFooter: true,
                beforeModel() {
                    if (this.currentUser) {
                        this.replaceWith(`/${defaultHomepage()}`);
                    }
                },
                renderTemplate() {
                    this.render('forgot-password');
                },
                afterModel(model, transition) {
                    schedule("afterRender", () => {
                        next(() => window.scrollTo(0, 0));
                    });
                }
            })

            api.modifyClass('route:application', {
                pluginId: PLUGIN_ID,

                handleShowLogin() {
                    console.log("click login button 2");
                    if (this.siteSettings.enable_discourse_connect) {
                        const returnPath = encodeURIComponent(window.location.pathname);
                        window.location = getURL("/session/sso?return_path=" + returnPath);
                    } else {
                        DiscourseURL.routeTo(`/login`);
                        this.controllerFor("login").setProperties({
                            showLoginForm: true,
                        });
                    }
                },
            })

            api.modifyClass('controller:login', {
                pluginId: PLUGIN_ID,
                showLoginForm: false,

                @action
                handleForgotPassword(event) {
                    event?.preventDefault();
                    const forgotPasswordController = this.forgotPassword;
                    if (forgotPasswordController) {
                        forgotPasswordController.set("accountEmailOrUsername", this.loginName);
                    }
                    DiscourseURL.routeTo(`/password-reset`);
                },
            })
        });
    }
}
