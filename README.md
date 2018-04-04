## Hello, World

This project will showcase a map of the world, and allow the user to click on any individual country. Upon clicking the country, information will appear on the side and how to say "hello" in that country's primary language and play a sound clip if available. Looping randomly around the world is available.

Translations and audio files created through Google API and 'tts' gem.

Inspired by Joe Keohan's love for D3 and this [infographic](https://i.pinimg.com/originals/55/ee/0b/55ee0bf828b83c1a1416c7cb1732d43f.jpg) from livinglanguage.com.
---
### Live version

Live version found [here](http://hello-world.andytham.com)

### Running it locally
- bundle
- npm install
- rails s
- npm run build (rails server has to be running at the same time)

### Technologies
- React.js
- Ruby on Rails
- D3.js
- webpack

### Changelog
Version 2.0
- Refactored D3.js code to only use vanilla D3.js
- No longer uses Datamaps dependency
- Zoom feature added
- Random loop changed to fit zoom
- Better looking UI

### TODO

~~Instead of using datamaps npm package, it will be more customizable and robust is we use plain vanilla D3.
Datamaps is useful if you want to get something up and running quickly, and is extremely nifty, however, I want to be able to customize the map more, and also there is currently no option to use different map data other than the USA or a low res version of the world they provide (they have a hi-res version, but doesn't appear to be in the npm package.~~

Fix the hover info to work when resizing and when zoomed in (or change location to static when zoomed)

---
### Production

#### MVP

- Creation of Map rendered using D3
- Users can click on any country
- Clicking a county will bring a box/tooltip of information displayed on the right of the map
- Store every country's "hello" in database or by using Google API
- Display that country's flag

#### Post-MVP

- Sound clips
- Regional dialects
- More phrases
- User inputs their own phrases in their language (database needed)
- Other misc. information

#### Wireframes

(pictures to be uploaded)

#### Functional Components (estimations)

- version 1.0
| Component | Priority | Est. Time | Time Invested | Actual Time |
| ------------- | :---: | :-----: | :-----: | :-----: |
| Setup | H | 4 hr(s) | 7 hr(s) | 4 hr(s) |
| Map (D3) | H | 1 hr(s) | 20 hr(s) | 8 hr(s) |
| Clickable Country | H | 3 hr(s) | 4 hr(s) | 3 hr(s) |
| Display basic info on click | H | 3 hr(s) | 10 hr(s) | 8 hr(s) |
| Display "Hello" | H | 5 hr(s) | 6 hr(s) | 6 hr(s) |
| Flags | M | 2 hr(s) | 4 hr(s) | 3 hr(s) |
| Sound clip | M | 8 hr(s) | 6 hr(s) | 6 hr(s) |
| Tooltip on Hover | L | 6 hr(s) | 3 hr(s) | 3 hr(s) |
| CSS | H | 15 hr(s) | 12 hr(s) | 10 hr(s) |
| Responsive | L | 8 hr(s) | 6 hr(s) | 5 hr(s) |

-version 2.0

~30 hours refactor
~8 hours zoom
~6 hours responsiveness fix

### Issues and Resolutions

#### Data
There are plenty of resources that lists out the entire world's ever country's two letter or three code, known as the ISO 3166-1, (alpha-2 for 2 letter, alpha-3 for 3 letter, e.g. United States would be US).

There are also plenty of resources that lists out from what I can tell, every language documented and it's accompanying ISO 639-1 and ISO 639-2 if they exist (two letter and three letter code, respectively).

There are also resources that list out most of the countries' official language, and even languages are predominant, either by de jure or de facto.

However, there are few or little resources that connect the two and return both the country ISO code and their "main" language's ISO code. Fortunately, there happens to exist one after deep searching, and without it, there would be a lot more time needed to write a script to parse every country's language and make a new resource, or a lot of manual inputting, which is not ideal. This saves an immense amount of time.

#### Hi-res version of datamaps

~5 hours attempting to locally load the script files so I can access the hi res version of the map, and ran into other issues trying to do so.

#### Map drawn at the wrong level

I drew the map at div element id = container, however, I forgot that I set the app mount id to container, meaning the map was being drawn and wrapping everything else inside it too. I switched it to root, which is probably React's convention

#### Bind 'this' scope since React + D3
```
    let d3SelectCountry = this.selectCountry //need to bind this to a function because d3 overrides the this context
```

#### State not updating
1.5 hours, the component would display the prev state rather than the current new updated.
solved by moving the update state function into a method rather than willreceiveprops lifecycleas

### Resources

Toggle color on click:
https://github.com/markmarkoh/datamaps/issues/336
https://bl.ocks.org/briwa/60024d70a5aee921d5910828fe8115be

Language data: https://gist.githubusercontent.com/jrnk/8eb57b065ea0b098d571/raw/97efa7bc28c72bacfebce73e28e35cdfea34db63/ISO-639-1-language.json

Flags from:
https://github.com/hjnilsson/country-flags

Refactor:
http://www.tnoda.com/blog/2013-12-07
https://bost.ocks.org/mike/map/
