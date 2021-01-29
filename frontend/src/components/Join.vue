<template>
    <v-container>
        <v-row class="d-flex justify-center mt-10">
            <v-col cols="12" xl="6" lg="6" xs="12">
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="firstName"
      :rules="firstNameRules"
      label="이름"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      :rules="lastNameRules"
      label="성"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>

    <v-btn
      color="primary"
      class="mr-4"
      @click="validate"
      block
    >
      회원가입
    </v-btn>
  </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
      valid: true,
      firstName: '',
      lastName: '',
      firstNameRules: [
        v => !!v || '이름은 필수입니다.',
      ],
      lastNameRules: [
        v => !!v || '성은 필수입니다.',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail은 필수입니다.',
        v => /.+@.+\..+/.test(v) || 'E-mail형식에 맞지 않습니다',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    }),

    methods: {
      validate () {
        if(this.$refs.form.validate()) console.log('완료')
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    }
</script>

<style lang="scss" scoped>

</style>