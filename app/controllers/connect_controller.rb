class ConnectController < ApplicationController
    require 'net/https'
    require 'uri'
    require 'json'
  
    def post_message
        uri = URI.parse("https://parcomsend.herokuapp.com/index")
        #URI指定
        http = Net::HTTP.new(uri.host, uri.port)
        #Net::HTTPオブジェクトを作成
        http.use_ssl = true
        #https通信をできるようにする
        #http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        #ローカル環境から実行したい場合はこの記述によりSSL証明書の発行をすっ飛ばす。

        message = "hogehoge"
        http.start do
            req = Net::HTTP::Post.new(uri.path)
            #POSTリクエストを作成
            req.set_form_data(body: message)
            #bodyのデータをセット
            http.request(req)
            #リクエストを投げる　返り値はレスポンス
            @req = req
        end
    end

    def index
        random = Random.new()
        @array = []
        for i in 1..5 do
            @array.push(random.rand(1..30))
        end

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
        @fan = params
    end
end
