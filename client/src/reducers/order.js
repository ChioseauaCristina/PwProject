import { orderActionTypesEnum } from "../constants/actionTypes";

export default (orders = [], action) => {
    switch(action.type) {
        case orderActionTypesEnum.get:
            return action.payload;
        case orderActionTypesEnum.create:
            return [...orders, action.payload]
        default:
            return orders;
    }
}