import IngredientsInput from "./IngredientsInput";
import Search from "../Search/Search";
import IngredientsList from "../Ingredients/IngredientsList";
import { useState, useEffect, useCallback, useReducer } from "react";
import React from "react";
import ErrorModal from "../ui/ErrorModal";

const initialState = {
  loadingSpinner: false,
  error: false,
};

const reducer = (curState, action) => {
  switch (action.type) {
    case "SETLOADING":
      return { ...curState, loadingSpinner: true };
    case "REMOVELOADING":
      return { ...curState, loadingSpinner: false };
    case "SETERROR":
      return { loadingSpinner: false, error: action.error };
    case "REMOVEERROR":
      return { ...curState, error: null };
    default:
      throw new Error("shold not get there");
  }
};

const ingridientReducer = (prevState, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients
    case "ADD":
      return [...prevState,action.ingredients]
    case 'FETCH':
      return action.response  
    case "DELETE":
      return prevState.filter(ingredient=>ingredient.id !== action.IdFromFirebase)
    default:
      throw new Error("should not get there");
  }
};

const Ingredients = () => {
  const [recieveData, setRecieveData] = useState([]);
  // const [loadingSpinner, setLoadingSpinner] = useState(false);
  // const [error,setError] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userIngredients, dispatching] = useReducer(ingridientReducer, []);

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
        // setRecieveData(responseData);
        dispatching({type:'FETCH',response:responseData})
      });
  }, []);

  const setData = (sendData) => {
    // setLoadingSpinner(true);
    dispatch({ type: "SETLOADING" });
    fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json", {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setLoadingSpinner(false);
        dispatch({ type: "REMOVELOADING" });
        dispatching({type:'ADD', ingredients:{...sendData,id:data.name}})
        // setRecieveData((prevIngredients) => {
        //   return [...prevIngredients, { ...sendData, id: data.name }];
        // });
      })
      .catch((error) => {
        // setError(error.message)
        // setLoadingSpinner(false)
        dispatch({ type: "SETERROR", error: error.message });
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
        // setRecieveData((prevIngredients) => {
        //   return prevIngredients.filter(
        //     (ingredient) => ingredient.id !== IdFromFirebase
        //   );
        // });
        dispatching({type:'DELETE',IdFromFirebase:IdFromFirebase})
      });
  };

  const searchHandler = useCallback((filteredIngredients) => {
    dispatching({type:'SET',ingredients:filteredIngredients})
  }, []);

  const closeErrorModal = () => {
    // setError(null)
    dispatch({ type: "REMOVEERROR" });
  };

  const error = state.error;
  const loadingSpinner = state.loadingSpinner;
  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          error={error}
          close={closeErrorModal}
          errorMessage="An Error Occurred!"
        />
      )}
      <div>
        <IngredientsInput onSend={setData} loading={loadingSpinner} />
        <Search search={searchHandler} />
        <IngredientsList data={userIngredients} removeHandler={remove} />
      </div>
    </React.Fragment>
  );
};
export default Ingredients;
