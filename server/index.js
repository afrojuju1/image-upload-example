const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

const app = Express()
app.use(bodyParser.json())

const Storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, './images')
	},
	filename(req, file, callback) {
		callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
	},
})

const upload = multer({ storage: Storage })

app.get('/', (req, res) => {
	res.status(200).send('You can post to /api/upload.')
})

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
	console.log('[upload] file: ', req.files)
	console.log('[upload] body: ', req.body)
	res.status(200).json({
		message: 'Success!!',
	})
})

app.listen(3000, () => {
	console.log('App is running on http://localhost:3000')
})
