<template>
<v-container>
  <v-simple-table class="mt-5">
    <template v-slot:default>
          <colgroup>
          <col width="20%">
          <col width="80%">
          </colgroup>
      <tbody>
        <tr v-for="reply in replys" :key="reply.reply_id">
            <td class="font-weight-bold">{{ reply.first_name }} {{ reply.last_name }}</td>
            <td>{{ reply.comment }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-row>
      <v-col cols="1">
          <div class="text-center">
              <span class="align-self-center">댓글</span>
          </div>
      </v-col>
      <v-col cols="11">
        <v-textarea
          outlined
          name="input-7-4"
          label="주제와 무관한 댓글이나 스포일러, 악플은 경고조치 없이 삭제되며 징계 대상이 될 수 있습니다."
          v-model="comment"
        ></v-textarea>
      </v-col>
  </v-row>
</v-container> 
</template>

<script>
    export default {
        name:'Reply',
        data() {
            return {
                replys: '',
                comment:''
            }
        },
        props: ['filmId'],
        created () {
            this.$http.get('/api/reply',{params :{filmId : this.filmId}})
            .then( res => this.replys = res.data);
            ;
        },
    }
</script>

<style lang="scss" scoped>

</style>