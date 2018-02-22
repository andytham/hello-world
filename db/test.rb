require 'json';
translatedFile = File.read "client/helper/translated_fix.json"
translated = JSON.parse(translatedFile)

translated.each do |lang|
  puts lang["language"]
end
