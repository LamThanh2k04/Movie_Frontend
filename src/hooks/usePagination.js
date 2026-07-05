import { useState } from "react";

const usePagination = (initialPage = 1) => {
    const [page, setPage] = useState(initialPage);

    return { page, setPage };
}
export default usePagination;