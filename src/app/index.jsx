import Inferno from "inferno";

import Home from "pages/Home";
import Search from "pages/Search";
import Random from "pages/Random";
import Http from "utils/Http";

import "assets/fonts/roboto/regular.ttf";
import "assets/fonts/roboto/bold.ttf";
import "assets/images/favicon_128.png";

import "scss/global.scss";
import "scss/fonts.scss";

import "./index.html";

// Evil good ol' spying Google Analytics >:)
if (process.env.NODE_ENV === "production" && !process.env.TESTING) {
  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
  ga("create", "UA-112049887-1", "auto");
  ga("send", "pageview");
}

const queryParts = (window.location.search || "")
  .slice(1)
  .split("&")
  .map(x => {
    const [key, value] = x.split("=");
    return { key, value };
  });
const query = queryParts.find(x => x.key == "query") || {};

/*

--- TODO: Uncomment when feeling like implementing Discord auth ---

const hashParts = (window.location.hash || "")
  .slice(1)
  .split("&")
  .map(x => {
    const [key, value] = x.split("=");
    return { key, value };
  });
// Catch Discord OAuth2 redirect
let accessToken = hashParts.find(x => x.key == "access_token");
if (accessToken) window.localStorage.setItem("accessToken", accessToken.value);
else accessToken = { value: window.localStorage.getItem("accessToken") };

accessToken.value &&
  Http.get(
    "https://discordapp.com/api/guilds/296481029303304192/members",
    null,
    {
      Authorization: `Bearer ${accessToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  ).then(guilds => {
    console.log(guilds);
  });

*/

const indexOfQuestionMark = window.location.pathname.indexOf("?");
const page = window.location.pathname.slice(
  process.env.TESTING ? 9 : 0,
  indexOfQuestionMark < 0 ? undefined : indexOfQuestionMark
);

Inferno.render(
  {
    "/search": (
      <Search
        query={decodeURIComponent(query.value)}
        // discord={{ accessToken: accessToken.value }}
      />
    ),
    "/random": <Random />
  }[page] || <Home />,
  document.getElementById("root")
);
