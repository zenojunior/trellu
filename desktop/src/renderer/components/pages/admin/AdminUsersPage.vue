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
      backend-pagination
      searchable
      @page-change="onPageChange"
      :debounce-search="1000"
      :per-page="perPage"
      :current-page="page"
      :total="total"
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
        <b-table-column field="username" label="Username">{{ props.row.username }}</b-table-column>
        <b-table-column field="email" label="Email">{{ props.row.email }}</b-table-column>
        <b-table-column field="group_id" label="Grupo">
          <span :class="{'tag': true, 'is-info': props.row.group_id === 1}">
            {{ getGroupName(props.row.group_id) }}
          </span>
        </b-table-column>
        <b-table-column>
          <b-button @click="userEdit(props.row)" type="is-primary" size="is-small" outlined icon-right="pencil" />
          <b-button @click="userDelete(props.row.id)" type="is-danger" size="is-small" outlined icon-right="delete" />
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
      groups: [],
      page: 1,
      perPage: 20,
      total: 0,
      loading: false
    }
  },
  created () {
    this.getData()
    this.getGroups()
  },
  methods: {
    getData () {
      const params = [`page=${this.page}`].join('&')
      this.loading = true
      this.$api.get(`api/admin/users?${params}`)
        .then(res => res.data)
        .then(data => {
          this.data = data.data
          this.perPage = data.perPage
          this.total = parseInt(data.total)
          this.loading = false
        }).catch(() => {
          this.data = []
          this.total = 0
          this.loading = false
        })
    },
    getGroups () {
      this.$api.get(`api/admin/groups`)
        .then(res => res.data)
        .then(groups => {
          console.log(groups)
          this.groups = groups
        })
    },
    onPageChange (page) {
      this.page = page
      console.log(page)
      this.getData()
    },
    getGroupName (groupId) {
      let group = this.groups.find(group => group.id === groupId)
      return group ? group.name : null
    },
    userEdit (user) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalUser,
        hasModalCard: true,
        customClass: 'modal-user',
        trapFocus: true,
        props: {
          user,
          groups: this.groups
        },
        events: {
          close: () => {
            this.getData()
          }
        }
      })
    },
    userDelete (userId) {
      this.$buefy.dialog.confirm({
        title: 'Excluir usuário',
        message: `Você tem certeza que quer <b>excluir</b> o usuário? Ele perderá o acesso ao aplicativo.`,
        cancelText: 'Cancelar',
        confirmText: 'Excluir',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$api.delete(`/api/admin/users/${userId}`)
            .then(res => {
              this.getData()
              this.$buefy.toast.open({ message: 'Usuário excluído.', position: 'is-bottom-right' })
            })
            .catch(error => {
              let {title, message} = error
              this.$buefy.dialog.confirm({title, message, confirmText: 'Ok', cancelText: 'Cancelar', type: 'is-warning', hasIcon: true})
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>