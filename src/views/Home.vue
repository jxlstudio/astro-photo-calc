<template>
  <div class="columns">
    <div class="column" id="input">
      <b-field label="Aperature">
          <b-input v-model="aperature"></b-input>
      </b-field>
      <!-- <b-field label="Sensor Physical Width (mm)">
          <b-input v-model="sensorWidthMm"></b-input>
      </b-field>
      <b-field label="Sensor Pixel Width (px)">
          <b-input v-model="sensorWidthPx"></b-input>
      </b-field> -->
      <b-field label="Focal Length (mm)">
          <b-input v-model="focalLength"></b-input>
      </b-field>

      <b-field label="Camera Model">
          <b-select v-model="pixelPitch" placeholder="Select a Camera">
              <option value="4.84" selected>Nikon D800</option>
              <option
                  v-for="model in cameras"
                  :value="model.pixelPitch"
                  :key="model.camera">
                  {{ model.camera }}
              </option>
          </b-select>
      </b-field>
      <p><b>Pixel Pitch: </b> {{ pixelPitch.toFixed(2) }}</p>
    </div>
    <div class="column" id="output">
      <div class="box">Max Exposure Length:
        <h3 class="title is-3">{{ exposureLength.toFixed(0) }} seconds</h3>
      </div>
      <p>Using <em>(35 x aperture + 30 x pixel pitch) ÷ focal length = shutter speed in seconds</em> from: https://petapixel.com/2017/04/07/npf-rule-formula-sharp-star-photos-every-time/</p>
      <div class="box">
        <h3 class="title is-3">Popular Focal Lengths</h3>
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import camerasArray from '@/assets/cameras.json'

// T o Build:
// Camera selector with json file of pixel pitches
// Clean up UI

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      aperature: 2.8,
      sensorWidthMm: 35.9,
      sensorWidthPx: 7424,
      focalLength: 16,
      cameras: camerasArray,
      pixelPitch: 4.84,
      focalLengths: [
        '10.5',
        '16',
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
      let e = (((35 * this.aperature) + 30) * this.pixelPitch) / this.focalLength
      return e
    }
  },
  methods: {
    getExposure (val) {
      let e = (((35 * this.aperature) + 30) * this.pixelPitch) / val
      return e.toFixed(0)
    }
  }
}
</script>
