const Insta = require("@androz2091/insta.js")
const weather = require("weather-js")
const api = require("novelcovid")
const moment = require("moment")
moment.locale("fr")
const { PASSWORD, USERNAME } = require("./config.js")

// ENJOY :)

const client = new Insta.Client()

client.on("connected", () => {
  console.log(`Je suis maintenant connecté à ${client.user.username}`)

    weather.find(
      { search: "Orléans", degreeType: "C" },
      async function (error, result) {
        try {
          const current = result[0].current

          const corona = await api.countries({ country: ["France"] })

          const bio = `Covid case at France: ${corona.cases}\nWeather at Orléans: ${current.temperature}\nLast Update: ${moment().format("LT")}`

          client.user.setBiography(bio)
        } catch (e) {
          console.log(e)
        }
      }
    )
})

client.login(USERNAME, PASSWORD)

