<template>
  <div>
    <div v-if="ready">
      <div v-if="updateInfo">
        <div v-if="updateError">
          <h3>Update error</h3>
          <div>{{ updateError }}</div>
          <button @click.prevent="website">Update from website</button>
        </div>
        <div v-else-if="updateProgress">
          <h3>Downloading update</h3>
          <div>{{ updateProgress }}</div>
        </div>
        <div v-else>
          <h3>Update available</h3>
          <div>{{ updateInfo }}</div>
          <button @click.prevent="update">Update</button>
        </div>
      </div>
      <div v-else>
        <h3>All fine</h3>
      </div>
    </div>
    <div v-else>
      Splash screen
    </div>
  </div>
</template>

<script>
  import { ipcRenderer, shell } from 'electron'

  export default {

    data () {
      return {
        ready: true,
        updateInfo: null,
        updateProgress: null,
        updateError: null,
      }
    },

    mounted () {
      ipcRenderer.on('app-ready', () => this.ready = true)
      ipcRenderer.on('update-failed', (event, e) => {
        console.log(e)
        this.updateError = e
      })
      ipcRenderer.on('update-available', (event, info) => {
        console.log(info)
        this.updateInfo = info
      })
      ipcRenderer.on('update-progress', (event, info) => {
        console.log(info)
        this.updateProgress = info
      })
    },
    methods: {
      website () {
        shell.openExternal('https://github.com')
        ipcRenderer.send('quit')
      },
      update () {
        ipcRenderer.send('update-start')
      },
    }
  }
</script>
