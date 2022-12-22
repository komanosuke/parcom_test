# coding: utf-8
class ConnectController < ApplicationController
    require 'net/https'
    require 'uri'
    require 'json'
    require 'rest-client'
    require "socket"
    skip_before_action :verify_authenticity_token
    

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
        @json_data = "not exist!" #00000になる
        if Textdatum.exists?
            @json_data = Textdatum.last.string
        end
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

        @judge = params[:os_data]
        logger.debug(@judge)

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

    def websocket_test
        # socket = TCPSocket.open("192.168.0.238", 8080)
        # socket = TCPSocket.open("0.0.0.0", 8888)
        # socket.send("pi", 0)

        # server = TCPServer.open(8888)
        # socket_accept = server.accept
        # buf = socket_accept.gets
        # pp buf
        # logger.debug(buf)
        # require 'socket

        # #試験用　inet,dgram ok
        Socket.open(:INET, :DGRAM) do |sock|
        addr = Socket.sockaddr_in(9001, '127.0.0.1')
        sock.send('hello inet dgram', 0, addr)
        end

        # #inet,dgram ok
        # Socket.open(:INET, :DGRAM) do |sock|
        # addr = Socket.sockaddr_in(8080, '192.168.0.238')
        # sock.send("ID?", 0, addr)
        # end

        # #unix,dgram no(Errno::ECONNREFUSED (Connection refused - connect(2) for /tmp/unix_stream.socket):)
        # Socket.open(:UNIX, :DGRAM) do |sock|
        # addr = Socket.sockaddr_un('/tmp/unix_dgram.socket')
        # sock.send("ID?", 0, addr)
        # end

        # #inet,stream no(server停止・待機？)
        # Socket.open(:INET, :STREAM) do |sock|
        # addr = Socket.sockaddr_in(8080, '192.168.0.238')
        # sock.connect addr
        # sock.write "ID?"
        # p sock.gets
        # end

        # #unix,stream no(Errno::ECONNREFUSED (Connection refused - connect(2) for /tmp/unix_stream.socket):)
        # Socket.open(:UNIX, :STREAM) do |sock|
        # addr = Socket.sockaddr_un('/tmp/unix_stream.socket')
        # sock.connect addr
        # sock.write "ID?"
        # p sock.gets
        # end

        # #udp, open ok
        # UDPSocket.open do |sock|
        # sock.send("ID?", 0, '192.168.0.238', 8080)
        # end

        # #tcp, open no(server停止・待機？)
        # TCPSocket.open('192.168.0.238', 8080) do |sock|
        # sock.write "ID?"
        # p sock.gets
        # end

        # #unix, open no(Errno::ECONNREFUSED (Connection refused - connect(2) for /tmp/unix_server.socket):)
        # UNIXSocket.open('/tmp/unix_server.socket') do |sock|
        # sock.write "ID?"
        # p sock.gets
        # end
    end

    # def websocket_test_close
    #     socket.close
    #     server.close
    # end

    def error
        
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

        # uri = URI('https://parcomsend.herokuapp.com/send_data/index')
        # params = { :api_key => 'your_api_key' }
        # uri.query = URI.encode_www_form(params)

        # res = Net::HTTP.get_response(uri)
        # puts res.body if res.is_a?(Net::HTTPSuccess)
    end

end
