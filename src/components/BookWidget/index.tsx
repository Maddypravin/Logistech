import { Grid, IconButton, Typography } from "@mui/material";
import style from "./style.module.css";
import LeftIcon from "./LeftIcons";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { todoAdded } from "../../reducer/bookWidget";
interface IBookWidget {
  webWorker: Worker;
}
var time = true;
var queue: Array<any> = [];
const BookWidget = ({ webWorker }: IBookWidget) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { bookWidget = [] } = useSelector((state: RootState) => state);
  const data = useMemo(() => bookWidget.slice(0, 14) ?? [], [bookWidget]);
  const root_class = useMemo(
    () =>
      open
        ? style["book-widget-root"] + " " + style["book-widget-root_expand"]
        : style["book-widget-root"] + " " + style["book-widget-root_collapse"],
    [open]
  );
  const smoothUpdate = async (event: any) => {
    let oneArray: any = [];
    if (Array.isArray(event[1])) {
      oneArray = [...event[1], event[0]];
      console.log(oneArray);
    }
    dispatch(todoAdded(oneArray));
  };
  webWorker.onmessage = (e) => {
    const event = JSON.parse(e?.data);
    console.log("event", event);
    if (time) {
      time = false;
      const newData = queue.length > 0 ? queue.pop() : event;
      setTimeout(() => {
        smoothUpdate(newData);
        time = true;
      }, 500);
    } else queue.push(event);
  };

  return (
    <div className={root_class}>
      <div className={style["book-widget-root__header"]}>
        {open && (
          <IconButton onClick={() => setOpen(false)}>
            <ExpandLessIcon sx={{ color: "var(--clr-currency-dark)" }} />
          </IconButton>
        )}
        {!open && (
          <IconButton onClick={() => setOpen(true)}>
            <ExpandMoreIcon sx={{ color: "var(--clr-currency-dark)" }} />
          </IconButton>
        )}
        <Typography color={"var(--clr-white)"} className={style["title"]}>
          ORDER BOOK
        </Typography>
        <Typography
          color={"var(--clr-currency-dark)"}
          className={style["currency-txt"]}
        >
          BTC/USD
        </Typography>
        &nbsp;
        <LeftIcon />
      </div>
      {open && (
        <div className={style["book-widget-root__content"]}>
          <Grid container xs={12} display={"flex"} flexBasis={0}>
            <Grid container xs={6}>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Typography flex={1} color={"gray"}>
                  Count
                </Typography>
                <Typography flex={1} color={"gray"}>
                  Amount
                </Typography>
                <Typography flex={1} color={"gray"}>
                  Total
                </Typography>
                <Typography flex={1} color={"gray"}>
                  Price
                </Typography>
              </Grid>
              {data?.map(([total, amount, count, price]: any) => (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                >
                  <Typography flex={1} color={"var(--clr-white)"}>
                    {Number.isNaN(amount) ? 0 : amount}
                  </Typography>
                  <Typography flex={1} color={"var(--clr-white)"}>
                    {Math.abs(count ?? 0)}
                  </Typography>
                  <Typography flex={1} color={"var(--clr-white)"}>
                    {Number.isNaN(total) ? 0 : total}
                  </Typography>
                  <Typography
                    flex={1}
                    color={"var(--clr-white)"}
                    //bgcolor={"#224D42"}
                  >
                     {Number.isNaN(price) ? 0 : price}
                  </Typography>
                  <div
                    style={{
                      position: "absolute",
                      right: "calc(100vw - 47vw)",
                      transform: "rotate(180deg)",
                      width: `${Math.random() * 25}rem`,
                      height: "1.5rem",
                      transition: "width 2s",
                      opacity: 0.5,
                      backgroundColor: "#224D42",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid container xs={6}>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Typography flex={1} color={"gray"}>
                  Count
                </Typography>
                <Typography flex={1} color={"gray"}>
                  Amount
                </Typography>
                <Typography flex={1} color={"gray"}>
                  Total
                </Typography>
                <Typography flex={1} color={"gray"}>
                  Price
                </Typography>
              </Grid>
              {data?.map(([total, amount, count, price]: any) => (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                >
                  <Typography flex={1} color={"var(--clr-white)"}>
                  {Number.isNaN(amount) ? 0 : amount}
                  </Typography>
                  <Typography flex={1} color={"var(--clr-white)"}>
                  {Math.abs(count ?? 0)}
                  </Typography>
                  <Typography flex={1} color={"var(--clr-white)"}>
                  {Number.isNaN(total) ? 0 : total}
                  </Typography>
                  <Typography flex={1} color={"var(--clr-white)"}>
                  {Number.isNaN(price) ? 0 : price}
                  </Typography>
                  <div
                    style={{
                      position: "absolute",
                      width: `${Math.random() * 25}rem`,
                      height: "1.5rem",
                      transition: "width 2s",
                      opacity: 0.5,
                      backgroundColor: "#C41E3A",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      )}
      {open && (
        <div className={style["book-widget-root__footer"]}>
          <OpenInNewIcon sx={{ color: "var(--clr-currency-dark)" }} />
          &nbsp;
          <Typography color={"var(--clr-currency-dark)"}>FULL BOOK</Typography>
          <span
            style={{ height: "100%", width: "100%", backgroundColor: "gray" }}
          />
          <span className={style["active-symbol"]} />
          <Typography color={"gray"} sx={{ textDecoration: "underline" }}>
            REAL TIME
          </Typography>
        </div>
      )}
    </div>
  );
};
export default BookWidget;
