<template>
  <div>
    <navbar></navbar>
    <div class="container is-fluid pt-6">
      <div class="columns">
        <div class="column is-two-fifths center">
          <img src="~@/assets/user.png" class="user-pick" alt="User picture">
        </div>
        <div class="column">
            <div class="user-info">
                <h2 class="user-name">{{user.name}}</h2>
                <h3 class="user-username">{{user.username}}</h3>
                <h3 class="user-email">{{user.email}}</h3>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar'
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 1rem;
}
.user-pick{
    background: linear-gradient(45deg, #0079bf, #89609e);
    border-radius: 100%;
    margin-top: 2em;
    width: 60%;
}
.user-name{
    font-size: 2.5em;
    text-transform: capitalize;
}
.user-info{
    margin-top: 3em;
}
.user-username, .user-email{
    font-size: 1.5em;
}
.center{
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>