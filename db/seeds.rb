# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json';
countrylistFile = File.read "client/helper/combined_countries_include2code.json"
countrylist = JSON.parse(countrylistFile)
# Country.create!()
countrylist.each do |country, info|
  Country.create!(country: country, name: info["name"], native: info["native"], phone: info["phone"], continent: info["continent"], capital: info["capital"], currency: info["currency"], languages: info["languages"])
end

puts "#{Country.count} countries created"

translatedFile = File.read "client/helper/translated_name_added.json"
translated = JSON.parse(translatedFile)

translated.each do |lang|
  if lang["hello"]
    Translation.create!(language: lang["language"], hello: lang["hello"])
  end
end

puts "#{Translation.count} translations created"
