<template>
  <admin-layout @print="print">
    <div ref="content" class="columns">
      <div class="column is-half">
        <total-users />
        <chart-structure-updates title="Atualizações nos boards por dia" />
      </div>
      <div class="column is-half">
        <chart-users-auth title="Logins e logouts" />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import electron from 'electron'
import AdminLayout from '../../layout/AdminLayout'
import ChartUsersAuth from '../../charts/ChartUsersAuth'
import ChartStructureUpdates from '../../charts/ChartStructureUpdates'
import ChartTotalUsers from '../../charts/ChartTotalUsers'
const BrowserWindow = electron.remote.BrowserWindow
const options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
    marginType: 'printableArea'
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: 'Header of the Page',
  footer: 'Footer of the Page'
}
export default {
  components: {
    AdminLayout,
    ChartUsersAuth,
    ChartStructureUpdates,
    'total-users': ChartTotalUsers
  },
  methods: {
    print () {
      let win = BrowserWindow.getFocusedWindow()
      win.webContents.print(options, (success, failureReason) => {})
    }
  }
}
</script>
