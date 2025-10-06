import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import reducer from "./reducer";
import langRedu from "./handelReducer";

import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";

import { useTranslation } from "react-i18next";
import "./media.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeatherApp() {
  const { t, i18n } = useTranslation();
  const [weather, setwrather] = useState({
    mainTemp: null,
    min: null,
    max: null,
    dsicripltion: null,
  });
  const [imgSrc, setingSrc] = useState("");
  const [time, settime] = useState("");

  const [result, dispatch] = useReducer(reducer, {
    lat: "15.5",
    lon: "32.5",
  });
  const [lang, dispatchlang] = useReducer(langRedu, "en");
  useEffect(() => {
    moment.locale(lang);
    settime(moment().format("LL"));
    i18n.changeLanguage(lang);
  }, [lang]);
  console.log(lang);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lon}&appid=Af84ae3648969531d764cf3b9d4083fd&units=metric&lang=ar`
      )
      .then((response) => {
        // setwrather(response.data);
        setwrather({
          mainTemp: Math.round(response.data.main.temp),
          max: Math.round(response.data.main.temp_max),
          min: Math.round(response.data.main.temp_min),
          dsicripltion: response.data.weather[0].description,
        });

        // Exctract valu from API
        setingSrc(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
        );
      })
      .catch((error) => {
        // console.log(error.message);
        setwrather(error.message);
      })
      .finally(() => {
        // console.log("done API");
      });
  }, [result]);
  if (!weather) return "Somthing Wrong Plase try agin";

  function selectcity(e) {
    dispatch({ type: e, payload: "" });
  }

  function handelLanguge() {
    dispatchlang({ type: i18n.language, payload: "" });
  }
  return (
    <>
      <select
        style={{
          padding: "10px",
          borderRadius: "10px 15px",
          background: "#3949ab",
          color: "white",
          margin: "30px",
        }}
        onChange={(e) => {
          selectcity(e.target.value);
        }}
      >
        <option value="Khartom">{t("Khartom")}</option>
        <option value="Marawi">{t("Marawi")}</option>
        <option value="Al-Fashaqah">{t("Al-Fashaqah")}</option>
        <option value="Tandalty">{t("Tandalty")}</option>
      </select>
      <main
        className="main"
        style={{
          background: "#3949AB",
          padding: `${window.innerWidth < 500 ? "10px 20px" : "20px 30px"}`,
          borderRadius: "13px",
          width: `${window.innerWidth < 500 ? "95%" : "60%"}`,
        }}
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <h1 style={{ fontWeight: "200" }}>
              {t("Weather")}
          </h1>
          <p>{time}</p>
        </div>
        <hr />
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ width: "50%" }}>
            <div>
              <h1>
                <SkeletonTheme
                  baseColor="rgb(14 56 141)"
                  highlightColor="#b9aeaeff"
                >
                  {weather.mainTemp || (
                    <Skeleton
                      circle="true"
                      style={{ height: "150px", width: "150px" }}
                    />
                  )}
                </SkeletonTheme>
              </h1>
            </div>
            <h3>
              <SkeletonTheme
                baseColor="rgb(14 56 141)"
                highlightColor="#b9aeaeff"
              >
                {weather.dsicripltion || <Skeleton />}
              </SkeletonTheme>
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{}}>
                <SkeletonTheme
                  baseColor="rgb(14 56 141)"
                  highlightColor="#b9aeaeff"
                >
                  {t("min")} :{weather.min || <Skeleton />}
                </SkeletonTheme>
              </p>

              <p>
                <SkeletonTheme
                  baseColor="rgb(14 56 141)"
                  highlightColor="#b9aeaeff"
                >
                  {t("max")} : {weather.max || <Skeleton />}
                </SkeletonTheme>
              </p>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <SkeletonTheme
              baseColor="rgb(14 56 141)"
              highlightColor="#b9aeaeff"
            >
              <img src={imgSrc} alt="" style={{ width: "100%" }} /> 
            </SkeletonTheme>
          </div>
        </div>
      </main>
      <div
        style={{
          width: `${window.innerWidth < 500 ? "90%" : "60%"}`,
          textAlign: "end",
          paddingTop: "20px",
        }}
      >
        <h3
          style={{
            fontFamily: "emoji",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "25px",
          }}
          onClick={() => {
            handelLanguge();
          }}
        >
          {t("العربية")}
        </h3>
      </div>
    </>
  );
}
