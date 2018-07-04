## Installing

Using npm:

```bash
$ npm install speech-to-text-api
```
## Config
### 1
Enable the Cloud Speech API.  [Cloud Platform Console](https://console.cloud.google.com) 

### 2
Initialize googleApiKey. [Google Cloud API](https://console.cloud.google.com/apis/dashboard)
``` bash
googleApiKey: ""
```

## Example

```js
import SpeechApi from 'speech-to-text-api'
// default { encoding: 'LINEAR16', sampleRateHertz: 44100, languageCode: 'th-TH' }
const speechApi = new SpeechApi('google-cloud-api-key')
// or https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig
const speechApi = new SpeechApi('google-cloud-api-key', { encoding: 'LINEAR16', sampleRateHertz: 44100, languageCode: 'th-TH' })

// start speech
await speechApi.start()

// result text
const result = await speechApi.stop()
```