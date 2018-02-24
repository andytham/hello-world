require 'json'
file = File.read "client/helper/translated_fix.json"
json = JSON.parse(file)
file2 = File.read "client/helper/639-1codes.json"
json_lang = JSON.parse(file2)


hash = Hash.new
arr = Array.new
json.each do |item|
  # puts item["hello"]
  json_lang.each do |item2|

    if item["hello"] && item["language"] == item2["code"]
      hash["language"] = item["language"]
      hash["name"] = item2["name"]
      hash["hello"] = item["hello"].tr("\"","")

      # puts string.tr('\"','')
      # puts "#{hash} hello"
      arr << hash.clone
      hash.clear
    end
  end
end

puts arr

newFile = File.new("./translated_name_added.json", mode="w+")
newFile.write(JSON.generate(arr))
