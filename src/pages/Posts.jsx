import React, { useEffect, useState } from "react"
import axios, { Axios } from "axios"
import PostService from "../API/PostService"
import ClassCounter from "../components/ClassCounter"
import PostFilter from "../components/PostFilter"
import PostForm from "../components/PostForm"
import PostItem from "../components/PostItem"
import PostList from "../components/PostList"
import MyButton from "../components/UI/button/MyButton"
import MyInput from "../components/UI/input/MyInput"
import MySelect from "../components/UI/select/MySelect"
import Loader from "../components/UI/Loader/Loader"
import MyModal from "../components/UI/MyModal/MyModal"
import { usePosts } from "../hooks/usePosts"
import { useFetching } from "../hooks/useFetching"
import { getPageCount, getPagesArray } from "../utils/pages"
import Pagination from "../components/UI/pagination/Pagination"
import { BrowserRouter, Route } from "react-router-dom"
import About from "./About"
import { useRef } from "react"
import { useObserver } from "../hooks/useObserver"

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: "", query: "" })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()
    console.log(lastElement)

    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page)
            setPosts([...posts, ...response.data])
            const totalCount = response.headers["x-total-count"]
            setTotalPages(getPageCount(totalCount, limit))
        }
    )

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        const newID = Math.max(...posts.map((post) => post.id)) + 1
        newPost.id = newID
        setPosts([...posts, newPost])
        setModal(false)
    }

    //Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    { value: 5, name: "5" },
                    { value: 10, name: "10" },
                    { value: -1, name: "Показать все" },
                ]}
            />
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title="Посты про JS"
            />
            <div ref={lastElement} style={{ height: 20, background: "red" }} />
            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            )}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default Posts
