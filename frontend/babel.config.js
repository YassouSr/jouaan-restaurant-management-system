module.exports = function (api) {
    api.cache(true);
    return {
      plugins: ['macros'],
      ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
    }
  }
  