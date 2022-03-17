import React, {useRef, useState} from 'react';
import PostCard from "../components/PostCard";
import RangeSlider from "../components/RangeSlider";
import DatePicker from "react-datepicker";

const AllPosts = ({posts, user}) => {
    const [date, setDate] = useState(null)
    const [filter, setFilter] = useState(null)
    const [filteredPosts, setFilteredPosts] = useState(posts)
    const cityRef = useRef()

    function filterPosts() {
        let postsArr = posts.filter(x=> x.city === cityRef.current.value)
        postsArr = postsArr.filter(x=> x.price >= filter[0])
        postsArr = postsArr.filter(x=> x.price <= filter[1])
        setFilteredPosts(postsArr)
    }
    function removeFilters() {
        setFilteredPosts(posts)
    }
    return (
        <div>
            <div className='d-flex space-e column m-20'>

                <RangeSlider setFilter={setFilter}/>
                <DatePicker placeholderText="Choose Day" selected={date} onChange={(start) => setDate(start)}/>
                <input ref={cityRef} defaultValue='City' type="text"/>

                <button onClick={filterPosts}>Filter</button>
                <button onClick={removeFilters}>Remove Filters</button>

            </div>
            <div className='d-flex wrap'>

                {filteredPosts && filteredPosts.map((x, i) => <PostCard user={user} post={x} key={i}/>)}
            </div>
        </div>

    );
};

export default AllPosts;