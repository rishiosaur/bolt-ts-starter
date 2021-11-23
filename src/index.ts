import { signing_secret, token, name } from './config'
import { App, ExpressReceiver } from '@slack/bolt'
import {
	filterDM,
	filterNoBotMessages,
	filterChannel,
} from './middleware/index'
import * as features from './features/index'

const receiver = new ExpressReceiver({
	signingSecret: signing_secret,
})

const app = new App({
	signingSecret: signing_secret,
	token: token,
	receiver,
})

;(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000)

	console.log(`${name} is running! 🔥`)

	for (const [feature, handler] of Object.entries(features)) {
		handler(app, receiver)
		console.log(`Feature "${feature}" has been loaded.`)
	}
})()
