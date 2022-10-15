require 'sinatra/cross_origin'
require "sinatra/cors"
require "sinatra/json"


class ApplicationController < Sinatra::Base
    set :default_content_type, 'application/json'
    set :protection, :except => [:json_csrf]

    set :bind, '0.0.0.0'
    configure do
        enable :cross_origin
    end
    before do
        response.headers['Access-Control-Allow-Origin'] = '*'
    end
    
    # routes...
    options "*" do
        # response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS, HEAD"
        response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS, HEAD"
        response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
        response.headers["Access-Control-Allow-Origin"] = "*"
        200
    end 
  
    get '/' do
        '<h2>New Project</h2>'
    end
    
    get '/hospitals' do
        hospitals = Hospital.all.order(:code).limit(50)
        hospitals.to_json
        
    end

    post '/hospital' do   
        # params.to_json
        hospital = Hospital.create(
          name: params[:name],
          code: params[:code],
          county: params[:county]
        )
        hospital.to_json
    end

    get '/hospitals/:id' do
        hospital = Hospital.find(params[:id])
        hospital.to_json(include: {blood_available: { include: :blood_group} })
    end

    patch '/hospital/:id' do
        hospital = Hospital.find_by(id: params[:id])
        # rescue_from ActiveRecord::RecordNotFound do
        #     flash[:notice] = 'The object you tried to access does not exist'
        #     render :not_found   # or e.g. redirect_to :action => :index
        # end
        if hospital
            hospital.update(name: params[:name],
            code: params[:code],
            county: params[:county])        
            hospital.to_json
        else
            puts "ERROR !!!!!!!!!!"
            json :error => 'Hospital not found!'
        end
    end

    delete '/hospital/:id' do
        hospital = Hospital.find(params[:id])
        if hospital
            hospital.destroy
            puts "failed to delete"
        else
            puts "record do not exist"
        end
        hospital.to_json
    end
    

    post '/booking' do
        body_parameters = request.body.read
        puts " TESTINFG "+body_parameters 
        bookings = Booking.create(
          name: params[:name],
          id_number: params[:id_number],
          blood_group_id: params[:blood_group_id],
          amount: params[:amount],
          paid: params[:paid]
        )
        bookings.to_json
    end

    get '/booking' do
        booking = Booking.all.order(:id)
        # booking.to_json
        render json: booking, include: :hospital
        # render json: dog_house, include: :reviews

    end

    delete '/booking/:id' do

        booking = Booking.find(params[:id])
        if booking
            booking.destroy
            puts "failed to delete"
        else
            puts "record do not exist"
        end
        booking.to_json
    end

    # ======Blood group =========
    post '/bloodgroup' do  
        blood_group = BloodGroup.create(blood_type: params[:blood_type])
        # if blood_group.valid?
        #     render json: blood_group, status: :created
        # else
        blood_group.to_json
        # end
        # blood_group.to_json
    end

    get '/bloodgroup' do
        booking = BloodGroup.all.order(:id)
        booking.to_json
    end

    patch '/reviews/:id' do
        review = Review.find(params[:id])
        review.update(
          score: params[:score],
          comment: params[:comment]
        )
        review.to_json
    end

    patch '/reviews/:id' do
        review = Review.find(params[:id])
        review.update(
          score: params[:score],
          comment: params[:comment]
        )
        review.to_json
    end

    delete '/reviews/:id' do
        review = Review.find(params[:id])
        if review
            review.destroy
            puts "failed to delete"
        else
            puts "record do not exist"
        end
        review.to_json
    end
    

   
end




