<template>
<v-container>
  <!-- <v-simple-table class="mt-5">
    <template v-slot:default>
          <colgroup>
          <col width="20%">
          <col width="70%">
          <col width="10%">
          </colgroup>
      <tbody>
        <tr v-for="reply in replys" :key="reply.reply_id">
            <td class="font-weight-bold">{{ reply.first_name }} {{ reply.last_name }}</td>
            <td>{{ reply.comment }}</td>
            <td><v-btn icon @cilck="removeReply()"><v-icon medium color="red">mdi-minus</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table> -->

<v-data-table
    :headers="headers"
    :items="replys"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        medium
        color='red'
        @click="removeReply(item.reply_id)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
  <v-row class="mt-5">
      <v-col cols="1" class="d-flex justify-center align-center">
          <span class="">댓글</span>
      </v-col>
      <v-col cols="10">
        <v-textarea
          outlined
          name="input-7-4"
          label="주제와 무관한 댓글이나 스포일러, 악플은 경고조치 없이 삭제되며 징계 대상이 될 수 있습니다."
          v-model="comment"
        ></v-textarea>
      </v-col>
      <v-col cols="1" class="d-flex justify-center align-end">
        <v-btn block color="primary" @click="writeReply()">작성</v-btn>
      </v-col>
  </v-row>
</v-container> 
</template>

<script>
    export default {
        name:'Reply',
        data() {
            return {
                replys: [],
                headers: [
                            { text:'username',value:'username' },
                            { text:'comment',value:'comment' },
                            { text:'action',value:'actions' }
                          ],
                comment:''
            }
        },
        props: ['filmId'],
        methods: {
          getReplys(){
            this.$http.get('/api/reply',{params :{filmId : this.filmId}})
            .then( res => 
            { const replys = []
              replys.push(...res.data);
              this.replys = replys;
          });
          },
          writeReply(){
            if(this.comment === '') return;
            const params = { filmId : this.filmId
                           , customerId : 1
                           , comment : this.comment }
            this.$http.post('/api/reply/write',{params :params})
            .then( res => {this.comment='';
                           this.getReplys()});
          },
          removeReply(replyId){
            this.$http.post('/api/reply/delete',{params :replyId})
            .then( res => {this.getReplys()});
          }
        },
        created () {
          this.getReplys();
            // this.$http.get('/api/reply',{params :{filmId : this.filmId}})
            // .then( res => this.replys = res.data);
            
        },
    }
</script>

<style lang="scss" scoped>

</style>