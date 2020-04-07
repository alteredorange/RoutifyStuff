<script>
  import chart from "chart.js";
  import { afterUpdate } from "svelte";

  let months;
  let profit;
  let spend;
  let debt;
  let chartDebt = [12, 19, 3, 5, 2, 3];
  let xLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let start = 10;
  let debtPerMonth;
  let profitPerMonth;
  let users = 30000000;
  let avgPay = 6;
  let avgSalary = 80000;
  let employees = 250;
  let hosting = 5000;
  let adRevenue = 5000;
  let startingDebt = 1800000000;
  let profs = [];
  let debts = [];
  export let time = [1, 2, 3];
  export let money = [1, 2, 3];

  async function calcMe() {
    debtPerMonth = (avgSalary / 12) * employees + hosting;
    profitPerMonth = users * avgPay + adRevenue;
    debt = startingDebt + debtPerMonth;
    let total = -Math.abs(debt);
    let i;
    for (i = 0; i < 24; i++) {
      total = total + profitPerMonth - debtPerMonth;
      time.push(i);
      profs.push(profitPerMonth);
      debts.push(debtPerMonth);
      money.push(total);
      console.log(total);
    }
    money = money;
  }
  var ctx;
  var myChart;

  function createChart() {
    ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Amount of Debt",
            data: money
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  afterUpdate(createChart);
  afterUpdate(calcMe);

  function formatMoney(
    amount,
    decimalCount = 0,
    decimal = ".",
    thousands = ","
  ) {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="flex justify-center">
  <canvas id="myChart" class="max-w-2xl " />
</div>
