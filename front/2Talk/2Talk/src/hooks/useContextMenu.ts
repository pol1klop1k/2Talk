import { useContext } from "react";
import { ContextMenu } from "../context/ContextMenu/ContextMenu.context";

export const useContextMenu = () => useContext(ContextMenu);