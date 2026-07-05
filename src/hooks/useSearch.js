import { useState } from "react";

const useSearch = (initialSearch= '') => {
    const [search, setSearch] = useState(initialSearch);

    return { search, setSearch };
}
export default useSearch;