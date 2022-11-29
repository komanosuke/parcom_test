class ConnectController < ApplicationController
    require 'net/https'
    require 'uri'
    require 'json'
  
    def post_message
        uri = URI.parse("http://54.64.49.214/sample")
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    
        message = "hoge"
    
        http.start do
            req = Net::HTTP::Post.new(uri.path)
            req.set_form_data(body: message)
            http.request(req)
        end
    end

    def index
        @fan = 'fan'
        @led = 'led'
        @color = 'color'
        @display = 'display'
        @pdf = 'pdf'
        @img = 'img'
        @mp4 = 'mp4'
        @audio = 'audio'
        @volume = 'volume'
        @mp3 = 'mp3'
        @usb_v = 'usb_v'
        @log = 'log'

        @judge = params[:status]
    end
end
