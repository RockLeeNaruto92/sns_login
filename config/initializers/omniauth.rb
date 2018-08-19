OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '165892280639700', 'd7ab810fb285c539e18b9610699e101d'
end
