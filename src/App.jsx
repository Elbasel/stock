import { useState } from "react";
import { AddItem } from "./components/AddItem";
import { ItemList } from "./components/ItemList";
import { SearchBar } from "./components/SearchBar";
import { MantineProvider } from "@mantine/core";
import Parse from "parse/dist/parse.min.js";
import { useEffect } from "react";

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

  useEffect(() => {
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
    var subscription = client.subscribe(query);
    subscription.on("update", (object) => {
      console.log(object);
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
      console.log("object updated");
    });

    subscription.on("create", (object) => {
      refreshData();
    });

    subscription.on("delete", (object) => {
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

  const handleAdd = (v) => {
    // setItemsState(itemsState.concat(v));

    (async () => {
      const myNewObject = new Parse.Object("item");
      myNewObject.set("title", v.title);
      myNewObject.set("count", v.count);
      myNewObject.set("imageUrl", v.imageUrl);
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log("item created", result);
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
        console.log("Deleted ParseObject", response);
      } catch (error) {
        console.error("Error while deleting ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }
  };

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="h-screen w-screen absolute overflow-hidden pt-20">
        <SearchBar onSearchInput={handleSearchInput} />
        <AddItem onAdd={handleAdd} />

        <ItemList
          items={filteredItems || itemsState}
          onItemIncrement={handleIncrement}
          onItemDecrement={handleDecrement}
          OnItemCountEdit={handleCountEdit}
          onItemDelete={handleItemDelete}
        />
      </div>
    </MantineProvider>
  );
}

export default App;
