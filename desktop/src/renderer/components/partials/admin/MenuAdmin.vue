<template>
  <div>
    <b-menu>
      <b-menu-list label="Menu">
        <b-menu-item
          icon="view-dashboard"
          label="Dashboard"
          tag="router-link"
          to="/admin"
          :active="['admin'].includes(routeActive)"
        />
        <b-menu-item icon="fingerprint" expanded>
          <template slot="label" slot-scope="props">
            Acessos
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
          </template>
          <b-menu-item 
            icon="account"
            label="Usuários"
            :active="['admin-users'].includes(routeActive)"
            tag="router-link"
            to="/admin-users"
          />
          <b-menu-item
            icon="label-multiple-outline"
            label="Grupos"
            :active="['admin-groups'].includes(routeActive)"
            tag="router-link"
            to="/admin-groups"
          />
          <b-menu-item
            icon="history"
            label="Auditoria"
            :active="['admin-audity'].includes(routeActive)"
            tag="router-link"
            to="/admin-audity"
          />
        </b-menu-item>
        <b-menu-item
            icon="bug"
            label="Log de erros"
            :active="['admin-logs'].includes(routeActive)"
            tag="router-link"
            to="/admin-logs"
          />
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    routeActive () {
      return this.$router.currentRoute.name
    }
  }
}
</script>

<style>

</style>