module.exports = ctx => ({
  plugins: {
    'postcss-mixins': {},
    'postcss-csso': ctx.env === 'prod' ? {} : false
  }
})