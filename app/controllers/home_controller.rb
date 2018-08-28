class HomeController < ApplicationController
  CLIENT_ID = "xxx"
  CLIENT_SECRET = "xxxx"

  def index
  end

  def new
    get_token
  end

  private
  def get_profile result
    access_token = result["access_token"]

    # Lay user info cho nay
    user_info = JWT.decode(result["id_token"], nil, false)
  end

  def get_token
    body = {
      :grant_type => "authorization_code",
      :code => params["code"],
      :redirect_uri => "https://2b7e08db.ngrok.io/home/new",
      :client_id =>  CLIENT_ID,
      :client_secret => CLIENT_SECRET
    }

    begin
      res = RestClient.post("https://api.line.me/oauth2/v2.1/token", body)
      get_profile JSON.parse(res);
    rescue RestClient::ExceptionWithResponse => err
      puts err.response
    end
  end
end
