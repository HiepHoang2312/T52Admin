import News from "Components/News/News";
import NewDetail from "Components/News/NewsDetail/NewDetail";
import PartnerList from "Components/Partner/PartnerList";
import StoreList from "Components/Store/StoreList";
import AdminPage from "Pages/Admin/AdminPage";
import Login from "Pages/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

            <Route path="store" element={<StoreList />}></Route>

            <Route path="newsList" element={<News />}></Route>
            <Route
              path="newsList/chi-tiet-tin/:name"
              element={<NewDetail />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
