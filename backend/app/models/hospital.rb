class Hospital < ActiveRecord::Base
    has_many :booking
    has_many :blood_available
    has_many :blood_group, through: :blood_available
end
