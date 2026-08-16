import { useState, useEffect } from "react";

function App() {
  const [information, setInformation] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error("Couldn't fetch the data");
        }

        const data = await response.json();
        setInformation(data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <main className="container">
        <div className="header">
          <section className="header-section">
            <h1>My balance</h1>
            <p className="total">$921.48</p>
          </section>
          <div className="img-container">
            <img src="./logo.svg" alt="logo" />
          </div>
        </div>
        <div className="main">
          <h2>Spending - Last 7 days</h2>
          <div className="bars-container">
            {information.map((info, index) => {
              return (
                <div key={index} className="bar-box">
                  <div
                    className="tooltip"
                    style={{ visibility: hovered === index ? "visible" : "hidden" }}
                  >
                    ${info.amount}
                  </div>
                  <span
                    className={index === 2 ? "bar blue" : "bar"}
                    style={{
                      height: `${info.amount}%`,
                      filter: hovered === index ? "brightness(125%)" : "brightness(100%)",
                    }}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  ></span>
                  <p className="day">{info.day}</p>
                </div>
              );
            })}
          </div>
          <div className="footer">
            <div>
              <h3>Total this month</h3>
              <span className="monthly-total">$478.33</span>
            </div>
            <div className="footer-percent">
              <span>+2.4%</span>
              <p>from last month</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by <a href="https://www.frontendmentor.io/profile/verakissyou17">Vera</a>.
      </footer>
    </>
  );
}

export default App;
