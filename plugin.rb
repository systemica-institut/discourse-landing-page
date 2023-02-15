# name: discourse-landing-page
# about: discourse landing page
# version: 0.1.0
# authors: Tu Dinh Tu
# url:

enabled_site_setting :discourse_landing_page_enabled

register_asset 'stylesheets/discourse-landing-page.scss'

after_initialize do
    load File.expand_path('../app/controllers/discourse_landing_page_controller.rb', __FILE__)

    Discourse::Application.routes.append do
        # Map the path `/home` to `DiscourseLandingPageController`’s `index` method
        # Remove route if not in use
        get '/home' => 'discourse_landing_page#index'
    end
end