<template>
  <admin-layout>
    <div class="columns">
        <div class="column is-half">
          <total-users />
          <chart-structure-updates title="Atualizações nos boards por dia" />
        </div>
        <div class="column is-half">
          <chart-users-auth title="Logins e logouts" />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../layout/AdminLayout'
import ChartUsersAuth from '../../charts/ChartUsersAuth'
import ChartStructureUpdates from '../../charts/ChartStructureUpdates'
import ChartTotalUsers from '../../charts/ChartTotalUsers'

export default {
  components: {
    AdminLayout,
    ChartUsersAuth,
    ChartStructureUpdates,
    'total-users': ChartTotalUsers
  }
}
</script>
