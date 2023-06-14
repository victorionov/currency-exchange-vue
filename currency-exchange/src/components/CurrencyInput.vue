<template>
  <div class="container">
    <div class="container-one">
      <select class="select" name="first-currency" id="first-currency" v-model="currency_one" @change="fetchData">
        <option v-for="currency in currencies" :value="currency" :key="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" name="input-one" id="input-one" v-model="amountOne" @input="fetchData" />
    </div>
    <div class="container-two">
      <button @click="switchValues">Switch</button>
      <h4 class="rate" id="baseValue">
        1 {{ currency_one }} = {{ rate }} {{ currency_two }}
      </h4>
    </div>
    <div class="container-three">
      <select class="select" name="second-currency" id="second-currency" v-model="currency_two" @change="fetchData">
        <option v-for="currency in currencies" :value="currency" :key="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" name="input-two" id="input-two" placeholder="0" disabled v-model="amountTwo" />
    </div>

    <div class="container-four">
      <h4 id="lastUpdated">Last updated {{ data.time_last_update_utc }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrencyConverter",
  data() {
    return {
      data: [],
      currencies: [],
      currency_one: "USD",
      currency_two: "EUR",
      rate: "",
      amountOne: 1,
      amountTwo: 0,
    };
  },

  methods: {
    fetchData() {
      fetch(`https://v6.exchangerate-api.com/v6/c015d7d218dec9a707311ef3/latest/${this.currency_one}`)
        .then((res) => res.json())
        .then((data) => {
          this.data = data;
          this.rate = data.conversion_rates[this.currency_two];
          this.amountTwo = (this.amountOne * this.rate).toFixed(2);
        });
    },

    switchValues() {
      const tempValue = this.currency_one;
      this.currency_one = this.currency_two;
      this.currency_two = tempValue;
      this.fetchData();
    },
  },

  mounted() {
    fetch("https://v6.exchangerate-api.com/v6/c015d7d218dec9a707311ef3/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.currencies = Object.keys(data.conversion_rates);
      });

    this.fetchData();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  text-align: center;
}

.container-two {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
}

.container-two button {
  padding: 5px;
  font-size: 18px;
  width: 80px;
  height: 30px;
}

.select {
  padding: 5px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
}

input {
  padding: 5px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  font-size: 18px;
}

#lastUpdated {
  font-size: 18px;
}
</style>
