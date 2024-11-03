import ToolBar from "./components/ToolBar/ToolBar.tsx";
import Home from "./containers/Home/Home.tsx";
import { Route, Routes } from "react-router-dom";
import Admin from "./containers/Admin/Admin.tsx";
import {useCallback, useEffect, useState} from "react";
import {Pages} from "./types.ts";
import axiosApi from "./axiosApi.ts";

const App = () => {
    document.body.style.backgroundColor = "rgba(246,155,155,0.75)";
    document.body.style.color = "#fff";

    const [pages, setPages] = useState<Pages[]>([]);

    const request = useCallback(async () => {
        try {
            const {data: res} = await axiosApi.get('pages.json');
            const data = Object.keys(res).map(p => ({
                ...res[p], id: p
            }))
            setPages(data);
        } catch (e) {
            console.error(e);
        }
    }, [])

    useEffect(() => {
        void request()
    }, [request])

    const updatePage = useCallback(() => {
        void request()
    }, [request]);

    return (
        <>
            <header>
                <ToolBar pages={pages}/>
            </header>
            <main className="container">
                <Routes>
                    <Route path="/pages/home" element={<Home />} />
                    <Route path="/pages/:pageName" element={<Home />} />
                    <Route path="/admin" element={<Admin updatePage={updatePage} />} />
                </Routes>
            </main>
        </>
    );
};

export default App;