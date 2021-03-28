import React, { useState } from "react";
import { FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

function SearchBox({ history }) {
    const categories = ["Categories", "Fruits", "Vegetables"];

    const [category, setCategory] = useState("Categories");
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (category.trim() || keyword.trim()) {
            history.push(`/search/${category}/${keyword}`);
        } else {
            history.push("/");
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <DropdownButton
                variant="secondary"
                className="mr-sm-2 ml-sm-5"
                title={category === "" ? "Categories" : category}
            >
                {categories.map((category, index) => (
                    <Dropdown.Item
                        onClick={(e) => setCategory(e.target.name)}
                        key={index}
                        name={category}
                    >
                        {category}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <FormControl
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-2"
            ></FormControl>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
}

export default SearchBox;
