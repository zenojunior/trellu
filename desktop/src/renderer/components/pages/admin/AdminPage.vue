<template>
  <admin-layout>
    <div ref="content" class="columns">
      <div class="column is-half">
        <total-users />
        <chart-structure-updates title="Atualizações nos boards por dia" />
      </div>
      <div ref="column" class="column is-half">
        <chart-users-auth title="Logins e logouts" />
        <words-cloud title="Palavras mais utilizadas" v-if="column.width" :width="column.width" />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../layout/AdminLayout'
import ChartUsersAuth from '../../charts/ChartUsersAuth'
import ChartStructureUpdates from '../../charts/ChartStructureUpdates'
import ChartTotalUsers from '../../charts/ChartTotalUsers'
import ChartWordTags from '../../charts/ChartWordTags'
export default {
  components: {
    AdminLayout,
    ChartUsersAuth,
    ChartStructureUpdates,
    'total-users': ChartTotalUsers,
    'words-cloud': ChartWordTags
  },
  data () {
    return {
      column: {
        width: ''
      }
    }
  },
  mounted () {
    this.column.width = this.$refs.column.offsetWidth - 25
  }
}
</script>
