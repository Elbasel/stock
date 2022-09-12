import { useState } from "react";
import { AddItem } from "./components/AddItem";
import { ItemList } from "./components/ItemList";
import { SearchBar } from "./components/SearchBar";
import { MantineProvider } from "@mantine/core";
import Parse from "parse/dist/parse.min.js";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { TextInput } from "@mantine/core";
import { createRef } from "react";
import { CategoryFilter } from "./components/CategoryFilter";

Parse.serverURL = "https://stock.b4a.io";
Parse.initialize(
  "Ree9q8bPMbA4c9rW4zfcQ0vxJyXNDJS16KfNvwDr",
  "wqlg8l2fnyxmFdmhPJYTOTV4rdAxrIl3XnOw2otE"
);

//creating items
// (async () => {
//   const myNewObject = new Parse.Object("item");
//   myNewObject.set("title", "A string");
//   myNewObject.set("count", 1);
//   myNewObject.set("imageUrl", "A string");
//   try {
//     const result = await myNewObject.save();
//     // Access the Parse Object attributes using the .GET method
//     console.log("item created", result);
//   } catch (error) {
//     console.error("Error while creating item: ", error);
//   }
// })();

// Updating Objects
// (async () => {
//   const item = Parse.Object.extend("item");
//   const query = new Parse.Query(item);
//   try {
//     // here you put the id that you want to update
//     const object = await query.get("VhNApmbyZh");
//     object.set("title", "updated string");
//     object.set("count", 1);
//     object.set("imageUrl", "A string");
//     try {
//       const response = await object.save();
//       // You can use the "get" method to get the value of an attribute
//       // Ex: response.get("<ATTRIBUTE_NAME>")
//       // Access the Parse Object attributes using the .GET method
//       console.log(response.get("title"));
//       console.log(response.get("count"));
//       console.log(response.get("imageUrl"));
//       console.log("item updated", response);
//     } catch (error) {
//       console.error("Error while updating item", error);
//     }
//   } catch (error) {
//     console.error("Error while retrieving object item", error);
//   }
// })();

