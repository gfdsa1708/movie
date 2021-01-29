<template>
<v-container>
    <v-row>
        <v-col cols="12" lg="3" md="4" sm="6" xs="12" v-for="film in filmList" :key="film.id">
            <v-card
                max-width="374"
                @cilck="detail"
            >
                <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title class="d-inline-block">{{film.title}}</v-card-title>
                <v-chip color="yellow">{{film.category}}</v-chip>
                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                    4.5 (413)
                    </div>
                </v-row>

                <div class="my-4 subtitle-1">
                    ${{film.rental_rate}}
                </div>

            
                </v-card-text>

                <v-card-actions>
                    <v-row>
                        <v-col cols="6">
                            <v-btn color="blue lighten-2" @click="detail(film.film_id)" block outlined >상세보기</v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn color="blue lighten-2" block outlined>Reserve</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <div class="text-center">
    <v-pagination class="mt-10"
      v-model="page"
      :length="15"
      @input="next"
    ></v-pagination>
  </div>
</v-container>
</template>

<script>
    export default {
        name :'FilmList',
        data() {
            return {
                filmList: '',
                page: 1
            }
        },
        props: {
            pageNo: {
                type: Number
            },
        },
        methods: {
            next(page) {
                this.$router.push({name:'FilmList',params:{pageNo:this.page}});
                this.$http.get('/api/films/page',{params :{pageNo : this.page}})
                .then((res) => {this.filmList = res.data});
            },
            asd() {
                return false;
            },
            detail(filmId){
                this.$router.push({name:'Film',params:{filmId:filmId}});
            },
        },
        created () {
            this.$http.get('/api/films/page',{params :{pageNo : this.pageNo}})
            .then((res) => {this.filmList = res.data});
            this.page = this.pageNo;
        },
    }
</script>

<style lang="scss" scoped>

</style>