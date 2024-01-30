import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from '@ant-design/icons'
import { setSearchOpen } from "./Redux/SearchOpen";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./types/appTypes";
import { setOpenOverview } from './Redux/OpenOverview'
import { setProductID } from './Redux/ProductID'



function Search() {
    const dispatch = useDispatch()
    const ResultsBoxRef=useRef<HTMLDivElement>(null)

    const SearchRef=useRef<HTMLDivElement>(null)
    const [SearchValue, setSearchValue] = useState<string>('')
    const SearchState = useSelector((state: {SearchOpen:{open:boolean}}) => state.SearchOpen.open)
    const SearchProduct=useDebounce(SearchValue,600)
    
    function getProduct() {
        return axios.get(`https://dummyjson.com/products/search?q=${SearchProduct[0]}`)
    }

    const { data: productsSearched } = useQuery({
        queryKey: ['product',SearchProduct],
        queryFn: getProduct,
        enabled: SearchProduct[0] !== '',
        select: data => data.data.products as Product[]
    })

    useEffect(() => {
        if (SearchRef.current) {
            if (SearchState) {
                SearchRef.current.style.top = '0'
                SearchRef.current.style.transition='0.5s'
            } else {
                SearchRef.current.style.top = '-100%'
                SearchRef.current.style.transition='0.5s'
        }
        }
    }, [SearchState])
    function CloseSearch(e: KeyboardEvent) {
        if (e.key === 'Escape' && SearchState) {
            dispatch(setSearchOpen())
            setSearchValue('')
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', CloseSearch)
        return () => {
            document.removeEventListener('keydown', CloseSearch)
        }
    },)
    
    useEffect(() => {
        if (ResultsBoxRef.current) {
            if (productsSearched?.length === 0 || productsSearched===undefined) {
                ResultsBoxRef.current.style.height = '0'
                ResultsBoxRef.current.style.transition = '0.3s'
                ResultsBoxRef.current.style.opacity = '0'
            } else {
                ResultsBoxRef.current.style.height = '300px'
                ResultsBoxRef.current.style.transition = '0.3s'
                ResultsBoxRef.current.style.opacity = '1'
            }
        }
    }, )
    

return (
    <div ref={SearchRef} className="container-fluid SearchContainer">
        <div className="row h-100">
            <div className="col-12 h-100 d-flex flex-column justify-content-center align-items-center">
                <CloseOutlined onClick={() => { dispatch(setSearchOpen()); setSearchValue('')}} className="closeIcon"/>
                <input
                    className="col-10 p-3"
                    type="text"
                    placeholder="Search"
                    value={SearchValue}
                    onChange={e=>setSearchValue(e.target.value)}
                />
                <div ref={ResultsBoxRef} className="col-10 d-flex justify-content-start flex-column mt-5  ProductsResult">
                    {productsSearched?.map((product: Product) => {
                        return <div onClick={()=>{dispatch(setOpenOverview(true));dispatch(setProductID(product.id))}} key={product.id} className="col-12 justify-content-center d-flex  SearchedProductBox">
                            <h2 >{product.title}</h2>
                        </div>
                    })}

                </div>
            </div>
        </div>
</div>
)
}

export default Search