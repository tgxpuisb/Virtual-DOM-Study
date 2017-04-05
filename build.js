const rollup = require('rollup')
const babelPlugin = require('rollup-plugin-babel')
rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		babelPlugin({
		    "presets": [
		        [
		            "es2015",
		            {
		                "modules": false
		            }
		        ],
		        "stage-3"
		    ]
		})
	]
}).then(bundle => {
	bundle.write({
		format: 'iife',
		dest: 'test/test.js',
		moduleName: 'Vdom'
	})
})