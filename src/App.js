import React, { Component } from 'react';
import './App.css';

import { encode64, decode64, toAscii, Caesar, hexdecode, atbash, xorek } from './resources/js/engine';
import { hex_md5 } from './resources/js/md5';
import { hex_sha1 } from './resources/js/sha1';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      input_losowe_haslo: '',
      input_losowe_haslo_typ: 'alfa',
      input_losowe_haslo_dlugosc: 8,
      input_base64: '',
      input_md5: '',
      input_sha1: '',
      input_ascii: '',
      input_rot: '',
      input_rot_przesuniecie: 13,
      input_urldecode: '',
      input_hex: '',
      input_atbash: '',
      input_xor: '',
      input_xor_klucz: 6,
      alertCopyToClipboard: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  randomString(length, type='') {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(type==='all'){
      chars += '!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    }
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  losowe_haslo = () => {
    this.setState({
      input_losowe_haslo: this.randomString(this.state.input_losowe_haslo_dlugosc, this.state.input_losowe_haslo_typ)
    })
    document.activeElement.blur()
  }
  encode64 = () => {
    this.setState({
      input_base64: encode64(this.state.input_base64)
    })
    document.activeElement.blur()
  }
  decode64 = () => {
    this.setState({
      input_base64: decode64(this.state.input_base64)
    })
    document.activeElement.blur()
  }
  clearBase64 = () => {
    this.setState({
      input_base64: ''
    })
    document.activeElement.blur()
  }
  hex_md5 = () => {
    this.setState({
      input_md5: hex_md5(this.state.input_md5)
    })
    document.activeElement.blur()
  }
  hex_sha1 = () => {
    this.setState({
      input_sha1: hex_sha1(this.state.input_sha1)
    })
    document.activeElement.blur()
  }
  toAscii = () => {
    this.setState({
      input_ascii: toAscii(this.state.input_ascii)
    })
    document.activeElement.blur()
  }
  toRot = () => {
    this.setState({
      input_rot: Caesar(1,this.state.input_rot,this.state.input_rot_przesuniecie)
    })
    document.activeElement.blur()
  }
  fromRot = () => {
    this.setState({
      input_rot: Caesar(-1,this.state.input_rot,this.state.input_rot_przesuniecie)
    })
    document.activeElement.blur()
  }
  urldecode = () => {
    this.setState({
      input_urldecode: decodeURI(this.state.input_urldecode)
    })
    document.activeElement.blur()
  }
  hexCode = () => {
    this.setState({
      input_hex: hexdecode(this.state.input_hex)
    })
    document.activeElement.blur()
  }
  atbash = () => {
    this.setState({
      input_atbash: atbash(this.state.input_atbash)
    })
    document.activeElement.blur()
  }
  xor = () => {
    this.setState({
      input_xor: xorek(this.state.input_xor, this.state.input_xor_klucz)
    })
    document.activeElement.blur()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  copyPassToClip = () => {
    if(this.state.input_losowe_haslo){
      this.setState({
        alertCopyToClipboard: 'Pomyślnie skopiowano do schowka'
      })
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.state.input_losowe_haslo;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }else{
      this.setState({
        alertCopyToClipboard: 'Hasło jest puste!'
      })
    }
    document.activeElement.blur()
    
    setTimeout(() => {
      this.setState({
        alertCopyToClipboard: false
      })
    }, 1500);
   
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1>Multi Koder-Dekoder</h1>
          <p className="mb-1">Jest to kopia strony <a href="https://uw-team.org/dekoder.html">https://uw-team.org/dekoder.html</a> stworzona w celu nauki React</p>
          <p>Kod strony możesz pobrać z <a href="https://github.com/kamilwyremski/dekoder">https://github.com/kamilwyremski/dekoder</a></p>
        </div>

        <h3>Losowe hasło</h3>
        <div className="input-group">
          <input type="text" name="input_losowe_haslo" className="form-control" value={this.state.input_losowe_haslo} onChange={this.handleChange} />
          <div className="input-group-append">
            <button className="btn btn-success" type="button" onClick={this.copyPassToClip} >Kopiuj</button>
          </div>
        </div>

        {this.state.alertCopyToClipboard && <div className="alert alert-success fade in show" id="alert_copy_to_clipboard">{this.state.alertCopyToClipboard}</div>}

        <label>Typ</label>
        <select name="input_losowe_haslo_typ" value={this.state.input_losowe_haslo_typ} onChange={this.handleChange} className="form-control">
          <option value="alfa">Tylko alfanumeryczne</option>
          <option value="all">Wszystkie znaki</option>
        </select>
        <label>Długość hasła</label>
        <input type="number" min="1" name="input_losowe_haslo_dlugosc" className="form-control" value={this.state.input_losowe_haslo_dlugosc} onChange={this.handleChange} /><br />
        <input type="button" className="btn btn-primary" value="Losuj" id="button_losowe_haslo" onClick={this.losowe_haslo} />

        <br /><br />

        <h3>Base64</h3>
        <p>Przyklad kodu: YWxhIG1hIGtvdGE=</p>
        <textarea name="input_base64" className="form-control" value={this.state.input_base64} onChange={this.handleChange}></textarea><br />
        <input type="button" className="btn btn-primary" value="Zakoduj Base64" id="button_zakoduj_base64" onClick={this.encode64} />
        <input type="button" className="btn btn-secondary" value="Dekoduj Base64" id="button_dekoduj_base64" onClick={this.decode64} />
        <input type="button" className="btn btn-warning" value="Wyczyść" id="button_wyczysc_base64" onClick={this.clearBase64} />

        <br /><br />

        <h3>MD5</h3>
        <p>Przyklad kodu: cc0cfe029395b5aa615085fa4e672f09</p>
        <input type="text" name="input_md5" className="form-control" value={this.state.input_md5} onChange={this.handleChange} /><br />
        <input type="button" className="btn btn-primary" value="Zakoduj MD5" id="button_md5" onClick={this.hex_md5} />

        <br /><br />

        <h3>SHA1</h3>
        <p>Przyklad kodu: f0d6dc1e6fd7996fe0c33446a7544bacbf9bf849</p>
        <input type="text" name="input_sha1" className="form-control" value={this.state.input_sha1} onChange={this.handleChange} /><br />
        <input type="button" className="btn btn-primary" value="Zakoduj SHA1" id="button_sha1" onClick={this.hex_sha1} />

        <br /><br />

        <h3>Kody ASCII</h3>
        <p>Przyklad kodu: 117,110,107,110,111,119</p>
        <input type="text" name="input_ascii" className="form-control" value={this.state.input_ascii} onChange={this.handleChange} id="input_ascii"/><br />
        <input type="button" className="btn btn-primary" value="Zamień na kody ASCII" id="button_ascii" onClick={this.toAscii} />

        <br /><br />

        <h3>ROT - przesunięcie dowolne</h3>
        <p>	Przyklad kodu: gb wrfg wnxvf grxfg (rot13)</p>
        <textarea name="input_rot" className="form-control" value={this.state.input_rot} onChange={this.handleChange}></textarea>
        przesunięcie <input type="number" name="input_rot_przesuniecie" className="form-control" value={this.state.input_rot_przesuniecie} onChange={this.handleChange} /><br />
        <input type="button" className="btn btn-primary" value="Zakoduj" id="button_zakoduj_rot" onClick={this.toRot} />
        <input type="button" className="btn btn-secondary" value="Zdekoduj" id="button_zdekoduj_rot" onClick={this.fromRot} />

        <br /><br />

        <h3>URLDECODE</h3>
        <p>Przyklad kodu: %75%77%2D%74%65%61%6D</p>
        <textarea name="input_urldecode" className="form-control" value={this.state.input_urldecode} onChange={this.handleChange}></textarea><br />
        <input type="button" className="btn btn-primary" value="Zdekoduj" id="button_urldecode" onClick={this.urldecode} />

        <br /><br />

        <h3>Hex Code</h3>
        <p>Przyklad kodu: 0x55 0x57 0x2d 0x54 0x65 0x61 0x6d 0x2e 0x6f 0x72 0x67</p>
        <textarea name="input_hex" className="form-control" value={this.state.input_hex} onChange={this.handleChange}></textarea><br />
        <input type="button" className="btn btn-primary" value="Zdekoduj" id="button_hex" onClick={this.hexCode} />

        <br /><br />

        <h3>AtBash</h3>
        <p>Przyklad kodu: qzprh gvphg</p>
        <textarea name="input_atbash" className="form-control" value={this.state.input_atbash} onChange={this.handleChange}></textarea><br />
        <input type="button" className="btn btn-primary" value="Koduj / Dekoduj" id="button_atbash" onClick={this.atbash} />

        <br /><br />

        <h3>XOR - z kluczem</h3>
        <p>Przyklad kodu: lgmou&rcmur (klucz 6)</p>
        <textarea name="input_xor" className="form-control" value={this.state.input_xor} onChange={this.handleChange}></textarea><br />
        <p>Klucz (liczba lub cyfra!):</p>
        <input type="text" name="input_xor_klucz" className="form-control" maxLength="3" value={this.state.input_xor_klucz} onChange={this.handleChange} /><br />
        <input type="button" className="btn btn-primary" value="Koduj / Dekoduj" id="button_xor" onClick={this.xor} />

        <br /><br />

        <footer className="text-center">
          <p className="small"><a href="https://blog.wyremski.pl/polityka-prywatnosci/" title="Polityka prywatności serwisu">Polityka prywatności</a> | Project 2017 - 2021 by <a href="https://wyremski.pl" title="Full Stack Web Developer">Kamil Wyremski</a></p>
        </footer>
    
      </div>
    );
  }
}

export default App;
