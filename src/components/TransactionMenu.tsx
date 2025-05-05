import { Drawer } from "@mui/material";
import { Transaction } from "../types";
// import IconComponents from "./common/IconComponents";
interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  currentDay: string;
  onAddTransactionForm: () => void;
}
const TransactionMenu = ({
  dailyTransactions,
  currentDay,
  onAddTransactionForm,
}: TransactionMenuProps) => {
  const menuDrawerWidth = 320;
  return (
    <Drawer
    // sx={{
    //   width: isMobile ? "auto" : menuDrawerWidth,
    //   "& .MuiDrawer-paper": {
    //     width: isMobile ? "auto" : menuDrawerWidth,
    //     boxSizing: "border-box",
    //     p: 2,
    //     ...(isMobile && {
    //       height: "80vh",
    //       borderTopRightRadius: 8,
    //       borderTopLeftRadius: 8,
    //     }),
    //     ...(!isMobile && {
    //       top: 64,
    //       height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
    //     }),
    //   },
    // }}
    // variant={isMobile ? "temporary" : "permanent"}
    // anchor={isMobile ? "bottom" : "right"}
    // open={open}
    // onClose={onClose}
    ></Drawer>
  );
};
export default TransactionMenu;
