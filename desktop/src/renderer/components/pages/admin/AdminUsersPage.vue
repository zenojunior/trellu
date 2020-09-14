<template>
  <admin-layout>
    <div class="is-flex">
      <h1 class="title is-5">Usuários</h1>
      <b-button @click="userEdit({})" type="is-primary" icon-right="plus" style="margin-left: auto"/>
    </div>
    <b-table
      :data="data"
      :loading="loading"
      paginated
      searchable
      :debounce-search="1000"
      :per-page="perPage"
      :current-page="page"
      sort-icon="arrow-up"
      default-sort="name"
      aria-next-label="Próxima"
      aria-previous-label="Anterior"
      aria-page-label="Página"
      aria-current-label="Página atual"  
    >
      <template v-slot="props">
        <b-table-column field="id" label="Id" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="name" label="Nome">{{ props.row.name }}</b-table-column>
        <b-table-column field="username" label="Username">
          <span class="tag">
            {{ props.row.username }}
          </span>
        </b-table-column>
        <b-table-column field="email" label="Email">{{ props.row.email }}</b-table-column>
        <b-table-column>
          <b-button @click="userEdit(props.row)" type="is-primary" size="is-small" outlined icon-right="pencil" />
          <b-button @click="groupDelete(props.row.id)" type="is-danger" size="is-small" outlined icon-right="delete" />
        </b-table-column>
      </template>
    </b-table>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../layout/AdminLayout'
import ModalUser from '../../modals/AdminModalUser'

export default {
  components: {
    AdminLayout, ModalUser
  },
  data () {
    return {
      data: [],
      page: 1,
      lastPage: 1,
      perPage: 1,
      total: 2,
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$api.get('api/admin/users').then(res => res.data).then(data => {
        this.data = data.data
        this.perPage = data.perPage
        this.lastPage = data.lastPage
        this.total = data.total
        this.loading = false
      })
    },
    userEdit (user) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalUser,
        hasModalCard: true,
        customClass: 'modal-user',
        trapFocus: true,
        props: {
          user
        },
        events: {
          close: () => {
            this.getData()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>