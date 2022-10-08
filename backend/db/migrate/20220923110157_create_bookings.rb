class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.string :name
      t.integer :id_number
      t.integer :blood_group_id
      t.integer :hospital_id
      t.integer :amount
      t.boolean :paid

      t.timestamps
    end
        
  end
end
