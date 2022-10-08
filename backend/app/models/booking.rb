class Booking < ActiveRecord::Base
    has_one :blood_group
    belongs_to :hospital
end
