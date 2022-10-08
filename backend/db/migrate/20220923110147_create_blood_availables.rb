class CreateBloodAvailables < ActiveRecord::Migration[6.1]
  def change
    create_table :blood_availables do |t|
      t.integer :amount
      t.integer :hospital_id
      t.integer :blood_group_id

      t.timestamps
    end
  end
end
