let API = require('../../utils/api')
let Util = require('../../utils/util')
let app = getApp()

Page({

  data: {
  },

  onLoad(options) {
    if (app.globalData.weather) {
      this.setData({ weather: app.globalData.weather })
      return
    }

    API.getLocation()
      .then((location) => API.getCityId(location))
      .then((cityid) => API.getNowWeather(cityid))
      .then((weather) => {
        weather.format_last_update = Util.formatTime(weather.last_update)
        weather.bg = Util.getBackground(weather.now.code)
        this.setData({ weather })
        app.globalData.weather = weather
      }).catch(this.onError)
  },

  onError(err) {
    wx.showToast({
      title: err.msg,
      duration: 2000
    })
  }


})