// Reading Objects

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function App() {
  const [itemsState, setItemsState] = useState([]);
  const [categoryState, setCategoryState] = useState([]);

  useEffect(() => {
    (async () => {
      const category = Parse.Object.extend("category");
      const query = new Parse.Query(category);
      // You can also query by using a parameter of an object
      // query.equalTo('objectId', 'xKue915KBG');
      try {
        const results = await query.find();
        setCategoryState(results);
      } catch (error) {
        console.error("Error while fetching category", error);
      }
    })();

    (async () => {
      const item = Parse.Object.extend("item");
      const query = new Parse.Query(item);
      // You can also query by using a parameter of an object
      // query.equalTo('id', 'xKue915KBG');
      try {
        const results = await query.find();
        setItemsState(results);
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          // const title = object.get("title");
          // const count = object.get("count");
          // const imageUrl = object.get("imageUrl");
          // console.log(title);
          // console.log(count);
          // console.log(imageUrl);
        }
      } catch (error) {
        console.error("Error while fetching item", error);
      }
    })();

    var client = new Parse.LiveQueryClient({
      applicationId: "Ree9q8bPMbA4c9rW4zfcQ0vxJyXNDJS16KfNvwDr",
      serverURL: "wss://" + "stock.b4a.io",
      javascriptKey: "wqlg8l2fnyxmFdmhPJYTOTV4rdAxrIl3XnOw2otE",
    });
    client.open();

    var query = new Parse.Query("item");
    query.ascending("createdAt").limit(5);
    var itemSubscription = client.subscribe(query);

    var categoryQuery = new Parse.Query("category");
    categoryQuery.ascending("createdAt").limit(5);
    var categorySubscription = client.subscribe(categoryQuery);

    categorySubscription.on("create", (object) => {
      (async () => {
        const category = Parse.Object.extend("category");
        const query = new Parse.Query(category);
        // You can also query by using a parameter of an object
        // query.equalTo('id', 'xKue915KBG');
        try {
          const results = await query.find();
          setCategoryState(results);
        } catch (error) {
          console.error("Error while fetching item", error);
        }
      })();
    });
    categorySubscription.on("delete", () => {
      (async () => {
        const category = Parse.Object.extend("category");
        const query = new Parse.Query(category);
        try {
          const results = await query.find();
          setCategoryState(results);
        } catch (error) {
          console.error("Error while fetching item", error);
        }
      })();
    });

    itemSubscription.on("update", (object) => {
      (async () => {
        const item = Parse.Object.extend("item");
        const query = new Parse.Query(item);
        // You can also query by using a parameter of an object
        // query.equalTo('id', 'xKue915KBG');
        try {
          const results = await query.find();
          setItemsState(results);
        } catch (error) {
          console.error("Error while fetching item", error);
        }
      })();
    });

    itemSubscription.on("create", (object) => {
      refreshData();
    });

    itemSubscription.on("delete", (object) => {
      refreshData();
    });
  }, []);

  const [filteredItems, setFilteredItems] = useState(null);

  const refreshData = () => {
    (async () => {
      const item = Parse.Object.extend("item");
      const query = new Parse.Query(item);
      // You can also query by using a parameter of an object
      // query.equalTo('id', 'xKue915KBG');
      try {
        const results = await query.find();
        setItemsState(results);
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          // const title = object.get("title");
          // const count = object.get("count");
          // const imageUrl = object.get("imageUrl");
          // console.log(title);
          // console.log(count);
          // console.log(imageUrl);
        }
      } catch (error) {
        console.error("Error while fetching item", error);
      }
    })();
  };

  const handleIncrement = async (id) => {
    const item = Parse.Object.extend("item");
    const query = new Parse.Query(item);
    try {
      const object = await query.get(id);
      object.set("count", object.get("count") + 1);
      try {
        const response = await object.save();
      } catch (error) {
        console.error("Error while updating item", error);
      }
    } catch (error) {
      console.error("Error while retrieving object item", error);
    }

    // if (filteredItems) {
    //   setFilteredItems(
    //     filteredItems.map((item) =>
    //       item.id === id ? { ...item, count: item.get("count") + 1 } : item
    //     )
    //   );
    // }
  };

  const handleDecrement = async (id) => {
    const item = Parse.Object.extend("item");
    const query = new Parse.Query(item);
    try {
      const object = await query.get(id);
      object.set("count", object.get("count") - 1);
      try {
        const response = await object.save();
      } catch (error) {
        console.error("Error while updating item", error);
      }
    } catch (error) {
      console.error("Error while retrieving object item", error);
    }

    // if (filteredItems) {
    //   setFilteredItems(
    //     filteredItems.map((item) =>
    //       item.id === id ? { ...item, count: item.get("count") - 1 } : item
    //     )
    //   );
    // }
  };

  const handleCountEdit = async (id, newCount) => {
    if (!isNumeric(newCount)) {
      alert("Must be a number!");
      setItemsState(items);
      setFilteredItems(filteredItems);
      return;
    }

    const item = Parse.Object.extend("item");
    const query = new Parse.Query(item);
    try {
      const object = await query.get(id);
      object.set("count", +newCount);
      try {
        const response = await object.save();
      } catch (error) {
        console.error("Error while updating item", error);
      }
    } catch (error) {
      console.error("Error while retrieving object item", error);
    }

    // if (filteredItems) {
    //   setFilteredItems(
    //     filteredItems.map((item) =>
    //       item.id === id ? { ...item, count: +newCount } : item
    //     )
    //   );
    // }
  };

  const handleSearchInput = (value) => {
    if (value === "") {
      setFilteredItems(null);
    } else
      setFilteredItems(
        itemsState.filter((item) => {
          return item.get("title").toLowerCase().includes(value.toLowerCase());
        })
      );
  };

  const handleCategoryFilter = (text) => {
    if (localStorage.getItem("text") === text) {
      setFilteredItems(null);
      localStorage.setItem("text", "");
      return;
    }

    localStorage.setItem("text", text);

    setFilteredItems(
      itemsState.filter((item) => {
        return item.get("category").toLowerCase() === text.toLowerCase();
      })
    );
  };

  const handleAdd = (v) => {
    // setItemsState(itemsState.concat(v));

    if (v.imageUrl === "") {
      v.imageUrl = `https://ui-avatars.com/api/?name=${v.title}&background=0D8ABC&color=fff`;
    }

    (async () => {
      const myNewObject = new Parse.Object("item");
      myNewObject.set("title", v.title);
      myNewObject.set("count", v.count);
      myNewObject.set("imageUrl", v.imageUrl);
      myNewObject.set("category", v.category);
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
      } catch (error) {
        console.error("Error while creating item: ", error);
      }
    })();
  };

  const handleItemDelete = async (id) => {
    const query = new Parse.Query("item");
    try {
      // here you put the objectId that you want to delete
      const object = await query.get(id);
      try {
        const response = await object.destroy();
      } catch (error) {
        console.error("Error while deleting ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }

    if (filteredItems) {
      setFilteredItems(filteredItems.filter((item) => item.id !== id));
    }
  };

  const categoryInputRef = createRef();

  const handleAddCategory = () => {
    const value = categoryInputRef.current.value;

    if (value === "") return;
    if (categoryState.map((c) => c.get("name")).includes(value)) return;

    (async () => {
      const myNewObject = new Parse.Object("category");
      myNewObject.set("name", value);
      try {
        await myNewObject.save();
      } catch (error) {
        console.error("Error while creating item: ", error);
      }
    })();

    categoryInputRef.current.value = "";
  };

  const handleDeleteCategory = async (id) => {
    const query = new Parse.Query("category");
    try {
      // here you put the objectId that you want to delete
      const object = await query.get(id);
      try {
        const response = await object.destroy();
      } catch (error) {
        console.error("Error while deleting ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }
  };

  const addCategoryButtonRef = createRef();

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="flex h-screen w-screen absolute sm:flex-row flex-col">
        <div className="sm:w-1/2">
          <div className=" pt-20">
            <SearchBar onSearchInput={handleSearchInput} />
            <CategoryFilter
              categories={categoryState}
              onFilterClick={handleCategoryFilter}
            />
            <AddItem onAdd={handleAdd} categories={categoryState} />
            <ItemList
              items={filteredItems || itemsState}
              onItemIncrement={handleIncrement}
              onItemDecrement={handleDecrement}
              OnItemCountEdit={handleCountEdit}
              onItemDelete={handleItemDelete}
            />
          </div>
        </div>
        <div className=" w-full sm:w-1/2 h-32 p-4 flex flex-col gap-3 ">
          <h1>Categories</h1>

          <ul className="flex flex-col gap-3">
            {categoryState.map((c) => (
              <div
                key={c.id}
                className=" bg-red-300 p-2 rounded-md flex justify-between items-center"
              >
                <li className="text-3xl text-black capitalize ">
                  {c.get("name")}
                </li>
                <button
                  className="active:scale-90"
                  onClick={() => handleDeleteCategory(c.id)}
                >
                  <AiOutlineDelete color="black" size={24} />
                </button>
              </div>
            ))}
          </ul>
          <div className="bg-green-300 p-2 rounded-md ">
            <div className="flex justify-between items-center">
              <p className="text-3xl text-black">Add Category</p>
              <button
                ref={addCategoryButtonRef}
                onClick={handleAddCategory}
                className="bg-white rounded-full p-2 outline-none active:scale-95"
              >
                <AiOutlinePlus color="black" size={24} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <TextInput
                onKeyDown={(e) => {
                  if (e.key === "Enter") addCategoryButtonRef.current.click();
                }}
                ref={categoryInputRef}
                className="w-full text-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
