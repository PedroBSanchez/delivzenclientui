import React, { useEffect, useState } from "react";

import "./Home.css";
import Navigation from "../../components/navigation/Navigation";
import axios from "axios";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tmpState, setTmpState] = useState(false);

  const [menu, setMenu] = useState([]);

  const [userOrderItems, setUserOrderItems] = useState([]);

  const getMenu = async () => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/api/items/getmenu`,
    };
    h;
    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        console.log(response.data);

        let arrayCategories = [];
        response.data.map((menuCategory, index) => {
          if (menuCategory.items && menuCategory.items.length > 0) {
            arrayCategories.push({
              category: menuCategory.category,
              index: index,
            });
          }
        });

        setCategories(arrayCategories);
        setMenu(response.data);
        setTmpState(!tmpState);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div style={{ top: 0 }}>
        <Navigation categories={categories} />
      </div>
      <div className="page-background mt-5">
        <div className="container-fluid">
          <div className="row overflow-auto" style={{ whiteSpace: "nowrap" }}>
            <div className="col">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <section id="sectionInicial">
                  <div className="section-container ">
                    <h2>Content for inicial</h2>
                  </div>
                </section>

                {categories.map((category, index) => {
                  return (
                    <section id={`section${index}`} key={index}>
                      <div className="section-container">
                        <h2>{category.category}</h2>
                      </div>
                    </section>
                  );
                })}
                <section id="sectionFinal">
                  <div className="section-container">
                    <h2>Content for Final</h2>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loading loading={loading} />
    </>
  );
};

export default Home;
