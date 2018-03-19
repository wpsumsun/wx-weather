let API = require('../../utils/api')
let Util = require('../../utils/util')
let app = getApp()

Page({

  data: {
  },


  onLoad(options) {
    API.getLocation()
      .then((location) => API.getCityId(location))
      .then((cityid) => {
        API.getNowWeather(cityid)
          .then((weather) => {
            weather.suggestiontype = Object.keys(weather.today.suggestion)
            weather.format_last_update = Util.formatTime(weather.last_update)
            weather.bg = Util.getBackground(weather.now.code)
            this.setData({ weather })
            app.globalData.weather = weather
          }).catch(this.onError)

        API.get24hWeather(cityid)
          .then((hourly) => {
            hourly.forEach((hour) => {
              hour.img = `../../image/weather/${hour.code}.png`
              hour.format_time = Util.formatHour(hour.time)
            })
            this.setData({ hourly })
            app.globalData.hourly = hourly
          }).catch(this.onError)
      }).catch(this.onError)
  },

  onError(err) {
    wx.showToast({
      title: err.msg,
      duration: 2000
    })
  }


})