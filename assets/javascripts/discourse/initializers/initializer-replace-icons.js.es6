import { withPluginApi } from "discourse/lib/plugin-api";

export default {
    name: "initializer-replace-icons",
    initialize(container) {
        withPluginApi("0.11.0", api => {
            api.replaceIcon("user", "lp-icon-user");
            api.replaceIcon("comment", "lp-icon-comment-dots");
            api.replaceIcon("search", "lp-icon-search");
        });
    }
}
