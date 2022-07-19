import React, { Component } from 'react';

export default class CoinConverter extends Component {
  constructor() {
    super();
    this.state = {
      tempA: 0,
      unitA: 'Real',
      unitB: 'Dólar',
      priceDolar: 0,
      priceEuro: 0,
    };
  }

  componentDidMount() {
    this.getCotation('USD');
    this.getCotation('EUR');
  }

  //Chamado após a atualização do componente
  componentDidUpdate() {
    this.CoinConverter();
  }

  CoinConverter() {
    if (this.state.tempA) {
      var tempB = document.getElementById('tempB');

      // Celsius para Fahrenheit ou Kelvin
      if (this.state.unitA === 'Real') {
        if (this.state.unitB === 'Dólar') {
          tempB.value = this.realToDolar(this.state.tempA);
        }
        if (this.state.unitB === 'Euro') {
          tempB.value = this.realToEuro(this.state.tempA);
        } else {
          tempB.value = this.state.tempA;
        }
      }

      // Fahrenheit para Celsius ou Kelvin
      if (this.state.unitA === 'Dólar') {
        if (this.state.unitB === 'Real') {
          tempB.value = this.dolarToReal(this.state.tempA);
        } else {
          tempB.value = this.state.tempA;
        }
      }
    }
  }

  async getCotation(coin) {
    const link = 'https://economia.awesomeapi.com.br/json/last/';
    if (coin === 'USD') {
      const response = await fetch(link + 'USD-BRL');
      const jsonData = await response.json();
      this.setState({ ...this.state, priceDolar: jsonData.USDBRL.ask });
    } else if (coin === 'EUR') {
      const response = await fetch(link + 'EUR-BRL');
      const jsonData = await response.json();
      this.setState({ ...this.state, priceEuro: jsonData.EURBRL.ask });
    }
  }

  realToDolar(value) {
    return value * this.state.priceDolar;
  }
  realToEuro(value) {
    return value * this.state.priceEuro;
  }
  dolarToReal(value) {
    return value / this.state.priceDolar;
  }
  euroToREal(value) {
    return value / this.state.priceEuro;
  }

  // Renderiza o componente
  render() {
    return (
      <div id="container">
        <div id="blockA">
          <input
            type="number"
            id="tempA"
            name="tempA"
            onChange={(e) =>
              this.setState({
                tempA: !isNaN(e.target.value) ? parseFloat(e.target.value) : 0,
              })
            }
          />
          <select
            id="unitA"
            name="unitA"
            onChange={(e) => this.setState({ unitA: e.target.value })}
          >
            <option value="Real">Real</option>
            <option value="Dólar">Dólar</option>
            <option value="Euro">Euro</option>
          </select>
        </div>
        <span name="unit2" id="equal">
          =
        </span>
        <div id="blockB">
          <input type="number" id="tempB" disabled="disabled" name="tempB" />
          <select
            id="unitB"
            name="unitB"
            onChange={(e) => this.setState({ unitB: e.target.value })}
          >
            <option value="Real">Real</option>
            <option value="Dólar" selected>
              Dólar
            </option>
            <option value="Euro">Euro</option>
          </select>
        </div>
      </div>
    );
  }
}
