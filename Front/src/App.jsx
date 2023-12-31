import { useState } from "react";
import "axios";
import axios from "axios";
import { apiUrl } from "./config";

function App() {
  const inputStyles = {
    width: "100%",
    padding: "1.5rem 1rem",
    borderRadius: "12px",
    border: "none",
  };
  const [email, setEmail] = useState("");
  const [coin, setCoin] = useState("");
  const [percent, setPercent] = useState(0);

  const [coinToGetData, setCoinToGetData] = useState("");
  const [coinData, setCoinData] = useState();

  function handleSubscribe(e) {
    e.preventDefault();
    axios
      .post(apiUrl + "subscribe", {
        email_addr: email,
        coin_name: coin,
        price_change: parseInt(percent),
      })
      .then((res) => {
        if (res.status) {
          alert("Subscription Succeed");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  function handleGetCoin(e) {
    e.preventDefault();
    axios
      .post(apiUrl + "price", {
        coin_name: coinToGetData,
      })
      .then((res) => {
        if (res.status) {
          setCoinData(res.data.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "start",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "40%",
            padding: "0 5%",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              textAlign: "center",
            }}
            onSubmit={handleGetCoin}
          >
            <h2>Coin History</h2>
            <input
              style={inputStyles}
              type="text"
              placeholder="Coin Name"
              value={coinToGetData}
              onChange={(e) => setCoinToGetData(e.target.value)}
              required
            />
            <input
              style={{
                ...inputStyles,
                boxSizing: "content-box",
                cursor: "pointer",
                backgroundColor: "#22f",
              }}
              type="submit"
              value="Submit"
            />
          </form>
          <br />
          {coinData?.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: "12px",
              }}
            >
              <span>date: {item?.date}</span>&nbsp;
              <span>| value: {item?.value}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "35%",
            padding: "0 5%",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: "1rem",
            }}
            onSubmit={handleSubscribe}
          >
            <h2>Subscription Form</h2>
            <input
              style={inputStyles}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              style={inputStyles}
              type="text"
              placeholder="Coin Name"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              required
            />
            <input
              style={inputStyles}
              placeholder="Percentage"
              type="number"
              value={percent}
              min={0}
              max={100}
              onChange={(e) => setPercent(e.target.value)}
              required
            />
            <input
              style={{
                ...inputStyles,
                boxSizing: "content-box",
                cursor: "pointer",
                backgroundColor: "#22f",
              }}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
