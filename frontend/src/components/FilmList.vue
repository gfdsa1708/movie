<template>
<v-container>
    <v-row>
        <v-col cols="12" lg="3" md="4" sm="6" xs="12" v-for="film in filmList" :key="film.id">
            <v-card
                tile
                max-width="374"
            >
                <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title class="d-inline-block">{{film.title}}</v-card-title>
                <v-chip>{{film.category}}</v-chip>
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

                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                </v-card-text>

                <v-card-actions>
                    <v-row>
                        <v-col cols="6">
                            <v-btn color="deep-purple lighten-2 d-block" text>Reserve</v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn color="deep-purple lighten-2" text>Reserve</v-btn>
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
        methods: {
            next(page) {
                console.log(page)
            }
        },
        created () {
            this.$http.get('/api/film',{params :{pageNo : this.page}})
            .then((res) => {this.filmList = res.data});
        },
    }
</script>

<style lang="scss" scoped>
.card {display: flex;}
</style>