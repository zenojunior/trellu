<template>
  <div class="modal-content" style="max-width: 900px;overflow: visible;">
    <header class="modal-card-head">
        <p class="modal-card-title">Visualização</p>
        <div class="field has-addons">
          <p class="control">
            <b-tooltip label="Enviar por e-mail" type="is-dark" position="is-bottom">
              <b-button @click="email" size="is-medium" class="button is-primary">
                <b-icon icon="email-send" />
              </b-button>
            </b-tooltip>
          </p>
          <p class="control">
            <b-tooltip label="Imprimir" type="is-dark" position="is-bottom">
              <b-button @click="print" size="is-medium" class="button is-primary">
                <b-icon icon="printer" />
              </b-button>
            </b-tooltip>
          </p>
          <p class="control">
            <b-dropdown @active-change="switchSaveOptions" aria-role="list" position="is-bottom-left">
              <b-tooltip label="Salvar como" type="is-dark" position="is-bottom" slot="trigger" :active="showSaveTooltip" slot-scope="{ active }" >
                <b-button class="button is-primary" size="is-medium">
                  <b-icon icon="content-save-cog" />
                </b-button>
              </b-tooltip>

              <b-dropdown-item @click="saveImage" class="save-options" aria-role="listitem">
                <b-icon icon="image-area"></b-icon>
                Imagem
              </b-dropdown-item>
              <b-dropdown-item @click="savePdf" class="save-options" aria-role="listitem">
                <b-icon icon="file-pdf-box"></b-icon>
                PDF
              </b-dropdown-item>
            </b-dropdown>
          </p>
        </div>
    </header>
    <div class="card">
      <div class="card-image">
        <img v-if="image" :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import fs from 'fs'
import { remote } from 'electron'
const { dialog } = remote
export default {
  props: ['buffer'],
  data () {
    return {
      showSaveTooltip: true,
      image: '',
      name: new Date().getTime()
    }
  },
  created () {
    const blob = new Blob([this.buffer])
    this.image = URL.createObjectURL(blob)
  },
  methods: {
    email () {
      this.$buefy.toast.open({
        message: 'Enviando por e-mail...',
        position: 'is-bottom-right'
      })
    },
    savePdf () {
      var doc = new jsPDF('landscape', 'mm', 'a4')
      let imageBase64 = `data:image/jpeg;base64,${new Buffer.from(this.buffer).toString('base64')}`
      doc.addImage(imageBase64, 'PNG', 10, 10, 180, 150)
      window.open(doc.output('bloburl'), 'modal')
    },
    saveImage () {
      dialog.showSaveDialog(
        {
          filters: [
            { name: 'PNG', extensions: ['png'] },
            { name: 'JPG', extensions: ['jpg', 'jpeg'] }
          ]
        },
        (fileName) => {
          if (fileName === undefined) return
          fs.writeFile(fileName, this.buffer, (err) => {
            this.$buefy.toast.open({
              message: err ? 'Não foi possível salvar a imagem' : 'Imagem salva',
              position: 'is-bottom-right'
            })
          })
        }
      )
    },
    print () {
      const currentWebContents = remote.getCurrentWebContents()
      const options = { silent: false, printBackground: true, landscape: false, pagesPerSheet: 1, collate: false, copies: 1 }
      currentWebContents.print(options, (success, failureReason) => {})
    },
    switchSaveOptions (opened) {
      this.showSaveTooltip = !opened
    },
    close () {
      this.$emit('close')
      this.$parent.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.message-body {
  padding: .5em 1.5em;
}
.save-options {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1em;
  .icon {
    margin-right: 7px;
  }
}
</style>