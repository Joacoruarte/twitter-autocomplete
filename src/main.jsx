import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";

const searchClient = algoliasearch(
  "latency",
  "a4390aa69f26de2fd0c4209ff113a4f9"
);

const INDEX_NAME = "autocomplete_twitter_accounts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
      <App />
    </InstantSearch>
  </React.StrictMode>
);
