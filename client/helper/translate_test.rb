project_id    = "sublime-lambda-196016"
# text          = "The text you would like to translate"
# language_code = "The ISO 639-1 code of language to translate to, eg. 'en'"
ENV["GOOGLE_APPLICATION_CREDENTIALS"] = "client/helper/My First Project-5a2ab66edddd.json"
require "google/cloud/translate"
require "json"
require_relative "create_list_639_codes.rb"


text = "hello"


dictionary = []
tempHash = {}
@language_array.each do |lang|
  language_code = lang
  hash = Hash.new
  hash[lang] = {} #required to nest
  begin #google will throw an error if they do not have the language specified
    translate   = Google::Cloud::Translate.new project: project_id
    translation = translate.translate text, from: 'en' , to: language_code
    puts "Translated '#{text}' to '#{translation.text.inspect}'"
    puts "Original language: #{translation.from} translated to: #{translation.to}"
    if !hash[lang][text]
      hash[lang][text] = translation.text.inspect.to_str
    end
  rescue
    puts "Most likely language not found"
  end

  dictionary << hash
end
puts dictionary
puts "dictionary outputted"

result = File.new("client/helper/translated.json", mode="w+")
result.write(JSON.generate(dictionary))
