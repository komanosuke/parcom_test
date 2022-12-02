class ConnectController < ApplicationController
    require 'net/https'
    require 'uri'
    require 'json'
    require 'rest-client'
    
    

    def index
        random = Random.new()
        # @array = []
        # for i in 1..5 do
        #     @array.push(random.rand(1..30))
        # end

        # @data = [['01/01', @array[0]],['01/02', @array[1]],['01/03', @array[2]],['01/04', @array[3]],['01/05', @array[4]]]

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
        logger.debug(params[:json_data])

        if params[:json_data]
            sent_data = params[:json_data]
            Textdatum.create(string: sent_data)
            

            #data作り直し
            # @data = [['01/01', @array[0]],['01/02', @array[1]],['01/03', @array[2]],['01/04', @array[3]],['01/05', @array[4]]]
            
        end

        @json_data = Textdatum.last.string
        #.split(",")
        logger.debug("送られてきたデータは、" + @json_data)
        logger.debug(@json_data.split(","))
        logger.debug(@json_data.split(",").class)
        new_array = @json_data.split(",")
        
        #配列作り直し
        @array = []
        for i in 0..4 do
            @array.push(new_array[i].to_i)
            logger.debug("Viewに表示するデータは、" + @array[i].to_s)
        end
        
        
        logger.debug(@array[0].class)
        @array = @array.to_s
        logger.debug(@array)
        logger.debug(@array.class)

        #送られてきたデータを保存するところまではOK(保存必要？)
        #取り出して、出力も可能
        #１秒に１回出力をどう実現するか
        # Textdatum.create({ string: @json_data })
        #動的に送るところまではOK formでやってるところをsetTimeで置き換えられるか
        #たまってきたらUser(モデル).destroy_all
        #@json_data = random.rand(1..30)
        #@title = params[:title]
        respond_to do |format|
            format.html
            format.js
        end
    end

    def delete
        Textdatum.destroy_all
    end

    def post_message
        # uri = URI.parse("https://parcomsend.herokuapp.com/index")
        # #URI指定
        # http = Net::HTTP.new(uri.host, uri.port)
        # #Net::HTTPオブジェクトを作成
        # http.use_ssl = true
        # #https通信をできるようにする
        # http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        # #ローカル環境から実行したい場合はこの記述によりSSL証明書の発行をすっ飛ばす。

        # message = "hogehoge"
        # http.start do
        #     req = Net::HTTP::Post.new(uri.path)
        #     #POSTリクエストを作成
        #     req.set_form_data({"q" => "ruby", "lang" => "en"}, ';')
        #     #bodyのデータをセット
        #     http.request(req)
        #     #リクエストを投げる　返り値はレスポンス
        #     @req = req
        # end

        # url = 'https://parcomsend.herokuapp.com'
        # #body = params.to_json
        # body = 'JSONの送信が成功しました。'
        # content_type = :json
        # #RestClient.post(url, body, content_type: content_type)
        # RestClient.get 'https://parcomsend.herokuapp.com/send_data/index', {params: {json_data: "JSONの送信が成功しました。"}}
        # @req = body

        uri = URI('https://parcomsend.herokuapp.com/send_data/index')
        params = { :api_key => 'your_api_key' }
        uri.query = URI.encode_www_form(params)

        res = Net::HTTP.get_response(uri)
        puts res.body if res.is_a?(Net::HTTPSuccess)
    end

end
