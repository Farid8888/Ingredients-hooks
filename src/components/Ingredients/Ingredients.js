import IngredientsInput from "./IngredientsInput";
import Search from "../Search/Search";
import IngredientsList from "../Ingredients/IngredientsList";
import { useState, useEffect } from "react";
import React from "react";

const Ingredients = () => {
  const [recieveData, setRecieveData] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const responseData = [];
        for (let key in data) {
          const newData = {
            ...data[key],
            id: key,
          };
          responseData.push(newData);
        }
        setRecieveData(responseData);
      });
  }, []);

  const setData = (sendData) => {
    setLoadingSpinner(true);
    fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json", {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoadingSpinner(false);
        setRecieveData((prevIngredients) => {
          return [...prevIngredients, { ...sendData, id: data.name }];
        });
      });
  };

  const remove = (IdFromFirebase) => {
    fetch(
      `https://auth-with-hooks-default-rtdb.firebaseio.com/form/${IdFromFirebase}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json)
      .then((data) => {
        setRecieveData((prevIngredients) => {
          return prevIngredients.filter(
            (ingredient) => ingredient.id !== IdFromFirebase
          );
        });
      });
  };

  const searchHandler = (title) => {
    for (let i in recieveData) {
      console.log(recieveData);
      console.log(i);
      const titleInArray = recieveData[i].title;
      console.log(titleInArray);
      if (titleInArray === title) {
        console.log("set");
        console.log(title);
        const query = `?orderBy="title"&equalTo="${title}"`;
        fetch(
          "https://auth-with-hooks-default-rtdb.firebaseio.com/form.json" +
            query
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const responseData = [];
            for (let key in data) {
              const newData = {
                ...data[key],
                id: key,
              };
              responseData.push(newData);
            }
            setRecieveData(responseData);
            i++;
          });
      }else {
        if (title.length === 0) {
          fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json")
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const responseData = [];
              for (let key in data) {
                const newData = {
                  ...data[key],
                  id: key,
                };
                responseData.push(newData);
              }
              setRecieveData(responseData);
            });
        }
      }
    }
  };

  return (
    <div>
      <IngredientsInput onSend={setData} loading={loadingSpinner} />
      <Search search={searchHandler} />
      <IngredientsList data={recieveData} removeHandler={remove} />
    </div>
  );
};
export default Ingredients;
