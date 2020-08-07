<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Payment</h1>
    <div class="card">
        <div class="card-body">
            <stripe-elements
                ref="elementsRef"
                :pk="publishableKey"
                :amount="amount"
                locale="en"
                @token="tokenCreated"
                @loading="loading = $event"
                :styleObject="style"
            >
            </stripe-elements>
            <button class="btn btn-primary" @click="submit">Pay ${{amount / 100}}</button>
        </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import { StripeElements } from 'vue-stripe-checkout';
export default {
  components: {
    StripeElements
  },
  data: () => ({
    loading: false,
    amount: 1,
    publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
    token: null,
    charge: null,
    style: {}
    // {
    //         base: {
    //         iconColor: '#c4f0ff',
    //         color: '#fff',
    //         fontWeight: 500,
    //         fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    //         fontSize: '16px',
    //         fontSmoothing: 'antialiased',
    //         ':-webkit-autofill': {
    //             color: '#fce883',
    //         },
    //         '::placeholder': {
    //             color: '#87BBFD',
    //         },
    //         },
    //         invalid: {
    //         iconColor: '#FFC7EE',
    //         color: '#FFC7EE',
    //         }
    // }
  }),
  methods: {
    submit () {
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
        User.payment(charge).then(response => {
            this.$router.push({ name: "Dashboard" });
        })
        .catch(error => {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.response.data.message;
            console.error(error);
            this.$root.$emit('error 1', error);
        });
    }
  }
}
</script>
