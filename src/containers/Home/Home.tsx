import axiosApi from "../../axiosApi.ts";
import { useCallback, useEffect, useState } from "react";
import {Page} from "../../types.ts";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";

const Home = () => {
    const { pageName } = useParams();
    const [spinner, setSpinner] = useState(false);
    const [page, setPage] = useState<Page>({
        name: '',
        title: '',
        content: '',
    });

    const getData = useCallback(async () => {
        try {
            const { data } = await axiosApi.get<Page | null>(`pages/${pageName}.json`);
            if (data === null) {
                setPage({
                    title: '',
                    name: '',
                    content: ''
                })
            } else {
                setSpinner(true);
                setPage(data);
                setSpinner(false);
            }
        } catch (e) {
            console.log(e);
        }
    }, [pageName]);

    useEffect(() => {
        getData();
    }, [getData, pageName]);

    if (spinner) {
        return <Loader />
    }

    return (
        <div className="text-center mt-5 border b-1 p-3 shadow">
            <h1 className="h1">{page.title}</h1>
            <p className="fs-5">{page.content}</p>
        </div>
    );
};

export default Home;