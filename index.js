import Recorder from './lib/recorder'
import axios from 'axios'
class Speech {
  constructor (googleApiKey, config = { encoding: 'LINEAR16', sampleRateHertz: 44100, languageCode: 'th-TH' }) {
    this.data = {
      audio: {
        content: null
      },
      config
    }
    this.googleApiKey = googleApiKey
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
    window.URL = window.URL || window.webkitURL
    this.audioContext = new AudioContext()
    navigator.getUserMedia({ audio: true }, (stream) => {
      const input = this.audioContext.createMediaStreamSource(stream)
      this.recorder = new Recorder(input)
    }, (e) => {
      console.log('No live audio input: ' + e)
    })
  }

  start () {
    return new Promise((resolve, reject) => {
      this.recorder.clear()
      this.recorder.record()
      resolve()
    })
  }

  stop () {
    return new Promise(async (resolve) => {
      this.recorder.stop()
      const blob = await this.exportWAV()
      this.data.audio.content = await this.convertToBase64Data(blob)
      const result = await axios.post(`https://speech.googleapis.com/v1/speech:recognize?key=${this.googleApiKey}`, this.data)
      console.log(result.data.results)
      resolve(result.data.results)
    })
  }

  convertToBase64Data (blob) {
    return new Promise((resolve) => {
      const reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => resolve(reader.result.replace('data:audio/wav;base64,', ''))
    })
  }

  exportWAV () {
    return new Promise((resolve) => {
      this.recorder.exportWAV((blob) => {
        resolve(blob)
      })
    })
  }
}

export default Speech
