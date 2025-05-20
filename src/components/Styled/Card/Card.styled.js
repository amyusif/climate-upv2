import styled from "styled-components";

export const CardContainer = styled.div`
display: flex;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
padding: 5px;
height: 50px;
background-color: white;
justify-content: space-between;
width: 100%;
border-radius: 8px;
margin: 5px 0;
`

export const MinContainer = styled.div`
display: flex;
align-items: center;
height: 100%;
gap: 10px;
`

export const Variant_h5 = styled.h5`
 color: ${(props) => props.color}
`