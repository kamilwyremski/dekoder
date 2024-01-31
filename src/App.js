import React, { Component } from "react";
import {
  encode64,
  decode64,
  toAscii,
  Caesar,
  hexdecode,
  atbash,
  xorek,
} from "./resources/js/engine";
import { hex_md5 } from "./resources/js/md5";
import { hex_sha1 } from "./resources/js/sha1";
import "./App.css";
const bcrypt = require("bcryptjs");

class App extends Component {
  alertCopyToClipboardTimeout;
  constructor() {
    super();
    this.state = {
      input_losowe_haslo: "",
      input_losowe_haslo_typ: "alpha",
      input_losowe_haslo_dlugosc: 16,
      input_bcrypt: "",
      input_base64: "",
      input_md5: "",
      input_sha1: "",
      input_ascii: "",
      input_rot: "",
      input_rot_przesuniecie: 13,
      input_urldecode: "",
      input_hex: "",
      input_atbash: "",
      input_xor: "",
      input_xor_klucz: 6,
      alertCopyToClipboard: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.losowe_haslo();
  }
  randomString(length, type) {
    let chars = "0123456789";
    if (type === "all" || type === "alpha") {
      chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (type === "all") {
      chars += "!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    }
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  losowe_haslo = () => {
    this.setState({
      input_losowe_haslo: this.randomString(
        this.state.input_losowe_haslo_dlugosc,
        this.state.input_losowe_haslo_typ
      ),
    });
    document.activeElement.blur();
  };
  to_bcrypt = () => {
    this.setState({
      input_bcrypt: bcrypt.hashSync(this.state.input_bcrypt, 5),
    });
  };
  encode64 = () => {
    this.setState({
      input_base64: encode64(this.state.input_base64),
    });
    document.activeElement.blur();
  };
  decode64 = () => {
    this.setState({
      input_base64: decode64(this.state.input_base64),
    });
    document.activeElement.blur();
  };
  clearBase64 = () => {
    this.setState({
      input_base64: "",
    });
    document.activeElement.blur();
  };
  hex_md5 = () => {
    this.setState({
      input_md5: hex_md5(this.state.input_md5),
    });
    document.activeElement.blur();
  };
  hex_sha1 = () => {
    this.setState({
      input_sha1: hex_sha1(this.state.input_sha1),
    });
    document.activeElement.blur();
  };
  toAscii = () => {
    this.setState({
      input_ascii: toAscii(this.state.input_ascii),
    });
    document.activeElement.blur();
  };
  toRot = () => {
    this.setState({
      input_rot: Caesar(
        1,
        this.state.input_rot,
        this.state.input_rot_przesuniecie
      ),
    });
    document.activeElement.blur();
  };
  fromRot = () => {
    this.setState({
      input_rot: Caesar(
        -1,
        this.state.input_rot,
        this.state.input_rot_przesuniecie
      ),
    });
    document.activeElement.blur();
  };
  urlencode = () => {
    this.setState({
      input_urldecode: encodeURI(this.state.input_urldecode),
    });
    document.activeElement.blur();
  };
  urldecode = () => {
    this.setState({
      input_urldecode: decodeURI(this.state.input_urldecode),
    });
    document.activeElement.blur();
  };
  hexCode = () => {
    this.setState({
      input_hex: hexdecode(this.state.input_hex),
    });
    document.activeElement.blur();
  };
  atbash = () => {
    this.setState({
      input_atbash: atbash(this.state.input_atbash),
    });
    document.activeElement.blur();
  };
  xor = () => {
    this.setState({
      input_xor: xorek(this.state.input_xor, this.state.input_xor_klucz),
    });
    document.activeElement.blur();
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  copyToClipboard = (val) => {
    if (val) {
      navigator.clipboard.writeText(val);
      this.setState({
        alertCopyToClipboard: "Pomyślnie skopiowano do schowka",
      });
    } else {
      this.setState({
        alertCopyToClipboard: "Pole jest puste!",
      });
    }
    document.activeElement.blur();

    clearTimeout(this.alertCopyToClipboardTimeout);
    this.alertCopyToClipboardTimeout = setTimeout(() => {
      this.setState({
        alertCopyToClipboard: false,
      });
    }, 1500);
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1>Multi Koder-Dekoder</h1>
          <p>
            Kod strony możesz pobrać z{" "}
            <a
              href="https://github.com/kamilwyremski/dekoder"
              title="Dekoder - kod strony na Github"
            >
              https://github.com/kamilwyremski/dekoder
            </a>
          </p>
        </div>

        {this.state.alertCopyToClipboard && (
          <div
            className="alert alert-success fade in show"
            id="alert_copy_to_clipboard"
          >
            {this.state.alertCopyToClipboard}
          </div>
        )}

        <h3>Losowe hasło</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_losowe_haslo"
            className="form-control"
            value={this.state.input_losowe_haslo}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_losowe_haslo)}
          >
            Kopiuj
          </button>
        </div>

        <label>Typ</label>
        <select
          name="input_losowe_haslo_typ"
          value={this.state.input_losowe_haslo_typ}
          onChange={this.handleChange}
          className="form-control mb-2"
        >
          <option value="alpha">Tylko alfanumeryczne</option>
          <option value="digits">Tylko cyfry</option>
          <option value="all">Wszystkie znaki</option>
        </select>
        <label>Długość hasła</label>
        <input
          type="number"
          min="1"
          name="input_losowe_haslo_dlugosc"
          className="form-control mb-2"
          value={this.state.input_losowe_haslo_dlugosc}
          onChange={this.handleChange}
        />
        <input
          type="button"
          className="btn btn-primary"
          value="Losuj"
          id="button_losowe_haslo"
          onClick={this.losowe_haslo}
        />

        <h3 className="mt-4">Bcrypt</h3>

        <div className="input-group mb-2">
          <input
            name="input_bcrypt"
            className="form-control"
            value={this.state.input_bcrypt}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_bcrypt)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zakoduj Bcrypt"
          onClick={this.to_bcrypt}
          id="button_to_bcrypt"
        />

        <h3 className="mt-4">UrlEncode i UrlDecode</h3>
        <div className="input-group mb-2">
          <input
            name="input_urldecode"
            className="form-control"
            value={this.state.input_urldecode}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_urldecode)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Encode"
          id="button_urlencode"
          onClick={this.urlencode}
        />
        <input
          type="button"
          className="btn btn-primary"
          value="Dekode"
          id="button_urldecode"
          onClick={this.urldecode}
        />

        <h3 className="mt-4">Base64</h3>
        <div className="input-group mb-2">
          <input
            name="input_base64"
            className="form-control"
            value={this.state.input_base64}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_base64)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary mb-1"
          value="Zakoduj Base64"
          id="button_zakoduj_base64"
          onClick={this.encode64}
        />
        <input
          type="button"
          className="btn btn-secondary mb-1"
          value="Dekoduj Base64"
          id="button_dekoduj_base64"
          onClick={this.decode64}
        />
        <input
          type="button"
          className="btn btn-warning mb-1"
          value="Wyczyść"
          id="button_wyczysc_base64"
          onClick={this.clearBase64}
        />

        <h3 className="mt-4">MD5</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_md5"
            className="form-control"
            value={this.state.input_md5}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_md5)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zakoduj MD5"
          id="button_md5"
          onClick={this.hex_md5}
        />

