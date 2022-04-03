import styled from "styled-components";

export const CardWrapper = styled.div`
    background      : #fff;
    box-shadow      : 0 0 15px #dbdbdb;
    border-radius   : 5px;  
    padding         : ${(props) => props.spacing || "10"}px;

    .ant-table table {
        margin-top : 10px;
    }
`;