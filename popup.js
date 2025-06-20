function e(e, t, n, o, r, a, i) {
  var s = {},
    c = null,
    l = !1,
    d = !1,
    f = {
      urls: ["<all_urls>"],
      tabId: n,
      types: [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "font",
        "object",
        "xmlhttprequest",
        "other",
      ],
    };
  function u() {
    !l &&
      d &&
      (
        i ||
        function (e) {
          e(!0);
        }
      )(function (e) {
        if (!e) return g();
        l ||
          ((l = !0),
          chrome.webRequest.onBeforeRequest.removeListener(p),
          chrome.webRequest.onCompleted.removeListener(h),
          chrome.webRequest.onErrorOccurred.removeListener(h),
          t());
      });
  }
  function p(e) {
    (s[e.requestId] = 1), (c = new Date());
  }
  function h(e) {
    c && (delete s[e.requestId], Object.keys(s).length || g());
  }
  function g() {
    setTimeout(function () {
      new Date() - c < r || Object.keys(s).length || u();
    }, r);
  }
  chrome.webRequest.onBeforeRequest.addListener(p, f),
    chrome.webRequest.onCompleted.addListener(h, f),
    chrome.webRequest.onErrorOccurred.addListener(h, f),
    (
      e ||
      function (e) {
        e();
      }
    )(function () {
      setTimeout(u, o),
        setTimeout(function () {
          (d = !0), g();
        }, a);
    });
}
function t(e, t) {
  return (
    t && (e += 1462), (Date.parse(e) - new Date(Date.UTC(1899, 11, 30))) / 864e5
  );
}
function n(e, n) {
  for (
    var o = {}, r = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } }, a = 0;
    a != e.length;
    ++a
  )
    for (var i = 0; i != e[a].length; ++i) {
      r.s.r > a && (r.s.r = a),
        r.s.c > i && (r.s.c = i),
        r.e.r < a && (r.e.r = a),
        r.e.c < i && (r.e.c = i);
      var s = { v: e[a][i] };
      if (null !== s.v) {
        var c = XLSX.utils.encode_cell({ c: i, r: a });
        "number" == typeof s.v
          ? (s.t = "n")
          : "boolean" == typeof s.v
          ? (s.t = "b")
          : s.v instanceof Date
          ? ((s.t = "n"), (s.z = XLSX.SSF._table[14]), (s.v = t(s.v)))
          : (s.t = "s"),
          (o[c] = s);
      }
    }
  return r.s.c < 1e7 && (o["!ref"] = XLSX.utils.encode_range(r)), o;
}
function o(e, t) {
  e.data.unshift(e.fields);
  var o = new (function e() {
      if (!(this instanceof e)) return new e();
      (this.SheetNames = []), (this.Sheets = {});
    })(),
    r = n(e.data);
  return (
    o.SheetNames.push(t), (o.Sheets[t] = r), XLSX.write(o, { type: "binary" })
  );
}
function r(e) {
  try {
    e();
  } catch (e) {
    console.log("Error: ", e);
  }
}
import a from "./js/google-analytics.js";
var i = { id: parseInt(u("tabid")), url: u("url") },
  s = {},
  c = 1e3,
  l = null;
