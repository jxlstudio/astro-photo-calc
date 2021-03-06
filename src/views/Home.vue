<template>
  <div class="columns">
    <div class="column">
      <div class="box main-box">Max Exposure Length:
        <h3 class="title is-2">{{ exposureLength.toFixed(0) }} seconds</h3>
      </div>
      <b-field label="Aperature">
          <b-input type="number" step="0.01" v-model="aperature"></b-input>
      </b-field>
      <b-field label="Focal Length (mm)">
          <b-input type="number" step="0.01" v-model="focalLength"></b-input>
      </b-field>

      <b-field label="Camera Model">
          <b-select v-model="pixelPitch" placeholder="Select a Camera">
              <option value="Other">Other - Not on List</option>
              <!-- <option value="4.84" selected>Nikon D800</option> -->
              <option
                  v-for="model in cameras"
                  :value="model.pixelPitch"
                  :key="model.camera">
                  {{ model.camera }}
              </option>
          </b-select>
      </b-field>
      <!-- Need to fix this functionality -->
      <div class="content" v-if="pixelPitch === 'Other'">
        <b-field label="Sensor Physical Width (mm)">
            <b-input type="number" step="0.1" v-model="sensorWidthMm"></b-input>
        </b-field>
        <b-field label="Sensor Pixel Width (px)">
            <b-input type="number" v-model="sensorWidthPx"></b-input>
        </b-field>
      </div>
      <p class="content"><b>Pixel Pitch: </b> <span v-if="pixelPitch !== 'Other'">{{ pixelPitch }}</span><span v-else-if="pixelPitch === 'Other'">{{ otherPixelPitch }}</span>µm</p>
    </div>
    <div class="column">
      <div class="box">
        <h3 class="title is-3">Other Focal Lengths</h3>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Focal Length</th>
              <th>Max Exposure Length</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fl in focalLengths" :key="fl">
              <td>{{ fl }}mm</td>
              <td>{{ getExposure(fl) }} seconds</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="content">Using formula <em>(35 x aperture + 30 x pixel pitch) ÷ focal length = shutter speed in seconds</em> from <a class="has-text-weight-bold" href="https://petapixel.com/2017/04/07/npf-rule-formula-sharp-star-photos-every-time/" target="_blank">here</a>.</p>
      <p class="content">Camera Model list and data from <a class="has-text-weight-bold" href="http://www.aaronpriestphoto.com/documents/NPF%20Rule%20for%20sharp%20stars.xlsx" target="_blank">here</a>.</p>
      <p class="content">Built with <a class="has-text-weight-bold" href="https://vuejs.org/" target="_blank">Vue</a> by <a class="has-text-weight-bold" href="https://jxl.io" target="_blank">JXL Studio</a> | <a class="has-text-weight-bold" href="https://github.com/jxlstudio/astro-photo-calc" target="_blank">Github</a></p>
    </div>
  </div>
</template>

<script>
import camerasArray from '@/assets/cameras.json'

// To Do:
// Clean up UI

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone)

export default {
  name: 'home',
  data () {
    return {
      aperature: 2.8,
      sensorWidthMm: 35.9,
      sensorWidthPx: 7424,
      focalLength: 16,
      cameras: camerasArray,
      pixelPitch: null,
      focalLengths: [
        '10.5',
        '16',
        '14',
        '18',
        '24',
        '50',
        '70',
        '105',
        '200',
        '300'
      ]
    }
  },
  computed: {
    // pixelPitch: function () {
    //   return (this.sensorWidthMm / this.sensorWidthPx) * 1000
    // },
    exposureLength: function () {
      let e
      if (this.pixelPitch !== 'Other') {
        e = (((35 * this.aperature) + 30) * this.pixelPitch) / this.focalLength
      } else {
        e = (((35 * this.aperature) + 30) * ((this.sensorWidthMm / this.sensorWidthPx) * 1000)) / this.focalLength
      }
      return e
    },
    otherPixelPitch: function () {
      let e = (this.sensorWidthMm / this.sensorWidthPx) * 1000
      return e.toFixed(2)
    }
  },
  methods: {
    getExposure (val) {
      let e
      if (this.pixelPitch !== 'Other') {
        e = (((35 * this.aperature) + 30) * this.pixelPitch) / val
      } else {
        e = (((35 * this.aperature) + 30) * ((this.sensorWidthMm / this.sensorWidthPx) * 1000)) / val
      }
      return e.toFixed(0)
    }
  },
  mounted () {
    if (isIos() && !isInStandaloneMode()) {
      this.$snackbar.open('Install this webapp on your iPhone: tap the share icon below and then select "Add to Homescreen"')
    }
  }
}
</script>

<style>
.box {
  text-align: center;
}
</style>
