import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    const res = await axios.request(languageOptions);
    return res.data.data.languages;
  }
);

// api ın ceviri uc noktasına istek at

export const translateText = createAsyncThunk(
  "translate/translateText",
  async (action_params) => {
    // aksiyonu dispatch ederken gonderilern parametrelere
    const { sourceLang, targetLang, text } = action_params;
    // gonderilecek parametreleri belirle
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);
    // axios istek ayarlarını belirle
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "681d018b85mshcddfcd8e7d268cap10221cjsn35720d21e15d",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    // isteği at
    const res = await axios.request(options);
    console.log(res.data.data.translatedText);

    return res.data.data.translatedText;
  }
);
