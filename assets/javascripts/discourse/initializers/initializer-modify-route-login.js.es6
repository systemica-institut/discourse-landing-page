import { withPluginApi } from "discourse/lib/plugin-api";
import { next, schedule } from "@ember/runloop";
import { defaultHomepage } from "discourse/lib/utilities";
import DiscourseURL from "discourse/lib/url";
import getURL from "discourse-common/lib/get-url";

const PLUGIN_ID = "Discourse-landing-page";

export default {
  name: "initializer-modify-route-login",
  initialize() {
    withPluginApi("0.11.0", (api) => {
      api.modifyClass("route:login", {
        pluginId: PLUGIN_ID,
        showFooter: true,
        beforeModel() {
          if (this.currentUser) {
            this.replaceWith(`/${defaultHomepage()}`);
          }
        },
        renderTemplate() {
          this.render("login");
        },
        afterModel() {
          schedule("afterRender", () => {
            next(() => window.scrollTo(0, 0));
          });
        },
      });

      api.modifyClass("route:signup", {
        pluginId: PLUGIN_ID,
        showFooter: true,
        beforeModel() {
          if (this.currentUser) {
            this.replaceWith(`/${defaultHomepage()}`);
          }
        },
        renderTemplate() {
          this.render("create-account");
        },
        afterModel() {
          schedule("afterRender", () => {
            next(() => window.scrollTo(0, 0));
          });
        },
      });

      api.modifyClass("route:forgot-password", {
        pluginId: PLUGIN_ID,
        showFooter: true,
        beforeModel() {
          if (this.currentUser) {
            this.replaceWith(`/${defaultHomepage()}`);
          }
        },
        renderTemplate() {
          this.render("forgot-password");
        },
        afterModel() {
          schedule("afterRender", () => {
            next(() => window.scrollTo(0, 0));
          });
        },
      });

      api.modifyClass("route:application", {
        pluginId: PLUGIN_ID,

        handleShowLogin() {
          if (this.siteSettings.enable_discourse_connect) {
            const returnPath = encodeURIComponent(window.location.pathname);
            window.location = getURL("/session/sso?return_path=" + returnPath);
          } else {
            DiscourseURL.routeTo(`/login`);
            this.controllerFor("login-page").setProperties({
              isShowLoginForm: true,
            });
          }
        },

        handleShowCreateAccount() {
          if (this.siteSettings.enable_discourse_connect) {
            const returnPath = encodeURIComponent(window.location.pathname);
            window.location = getURL("/session/sso?return_path=" + returnPath);
          } else {
            DiscourseURL.routeTo(`/signup`);
          }
        },
      });

      api.modifyClass("controller:login-page", {
        pluginId: PLUGIN_ID,

        isShowLoginForm: false,
      });
    });
  },
};
