module.exports = function({file, options, env}){
	return {
		plugins: {
			'postcss-import': {},
			'postcss-cssnext': {
				browsers: ['last 2 versions', '> 5%']
			},
			// 'postcss-pxtorem': {
			// 	rootValue: 16,
			// 	unitPrecision: 5,
			// 	propList: ['*'],
			// 	selectorBlackList: ['html'],
			// 	replace: true,
			// 	mediaQuery: false,
			// 	minPixelValue: 0
			// },
			// 'postcss-write-svg': {},
			// 'postcss-responsive-type': {},
			// 'postcss-mq-keyframes': env === 'production' ? {} : false,
			// 'css-mqpacker': env === 'production' ? {} : false,
		}
	}
}