project_id    = "sublime-lambda-196016"
# text          = "The text you would like to translate"
# language_code = "The ISO 639-1 code of language to translate to, eg. 'en'"
ENV["GOOGLE_APPLICATION_CREDENTIALS"] = "client/helper/My First Project-5a2ab66edddd.json"
require "google/cloud/translate"

text = "hello"
language_code = "tk"

translate   = Google::Cloud::Translate.new project: project_id
translation = translate.translate text, from: 'en' , to: language_code

# puts "Translated '#{text}' to '#{translation.text.inspect}'"
# puts "Original language: #{translation.from} translated to: #{translation.to}"
