import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { updateText } from "./redux/slices/translateSlice";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // HER RENDERDA FORMATLAMA OLMAMASI ICIN USEMEMO
  const formatted = useMemo(() => {
    return langState.languages.map((i) => ({
      value: i.code,
      label: i.name,
    }));
  }, [langState.languages]);

  // diziyi bizden istenen  formata cevrme burada value label varken bizde code name

  const handleChange = () => {
    // select alanlarındaki değerleri değşrtir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // text alanlarındaki değerleri değiştir
    setText(translateState.text);

    // slicedaki text degerini guncelle
    dispatch(updateText(text));
  };

  return (
    <div className="bg-slate-700  text-white grid place-items-center py-8 h-100">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">ÇEVİRİ 🌐</h1>

        {/* üst alan */}
        <div className="flex gap-2 text-black ">
          <Select
            value={sourceLang}
            isLoading={langState?.isLoading}
            onChange={setSourceLang}
            className="flex-1"
            options={formatted}
          />

          <button
            onClick={handleChange}
            className="text-white py-2 px-6 rounded bg-zinc-900 transition hover:ring-1 hover:bg-zinc-800"
          >
            Değiş
          </button>

          <Select
            value={targetLang}
            isLoading={langState?.isLoading}
            isDisabled={langState?.isLoading}
            onChange={setTargetLang}
            className="flex-1"
            options={formatted}
          />
        </div>

        {/* text alanları */}
        <div className="flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3 ">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            ></textarea>
          </div>
          <div className="flex-1">
            <textarea
              value={translateState.text}
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded mt-4"
            ></textarea>
          </div>
        </div>

        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          className="rounded-md px-5 py-3 text-[16px] font-semibold cursor-pointer mt-3 hover:ring-2 transition bg-zinc-500 hover:bg-zinc-900"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
