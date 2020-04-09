<script>
  import chart from "chart.js";
  import { onMount, afterUpdate } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";

  let months = 24;
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
  let hosting = 300000;
  let adRevenue = 5000;
  let startingDebt = 1800000000;
  let profs = [];
  let debts = [];
  let time = [];
  let money = [];
  var ctx;
  var myChart;
  let colors = [];
  let vcMode = false;
  let stripe;
  let sku = "123";
  let sessionId;
  let shownAmount = 5;
  $: amount = shownAmount * 100;
  let show = false;
  let loading = false;
  let stripeError = "";

  const STRIPE_PUBLIC_KEY = "pk_live_CrWz5KlLCDuA16NhgfG9lyIt00cLNoxsMM"; // TODO: PUT YOUR STRIPE PUBLISHABLE KEY HERE
  const FIREBASE_CHECKOUT =
    "https://us-central1-quibi-is-doomed.cloudfunctions.net/payments/checkout";

  onMount(async function fun() {
    try {
      stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    } catch (err) {
      console.log(err);
    }
  });

  async function startCheckout2(s) {
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: s
    });
    loading = false;
    stripeError = error.message;
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  }

  async function checkout() {
    loading = true;
    const res = await fetch(FIREBASE_CHECKOUT, {
      //mode: "no-cors",
      method: "POST",
      dataType: "json",
      body: JSON.stringify({
        amount: amount
      })
    });
    const data = await res.json();
    sessionId = await data.id;
    startCheckout2(await sessionId);
    // console.log(data);
  }

  async function calcMe() {
    money = [];
    time = [];
    if (vcMode === true) {
      debt = startingDebt * 10 + debtPerMonth;
    } else {
      debt = startingDebt + debtPerMonth;
    }
    debtPerMonth = (avgSalary / 12) * employees + hosting;
    profitPerMonth = users * avgPay + adRevenue;

    let total = -Math.abs(debt);
    let i;
    for (i = 0; i < months; i++) {
      if (i < 3) {
        total = total + profitPerMonth - debtPerMonth - avgPay * users;
      } else {
        total = total + profitPerMonth - debtPerMonth;
      }
      time.push(i);
      profs.push(Math.round(profitPerMonth));
      debts.push(Math.round(debtPerMonth));
      money.push(Math.round(total));
    }
    colors = money.map(value =>
      value < 0 ? "rgb(255, 44, 41)" : "rgb(41, 255, 44)"
    );
    colors = colors;
    money = money;
  }

  function createChart() {
    ctx = document.getElementById("myChart").getContext("2d");
    if (!myChart) {
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: time,
          datasets: [
            {
              label: "Quibi Profit",
              data: money,
              fill: false,
              borderColor: colors,
              backgroundColor: colors,
              // borderColor: "rgb(75, 192, 192)",
              lineTension: 0.1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  callback: function(value, index, values) {
                    return "$" + formatMoney(value);
                  }
                }
              }
            ]
          }
        }
      });
    } else {
      myChart.data.labels = time;
      myChart.data.datasets.forEach(dataset => {
        dataset.data = money;
        dataset.borderColor = colors;
        dataset.backgroundColor = colors;
      });

      myChart.update();
    }
  }
  onMount(async () => {
    try {
      const res = await calcMe();
    } catch (err) {
      console.log(err);
    }
  });

  afterUpdate(async () => {
    try {
      if (document) {
        const res = await calcMe();
        const res2 = await createChart();
      }
    } catch (err) {
      console.log(err);
    }
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

<style>
  /* The slider itself */
  .slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 15px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
    transition: opacity 0.2s;
  }

  /* Mouse-over effects */
  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }
  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 15px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #0065fc; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 15px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #0065fc; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .column {
    flex-basis: 100%;
  }

  .blarg {
    display: inline-flex;
  }

  /* The toggle - the box around the slider */
  .toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slid {
    position: absolute;
    border-radius: 34px;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slid:before {
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slid {
    background-color: #2196f3;
  }

  input:focus + .slid {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slid:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .paragraphs {
    text-indent: 4em;
    line-height: 1.65em;
  }
  .plea {
    font-weight: 100;
  }
  div.content {
    font-family: "Open Sans", sans-serif;
    font-size: 1.3em;
  }

  .loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .tableSize {
    font-size: 4vw;
  }
  @media screen and (min-width: 550px) {
    .tableSize {
      font-size: 3vw;
    }
  }
  @media screen and (min-width: 800px) {
    .tableSize {
      font-size: 2vw;
    }
  }
  @media screen and (min-width: 1000px) {
    .tableSize {
      font-size: 1.5vw;
    }
  }
  @media screen and (min-width: 1700px) {
    .tableSize {
      font-size: 1vw;
    }
  }
</style>

<div class="content">
  <div class="w-11/12 mx-auto text-left md:w-10/12 lg:w-8/12 ">

    <div
      class="pt-6 text-3xl text-center underline bold md:pt-10 "
      style="font-family: 'Josefin Sans', sans-serif; font-weight:700; ">
      Who Thought This Was A Good Idea?
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      Yes, this website was built mostly just to rant about Quibi. If you
      haven't heard what Quibi is, it's a company that managed to raise 1.8
      BILLION dollars before launching anything. They just launched on April 6,
      2020 and, well... I was mad enough to make an entire website explaining
      how dumb it is
      <img src="/crazy.png" alt="Crazy Emoji" class="inline w-6 " />
      .
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      Quibi is essentially trying to be the Netflix of mobile. But Netflix
      already is the Netflix of mobile... Quibi was started by two old(er)
      billionaires, so they definitely know what the kids are into these days.
      It's definitely giving me an Apple TV+ vibe: Mostly rich, mostly older
      people saying, we know what people want! Let's throw x amount of dollars
      at it, and see what comes out the other end. In Apple TV+'s case, they
      managed to produce a small number of rather lame shows. But they wanted to
      make it seem like a hit, so they have (and still are) giving out a free
      ONE YEAR subscription if you buy any Apple device. Even with that they've
      only managed 33 million subscribers. That's fine for Apple though, because
      they have $200+ BILLION just sitting in their piggy bank. They can
      bankroll as many sub-par TV shows as they want for years to come, and not
      fall into financial peril.
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      Which brings us back to Quibi. Quibi isn't Apple. They have no other
      products. They don't have unlimited funding. They need to get profitable
      ASAP or they'll have to get more funding, or fold the business. And I'm
      betting on the whole thing going down in flames. First let's lay out the
      best possible scenario. All of Quibi's main competition has around 30
      million subscribers. Netflix is in a league of their own with 167 million
      subscribers.
    </div>
    <div class="max-w-full pt-6 tableSize">
      <table class="min-w-full table-auto ">
        <thead class="">
          <tr>
            <th class="px-4 py-2">Company</th>
            <th class="px-4 py-2 text-center">Subscribers</th>
            <th class="px-4 py-2 text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border">Hulu</td>
            <td class="px-4 py-2 text-center border">28 Million</td>
            <td class="px-4 py-2 text-center border">$6 / $12</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="px-4 py-2 border">Disney+</td>
            <td class="px-4 py-2 text-center border">31 Million</td>
            <td class="px-4 py-2 text-center border">$7 / $13</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">Apple TV+</td>
            <td class="px-4 py-2 text-center border">33 Million</td>
            <td class="px-4 py-2 text-center border">$5</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="px-4 py-2 border">Netflix</td>
            <td class="px-4 py-2 text-center border">167 Million</td>
            <td class="px-4 py-2 text-center border">$9 / $13 / $16</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      So the dream scenario for Quibi would be to get 30 million subscribers. I
      think that's really shooting for the stars, but let's just assume they
      manage. 30 million sign up for their free 90 day trial, and then they
      convert 100% of those users. It will still take Quibi almost a year before
      they even break even! And that's with some pretty generous assumptions. If
      they only manage 15 million subscribers, it would be 2 years before they
      make a penny. They're definitely going to have to raise more money, but I
      don't think anyone will want to touch them after initial subscriber
      numbers come out. Below is an interactive chart where you can play with
      different scenarios. Feel free to play around with it and see how many
      millions of subscribers Quibi needs to break even!
    </div>

  </div>

  <div class="flex justify-center w-11/12 pt-8 mx-auto">
    <div class="w-11/12 lg:w-8/12">
      <canvas id="myChart" class="" />
    </div>
  </div>

  <div class="flex flex-wrap justify-center w-11/12 mx-auto">
    <div
      class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full lg:w-3/12 ">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Users</label>
        <input
          class="slider"
          type="range"
          min="0"
          max="100000000"
          bind:value={users}
          step="1000000" />
        <label class="pt-4" for="users">{numberWithCommas(users)}</label>
      </div>
    </div>
    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Average Subscription</label>
        <input
          class="slider"
          type="range"
          min="1"
          max="8"
          bind:value={avgPay}
          step="1" />
        <label class="pt-4" for="users">${avgPay}</label>
      </div>
    </div>
    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Ad Revenue</label>
        <input
          class="slider"
          type="range"
          min="10000"
          max="1000000"
          bind:value={adRevenue}
          step="10000" />
        <label class="pt-4" for="users">${numberWithCommas(adRevenue)}</label>
      </div>
    </div>

    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Hosting/Other Costs</label>
        <input
          class="slider"
          type="range"
          min="10000"
          max="3000000"
          bind:value={hosting}
          step="10000" />
        <label class="pt-4" for="users">${numberWithCommas(hosting)}</label>
      </div>
    </div>

    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Quibi Employees</label>
        <input
          class="slider"
          type="range"
          min="100"
          max="1000"
          bind:value={employees}
          step="100" />
        <label class="pt-4" for="users">{employees}</label>
      </div>
    </div>
    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Average Salary</label>
        <input
          class="slider"
          type="range"
          min="30000"
          max="1000000"
          bind:value={avgSalary}
          step="10000" />
        <label class="pt-4" for="users">${numberWithCommas(avgSalary)}</label>
      </div>
    </div>
    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Months Shown On Chart</label>
        <input
          class="slider"
          type="range"
          min="10"
          max="240"
          bind:value={months}
          step="10" />
        <label class="pt-4" for="users">
          {months} (years: {Math.round(months / 12)})
        </label>
      </div>
    </div>
    <div class="max-w-sm p-6 m-4 overflow-hidden rounded shadow-lg sm:w-full">
      <div class="flex flex-wrap justify-center w-10/12 mx-auto slidecontainer">
        <label class="pb-4" for="users">Activate VC Mode?</label>
        <div class="flex justify-center w-full">
          <label class="toggle">
            <input class="" type="checkbox" bind:checked={vcMode} />
            <span class="slid round" />
          </label>
        </div>
        <label class="pt-4" for="users">Low 10x Expectation</label>
      </div>
    </div>
  </div>

  <div class="w-11/12 mx-auto text-left md:w-10/12 lg:w-8/12">

    <div
      class="text-3xl text-center underline bold md:pt-10 "
      style="font-family: 'Josefin Sans', sans-serif; font-weight:700; ">
      Not Just The Money
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      It's not all just about the money. If Quibi had a really solid product, I
      wouldn't care half as much. If they had actually spent 1.8 BILLION dollars
      on something worthwhile, this website would not exist. Quibi should have
      built a magic app instead, because somehow they turned all that money into
      <img src="/poop.png" alt="poop" class="inline w-6" />
      . The most egregious thing is that
      <b>all videos default to portrait mode</b>
      . Initially I thought all videos were
      <i>ONLY</i>
      in portrait mode, just like my parents like to shoot! There's no on-screen
      prompts or anything, but low and behold, if you accidentally rotate your
      phone, it'll show you the video in widescreen! I feel sorry for the poor
      souls that rotate-lock their phones, they'll never even know they could
      have enjoyed all their Quibis without so many insane face close-ups!
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      The second biggest issue:
      <b>there's no casting!</b>
      It would make more sense if everything was actually locked into portrait
      mode, because then casting wouldn't be much of an upgrade. But they
      actually have all the videos in widescreen! The entire world is on lock
      down, with access to very large, very capable televisions, but no, this is
      premium content meant to be watched only on your smallest of screens!
      Hopefully they'll come to their senses and fix this ASAP. It would
      probably take a day to implement, and there's no excuse for a video only
      app in 2020 not to have casting.
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      There's other things to rant about, but we'll end with just one more:
      <b>there's zero back catalog.</b>
      I think they missed streaming 101.
      <u>
        The only reason people pay for streaming is if there's something to
        watch!
      </u>
      Without content people will cancel their subscription faster than Yahoo
      goes bankrupt. Now it has been shown that killer shows can increase
      subscribers, but if there's nothing else they want to watch after that,
      people just leave. Imagine Disney+ only had the Mandalorian and Cats.
      After you've watched the Mandalorian twice, you're not going to keep
      paying every month to see the Cats banner on your screen. Lucky for Disney
      they've got a bajillion movies on there of every genre. Same goes for
      Netflix. Hulu focuses on TV shows and some movies, and are also owned by
      Disney, so their back catalog is huge. Apple TV+ is the only one without a
      wide depth of shows and we've already discussed how it doesn't really
      matter because Apple has more money than sense.
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      Quibi, on the other hand, has less than 50 shows (and a lot of those are
      nightly news type shows). From what I can see there's less than 10 actual
      "entertainment" shows, all with less than 10 episodes. And because Quibis
      are all under 10 minutes, you can watch all of those in 1,000 minutes!
      That's two binge sessions, or even just one with you're feeling extra
      adventurous. Although you probably won't be doing too much binging because
      again, you have to watch everything ON YOUR PHONE! Maybe that was always
      part of the plan, to prevent people from watching literally everything
      they have to offer in 2 days...
    </div>
    <div
      class="text-3xl text-center underline bold md:pt-10 "
      style="font-family: 'Josefin Sans', sans-serif; font-weight:700; ">
      The Cherry On Top
    </div>
    <div class="pt-5 text-gray-900 paragraphs">
      The most hilarious thing about all of this is that Quibi is offering
      people 3 months free right now. While they're in quarantine, with nowhere
      else to go. So if people do like a show, they're FOR SURE finish it during
      their free trial. And since there's absolutely no back catalog, why would
      you stick around? Did they not notice Netflix and Disney spending their
      millions on securing hundreds of shows to plump out their back catalog?
      Why did Quibi ever get this much money? These Venture Capitalist firms
      need to calm down. And so do I! That's it for now. Go do something nice
      for someone else and have a great day/month/2020!
    </div>
    <div class="py-12 text-center text-gray-800 plea">
      Made by a totally normal, not stir crazy, unemployed person with lots of
      <img src="/love.png" alt="love" class="inline w-6" />
      . If this made you laugh or cry, or did absolutely nothing for you
      whatsoever, consider
      <span
        on:click={() => (show = !show)}
        class="text-blue-400 underline cursor-pointer">
        buying me a
        <img src="/croissant.png" alt="croissant" class="inline w-6" />
      </span>
      . It would be better than buying a Quibi!
    </div>
  </div>
  {#if show}
    <div class="max-w-lg mx-auto text-center slidecontainer">

      {#if loading}
        <button class="px-8 py-3 text-white bg-blue-600 rounded-md shadow-sm">
          <div class="loader" />

        </button>
      {:else if !loading}
        <button
          class="px-4 py-3 text-white bg-blue-400 rounded-md shadow-sm"
          on:click={checkout}>
          Donate ${shownAmount}
        </button>
      {/if}

    </div>
    <div class="max-w-lg pt-6 pb-5 mx-auto text-center slidecontainer">
      <input
        type="range"
        min="1"
        max="777"
        bind:value={shownAmount}
        class="slider"
        id="myRange" />
    </div>
    <div
      class="flex content-center justify-center max-w-xs pt-4 pb-16 mx-auto text-center">
      {#if shownAmount > '20' && shownAmount < '100'}
        <img src="/smile.png" alt="Smile" />
      {:else if shownAmount > '100' && shownAmount < '500'}
        <img src="/laugh.png" alt="Laughing Nervously" />
      {:else if shownAmount >= '500' && shownAmount < '777'}
        <img src="/shock.png" alt="Shocked Face" />
      {:else if shownAmount == '777'}
        <img
          src="/amazed.png"
          alt="Amazed Beyond Belief, are you kidding me?!" />
      {:else}
        <img src="/thumbsup.png" alt="Thumbs Up" />
      {/if}
      {#if stripeError}{stripeError}{/if}
    </div>
  {/if}
  <div id="preload" class="hidden">
    <img src="/thumbsup.png" alt="Thumbs Up" />
    <img src="/amazed.png" alt="Amazed Beyond Belief, are you kidding me?!" />
    <img src="/shock.png" alt="Shocked Face" />
    <img src="/smile.png" alt="Smile" />
    <img src="/laugh.png" alt="Laughing Nervously" />
  </div>
</div>
