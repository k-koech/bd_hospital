class BloodGroup < ActiveRecord::Base
    belongs_to :booking
    has_many :blood_available
    has_many :hospital, through: :blood_available
end