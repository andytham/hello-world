require 'json'

file = File.read "client/helper/combined_countries.json"
text = "hello"
json = JSON.parse(file)
puts json
@language_array = []

json.each do |key,array|
  #puts "#{array["name"]}'s languages are: '#{array["languages"]}"
  array2 = array["languages"]
  array2.each do |item|
    if @language_array.include? item
      #puts "already exists"
    else
      @language_array << item
    end
  end
end

#puts @language_array.sort
