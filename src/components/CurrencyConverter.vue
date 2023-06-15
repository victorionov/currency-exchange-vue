<template>
  <div class="container">
    <div class="container-one container-inputs">
      <select
        class="select"
        name="first-currency"
        id="first-currency"
        @change="fetchData"
        v-model="currency_one"
      >
        <option v-for="currency in currencies" :value="currency" :key="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" name="input-one" id="input-one" v-model="amountOne" @input="fetchData" />
    </div>
    <div class="container-two">
      <button @click="switchValues">Switch</button>
      <h4 class="rate" id="baseValue">1 {{ currency_one }} = {{ rate }} {{ currency_two }}</h4>
    </div>
    <div class="container-three container-inputs">
      <select
        class="select"
        name="second-currency"
        id="second-currency"
        v-model="currency_two"
        @change="fetchData"
      >
        <option v-for="currency in currencies" :value="currency" :key="currency">
          {{ currency }}
        </option>
      </select>
      <input
        type="number"
        name="input-two"
        id="input-two"
        placeholder="0"
        disabled
        v-model="amountTwo"
      />
    </div>

    <div class="container-four">
      <h4 id="lastUpdated">Last updated {{ data.time_last_update_utc }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface CurrencyData {
  time_last_update_utc: string;
  conversion_rates: Record<string, number>;
}

export default defineComponent({
  name: 'CurrencyConverter',
  data() {
    return {
      data: {
        time_last_update_utc: '',
        conversion_rates: {},
      } as CurrencyData,
      currencies: [] as string[],
      currency_one: 'USD',
      currency_two: 'EUR',
      rate: '',
      amountOne: 1,
      amountTwo: 0,
    };
  },
  methods: {
    fetchData(): void {
      fetch(`https://v6.exchangerate-api.com/v6/c015d7d218dec9a707311ef3/latest/${this.currency_one}`)
        .then((res) => res.json())
        .then((data: CurrencyData) => {
          this.data = data;
          this.rate = data.conversion_rates[this.currency_two].toString();
          this.amountTwo = Number((this.amountOne * parseFloat(this.rate)).toFixed(2));
        });
    },
    switchValues(): void {
      const tempValue = this.currency_one;
      this.currency_one = this.currency_two;
      this.currency_two = tempValue;
      this.fetchData();
    },
  },
  mounted() {
    fetch('https://v6.exchangerate-api.com/v6/c015d7d218dec9a707311ef3/latest/USD')
      .then((res) => res.json())
      .then((data: CurrencyData) => {
        this.data = data;
        this.currencies = Object.keys(data.conversion_rates);
      });

    this.fetchData();
  },
});
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

.container-inputs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  padding: 5px;
}

.container-two {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 5px;
}

.container-two button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 18px;
  width: 80px;
  height: 30px;
  margin-right: 20px;
  border: none;
  background-color: rgb(73, 102, 195);
  color: rgb(232, 234, 239);
  border-radius: 7px;
}

.select {
  padding: 5px;
  margin: 5px;
  border: none;
  outline: none;
  border-radius: 7px;
}

input {
  padding: 5px;
  margin: 5px;
  border: none;
  outline: none;
  font-size: 18px;
  border-radius: 7px;
}

.container-three input:disabled {
  background-color: rgb(155, 155, 155);
  color: rgb(42, 42, 42);
}

#lastUpdated {
  font-size: 18px;
}
</style>
