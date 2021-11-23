import { App, ExpressReceiver } from '@slack/bolt'

const feature1 = async (app: App, receiver: ExpressReceiver) => {
	app.message('listener1', async ({ message, say }) => {
		say(`Hello World!`)
	})

	receiver.router.get('/test', async (req, res) => {
		res.end('hello')
	})
}

export default feature1
