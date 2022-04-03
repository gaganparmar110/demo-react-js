export const ACTION_TYPES = {
    ADMIN_LIST: "ADMIN_LIST"
}

export const adminList = (data) => {
    // SET YOUR ADMIN DATA HERE
    localStorage.setItem('isDataGet', true)
    localStorage.setItem("adminData", JSON.stringify(data));
    return {
        type: ACTION_TYPES.ADMIN_LIST,
        ...data
    }
}