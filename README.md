## Say Hello - Final Project (TBD title)

Inspired by Joe Keohan's love for D3 and this [infographic](https://i.pinimg.com/originals/55/ee/0b/55ee0bf828b83c1a1416c7cb1732d43f.jpg) from livinglanguage.com.

This project will showcase a map of the world, and allow the user to click on any individual country. Upon clicking the country, information will appear on the side and how to say "hello" in that country's primary language and romanization of the phrase.


---

### Running it locally
- bundle
- npm install
- rails s
- npm run build


### Technologies
- React.js
- Ruby on Rails
- D3.js
- webpack

#### Minor tech
- Datamaps


### MVP

- Creation of Map rendered using D3
- Users can click on any country
- Clicking a county will bring a box/tooltip of information displayed on the right of the map
- Store every country's "hello" in database or by using Google API
- Display that country's flag

### Post-MVP

- Sound clips
- Regional dialects
- More phrases
- User inputs their own phrases in their language (database needed)
- Other misc. information

### Wireframes

(pictures to be uploaded)

### Functional Components

| Component | Priority | Est. Time | Time Invested | Actual Time |
| ------------- | :---: | :-----: | :-----: | :-----: |
| Setup | H | 4 hr(s) | 7 hr(s) | 4 hr(s) |
| Map (D3) | H | 1 hr(s) |  hr(s) |  hr(s) |
| Clickable Country | H | 3 hr(s) |  hr(s) |  hr(s) |
| Display basic info on click | H | 3 hr(s) |  hr(s) |  hr(s) |
| Display "Hello" | H | 5 hr(s) |  hr(s) |  hr(s) |
| Flags | M | 2 hr(s) |  hr(s) |  hr(s) |
| Sound clip | M | 8 hr(s) |  hr(s) |  hr(s) |
| Regional dialects | M | 12.5 hr(s) |  hr(s) |  hr(s) |
| Other phrases | M | 2+ hr(s) |  hr(s) |  hr(s) |
| User input | L | 6 hr(s) |  hr(s) |  hr(s) |


### Changelog
2/20 - Datamaps package added


### Resources

http://datamaps.github.io/

https://cloud.google.com/translate/docs/translating-text#translate-translate-text-ruby

https://github.com/annexare/Countries

https://d3-geomap.github.io/

https://www.safaribooksonline.com/blog/2014/02/17/building-responsible-visualizations-d3-js/
http://www.tnoda.com/blog/2013-12-07
https://gist.github.com/tadast/8827699
excellent tutorial to ruby exceptions
http://rubylearning.com/satishtalim/ruby_exceptions.html
### Issues and resolutions

##$# A good country to language mapping resource issue
There are plenty of resources that lists out the entire world's ever country's two letter or three code, known as the ISO 3166-1, (alpha-2 for 2 letter, alpha-3 for 3 letter, e.g. United States would be US).

There are also plenty of resources that lists out from what I can tell, every language documented and it's accompanying ISO 639-1 and ISO 639-2 if they exist (two letter and three letter code, respectively).

There are also resources that list out most of the countries' official language, and even languages are predominant, either by de jure or de facto.

However, there are few or little resources that connect the two and return both the country ISO code and their "main" language's ISO code. Fortunately, there happens to exist one after deep searching, and without it, there would be a lot more time needed to write a script to parse every country's language and make a new resource, or a lot of manual inputting, which is not ideal. This saves an immense amount of time.

#### Hi-res version of datamaps

~3 hours attempting to locally load the script files so I can access the hi res version of the map, and ran into other issues trying to do so.
#### Map drawn at the wrong level

I drew the map at div element id = container, however, I forgot that I set the app mount id to container, meaning the map was being drawn and wrapping everything else inside it too. I switched it to root, which is probably React's convention

#### Toggle color on click
https://github.com/markmarkoh/datamaps/issues/336
https://bl.ocks.org/briwa/60024d70a5aee921d5910828fe8115be
color hover fix/toggle click 2 hours
responsiveness 2 hours


## TOMORROW

is there a way to clear all the colors
and work on setting up a database
google api
convert country to language code


set color of all, then set current clicked to different color

~1.5 hours combining country codes
2 hours figuring out google translate api
dont forget after you setup your account, to input the env variable for your credentials and ALSO enable the translation api service

~1 hour transliteraion moved to POST MVP?

2 hours getting jsons to work
database seeding ~1 hour

this context issue with d3 ~1.7 hours
```
    let d3SelectCountry = this.selectCountry //need to bind this to a function because d3 overrides the this context
```

1.5 hours, the component would display the prev state rather than the current new updated.
solved by moving the update state function into a method rather than willreceiveprops lifecycleas

language full names: https://gist.githubusercontent.com/jrnk/8eb57b065ea0b098d571/raw/97efa7bc28c72bacfebce73e28e35cdfea34db63/ISO-639-1-language.json

flags from:
https://github.com/hjnilsson/country-flags

editing seeds and adding migrations 1 hour

CSS 5 hours
zoom attempt 4 hours

TODO
