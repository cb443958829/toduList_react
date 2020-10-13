import { ADDTHINGS, MODIFY, DEL, MODIFYSTATE, HANDLESHOW } from "./reaction-types";

export const addData = (data) => ({type: ADDTHINGS, data: data})
export const modify = (data) => ({type: MODIFY, data: data})
export const delData = (id) => ({type: DEL, data: id})
export const modifyState = (data) => ({type: MODIFYSTATE, data: data})
export const handleShow = (data) => ({type: HANDLESHOW, data: data})

