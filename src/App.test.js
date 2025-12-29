import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import bcrypt from "bcryptjs";

describe("App Component Tests", () => {
  it("sprawdź losowe hasło", async () => {
    render(<App />);
    
    const input = screen.getByDisplayValue(/^[a-zA-Z0-9]{16}$/);
    const inputDlugosc = screen.getByDisplayValue("16");
    const button = screen.getByRole("button", { name: "Losuj" });

    expect(input.value).not.toBe("");

    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value.length).toBe(parseInt(inputDlugosc.value));
    });

    fireEvent.change(inputDlugosc, { target: { value: "10" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value.length).toBe(10);
    });
  });

  it("sprawdź bcrypt", async () => {
    render(<App />);
    
    const bcryptSection = screen.getAllByText("Bcrypt")[0].closest("h3");
    const bcryptContainer = bcryptSection.nextElementSibling;
    const input = bcryptContainer.querySelector("[name=input_bcrypt]");
    const button = screen.getAllByRole("button", { name: "Zakoduj" })[0];

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(button);

    await waitFor(() => {
      const result = bcrypt.compareSync("1234", input.value);
      expect(result).toBe(true);
    });
  });

  it("sprawdź base64", async () => {
    render(<App />);
    
    const base64Section = screen.getAllByText("Base64")[0].closest("h3");
    const base64Container = base64Section.parentElement;
    const input = base64Container.querySelector("[name=input_base64]");
    const buttonZakoduj = screen.getByRole("button", { name: "Zakoduj Base64" });
    const buttonDekoduj = screen.getByRole("button", { name: "Dekoduj Base64" });
    const buttonWyczysc = screen.getByRole("button", { name: "Wyczyść" });

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(buttonZakoduj);
    await waitFor(() => {
      expect(input.value).toBe("MTIzNA==");
    });

    fireEvent.click(buttonDekoduj);
    await waitFor(() => {
      expect(input.value).toBe("1234");
    });

    fireEvent.click(buttonWyczysc);
    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("sprawdź md5", async () => {
    render(<App />);
    
    const md5Section = screen.getAllByText("MD5")[0].closest("h3");
    const md5Container = md5Section.parentElement;
    const input = md5Container.querySelector("[name=input_md5]");
    const button = screen.getByRole("button", { name: "Zakoduj MD5" });

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("81dc9bdb52d04dc20036dbd8313ed055");
    });
  });

  it("sprawdź SHA1", async () => {
    render(<App />);
    
    const sha1Section = screen.getAllByText("SHA1")[0].closest("h3");
    const sha1Container = sha1Section.parentElement;
    const input = sha1Container.querySelector("[name=input_sha1]");
    const button = screen.getByRole("button", { name: "Zakoduj SHA1" });

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("7110eda4d09e062aa5e4a390b0a572ac0d2c0220");
    });
  });

  it("sprawdź ASCII", async () => {
    render(<App />);
    
    const asciiSection = screen.getAllByText("Kody ASCII")[0].closest("h3");
    const asciiContainer = asciiSection.parentElement;
    const input = asciiContainer.querySelector("[name=input_ascii]");
    const button = screen.getByRole("button", { name: "Zamień na kody ASCII" });

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("97,98,99,100");
    });
  });

  it("sprawdź ROT", async () => {
    render(<App />);
    
    const rotSection = screen.getAllByText(/ROT/)[0].closest("h3");
    const rotContainer = rotSection.parentElement;
    const input = rotContainer.querySelector("[name=input_rot]");
    const inputPrzesuniecie = rotContainer.querySelector("[name=input_rot_przesuniecie]");
    const buttonZakoduj = rotContainer.querySelector("#button_zakoduj_rot");
    const buttonZdekoduj = rotContainer.querySelector("#button_zdekoduj_rot");

    expect(input.value).toBe("");
    expect(inputPrzesuniecie.value).toBe("13");

    fireEvent.change(input, { target: { value: "gb wrfg wnxvf grxfg" } });
    fireEvent.click(buttonZakoduj);
    await waitFor(() => {
      expect(input.value).toBe("to jest jakis tekst");
    });

    fireEvent.click(buttonZdekoduj);
    await waitFor(() => {
      expect(input.value).toBe("gb wrfg wnxvf grxfg");
    });

    fireEvent.change(inputPrzesuniecie, { target: { value: "6" } });
    fireEvent.click(buttonZakoduj);
    await waitFor(() => {
      expect(input.value).toBe("mh cxlm ctdbl mxdlm");
    });

    fireEvent.click(buttonZdekoduj);
    await waitFor(() => {
      expect(input.value).toBe("gb wrfg wnxvf grxfg");
    });
  });

  it("sprawdź URLENCODE", async () => {
    render(<App />);
    
    const urlSection = screen.getAllByText(/UrlEncode/)[0].closest("h3");
    const urlContainer = urlSection.parentElement;
    const input = urlContainer.querySelector("[name=input_urldecode]");
    const buttonEncode = urlContainer.querySelector("#button_urlencode");

    fireEvent.change(input, { target: { value: "http://localhost:3000/ ze spacją" } });
    fireEvent.click(buttonEncode);
    await waitFor(() => {
      expect(input.value).toBe("http://localhost:3000/%20ze%20spacj%C4%85");
    });
  });

  it("sprawdź URLDECODE", async () => {
    render(<App />);
    
    const urlSection = screen.getAllByText(/UrlEncode/)[0].closest("h3");
    const urlContainer = urlSection.parentElement;
    const input = urlContainer.querySelector("[name=input_urldecode]");
    const buttonDecode = urlContainer.querySelector("#button_urldecode");

    fireEvent.change(input, { target: { value: "http://localhost:3000/%20ze%20spacj%C4%85" } });
    fireEvent.click(buttonDecode);
    await waitFor(() => {
      expect(input.value).toBe("http://localhost:3000/ ze spacją");
    });
  });

  it("sprawdź Hex", async () => {
    render(<App />);
    
    const hexSection = screen.getAllByText("Hex Code")[0].closest("h3");
    const hexContainer = hexSection.parentElement;
    const input = hexContainer.querySelector("[name=input_hex]");
    const button = hexContainer.querySelector("#button_hex");

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "0x74 0x65 0x73 0x74" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("test");
    });
  });

  it("sprawdź AtBash", async () => {
    render(<App />);
    
    const atbashSection = screen.getAllByText("AtBash")[0].closest("h3");
    const atbashContainer = atbashSection.parentElement;
    const input = atbashContainer.querySelector("[name=input_atbash]");
    const button = atbashContainer.querySelector("#button_atbash");

    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "qzprh gvphg" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("jakis tekst");
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("qzprh gvphg");
    });
  });

  it("sprawdź xor", async () => {
    render(<App />);
    
    const xorSection = screen.getAllByText(/XOR/)[0].closest("h3");
    const xorContainer = xorSection.parentElement;
    const input = xorContainer.querySelector("[name=input_xor]");
    const inputKlucz = xorContainer.querySelector("[name=input_xor_klucz]");
    const button = xorContainer.querySelector("#button_xor");

    expect(input.value).toBe("");
    expect(inputKlucz.value).toBe("6");

    fireEvent.change(input, { target: { value: "lgmou&rcmur" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("jakis tekst");
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("lgmou&rcmur");
    });

    fireEvent.change(inputKlucz, { target: { value: "5" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("ibhjp#wfhpw");
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(input.value).toBe("lgmou&rcmur");
    });
  });
});
