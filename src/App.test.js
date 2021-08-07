import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import App from './App';

const bcrypt = require("bcryptjs");

let container;

beforeEach(() => {
  container = document.createElement('div');
  ReactDOM.render(<App />, container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
});

it('sprawdź losowe hasło', () => {
  const input = container.querySelector('[name=input_losowe_haslo]');
  const inputDlugosc = container.querySelector('[name=input_losowe_haslo_dlugosc]');
  const button = container.querySelector('#button_losowe_haslo');

  expect(input.value).toBe('');

  ReactTestUtils.Simulate.click(button);
  expect(input.value.length).toBe(parseInt(inputDlugosc.value));

  inputDlugosc.value=10;
  ReactTestUtils.Simulate.change(inputDlugosc);
  ReactTestUtils.Simulate.click(button);
  expect(input.value.length).toBe(10);
});

it('sprawdź bcrypt', () => {
  const input = container.querySelector('[name=input_bcrypt]');
  const button = container.querySelector('#button_to_bcrypt');

  expect(input.value).toBe('');

  input.value = '1234';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);

  const result = bcrypt.compareSync("1234", input.value);

  expect(result).toBe(true);
});

it('sprawdź base64', () => {
  const input = container.querySelector('[name=input_base64]');
  const buttonZakoduj = container.querySelector('#button_zakoduj_base64');
  const buttonDekoduj = container.querySelector('#button_dekoduj_base64');
  const buttonWyczysc = container.querySelector('#button_wyczysc_base64');

  expect(input.value).toBe('');

  input.value = 'YWxhIG1hIGtvdGE=';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(buttonZakoduj);
  expect(input.value).toBe('WVd4aElHMWhJR3R2ZEdFPQ==');

  ReactTestUtils.Simulate.click(buttonDekoduj);
  expect(input.value).toBe('YWxhIG1hIGtvdGE=');

  ReactTestUtils.Simulate.click(buttonWyczysc);
  expect(input.value).toBe('');
});

it('sprawdź md5', () => {
  const input = container.querySelector('[name=input_md5]');
  const button = container.querySelector('#button_md5');

  expect(input.value).toBe('');

  input.value = '1234';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('81dc9bdb52d04dc20036dbd8313ed055');
});

it('sprawdź SHA1', () => {
  const input = container.querySelector('[name=input_sha1]');
  const button = container.querySelector('#button_sha1');

  expect(input.value).toBe('');

  input.value = '1234';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('7110eda4d09e062aa5e4a390b0a572ac0d2c0220');
});

it('sprawdź ASCII', () => {
  const input = container.querySelector('#input_ascii');
  const button = container.querySelector('#button_ascii');

  expect(input.value).toBe('');

  input.value = 'abcd';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('97,98,99,100');
});

it('sprawdź ROT', () => {
  const input = container.querySelector('[name=input_rot]');
  const inputPrzesuniecie = container.querySelector('[name=input_rot_przesuniecie]');
  const buttonZakoduj = container.querySelector('#button_zakoduj_rot');
  const buttonZdekoduj = container.querySelector('#button_zdekoduj_rot');

  expect(input.value).toBe('');
  expect(inputPrzesuniecie.value).toBe('13');

  input.value = 'gb wrfg wnxvf grxfg';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(buttonZakoduj);
  expect(input.value).toBe('to jest jakis tekst');

  ReactTestUtils.Simulate.click(buttonZdekoduj);
  expect(input.value).toBe('gb wrfg wnxvf grxfg');

  inputPrzesuniecie.value = 6;
  ReactTestUtils.Simulate.change(inputPrzesuniecie);
  ReactTestUtils.Simulate.click(buttonZakoduj);
  expect(input.value).toBe('mh cxlm ctdbl mxdlm');

  ReactTestUtils.Simulate.click(buttonZdekoduj);
  expect(input.value).toBe('gb wrfg wnxvf grxfg');
});

it('sprawdź URLDECODE', () => {
  const input = container.querySelector('[name=input_urldecode]');
  const button = container.querySelector('#button_urldecode');

  expect(input.value).toBe('');

  input.value = '%75%77%2D%74%65%61%6D';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('uw-team');
});

it('sprawdź Hex', () => {
  const input = container.querySelector('[name=input_hex]');
  const button = container.querySelector('#button_hex');

  expect(input.value).toBe('');

  input.value = '0x55 0x57 0x2d 0x54 0x65 0x61 0x6d 0x2e 0x6f 0x72 0x67';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('UW-Team.org');
});

it('sprawdź AtBash', () => {
  const input = container.querySelector('[name=input_atbash]');
  const button = container.querySelector('#button_atbash');

  expect(input.value).toBe('');

  input.value = 'qzprh gvphg';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('jakis tekst');

  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('qzprh gvphg');
});

it('sprawdź xor', () => {
  const input = container.querySelector('[name=input_xor]');
  const inputKlucz = container.querySelector('[name=input_xor_klucz]');
  const button = container.querySelector('#button_xor');

  expect(input.value).toBe('');
  expect(inputKlucz.value).toBe('6');

  input.value = 'lgmou&rcmur';
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('jakis tekst');

  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('lgmou&rcmur');

  inputKlucz.value = '5';
  ReactTestUtils.Simulate.change(inputKlucz);
  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('ibhjp#wfhpw');

  ReactTestUtils.Simulate.click(button);
  expect(input.value).toBe('lgmou&rcmur');
});
