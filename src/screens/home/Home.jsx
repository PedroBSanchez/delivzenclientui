import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import Navigation from "../../components/navigation/Navigation";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import Category from "../category/Category";
import Info from "../info/Info";
import { deepEqual } from "../../shared/DeepEqual";
import Swal from "sweetalert2";
import Payment from "../payment/Payment";
import Confirm from "../confirm/Confirm";
import { apiUrl } from "../../shared/config";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("section0");
  const [categories, setCategories] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tmpState, setTmpState] = useState(false);
  const [scroll, setScroll] = useState(false);
  const noScrollRef = useRef(null);

  const [menu, setMenu] = useState([]);

  const [userOrderItems, setUserOrderItems] = useState([]);

  const handleAddUserOrderItem = (item) => {
    const isItemInOrder = userOrderItems.some((obj) => obj._id === item._id);
    if (isItemInOrder) {
      let itemInOrder = userOrderItems.find((e) => e._id == item._id);

      if (
        itemInOrder.amount != item.amount ||
        !isChangedAdditional(itemInOrder.additional, item.additional)
      ) {
        const indexInOrder = userOrderItems.findIndex(
          (e) => e._id == itemInOrder._id
        );
        let arrayUserOrderItems = userOrderItems;
        arrayUserOrderItems.splice(indexInOrder, 1);
        arrayUserOrderItems.push(item);
        setUserOrderItems(arrayUserOrderItems);

        //Remove value of the item that is already in order
        let additionalValuesItemInOrder = 0;
        let itemPriceItemInOrder = 0;

        itemInOrder.additional.map((element) => {
          additionalValuesItemInOrder += element.value;
        });

        itemPriceItemInOrder =
          (itemInOrder.value + additionalValuesItemInOrder) *
          itemInOrder.amount;

        //Add value of the update item
        let additionalValues = 0;
        let itemPrice = 0;

        item.additional.map((element) => {
          additionalValues += element.value;
        });

        itemPrice = (item.value + additionalValues) * item.amount;

        let newTotalPrice = totalPrice + itemPrice - itemPriceItemInOrder;
        setTotalPrice(newTotalPrice);

        Swal.fire({ title: "Carrinho atualizado", icon: "success" });
      } else {
        Swal.fire({ text: "Carrinho não alterado", icon: "warning" });
      }
    } else {
      let arrayUserOrderItems = [...userOrderItems, item];
      setUserOrderItems(arrayUserOrderItems);

      let additionalValues = 0;
      let itemPrice = 0;

      item.additional.map((element) => {
        additionalValues += element.value;
      });

      itemPrice = (item.value + additionalValues) * item.amount;

      setTotalPrice(totalPrice + itemPrice);
      Swal.fire({ title: "Item adicionado", icon: "success" });
    }
  };

  const handleRemoveUserOrderItem = (item) => {
    const isItemInOrder = userOrderItems.some((obj) => obj._id === item._id);
    if (isItemInOrder) {
      const indexInOrder = userOrderItems.findIndex((e) => e._id == item._id);

      let additionalValues = 0;
      let itemPrice = 0;

      userOrderItems[indexInOrder].additional.map((element) => {
        additionalValues += element.value;
      });

      itemPrice =
        (userOrderItems[indexInOrder].value + additionalValues) *
        userOrderItems[indexInOrder].amount;

      let newPrice = totalPrice - itemPrice;
      setTotalPrice(newPrice);

      let arrayUserOrderItems = userOrderItems;
      arrayUserOrderItems.splice(indexInOrder, 1);
      setUserOrderItems(arrayUserOrderItems);

      Swal.fire({ title: "Item removido", icon: "success" });
    } else {
      Swal.fire({ text: "Item não existe no carrinho", icon: "warning" });
    }
  };

  const getMenu = async () => {
    const options = {
      method: "GET",
      url: `${apiUrl}/api/items/getmenu`,
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
        navigate("/");
      });
  };

  const isChangedAdditional = (array1, array2) => {
    if (array1.length != array2.length) {
      return false;
    }

    for (let index = 0; index < array1.length; index++) {
      if (array1[index].code != array2[index].code) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    getMenu();

    const noScrollDiv = noScrollRef.current;

    const blockScroll = (event) => {
      const deltaY = Math.abs(event.deltaY);
      const deltaX = Math.abs(event.deltaX);
      if (deltaX > deltaY || !scroll) {
        //event.preventDefault();
      }
    };
    //noScrollDiv.addEventListener("wheel", blockScroll, { passive: false });
    //noScrollDiv.addEventListener("touchmove", blockScroll, { passive: false });
    // Remove os listeners quando o componente é desmontado
    return () => {
      //noScrollDiv.removeEventListener("wheel", blockScroll);
      //noScrollDiv.removeEventListener("touchmove", blockScroll);
    };
  }, []);

  //Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [observations, setObservations] = useState("");

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
            id="horizontalScrollDiv"
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
                      minHeight: "100vh",
                    }}
                  >
                    <Category
                      categoryMenu={categoryMenu}
                      handleAddUserOrderItem={handleAddUserOrderItem}
                      userOrderItems={userOrderItems}
                      handleRemoveUserOrderItem={handleRemoveUserOrderItem}
                      setActiveItem={setActiveItem}
                      activeItem={activeItem}
                      totalPrice={totalPrice}
                      setTotalPrice={setTotalPrice}
                    />
                  </div>
                </section>
              );
            })}

            <section id={`sectionInfo`}>
              <div className="page-background" style={{ minWidth: "100vw" }}>
                <Info
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                  addressNumber={addressNumber}
                  setAddressNumber={setAddressNumber}
                  neighborhood={neighborhood}
                  setNeighborhood={setNeighborhood}
                  complement={complement}
                  setComplement={setComplement}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </div>
            </section>
            <section id={`sectionPayment`}>
              <div className="page-background" style={{ minWidth: "100vw" }}>
                <Payment
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  observations={observations}
                  setObservations={setObservations}
                />
              </div>
            </section>
            <section id={`sectionConfirm`}>
              <div className="page-background" style={{ minWidth: "100vw" }}>
                <Confirm
                  userOrderItems={userOrderItems}
                  name={name}
                  phone={phone}
                  address={address}
                  addressNumber={addressNumber}
                  neighborhood={neighborhood}
                  complement={complement}
                  paymentMethod={paymentMethod}
                  observations={observations}
                  handleRemoveUserOrderItem={handleRemoveUserOrderItem}
                  totalPrice={totalPrice}
                  setLoading={setLoading}
                  activeItem={activeItem}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