async function d() {
  null !== i.url.toLowerCase().match(/\/\/[a-z]+\.linkedin\.com/)
    ? ($("#waitHeader").hide(),
      p(
        "We're unable to collect data from LinkedIn. Sorry for the inconvenience.  If you have further questons please contact us at info@webrobots.io",
        "noResponseErr",
        !1,
        !0
      ))
    : (I(),
      setTimeout(function () {
        console.log("no response"), $("#waitHeader").is(":visible") && y(!0);
      }, 5e4),
      $(window).resize(function () {
        v();
      }),
      R());
}
function f(e, t) {
  return (t || ".") + e.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
}
function u(e) {
  for (
    var t = window.location.search.substring(1).split("&"), n = 0;
    n < t.length;
    n++
  ) {
    var o = t[n].split("=");
    if (decodeURIComponent(o[0]) == e) return decodeURIComponent(o[1]);
  }
}
function p(e, t, n, o) {
  if ("" === e) return $("#" + t).hide();
  $("#" + t)
    .show()
    .text(e),
    n && L(e),
    o && a.fireEvent("Error", { url: s.startingUrl || i.url, msg: e });
}
function h(e) {
  var t = e.length,
    n = { "": 1 / 0 },
    o = {},
    r = {},
    a = {},
    i = {};
  function c(e) {
    return e in n ? n[e] : ((n[e] = $(f(e)).length), n[e]);
  }
  e.forEach(function (e) {
    for (var t in e) t in o || (o[t] = 0), o[t]++;
  }),
    Object.keys(o)
      .map(function (e) {
        return [o[e], e];
      })
      .forEach(function ([n, o]) {
        var s = "",
          l = 1 / 0;
        o.split(" ")[0]
          .split("/")
          .slice(1)
          .reverse()
          .forEach(function (e) {
            e.split(".")
              .slice(1)
              .forEach(function (e) {
                l < 2 * t || c(e) >= l || ((s = e), (l = c(e)));
              });
          });
        var d = o.split(" ")[1],
          f = 0,
          u = e.map(function (e) {
            return o in e;
          });
        d && isNaN(d) && (s += " " + d),
          s in r
            ? (r[s].forEach(function (e, t) {
                if (!f) {
                  var n = !0;
                  e.forEach(function (e, t) {
                    n &= !(u[t] && e);
                  }),
                    n && (f = t + 1);
                }
              }),
              f
                ? (r[s][f - 1] = r[s][f - 1].map(function (e, t) {
                    return u[t] || e;
                  }))
                : (r[s].push(u), (f = r[s].length)),
              f > 1 && (s += " " + f))
            : (r[s] = [u]),
          s in a || (a[s] = []),
          a[s].push(o),
          s in i || (i[s] = 0),
          (i[s] += n);
      });
  var l = {},
    d = {
      fields: (r = Object.keys(a).filter(function (n) {
        var o = {},
          r = [];
        return (
          !(n in s.config.deletedFields) &&
          (e.map(function (e) {
            for (var t, i = 0; i < a[n].length; i++)
              a[n][i] in e && ((t = e[a[n][i]]) in o || (o[t] = 0), o[t]++);
            r.push(t);
          }),
          Object.keys(o).length && o[Object.keys(o)[0]] == t
            ? (0, !1)
            : (r = JSON.stringify(r)) in l
            ? (0, !1)
            : ((l[r] = 1), !(i[n] < 0.2 * t) || (0, !1)))
        );
      })),
      data: e.map(function (e) {
        return r.map(function (t) {
          for (var n = 0; n < a[t].length; n++)
            if (a[t][n] in e) return e[a[t][n]];
          return "";
        });
      }),
    };

  // const preferredKeywords = [
  //   "name",
  //   "href",
  //   "src",
  //   "mail",
  //   "title",
  //   "phone",
  //   "contact",
  //   "office",
  //   "call",
  //   "url",
  // ];

  // d.fields = d.fields.map((field) => {
  //   for (let keyword of preferredKeywords) {
  //     if (field.toLowerCase().includes(keyword)) return keyword;
  //   }
  //   return field;
  // });

  // return (s.names = d.fields), (s.namePaths = a), d;
  return (s.names = r), (s.namePaths = a), d;
}

