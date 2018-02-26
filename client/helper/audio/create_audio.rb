require 'tts'
# Will download "Hello World!.mp3" to your current directory
# Supported languages: ["zh", "en", "it", "fr"]
"Hello World!".to_file "en"

# i18n
"人民代表代表人民".to_file "zh"

# Save the file to a specific location
"Light rain with highs of 5 degrees".to_file "en", "~/weather.mp3"

# Supports large text files, as the gem will batch up the requests to Google (as each request max 100 chars)
text = "People living on the east coast of England have been warned to stay away from their homes because of further high tides expected later. The tidal surge that hit the UK is said to have been the worst for 60 years, with thousands abandoning their homes."
text.to_file "en"

#Direct playback (require mpg123 installed and in PATH with a POSIX system)
"Established in 1853, the University of Melbourne is a public-spirited institution that makes distinctive contributions to society in research, learning and teaching and engagement.".play

#Direct playback in other language (2 times)
 "Oggi il tempo è buono, andiamo in gita di esso.".play("it", 2)

#RTL Arabic language
"اليوم كان الطقس جيدا، ونحن نذهب في نزهة منه.".play("ar")
