puts "🌱 Seeding data..."

# Make 10 users
10.times do
  BloodGroup.create(blood_type: rand(2..4))
end
# Faker::Name.name
# Make 20 hospital
20.times do
  # create a hospital with random data
  hospital = Hospital.create(
    name: Faker::Name.name,
    code: Faker::Game.title,
    county: Faker::Name.name,
  )
#===== create between 1 and 5 Blood Available for each Hospital
  rand(1..5).times do
    # get a random blood group for every blood Available
    # https://stackoverflow.com/a/25577054
    bloodGroup = BloodGroup.order('RANDOM()').first

    # A Blood Available belongs to a Hospital and a BloodGroup, so we must provide those foreign keys
    BloodAvailable.create(
      amount: rand(1..10),
      hospital_id: hospital.id,
      blood_group_id: bloodGroup.id
    )
  end

  # 
  bloodGroup = BloodGroup.order('RANDOM()').first
  hospital = Hospital.order('RANDOM()').first

  Booking.create(
    name: Faker::Lorem.name,
    id_number: rand(2323343..4949290),
    hospital_id: hospital.id,
    blood_group_id: bloodGroup.id,
    amount: rand(1..10),
    paid: true

  )

end

puts "🌱 Done seeding!"
