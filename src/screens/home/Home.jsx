import React, { useEffect, useRef, useState } from "react";

import "./Home.css";
import Navigation from "../../components/navigation/Navigation";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import Category from "../category/Category";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("section0");
  const [categories, setCategories] = useState([]);
  const [tmpState, setTmpState] = useState(false);
  const noScrollRef = useRef(null);

  const [menu, setMenu] = useState([]);

  const [userOrderItems, setUserOrderItems] = useState([]);

  const getMenu = async () => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/api/items/getmenu`,
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);

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

    const noScrollDiv = noScrollRef.current;

    const blockScroll = (event) => {
      const deltaY = Math.abs(event.deltaY);
      const deltaX = Math.abs(event.deltaX);
      if (deltaX > deltaY) {
        event.preventDefault();
      }
    };
    noScrollDiv.addEventListener("wheel", blockScroll, { passive: false });
    noScrollDiv.addEventListener("touchmove", blockScroll, { passive: false });
    // Remove os listeners quando o componente é desmontado
    return () => {
      noScrollDiv.removeEventListener("wheel", blockScroll);
      noScrollDiv.removeEventListener("touchmove", blockScroll);
    };
  }, []);

  return (
    <>
      <Loading loading={loading} message={"Carregando..."} />
      <div className="page-background">
        <Header />
        <Navigation
          categories={categories}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="page-background">
          <div
            ref={noScrollRef}
            className="d-flex flex-nowrap page-background"
            style={{
              width: "100%",
              zIndex: "2",
              top: 94,
              position: "absolute",
              whiteSpace: "nowrap",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {menu.map((categoryMenu, index) => {
              return (
                <section key={index} id={`section${index}`}>
                  <div
                    className="page-background"
                    style={{
                      minWidth: "100vw",
                    }}
                  >
                    <Category categoryMenu={categoryMenu} />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
