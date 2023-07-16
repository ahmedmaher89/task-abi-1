const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());

let Orders = [];

app.get("/Orders", function (req, res) {
  res.json({ Orders: Orders, message: "done" });
});
app.post("/Orders", function (req, res) {
  Orders.push(req.body);
  res.json({ massge: "your order is added" });
});
app.put("/Orders", async function (req, res) {
  let { Id, Description } = req.body;
  await Orders.find((order, index) => {
    if (order.Id === Id) {
      Orders[index] = {
        Id: order.Id,
        Description: Description,
        Price: order.Price,
      };
      return true;
    }
  });
  res.json({ Messge: "your order update is done" });
});
app.delete("/Orders", async function (req, res) {
  let { Id } = req.body;
  await Orders.find((order, index) => {
    if (order.Id === Id) {
      Orders.splice(Orders[index], 1);
      return true;
    }
  });
  res.json({ Messge: "your order is deleted" });
});

app.listen(8080);
