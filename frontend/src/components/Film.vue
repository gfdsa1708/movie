<template>
    <v-container>
        <v-row class="mb-5">
            <v-col cols=6>
                <v-img height="100%" width="70%" src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
                </v-img>
            </v-col>
            <v-col cols=6>
                <div class="mb-10 text-h3   ">{{film[0].title}}</div>
                <div class="mb-10"><span>발매년도: </span>{{film[0].release_year}}년</div>
                <div class="mb-10"><span>상영시간: </span>{{film[0].length}}분</div>
                <div class="mb-10">
                    출연진
                    <ul>
                        <li v-for="actor in actors" :key="actor.actor_id">
                            {{ actor.fullName }}
                        </li>
                    </ul>
                </div>
            </v-col>
        </v-row>
        <v-subheader>
        description
        </v-subheader>
        <v-row>
        <v-col>
            {{film[0].description}}
        </v-col>
        </v-row>
    <reply :filmId="this.filmId"></reply>
    </v-container>
</template>

<script>
import Reply from '@/components/Reply.vue';
    export default {
        name : 'Film',
        props :['filmId'],
        components: {
            Reply
        },
        data() {
            return {
                film: '',
                actors: ''
            }
        },
        methods: {
            getActors() {
                console.log(this.actors);
            }
        },
        created () {
            this.$http.get('/api/film',{params :{filmId : this.filmId}})
            .then( res => {this.film = {...res.data}});

            this.$http.get('/api/actor/film',{params :{filmId : this.filmId}})
            .then( res => {this.actors = res.data;});
        },
    }
</script>

<style lang="scss" scoped>
ul {
    padding: 0;
    list-style: none;
}
</style>