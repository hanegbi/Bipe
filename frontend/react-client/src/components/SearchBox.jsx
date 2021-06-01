import React, { useState } from "react";
import { FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

function SearchBox({ history }) {
    const categories = [
        'Fruits & Vegetables',
        'Diary & Eggs',
        'Drinks',
        'Sauces & Cannes',
        'Pastries',
        'Frozen',
        'Meat & Chicken',
        'Snacks & Candies',
        'Pharm & Detergen',
        'Toabaco',
        'Pastas & Legumes',
        'Other',
    ];

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

    const clearFilters = () => {
        setCategory("Categories");
        setKeyword("");
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <DropdownButton
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-2"
            ></FormControl>
            <Button type="submit" className="p-2 mr-sm-2">
                Search
            </Button>
            <Button onClick={clearFilters} className="p-2">
                Clear
            </Button>
        </Form>
    );
}

export default SearchBox;
