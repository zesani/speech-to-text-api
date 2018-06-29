## Installing

Using npm:

```bash
$ npm install speech-to-text-api
```

## Example

```js
import SpeechApi from 'speech-to-text-api'
const speechApi = new SpeechApi('google-cloud-api')

// start speech
await speechApi.start()

// result text
const result = await speechApi.stop()
```