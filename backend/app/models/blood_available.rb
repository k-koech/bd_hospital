class BloodAvailable < ActiveRecord::Base
    belongs_to :Hospital
    belongs_to :blood_group
end