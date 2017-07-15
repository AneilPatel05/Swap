class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  def fb_id(access_token)
    p "fb_id"
    graph = Koala::Facebook::API.new(access_token)
    p graph
    profile = graph.get_object("me")
    p profile
    p "fb_id"
    return profile["id"]
  rescue
    return nil
  end

  def fb_auth_user(access_token)
    p "fb_auth_user"
    user = nil
    p access_token
    begin
      graph = Koala::Facebook::API.new(access_token)
      p graph
      profile = graph.get_object("me")
      p profile
      fb_id = profile["id"]
      p fb_id
      user = User.find_by(fb_id: fb_id)
      p user
      p "fb_auth_user"
    rescue
      return nil
    end

    if user && (user.fb_picture.nil? || user.first_name.nil? || user.last_name.nil?)
      first_name, last_name = profile["name"].split(" ")
      fb_picture = graph.get_picture(fb_id)
      user.update(
        fb_picture: fb_picture,
        first_name: first_name,
        last_name: last_name
      )
    end
    user
  end
end
