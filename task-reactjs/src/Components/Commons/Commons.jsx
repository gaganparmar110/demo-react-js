import React from "react";

import {
	CardWrapper
} from "./Commons.style";

export function Card(props) {
	return <CardWrapper {...props} />;
}

export function setPaginationObject(previousPagination, Currentpagination) {
    let newPaginationInfo = {
        ...Currentpagination,
        current: Currentpagination?.current ? Currentpagination?.current:1,
        pageSize: Currentpagination?.pageSize ? Currentpagination?.pageSize:6,
    }
	return newPaginationInfo
}
