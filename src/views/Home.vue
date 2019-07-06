<template>
  <div class="columns">
    <div class="column" id="input">
      <h2>Input</h2>
      <b-field label="Aperature">
          <b-input v-model="aperature"></b-input>
      </b-field>
      <b-field label="Sensor Width (mm)">
          <b-input v-model="sensorWidthMm"></b-input>
      </b-field>
      <b-field label="Pixel Width (px)">
          <b-input v-model="sensorWidthPx"></b-input>
      </b-field>
      <b-field label="Focal Length (mm)">
          <b-input v-model="focalLength"></b-input>
      </b-field>
      <p>https://petapixel.com/2017/04/07/npf-rule-formula-sharp-star-photos-every-time/</p>
    </div>
    <div class="column" id="output">
      <h2>Output</h2>
      <!-- {{ exposureLength }} -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

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
      focalLength: 16
    }
  }
}
</script>