function g(e) {
  return e.map(function (e) {
    return e in s.config.headers ? s.config.headers[e] : e;
  });
}
function w(e) {
  var t = h(e);
  return (t.fields = g(t.fields)), t;
}
function m(e) {
  for (
    var t = new ArrayBuffer(e.length), n = new Uint8Array(t), o = 0;
    o != e.length;
    ++o
  )
    n[o] = 255 & e.charCodeAt(o);
  return t;
}
function b() {
  a.fireEvent("Download", {
    hostName: s.hostName,
    startingUrl: s.startingUrl,
    dataLength: s.data.length,
  }),
    (() => {
      let e = (e) => {
          let t = {};
          for (let n = 0; n < 4; n++)
            void 0 !== e[n]
              ? (t[`selector${n}`] = e[n])
              : (t[`selector${n}`] = "");
          return t;
        },
        t = Object.keys(s.config.headers).length;
      t &&
        j(!0).then((n) => {
          let [o, r] = n;
          const i = (e) => r.find((t) => t.field_id === e);
          let c = {
            tableId: s.tableId,
            hostName: s.hostName,
            startingUrl: s.startingUrl,
          };
          if (t)
            for (name in s.config.headers) {
              let t = i(s.config.headers[name])
                  .selector.split(",")
                  .map((e) => e.slice(-100)),
                n = Object.assign(e(t), c, {
                  originalName: name,
                  newName: s.config.headers[name],
                });
              a.fireEvent("RenameColumn", n);
            }
        });
    })();
}
function v() {
  var e = h(s.data);
  (e.data = e.data.slice(0, c)), (s.previewLength = e.data.length);
  var t = $(".wtHolder").scrollTop(),
    n = $(".wtHolder").scrollLeft(),
    o = !1;
  $("#hot").empty();
  new Handsontable($("#hot").get(0), {
    data: e.data,
    colHeaders: g(e.fields),
    wordWrap: !1,
    manualColumnResize: !0,
    width: $(window).width() - 20,
    height: $(window).height() - $("#hot").get(0).getBoundingClientRect().y,
    afterRender: function () {
      o ||
        ((o = !0), $(".wtHolder").scrollTop(t), $(".wtHolder").scrollLeft(n));
    },
    modifyColWidth: function (e, t) {
      if (e > 300) return 300;
    },
    afterGetColHeader: function (t, n) {
      if (-1 != t) {
        $(n).children().length > 1
          ? $(".hot-header", n).remove()
          : $(n).click(function () {
              var e = this;
              setTimeout(function () {
                $(".header-input", e).trigger("focus");
              }, 20);
            });
        var o = $("<div>", { class: "hot-header" }),
          r = $("<div>", { class: "header-input", contenteditable: "true" });
        s.config.headers[e.fields[t]]
          ? r.text(s.config.headers[e.fields[t]])
          : r.text(n.firstChild.textContent),
          $(n).append(o),
          o.append(r),
          o.append(
            $("<span>", {
              class: "glyphicon glyphicon-remove remove-column",
              style: "padding-top: 2.5px",
            }).click(function () {
              (s.config.deletedFields[e.fields[t]] = !0),
                S(),
                $("#resetColumns").show(),
                v();
            })
          ),
          r.get(0).addEventListener("input", function (n) {
            (s.config.headers[e.fields[t]] = r.text()), S();
          }),
          (n.firstChild.style.display = "none");
      }
    },
    beforeOnCellMouseDown: function (e, t, n) {
      t.row < 0 && e.stopImmediatePropagation();
    },
  });
}
function S() {
  localStorage.setItem(s.configName, JSON.stringify(s.config));
}
function y(e) {
  $("#waitHeader").hide(),
    p(
      "Instant Data doesn't support data extraction from this site yet. Our administrators are notified and will try to add support in the future. Thanks for trying us out!",
      "noResponseErr",
      !1,
      !0
    );
}
function k() {
  return localStorage.getItem("nextSelector:" + s.hostName);
}
function x(e, t) {
  if (!e)
    return i.reloaded
      ? y()
      : ((i.reloaded = !0),
        chrome.tabs.reload(i.id, {}, function () {
          chrome.tabs.onUpdated.addListener(function e(t, n) {
            "complete" === n.status &&
              t === i.id &&
              (chrome.tabs.onUpdated.removeListener(e), R());
          });
        }));
  (s.tableId = e.tableId),
    (s.scraping = !1),
    (s.failedToProcess = !1),
    (s.processingError = null),
    (s.tableSelector = e.tableSelector),
    (s.startingUrl = e.href),
    (s.hostName = e.hostname),
    (s.previewLength = 0),
    (s.configName = e.hostname + "-config"),
    (s.config = JSON.parse(localStorage.getItem(s.configName)) || {
      headers: {},
      deletedFields: {},
      crawlDelay: 1e3,
      maxWait: 2e4,
    }),
    r(
      t
        ? () => a.firePageViewEvent(s.hostName, s.startingUrl)
        : () =>
            a.fireEvent("AnotherTable", {
              hostName: s.hostName,
              startingUrl: s.startingUrl,
            })
    ),
    Object.keys(s.config.deletedFields).length && $("#resetColumns").show();
  var n = N(i.url);

  $("#wrongTable").show(),
    s.config.infinateScrollChecked &&
      ($("#nextButton").hide(),
      $("#startScraping").show(),
      $("#infinateScroll").prop("checked", !0)),
    chrome.tabs.sendMessage(i.id, { action: "getTableData" }, function (e) {
      e && e.error
        ? p("Something went wrong!", "noResponseErr", !0)
        : e.tableId == s.tableId &&
          (e.failedToProcess
            ? (p(
                "Failed to process rows on server. Showing raw data instead.",
                "error",
                !1
              ),
              (s.failedToProcess = !0),
              (s.processingError = e.processingError))
            : ($("#error").hide(), (s.failedToProcess = !1)),
          s.pages || s.config.infinateScrollChecked || $("#nextButton").show(),
          s.pages ||
            ((s.nextSelector = k()),
            s.nextSelector &&
              chrome.tabs.sendMessage(
                i.id,
                { action: "markNextButton", selector: s.nextSelector },
                function (e) {
                  e.error || $("#startScraping").show();
                }
              )),
          $("#wait").hide(),
          $("#content").show(),
          p(
            'Download data or locate "Next" to crawl multiple pages',
            "instructions"
          ),
          (s.data = e.data),
          (s.pages = 1),
          (s.lastRows = e.data.length),
          (s.tableSelector = e.tableSelector),
          (s.goodClasses = e.goodClasses),
          (s.workingTime = 0),
          q(),
          $(".download-button").show(),
          v(),
          $("#csv")
            .off("click")
            .click(function () {
              console.log("Downloading CSV..."), r(b), P({ download: !0 });
              var url = i.url;
              /////////////////////
              var url = i.url;
              // var hostname = new URL(i.url).hostname;
              var nameFromInput = document
                .querySelector(".filename")
                .value.trim();
              var finalFileName =
                nameFromInput + "" + url.replace("https", "") + ".csv";
              ////////////////////
              let e = w(s.data);
              e.data.forEach((t, n) => {
                t.forEach((t, o) => {
                  Array.isArray(t) &&
                    (e.data[n][o] = Papa.unparse([t], {
                      quotes: !0,
                      escapeChar: '"',
                    }));
                });
              }),
                saveAs(
                  new Blob([Papa.unparse(e, { quotes: !0, escapeChar: '"' })], {
                    type: "application/octet-stream",
                  }),
                  finalFileName
                );
              window.close();
            }),
          $("#xlsx")
            .off("click")
            .click(function () {
              r(b),
                P({ download: !0 }),
                saveAs(
                  new Blob([m(o(w(s.data), i.url.substring(0, 100)))], {
                    type: "application/octet-stream",
                  }),
                  n + ".xlsx"
                );
            }),
          $("#copy")
            .off("click")
            .click(function () {
              r(b),
                P({ download: !0 }),
                E(Papa.unparse(w(s.data), { delimiter: "\t" }));
            }));
    });
}
function N(e) {
  var t = new URL(e).hostname.split(".");
  return t[0].indexOf("www") > -1 ? t[1] : t[0];
}
function E(e) {
  var t = function (t) {
    t.preventDefault(),
      t.clipboardData
        ? t.clipboardData.setData("text/plain", e)
        : window.clipboardData && window.clipboardData.setData("Text", e);
  };
  window.addEventListener("copy", t),
    document.execCommand("copy"),
    window.removeEventListener("copy", t);
}
function R() {
  chrome.tabs.sendMessage(
    i.id,
    { action: "findTables", robots: l },
    function (e) {
      x(e, !0);
    }
  );
}
function C() {
  return $("#infinateScroll").is(":checked");
}
function D(e) {
  s.data = s.data.concat(e);
  var t = new Set();
  s.data.forEach((e) => t.add(JSON.stringify(e))),
    (s.data = Array.from(t, (e) => JSON.parse(e)));
}
function T() {
  (s.gettingNext = !1),
    (s.scraping = !0),
    $("#startScraping").hide(),
    $("#stopScraping").show(),
    p("", "error"),
    p('Please wait for more pages or press "Stop crawling".', "instructions"),
    C() && $("#infinateScrollElement").hide();
  var t = new Date();
  !(function n() {
    const o = function (e) {
      let t = { action: "scrollDown", selector: s.tableSelector };
      chrome.tabs.sendMessage(i.id, t, function (t) {
        if (t && t.error)
          return p("", "instructions"), p(t.error, t.errorId || "error", !0);
        $("#wrongTable").hide(), e();
      });
    };
    var r = function (e) {
      chrome.tabs.sendMessage(
        i.id,
        { action: "clickNext", selector: s.nextSelector },
        function (t) {
          if (t && t.error)
            return p("", "instructions"), p(t.error, t.errorId, !0);
          $("#wrongTable").hide(), e();
        }
      );
    };
    C() && (r = o),
      e(
        r,
        function () {
          chrome.tabs.sendMessage(
            i.id,
            { action: "getTableData", selector: s.tableSelector },
            function (e) {
              if (e) {
                if (e.error)
                  return (
                    p("", "instructions"), p(e.error, e.errorId || "error", !0)
                  );
                e.failedToProcess
                  ? (p(
                      "Failed to process rows. Showing raw data instead.",
                      "error",
                      !1
                    ),
                    (s.failedToProcess = !0),
                    (s.processingError = e.processingError))
                  : ($("#error").hide(), (s.failedToProcess = !1)),
                  (s.lastRows = e.data.length),
                  s.pages++,
                  (s.workingTime += new Date() - t),
                  (t = new Date()),
                  D(e.data),
                  q(),
                  s.previewLength < c
                    ? v()
                    : p("Preview limited to 1000 rows.", "previewLimit"),
                  s.scraping && n();
              }
            }
          );
        },
        i.id,
        s.config.maxWait,
        100,
        s.config.crawlDelay,
        function (e) {
          chrome.tabs.sendMessage(i.id, {}, function (t) {
            e(void 0 !== t);
          });
        }
      );
  })();
}
function I() {
  $("#stopScraping").click(L),
    $("#crawlDelay").bind(
      "propertychange change click keyup input paste",
      function () {
        var e = $(this).val();
        if (isNaN(e) || e < 0 || parseInt(1e3 * e) >= s.config.maxWait)
          return p("Bad min waiting value", "inputError");
        p("", "inputError"), (s.config.crawlDelay = parseInt(1e3 * e)), S();
      }
    ),
    $("#maxWait").bind(
      "propertychange change click keyup input paste",
      function () {
        var e = $(this).val();
        if (isNaN(e) || parseInt(1e3 * e) <= s.config.crawlDelay)
          return p("Bad max waiting value", "inputError");
        p("", "inputError"), (s.config.maxWait = parseInt(1e3 * e)), S();
      }
    ),
    $("#resetColumns").click(function () {
      (s.config.deletedFields = {}), S(), $("#resetColumns").hide(), v();
    }),
    $("#infinateScroll").click(function (e) {
      s.config.infinateScrollChecked
        ? ((s.config.infinateScrollChecked = !1),
          $("#nextButton").show(),
          k() ? $("#startScraping").show() : $("#startScraping").hide())
        : ((s.config.infinateScrollChecked = !0),
          $("#nextButton").hide(),
          $("#startScraping").show()),
        S();
    });
}
function L(e = null) {
  (s.scraping = !1),
    console.log("Scraping stopped."),
    $("#startScraping").show(),
    $("#stopScraping").hide(),
    p(
      "Crawling stopped. Please download data or continue crawling.",
      "instructions"
    );
}
function O() {
  $("#pleaseRate").show(),
    $("#rateLater")
      .show()
      .click(function () {
        P({ rate: "later" }),
          $("#pleaseRate").hide(),
          r(() => a.fireEvent("Click", { button: "Rate later" }));
      }),
    $("#rate")
      .show()
      .click(function () {
        P({ rate: "now" }),
          $("#pleaseRate").hide(),
          r(() => a.fireEvent("Click", { button: "Rate now" })),
          chrome.tabs.create({
            url: "https://chrome.google.com/webstore/detail/instant-data-scraper/ofaokhiedipichpaobibbnahnkdoiiah/reviews",
          });
      });
}
function P(e) {
  var t = JSON.parse(localStorage.getItem("stats")) || {
    pages: 0,
    rows: 0,
    downloads: 0,
    tabs: 0,
    lastRateRequest: null,
    lastDownloads: 0,
    lastRows: 0,
    rated: !1,
  };
  e.download
    ? t.downloads++
    : e.rate
    ? ("later" == e.rate &&
        ((t.lastRateRequest = new Date().getTime()),
        (t.lastDownloads = t.downloads),
        (t.lastRows = t.rows)),
      "now" == e.rate && (t.rated = !0))
    : (1 == s.pages && t.tabs++, t.pages++, (t.rows += s.lastRows)),
    !t.rated &&
      new Date().getTime() - t.lastRateRequest > 52704e5 &&
      t.downloads - t.lastDownloads > 9 &&
      t.rows - t.lastRows > 999 &&
      O(),
    localStorage.setItem("stats", JSON.stringify(t));
}
function q() {
  $("#stats")
    .empty()
    .append($("<div>", { text: "Pages scraped: " + s.pages }))
    .append($("<div>", { text: "Rows collected: " + s.data.length }))
    .append($("<div>", { text: "Rows from last page: " + s.lastRows }))
    .append(
      $("<div>", {
        text: "Working time: " + parseInt(s.workingTime / 1e3) + "s",
      })
    ),
    P({});
}
async function j(e = !1) {
  var t = s.tableSelector.replace(".tablescraper-selected-table", ""),
    n = [];
  s.goodClasses
    .map((e) =>
      e
        .split(" ")
        .map((e) => "." + e)
        .join("")
    )
    .forEach((e) => {
      (e = e.replace(/.tablescraper-selected-row/g, "")).length &&
        n.push(t + " " + e + ":not(:empty)");
    }),
    n.length || n.push(t + " > *:not(:empty)");
  var o = n.join(","),
    r = [];
  let a = s.names;
  for (var i of (e && (a = a.concat(Object.keys(s.config.deletedFields))), a)) {
    var c = s.namePaths[i];
    let e = { target: "text" };
    (e.field_id = i),
      (e.param = ""),
      s.config.headers[i] && (e.field_id = s.config.headers[i]);
    let t = [];
    for (var l of c) {
      let n = "";
      try {
        console.log("Picking selector..."), (n = await U(o, l));
      } catch (e) {
        console.log(e);
      }
      console.log("Selector picked: ", n),
        t.push(n),
        (l = l.split(" ")).filter((e) => "href" == e).length &&
          ((e.target = "prop"), (e.param = "href")),
        l.filter((e) => "src" == e).length &&
          ((e.target = "prop"), (e.param = "src"));
    }
    (e.selector = t.join(",")), r.push(e);
  }
  return [o, r];
}
function U(e, t) {
  return new Promise((n, o) => {
    chrome.tabs.sendMessage(
      i.id,
      { action: "chooseSelector", rowSelector: e, path: t },
      function (e) {
        e ? n(e.selector) : o(new Error("Could not choose selector!"));
      }
    );
  });
}
d(),
  $("#wrongTable").click(function () {
    $("#hot").empty(),
      chrome.tabs.sendMessage(i.id, { action: "nextTable" }, x);
  }),
  $("#nextButton").click(function () {
    p('Mark "Next" button or link', "instructions"),
      (s.gettingNext = !0),
      (function e() {
        chrome.tabs.sendMessage(
          i.id,
          { action: "getNextButton" },
          function (t) {
            s.scraping ||
              (s.gettingNext && e(),
              t.selector &&
                ($("#startScraping").show(),
                p(
                  '"Next" button located. Press "Start crawling" to get more pages or mark another button/link if marked incorrectly.',
                  "instructions"
                ),
                (s.nextSelector = t.selector),
                localStorage.setItem(
                  "nextSelector:" + s.hostName,
                  t.selector
                )));
          }
        );
      })();
  }),
  $("#startScraping").click(T);
