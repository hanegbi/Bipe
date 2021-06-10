import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

function HomeScreen({ match }) {
    const category = match.params.category;
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        const cityId = localStorage.getItem("cityId");
        dispatch(listProducts(category, keyword, pageNumber, cityId));
    }, [dispatch, category, keyword, pageNumber]);

    return (
        <>
            <h1>All your city Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        category={category ? category : ""}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            )}
        </>
    );
}

export default HomeScreen;
