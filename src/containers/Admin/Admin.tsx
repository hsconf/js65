import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../components/Loader/Loader.tsx";
import { iPage, Page, Pages } from "../../types.ts";
import { useNavigate } from "react-router-dom";
import * as React from "react";

interface AdminProps {
    updatePage: () => void;
}

const Admin: React.FC<AdminProps> = ({ updatePage }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<Page>({
        name: '',
        title: '',
        content: '',
    });
    const [pages, setPages] = useState<Pages[]>([]);
    const [selectValue, setSelectValue] = useState<string>('');

    const navigate = useNavigate();

    const request = useCallback(async () => {
        try {
            const { data: res } = await axiosApi.get<iPage | null>('pages.json');
            if (res === null) {
                setPages([]);
            } else {
                const data = Object.keys(res).map(p => ({
                    ...res[p], id: p
                }));
                setPages(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        void request();
    }, [request]);

    useEffect(() => {
        if (selectValue) {
            const selectedPage = pages.find(p => p.id === selectValue);
            if (selectedPage) {
                setPage({
                    name: selectedPage.name,
                    title: selectedPage.title,
                    content: selectedPage.content,
                });
            }
        } else {
            setPage({
                name: '',
                title: '',
                content: '',
            });
        }
    }, [selectValue, pages]);

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPage((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const addPage = async () => {
        try {
            setLoading(true);
            if (selectValue) {
             await axiosApi.put(`pages/${selectValue}.json`, page);
             navigate(`/pages/${selectValue}`);
            } else {
                await axiosApi.post(`/pages.json`, page);
            }
            updatePage();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deletePage = async () => {
        if (selectValue) {
            try {
                await axiosApi.delete(`pages/${selectValue}.json`);
                updatePage();
                setSelectValue('');
                void request();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addPage();
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <form className="d-flex flex-column gap-2 w-50 mx-auto fs-4 fw-medium mt-5" onSubmit={onSubmit}>
            <div className="form-group">
                <select
                    name="pageName"
                    id="pageName"
                    className="form-control"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value)}
                    value={selectValue}
                >
                    <option value="">Select one</option>
                    {pages.map((page) => (
                        <option key={page.id} value={page.id}>{page.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="d-block">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={onHandleChange}
                    value={page.name}
                    required
                />
            </div>
            <div className="form-group">
                <label className="d-block">Title</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={onHandleChange}
                    value={page.title}
                    required
                />
            </div>
            <div className="form-group">
                <label className="d-block mb-1">Content</label>
                <textarea
                    className="form-control"
                    style={{ height: 150 }}
                    name="content"
                    onChange={onHandleChange}
                    value={page.content}
                    required
                />
            </div>
            <button className="btn btn-outline-secondary mt-2" type="submit">Save</button>
            {selectValue && (
                <button
                    className="btn btn-outline-danger mt-2"
                    type="button"
                    onClick={deletePage}
                >
                    Delete page
                </button>
            )}
        </form>
    );
};

export default Admin;
