import IngredientsInput from "./IngredientsInput";
import Search from "../Search/Search";
import IngredientsList from "../Ingredients/IngredientsList";
import { useState, useEffect,useCallback } from "react";
import React from "react";
import ErrorModal from "../ui/ErrorModal";

const Ingredients = () => {
  const [recieveData, setRecieveData] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [error,setError] = useState(null)

  useEffect(() => {
    fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json")
      .then((response) => response.json())
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
      }).catch(error=>{
        setError(error.message)
        setLoadingSpinner(false)
      })
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

  const searchHandler = useCallback((fiteredIngredients)=>{
    setRecieveData(fiteredIngredients)
  },[])

  const closeErrorModal =()=>{
    setError(null)
  }

  return (
    <React.Fragment>
    {error && <ErrorModal error={error} close={closeErrorModal} errorMessage='An Error Occurred!'/>}  
    <div>
      <IngredientsInput onSend={setData} loading={loadingSpinner} />
      <Search search={searchHandler} />
      <IngredientsList data={recieveData} removeHandler={remove} />
    </div>
    </React.Fragment>
  );
};
export default Ingredients;
