import AddClient from "Components/Client/AddClient/AddClient";
import ClientList from "Components/Client/ClientList";
import AddNews from "Components/News/AddNews/AddNews";
import News from "Components/News/News";

import PartnerList from "Components/Partner/PartnerList";
import AddStore from "Components/Store/AddStore/AddStore";
import StoreDetail from "Components/Store/StoreDetail/StoreDetail";
import StoreList from "Components/Store/StoreList";
import AdminPage from "Pages/Admin/AdminPage";
import Login from "Pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminTemplate from "Templates/AdminTemplate";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />}></Route>

        <Route path="admin" element={<AdminTemplate />}>
          <Route path="" element={<AdminPage />}>
            <Route path="partner" element={<PartnerList />}></Route>
            <Route path="store/storeDetail" element={<StoreDetail />}></Route>
            <Route path="store/addStore" element={<AddStore />}></Route>
            <Route path="client" element={<ClientList />}></Route>
            <Route path="client/addClient" element={<AddClient />}></Route>

            <Route path="store" element={<StoreList />}></Route>

            <Route path="newsList" element={<News />}></Route>
            <Route path="newsList/addNews" element={<AddNews />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
