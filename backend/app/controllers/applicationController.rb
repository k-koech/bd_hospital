
class ApplicationController < Sinatra::Base
    set :default_content_type, 'application/json'
    
    get '/' do
      '<h2>New Project</h2>'
    end

    get '/hospitals' do
        hospitals = Hospital.all.order(:code).limit(50)
        # .include(blood_availables)
        # render json: 
        hospitals.to_json(include: {blood_available: {include: :blood_group} })
        
    end

    post '/hospital' do   
        hospital = Hospital.create(
          name: params[:name],
          code: params[:code],
          county: params[:county]
        )
        if hospital
           success = {:success => "Hospital added successfully!"}
           success.to_json
        else
            errors = {:success => "Error adding hospital!"}
            errors.to_json
        end
    end

    get '/hospitals/:id' do
        check_existence_hospital = Hospital.exists?(id: params[:id])
        puts check_existence_hospital

        if check_existence_hospital
            hospital = Hospital.find(params[:id])
            hospital.to_json(include: {blood_available: {include: :blood_group} })
        else
            errors = {:error => "Hospital doesn't exist!"}
            errors.to_json
        end
    end

    patch '/hospital/:id' do
        check_existence_hospital = Hospital.exists?(id: params[:id])
       
        if check_existence_hospital
            hospital = Hospital.find_by(id: params[:id])
            hospital.update(
            name: params[:name],
            code: params[:code],
            county: params[:county])        
            success = {:success => "Hospital saved successfully!"}
            success.to_json
        else
            errors = {:error => "Hospital not exist!"}
            errors.to_json
        end
    end

    delete '/hospital/:id' do
        check_existence_hospital = Hospital.exists?(id: params[:id])
       
        if check_existence_hospital
            hospital = Hospital.find(params[:id])
            hospital.destroy
            puts "failed to delete"
        else
            errors = {:error => "Hospital not exist!"}
            errors.to_json
        end
        hospital.to_json
    end


    post '/booking' do 
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
        bookings = Booking.all
        # .order(:id)
        bookings.to_json
      
        # hospitals = Hospital.all.order(:code).limit(50)
        # hospitals.to_json

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
        count_bloodtype = BloodGroup.count()

        if count_bloodtype <=8
            if params[:blood_type]!=""
                check_existence_bloodtype = BloodGroup.exists?(blood_type: params[:blood_type])
            
                if check_existence_bloodtype
                    errors = {:error => "Blood group already added!"}
                    errors.to_json
                else
                    blood_group = BloodGroup.create(blood_type: params[:blood_type])
                    errors = {:success => "Blood Group added successfully!"}
                    errors.to_json
                
                end
            else
                errors = {:error => "Please add a blood group!"}
                errors.to_json
            end
        else
            errors = {:error => "Blood groups should not be more than 8!"}
            errors.to_json     
        end
   
    end

    get '/bloodgroup' do
        booking = BloodGroup.all.order(:id)
        booking.to_json
    end

    # Blood available
    post '/bloodavailable' do
        check = BloodAvailable.find_by(blood_group_id: params[:blood_group_id], hospital_id: params[:hospital_id])
        
        puts "xxxxxxxxxxxxx"
        if check
            ba = BloodAvailable.find_by(id: check.id)
            updated_amount = check.amount+params[:amount]
            ba.update(
                amount: updated_amount,
                blood_group_id: params[:blood_group_id],
                hospital_id: params[:hospital_id])
            success = {:success => "Blood Updated successfully!"}
            success.to_json


        else
            ba =  BloodAvailable.create(
                amount: params[:amount],
                blood_group_id: params[:blood_group_id],
                hospital_id: params[:hospital_id]
            )
            success = {:success => "Blood added successfully!"}
            success.to_json
        end
    end

    get '/bloodavailable' do
        ba = Blood_Available.all.order(:code).limit(50)
        ba.to_json 
    end
  

end