        <h3 className="mt-4">SHA1</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_sha1"
            className="form-control"
            value={this.state.input_sha1}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_sha1)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zakoduj SHA1"
          id="button_sha1"
          onClick={this.hex_sha1}
        />

        <h3 className="mt-4">Kody ASCII</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_ascii"
            className="form-control"
            value={this.state.input_ascii}
            onChange={this.handleChange}
            id="input_ascii"
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_ascii)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zamień na kody ASCII"
          id="button_ascii"
          onClick={this.toAscii}
        />

        <h3 className="mt-4">ROT - przesunięcie dowolne</h3>
        <div className="input-group mb-2">
          <input
            name="input_rot"
            className="form-control"
            value={this.state.input_rot}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_rot)}
          >
            Kopiuj
          </button>
        </div>
        <label className="w-100 mb-2">
          przesunięcie{" "}
          <input
            type="number"
            name="input_rot_przesuniecie"
            className="form-control"
            value={this.state.input_rot_przesuniecie}
            onChange={this.handleChange}
          />
        </label>
        <input
          type="button"
          className="btn btn-primary mb-1"
          value="Zakoduj"
          id="button_zakoduj_rot"
          onClick={this.toRot}
        />
        <input
          type="button"
          className="btn btn-secondary mb-1"
          value="Zdekoduj"
          id="button_zdekoduj_rot"
          onClick={this.fromRot}
        />

        <h3 className="mt-4">Hex Code</h3>
        <div className="input-group mb-2">
          <input
            name="input_hex"
            className="form-control"
            value={this.state.input_hex}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_hex)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zdekoduj"
          id="button_hex"
          onClick={this.hexCode}
        />

        <h3 className="mt-4">AtBash</h3>
        <div className="input-group mb-2">
          <input
            name="input_atbash"
            className="form-control"
            value={this.state.input_atbash}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_atbash)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Koduj / Dekoduj"
          id="button_atbash"
          onClick={this.atbash}
        />

        <h3 className="mt-4">XOR - z kluczem</h3>
        <div className="input-group mb-2">
          <input
            name="input_xor"
            className="form-control"
            value={this.state.input_xor}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.copyToClipboard(this.state.input_xor)}
          >
            Kopiuj
          </button>
        </div>
        <p>Klucz (liczba lub cyfra!):</p>
        <input
          type="text"
          name="input_xor_klucz"
          className="form-control"
          maxLength="3"
          value={this.state.input_xor_klucz}
          onChange={this.handleChange}
        />
        <br />
        <input
          type="button"
          className="btn btn-primary"
          value="Koduj / Dekoduj"
          id="button_xor"
          onClick={this.xor}
        />

        <footer className="mt-5 text-center">
          <p className="small">
            <a
              href="https://blog.wyremski.pl/polityka-prywatnosci/"
              title="Polityka prywatności serwisu"
            >
              Polityka prywatności
            </a>{" "}
            | Project 2017 - 2024 by{" "}
            <a href="https://wyremski.pl" title="Full Stack Web Developer">
              Kamil Wyremski
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
