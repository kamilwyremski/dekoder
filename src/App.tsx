import React, { useEffect, useRef, useState } from "react";
import {
  encode64,
  decode64,
  toAscii,
  Caesar,
  hexdecode,
  atbash,
  xorek,
} from "./resources/js/engine.js";
import { hex_md5 } from "./resources/js/md5.js";
import { hex_sha1 } from "./resources/js/sha1.js";
import "./App.css";
import bcrypt from "bcryptjs";

const App = () => {
  const [state, setState] = useState({
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
  });

  const alertCopyToClipboardTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    losowe_haslo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const randomString = (length: number, type: string) => {
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
  };

  const losowe_haslo = () => {
    setState((prev) => ({
      ...prev,
      input_losowe_haslo: randomString(
        prev.input_losowe_haslo_dlugosc,
        prev.input_losowe_haslo_typ
      ),
    }));
    (document.activeElement as HTMLElement)?.blur();
  };

  const copyToClipboard = (val: string) => {
    if (val) {
      navigator.clipboard.writeText(val);
      setState((prev) => ({
        ...prev,
        alertCopyToClipboard: "Pomyślnie skopiowano do schowka",
      }));
    } else {
      setState((prev) => ({
        ...prev,
        alertCopyToClipboard: "Pole jest puste!",
      }));
    }
    (document.activeElement as HTMLElement)?.blur();
    clearTimeout(alertCopyToClipboardTimeout.current as NodeJS.Timeout);
    alertCopyToClipboardTimeout.current = setTimeout(() => {
      setState((prev) => ({ ...prev, alertCopyToClipboard: "" }));
    }, 1500);
  };

  const encodeActions = {
    to_bcrypt: () => setState((p) => ({ ...p, input_bcrypt: bcrypt.hashSync(p.input_bcrypt, 10) })),
    encode64: () => setState((p) => ({ ...p, input_base64: encode64(p.input_base64) })),
    decode64: () => setState((p) => ({ ...p, input_base64: decode64(p.input_base64) })),
    clearBase64: () => setState((p) => ({ ...p, input_base64: "" })),
    hex_md5: () => setState((p) => ({ ...p, input_md5: hex_md5(p.input_md5) })),
    hex_sha1: () => setState((p) => ({ ...p, input_sha1: hex_sha1(p.input_sha1) })),
    toAscii: () => setState((p) => ({ ...p, input_ascii: toAscii(p.input_ascii) })),
    toRot: () => setState((p) => ({ ...p, input_rot: Caesar(1, p.input_rot, p.input_rot_przesuniecie) })),
    fromRot: () => setState((p) => ({ ...p, input_rot: Caesar(-1, p.input_rot, p.input_rot_przesuniecie) })),
    urlencode: () => setState((p) => ({ ...p, input_urldecode: encodeURI(p.input_urldecode) })),
    urldecode: () => setState((p) => ({ ...p, input_urldecode: decodeURI(p.input_urldecode) })),
    hexCode: () => setState((p) => ({ ...p, input_hex: hexdecode(p.input_hex) })),
    atbash: () => setState((p) => ({ ...p, input_atbash: atbash(p.input_atbash) })),
    xor: () => setState((p) => ({ ...p, input_xor: xorek(p.input_xor, p.input_xor_klucz) })),
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>Multi Koder-Dekoder</h1>
        <p>
          Kod strony możesz pobrać z {" "}
          <a
            href="https://github.com/kamilwyremski/dekoder"
            title="Dekoder - kod strony na Github"
          >
            https://github.com/kamilwyremski/dekoder
          </a>
        </p>
      </div>

      {state.alertCopyToClipboard && (
        <div className="alert alert-success fade in show" id="alert_copy_to_clipboard">
          {state.alertCopyToClipboard}
        </div>
      )}

      <h3>Losowe hasło</h3>
      <div className="input-group mb-2">
        <input
          type="text"
          name="input_losowe_haslo"
          className="form-control"
          value={state.input_losowe_haslo}
          onChange={handleChange}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={() => copyToClipboard(state.input_losowe_haslo)}
        >
          Kopiuj
        </button>
      </div>

      <label>Typ</label>
      <select
        name="input_losowe_haslo_typ"
        value={state.input_losowe_haslo_typ}
        onChange={handleChange}
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
        value={state.input_losowe_haslo_dlugosc}
        onChange={handleChange}
      />

      <input
        type="button"
        className="btn btn-primary"
        value="Losuj"
        id="button_losowe_haslo"
        onClick={losowe_haslo}
      />

      <h3 className="mt-4">Bcrypt</h3>
      <div className="input-group mb-2">
        <input
          name="input_bcrypt"
          className="form-control"
          value={state.input_bcrypt}
          onChange={handleChange}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={() => copyToClipboard(state.input_bcrypt)}
        >
          Kopiuj
        </button>
      </div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={encodeActions.to_bcrypt}
      >
        Zakoduj
      </button>

      <h3 className="mt-4">UrlEncode i UrlDecode</h3>
        <div className="input-group mb-2">
          <input
            name="input_urldecode"
            className="form-control"
            value={state.input_urldecode}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_urldecode)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Encode"
          id="button_urlencode"
          onClick={encodeActions.urlencode}
        />
        <input
          type="button"
          className="btn btn-primary"
          value="Dekode"
          id="button_urldecode"
          onClick={encodeActions.urldecode}
        />

        <h3 className="mt-4">Base64</h3>
        <div className="input-group mb-2">
          <input
            name="input_base64"
            className="form-control"
            value={state.input_base64}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_base64)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary mb-1"
          value="Zakoduj Base64"
          id="button_zakoduj_base64"
          onClick={encodeActions.encode64}
        />
        <input
          type="button"
          className="btn btn-secondary mb-1"
          value="Dekoduj Base64"
          id="button_dekoduj_base64"
          onClick={encodeActions.decode64}
        />
        <input
          type="button"
          className="btn btn-warning mb-1"
          value="Wyczyść"
          id="button_wyczysc_base64"
          onClick={encodeActions.clearBase64}
        />

        <h3 className="mt-4">MD5</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_md5"
            className="form-control"
            value={state.input_md5}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_md5)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zakoduj MD5"
          id="button_md5"
          onClick={encodeActions.hex_md5}
        />

        <h3 className="mt-4">SHA1</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_sha1"
            className="form-control"
            value={state.input_sha1}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_sha1)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zakoduj SHA1"
          id="button_sha1"
          onClick={encodeActions.hex_sha1}
        />

        <h3 className="mt-4">Kody ASCII</h3>
        <div className="input-group mb-2">
          <input
            type="text"
            name="input_ascii"
            className="form-control"
            value={state.input_ascii}
            onChange={handleChange}
            id="input_ascii"
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_ascii)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zamień na kody ASCII"
          id="button_ascii"
          onClick={encodeActions.toAscii}
        />

        <h3 className="mt-4">ROT - przesunięcie dowolne</h3>
        <div className="input-group mb-2">
          <input
            name="input_rot"
            className="form-control"
            value={state.input_rot}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_rot)}
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
            value={state.input_rot_przesuniecie}
            onChange={handleChange}
          />
        </label>
        <input
          type="button"
          className="btn btn-primary mb-1"
          value="Zakoduj"
          id="button_zakoduj_rot"
          onClick={encodeActions.toRot}
        />
        <input
          type="button"
          className="btn btn-secondary mb-1"
          value="Zdekoduj"
          id="button_zdekoduj_rot"
          onClick={encodeActions.fromRot}
        />

        <h3 className="mt-4">Hex Code</h3>
        <div className="input-group mb-2">
          <input
            name="input_hex"
            className="form-control"
            value={state.input_hex}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_hex)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Zdekoduj"
          id="button_hex"
          onClick={encodeActions.hexCode}
        />

        <h3 className="mt-4">AtBash</h3>
        <div className="input-group mb-2">
          <input
            name="input_atbash"
            className="form-control"
            value={state.input_atbash}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_atbash)}
          >
            Kopiuj
          </button>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Koduj / Dekoduj"
          id="button_atbash"
          onClick={encodeActions.atbash}
        />

        <h3 className="mt-4">XOR - z kluczem</h3>
        <div className="input-group mb-2">
          <input
            name="input_xor"
            className="form-control"
            value={state.input_xor}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => copyToClipboard(state.input_xor)}
          >
            Kopiuj
          </button>
        </div>
        <p>Klucz:</p>
        <input
          type="text"
          name="input_xor_klucz"
          className="form-control"
          maxLength={3}
          value={state.input_xor_klucz}
          onChange={handleChange}
        />
        <br />
        <input
          type="button"
          className="btn btn-primary"
          value="Koduj / Dekoduj"
          id="button_xor"
          onClick={encodeActions.xor}
        />

        <footer className="mt-5 text-center">
          <p className="small">
            <a
              href="https://blog.wyremski.pl/polityka-prywatnosci/"
              title="Polityka prywatności serwisu"
            >
              Polityka prywatności
            </a>{" "}
            | Project 2017 - 2025 by{" "}
            <a href="https://wyremski.pl" title="Full Stack Web Developer">
              Kamil Wyremski
            </a>
          </p>
        </footer>
    </div>
  );
};

export default App;
