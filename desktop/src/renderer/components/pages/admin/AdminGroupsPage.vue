<template>
  <admin-layout>
    <div class="is-flex">
      <h1 class="title is-5">Grupos</h1>
      <b-button @click="refresh()" type="is-light" icon-right="refresh" style="margin-left: auto"/>
      <b-button @click="groupEdit({})" type="is-primary" icon-right="plus" style="margin-left: 5px"/>
    </div>
    <b-table :data="data" hoverable :loading="loading">
      <template v-slot="props">
        <b-table-column field="id" label="Id" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="name" label="Nome">{{ props.row.name }}</b-table-column>
        <b-table-column field="updated_at" label="Última atualização">
          <span class="tag">
            {{ new Date(props.row.updated_at).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column>
          <b-button @click="groupEdit(props.row)" type="is-primary" size="is-small" outlined icon-right="pencil" />
          <b-button @click="groupDelete(props.row.id)" type="is-danger" size="is-small" outlined icon-right="delete" />
        </b-table-column>
      </template>
    </b-table>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../layout/AdminLayout'
import ModalGroup from '../../modals/ModalGroup'

export default {
  components: {
    AdminLayout, ModalGroup
  },
  data () {
    return {
      data: [],
      groupEditModal: false,
      loading: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$api.get('api/admin/groups').then(res => res.data).then(data => {
        this.data = data
        this.loading = false
      })
    },
    refresh: async function () {
      await this.getData()
    },
    groupEdit (group) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalGroup,
        hasModalCard: true,
        customClass: 'modal-group',
        trapFocus: true,
        props: {
          group
        }
      })
    },
    groupDelete (groupId) {
      this.$buefy.dialog.confirm({
        title: 'Apagar grupo',
        message: `Você tem certeza que quer <b>excluir</b> o grupo? Não terá como desfazer essa ação.`,
        cancelText: 'Cancelar',
        confirmText: 'Excluir',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$api.delete(`/api/admin/groups/${groupId}`)
            .then(res => {
              this.$buefy.toast.open({ message: 'Grupo excluído.', position: 'is-bottom-right' })
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