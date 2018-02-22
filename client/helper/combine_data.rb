require 'json'
require 'pp'
file = File.read "client/helper/2and3code.json"
json = JSON.parse(file)
formattedList = []

file2 = File.read "client/helper/countries.json"
json2 = JSON.parse(file2)

# json1 lay out
# {
#   "FIELD1": "Country",
#   "FIELD2": "Alpha-2 code",
#   "FIELD3": "Alpha-3 code",
#   "FIELD4": "Numeric code",
#   "FIELD5": "Latitude (average)",
#   "FIELD6": "Longitude (average)"
# }

# the goal is to replace the two letter country code with the three letter one and keep the rest of the information intact

hash = Hash.new
json.each do |item|
  json2.each do |key, array|
    if item["FIELD2"] == key
      puts "#{key} = #{item["FIELD3"]}"
      hash[item["FIELD3"]] = array
    end
  end
end

# test = File.new("./testfile", mode="w+")
# test.write(JSON.generate(hash))

result = File.read "client/helper/combined_countries.json"
resultParsed = JSON.parse(result)
puts result
