<template>
  <div class="columns">
    <div class="column" id="input">
      <b-field label="Aperature">
          <b-input v-model="aperature"></b-input>
      </b-field>
      <b-field label="Focal Length (mm)">
          <b-input v-model="focalLength"></b-input>
      </b-field>

      <b-field label="Camera Model">
          <b-select v-model="pixelPitch" placeholder="Select a Camera">
              <!-- <option value="4.84" selected>Nikon D800</option> -->
              <option
                  v-for="model in cameras"
                  :value="model.pixelPitch"
                  :key="model.camera">
                  {{ model.camera }}
              </option>
              <option value="Other">Other</option>
          </b-select>
      </b-field>
      <!-- Need to fix this functionality -->
      <div v-if="pixelPitch === 'Other'">
        <b-field label="Sensor Physical Width (mm)">
            <b-input v-model="sensorWidthMm"></b-input>
        </b-field>
        <b-field label="Sensor Pixel Width (px)">
            <b-input v-model="sensorWidthPx"></b-input>
        </b-field>
      </div>
      <p><b>Pixel Pitch: </b> <span v-if="pixelPitch !== 'Other'">{{ pixelPitch }}</span><span v-else-if="pixelPitch === 'Other'">{{ otherPixelPitch }}</span>µm</p>
    </div>
    <div class="column" id="output">
      <div class="box">Max Exposure Length:
        <h3 class="title is-3">{{ exposureLength.toFixed(0) }} seconds</h3>
      </div>
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
      <p class="content">Built with <a class="has-text-weight-bold" href="https://vuejs.org/" target="_blank">Vue.js</a> by <a class="has-text-weight-bold" href="https://jxl.io" target="_blank">JXL Studio</a></p>
      <p class="content"><a class="has-text-weight-bold" href="https://github.com/jxlstudio/astro-photo-calc" target="_blank">Github</a></p>
    </div>
  </div>
</template>

<script>
import camerasArray from '@/assets/cameras.json'

// To Do:
// Clean up UI
// Create icon set

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
  }
}
</script>
