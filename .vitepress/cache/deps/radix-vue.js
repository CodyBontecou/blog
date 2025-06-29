import {
  Comment,
  Fragment,
  Teleport,
  camelize,
  cloneVNode,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  effectScope,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  h,
  inject,
  isRef,
  markRaw,
  mergeDefaults,
  mergeProps,
  nextTick,
  normalizeProps,
  normalizeStyle,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUnmounted,
  onUpdated,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toHandlerKey,
  toHandlers,
  toRaw,
  toRef,
  toRefs,
  triggerRef,
  unref,
  useId,
  useSlots,
  vModelSelect,
  vShow,
  watch,
  watchEffect,
  watchPostEffect,
  watchSyncEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-W6V53FDX.js";
import "./chunk-PZ5AY32C.js";

// node_modules/@internationalized/date/dist/utils.mjs
function $2b4dce13dd5a17fa$export$842a2cf37af977e1(amount, numerator) {
  return amount - numerator * Math.floor(amount / numerator);
}

// node_modules/@internationalized/date/dist/GregorianCalendar.mjs
var $3b62074eb05584b2$var$EPOCH = 1721426;
function $3b62074eb05584b2$export$f297eb839006d339(era, year, month, day) {
  year = $3b62074eb05584b2$export$c36e0ecb2d4fa69d(era, year);
  let y1 = year - 1;
  let monthOffset = -2;
  if (month <= 2) monthOffset = 0;
  else if ($3b62074eb05584b2$export$553d7fa8e3805fc0(year)) monthOffset = -1;
  return $3b62074eb05584b2$var$EPOCH - 1 + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) + Math.floor((367 * month - 362) / 12 + monthOffset + day);
}
function $3b62074eb05584b2$export$553d7fa8e3805fc0(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function $3b62074eb05584b2$export$c36e0ecb2d4fa69d(era, year) {
  return era === "BC" ? 1 - year : year;
}
function $3b62074eb05584b2$export$4475b7e617eb123c(year) {
  let era = "AD";
  if (year <= 0) {
    era = "BC";
    year = 1 - year;
  }
  return [
    era,
    year
  ];
}
var $3b62074eb05584b2$var$daysInMonth = {
  standard: [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ],
  leapyear: [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]
};
var $3b62074eb05584b2$export$80ee6245ec4f29ec = class {
  fromJulianDay(jd2) {
    let jd0 = jd2;
    let depoch = jd0 - $3b62074eb05584b2$var$EPOCH;
    let quadricent = Math.floor(depoch / 146097);
    let dqc = (0, $2b4dce13dd5a17fa$export$842a2cf37af977e1)(depoch, 146097);
    let cent = Math.floor(dqc / 36524);
    let dcent = (0, $2b4dce13dd5a17fa$export$842a2cf37af977e1)(dqc, 36524);
    let quad = Math.floor(dcent / 1461);
    let dquad = (0, $2b4dce13dd5a17fa$export$842a2cf37af977e1)(dcent, 1461);
    let yindex = Math.floor(dquad / 365);
    let extendedYear = quadricent * 400 + cent * 100 + quad * 4 + yindex + (cent !== 4 && yindex !== 4 ? 1 : 0);
    let [era, year] = $3b62074eb05584b2$export$4475b7e617eb123c(extendedYear);
    let yearDay = jd0 - $3b62074eb05584b2$export$f297eb839006d339(era, year, 1, 1);
    let leapAdj = 2;
    if (jd0 < $3b62074eb05584b2$export$f297eb839006d339(era, year, 3, 1)) leapAdj = 0;
    else if ($3b62074eb05584b2$export$553d7fa8e3805fc0(year)) leapAdj = 1;
    let month = Math.floor(((yearDay + leapAdj) * 12 + 373) / 367);
    let day = jd0 - $3b62074eb05584b2$export$f297eb839006d339(era, year, month, 1) + 1;
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(era, year, month, day);
  }
  toJulianDay(date) {
    return $3b62074eb05584b2$export$f297eb839006d339(date.era, date.year, date.month, date.day);
  }
  getDaysInMonth(date) {
    return $3b62074eb05584b2$var$daysInMonth[$3b62074eb05584b2$export$553d7fa8e3805fc0(date.year) ? "leapyear" : "standard"][date.month - 1];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMonthsInYear(date) {
    return 12;
  }
  getDaysInYear(date) {
    return $3b62074eb05584b2$export$553d7fa8e3805fc0(date.year) ? 366 : 365;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getYearsInEra(date) {
    return 9999;
  }
  getEras() {
    return [
      "BC",
      "AD"
    ];
  }
  isInverseEra(date) {
    return date.era === "BC";
  }
  balanceDate(date) {
    if (date.year <= 0) {
      date.era = date.era === "BC" ? "AD" : "BC";
      date.year = 1 - date.year;
    }
  }
  constructor() {
    this.identifier = "gregory";
  }
};

// node_modules/@internationalized/date/dist/weekStartData.mjs
var $2fe286d2fb449abb$export$7a5acbd77d414bd9 = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BY: 1,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  HR: 1,
  HU: 1,
  IE: 1,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JO: 6,
  KG: 1,
  KW: 6,
  KZ: 1,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MK: 1,
  MN: 1,
  MQ: 1,
  MV: 5,
  MY: 1,
  NL: 1,
  NO: 1,
  NZ: 1,
  OM: 6,
  PL: 1,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SD: 6,
  SE: 1,
  SI: 1,
  SK: 1,
  SM: 1,
  SY: 6,
  TJ: 1,
  TM: 1,
  TR: 1,
  UA: 1,
  UY: 1,
  UZ: 1,
  VA: 1,
  VN: 1,
  XK: 1
};

// node_modules/@internationalized/date/dist/queries.mjs
function $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2, b2) {
  b2 = (0, $11d87f3f76e88657$export$b4a036af3fc0b032)(b2, a2.calendar);
  return a2.era === b2.era && a2.year === b2.year && a2.month === b2.month && a2.day === b2.day;
}
function $14e0f24ef4ac5c92$export$a18c89cbd24170ff(a2, b2) {
  b2 = (0, $11d87f3f76e88657$export$b4a036af3fc0b032)(b2, a2.calendar);
  a2 = $14e0f24ef4ac5c92$export$a5a3b454ada2268e(a2);
  b2 = $14e0f24ef4ac5c92$export$a5a3b454ada2268e(b2);
  return a2.era === b2.era && a2.year === b2.year && a2.month === b2.month;
}
function $14e0f24ef4ac5c92$export$91b62ebf2ba703ee(a2, b2) {
  return $14e0f24ef4ac5c92$export$dbc69fd56b53d5e(a2.calendar, b2.calendar) && $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2, b2);
}
function $14e0f24ef4ac5c92$export$5a8da0c44a3afdf2(a2, b2) {
  return $14e0f24ef4ac5c92$export$dbc69fd56b53d5e(a2.calendar, b2.calendar) && $14e0f24ef4ac5c92$export$a18c89cbd24170ff(a2, b2);
}
function $14e0f24ef4ac5c92$export$dbc69fd56b53d5e(a2, b2) {
  var _a_isEqual, _b_isEqual;
  var _a_isEqual1, _ref;
  return (_ref = (_a_isEqual1 = (_a_isEqual = a2.isEqual) === null || _a_isEqual === void 0 ? void 0 : _a_isEqual.call(a2, b2)) !== null && _a_isEqual1 !== void 0 ? _a_isEqual1 : (_b_isEqual = b2.isEqual) === null || _b_isEqual === void 0 ? void 0 : _b_isEqual.call(b2, a2)) !== null && _ref !== void 0 ? _ref : a2.identifier === b2.identifier;
}
function $14e0f24ef4ac5c92$export$629b0a497aa65267(date, timeZone) {
  return $14e0f24ef4ac5c92$export$ea39ec197993aef0(date, $14e0f24ef4ac5c92$export$d0bdf45af03a6ea3(timeZone));
}
var $14e0f24ef4ac5c92$var$DAY_MAP = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};
function $14e0f24ef4ac5c92$export$2061056d06d7cdf7(date, locale, firstDayOfWeek) {
  let julian = date.calendar.toJulianDay(date);
  let weekStart = firstDayOfWeek ? $14e0f24ef4ac5c92$var$DAY_MAP[firstDayOfWeek] : $14e0f24ef4ac5c92$var$getWeekStart(locale);
  let dayOfWeek = Math.ceil(julian + 1 - weekStart) % 7;
  if (dayOfWeek < 0) dayOfWeek += 7;
  return dayOfWeek;
}
function $14e0f24ef4ac5c92$export$461939dd4422153(timeZone) {
  return (0, $11d87f3f76e88657$export$1b96692a1ba042ac)(Date.now(), timeZone);
}
function $14e0f24ef4ac5c92$export$d0bdf45af03a6ea3(timeZone) {
  return (0, $11d87f3f76e88657$export$93522d1a439f3617)($14e0f24ef4ac5c92$export$461939dd4422153(timeZone));
}
function $14e0f24ef4ac5c92$export$68781ddf31c0090f(a2, b2) {
  return a2.calendar.toJulianDay(a2) - b2.calendar.toJulianDay(b2);
}
function $14e0f24ef4ac5c92$export$c19a80a9721b80f6(a2, b2) {
  return $14e0f24ef4ac5c92$var$timeToMs(a2) - $14e0f24ef4ac5c92$var$timeToMs(b2);
}
function $14e0f24ef4ac5c92$var$timeToMs(a2) {
  return a2.hour * 36e5 + a2.minute * 6e4 + a2.second * 1e3 + a2.millisecond;
}
var $14e0f24ef4ac5c92$var$localTimeZone = null;
function $14e0f24ef4ac5c92$export$aa8b41735afcabd2() {
  if ($14e0f24ef4ac5c92$var$localTimeZone == null) $14e0f24ef4ac5c92$var$localTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  return $14e0f24ef4ac5c92$var$localTimeZone;
}
function $14e0f24ef4ac5c92$export$a5a3b454ada2268e(date) {
  return date.subtract({
    days: date.day - 1
  });
}
function $14e0f24ef4ac5c92$export$a2258d9c4118825c(date) {
  return date.add({
    days: date.calendar.getDaysInMonth(date) - date.day
  });
}
var $14e0f24ef4ac5c92$var$cachedRegions = /* @__PURE__ */ new Map();
function $14e0f24ef4ac5c92$var$getRegion(locale) {
  if (Intl.Locale) {
    let region = $14e0f24ef4ac5c92$var$cachedRegions.get(locale);
    if (!region) {
      region = new Intl.Locale(locale).maximize().region;
      if (region) $14e0f24ef4ac5c92$var$cachedRegions.set(locale, region);
    }
    return region;
  }
  let part = locale.split("-")[1];
  return part === "u" ? void 0 : part;
}
function $14e0f24ef4ac5c92$var$getWeekStart(locale) {
  let region = $14e0f24ef4ac5c92$var$getRegion(locale);
  return region ? (0, $2fe286d2fb449abb$export$7a5acbd77d414bd9)[region] || 0 : 0;
}

// node_modules/@internationalized/date/dist/conversion.mjs
function $11d87f3f76e88657$export$bd4fb2bc8bb06fb(date) {
  date = $11d87f3f76e88657$export$b4a036af3fc0b032(date, new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)());
  let year = (0, $3b62074eb05584b2$export$c36e0ecb2d4fa69d)(date.era, date.year);
  return $11d87f3f76e88657$var$epochFromParts(year, date.month, date.day, date.hour, date.minute, date.second, date.millisecond);
}
function $11d87f3f76e88657$var$epochFromParts(year, month, day, hour, minute, second, millisecond) {
  let date = /* @__PURE__ */ new Date();
  date.setUTCHours(hour, minute, second, millisecond);
  date.setUTCFullYear(year, month - 1, day);
  return date.getTime();
}
function $11d87f3f76e88657$export$59c99f3515d3493f(ms2, timeZone) {
  if (timeZone === "UTC") return 0;
  if (ms2 > 0 && timeZone === (0, $14e0f24ef4ac5c92$export$aa8b41735afcabd2)()) return new Date(ms2).getTimezoneOffset() * -6e4;
  let { year, month, day, hour, minute, second } = $11d87f3f76e88657$var$getTimeZoneParts(ms2, timeZone);
  let utc = $11d87f3f76e88657$var$epochFromParts(year, month, day, hour, minute, second, 0);
  return utc - Math.floor(ms2 / 1e3) * 1e3;
}
var $11d87f3f76e88657$var$formattersByTimeZone = /* @__PURE__ */ new Map();
function $11d87f3f76e88657$var$getTimeZoneParts(ms2, timeZone) {
  let formatter = $11d87f3f76e88657$var$formattersByTimeZone.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      era: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    $11d87f3f76e88657$var$formattersByTimeZone.set(timeZone, formatter);
  }
  let parts = formatter.formatToParts(new Date(ms2));
  let namedParts = {};
  for (let part of parts) if (part.type !== "literal") namedParts[part.type] = part.value;
  return {
    // Firefox returns B instead of BC... https://bugzilla.mozilla.org/show_bug.cgi?id=1752253
    year: namedParts.era === "BC" || namedParts.era === "B" ? -namedParts.year + 1 : +namedParts.year,
    month: +namedParts.month,
    day: +namedParts.day,
    hour: namedParts.hour === "24" ? 0 : +namedParts.hour,
    minute: +namedParts.minute,
    second: +namedParts.second
  };
}
var $11d87f3f76e88657$var$DAYMILLIS = 864e5;
function $11d87f3f76e88657$var$getValidWallTimes(date, timeZone, earlier, later) {
  let found = earlier === later ? [
    earlier
  ] : [
    earlier,
    later
  ];
  return found.filter((absolute) => $11d87f3f76e88657$var$isValidWallTime(date, timeZone, absolute));
}
function $11d87f3f76e88657$var$isValidWallTime(date, timeZone, absolute) {
  let parts = $11d87f3f76e88657$var$getTimeZoneParts(absolute, timeZone);
  return date.year === parts.year && date.month === parts.month && date.day === parts.day && date.hour === parts.hour && date.minute === parts.minute && date.second === parts.second;
}
function $11d87f3f76e88657$export$5107c82f94518f5c(date, timeZone, disambiguation = "compatible") {
  let dateTime = $11d87f3f76e88657$export$b21e0b124e224484(date);
  if (timeZone === "UTC") return $11d87f3f76e88657$export$bd4fb2bc8bb06fb(dateTime);
  if (timeZone === (0, $14e0f24ef4ac5c92$export$aa8b41735afcabd2)() && disambiguation === "compatible") {
    dateTime = $11d87f3f76e88657$export$b4a036af3fc0b032(dateTime, new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)());
    let date2 = /* @__PURE__ */ new Date();
    let year = (0, $3b62074eb05584b2$export$c36e0ecb2d4fa69d)(dateTime.era, dateTime.year);
    date2.setFullYear(year, dateTime.month - 1, dateTime.day);
    date2.setHours(dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
    return date2.getTime();
  }
  let ms2 = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(dateTime);
  let offsetBefore = $11d87f3f76e88657$export$59c99f3515d3493f(ms2 - $11d87f3f76e88657$var$DAYMILLIS, timeZone);
  let offsetAfter = $11d87f3f76e88657$export$59c99f3515d3493f(ms2 + $11d87f3f76e88657$var$DAYMILLIS, timeZone);
  let valid = $11d87f3f76e88657$var$getValidWallTimes(dateTime, timeZone, ms2 - offsetBefore, ms2 - offsetAfter);
  if (valid.length === 1) return valid[0];
  if (valid.length > 1) switch (disambiguation) {
    case "compatible":
    case "earlier":
      return valid[0];
    case "later":
      return valid[valid.length - 1];
    case "reject":
      throw new RangeError("Multiple possible absolute times found");
  }
  switch (disambiguation) {
    case "earlier":
      return Math.min(ms2 - offsetBefore, ms2 - offsetAfter);
    case "compatible":
    case "later":
      return Math.max(ms2 - offsetBefore, ms2 - offsetAfter);
    case "reject":
      throw new RangeError("No such absolute time found");
  }
}
function $11d87f3f76e88657$export$e67a095c620b86fe(dateTime, timeZone, disambiguation = "compatible") {
  return new Date($11d87f3f76e88657$export$5107c82f94518f5c(dateTime, timeZone, disambiguation));
}
function $11d87f3f76e88657$export$1b96692a1ba042ac(ms2, timeZone) {
  let offset3 = $11d87f3f76e88657$export$59c99f3515d3493f(ms2, timeZone);
  let date = new Date(ms2 + offset3);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let second = date.getUTCSeconds();
  let millisecond = date.getUTCMilliseconds();
  return new (0, $35ea8db9cb2ccb90$export$d3b7288e7994edea)(year < 1 ? "BC" : "AD", year < 1 ? -year + 1 : year, month, day, timeZone, offset3, hour, minute, second, millisecond);
}
function $11d87f3f76e88657$export$93522d1a439f3617(dateTime) {
  return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(dateTime.calendar, dateTime.era, dateTime.year, dateTime.month, dateTime.day);
}
function $11d87f3f76e88657$export$b21e0b124e224484(date, time) {
  let hour = 0, minute = 0, second = 0, millisecond = 0;
  if ("timeZone" in date) ({ hour, minute, second, millisecond } = date);
  else if ("hour" in date && !time) return date;
  if (time) ({ hour, minute, second, millisecond } = time);
  return new (0, $35ea8db9cb2ccb90$export$ca871e8dbb80966f)(date.calendar, date.era, date.year, date.month, date.day, hour, minute, second, millisecond);
}
function $11d87f3f76e88657$export$b4a036af3fc0b032(date, calendar) {
  if ((0, $14e0f24ef4ac5c92$export$dbc69fd56b53d5e)(date.calendar, calendar)) return date;
  let calendarDate = calendar.fromJulianDay(date.calendar.toJulianDay(date));
  let copy = date.copy();
  copy.calendar = calendar;
  copy.era = calendarDate.era;
  copy.year = calendarDate.year;
  copy.month = calendarDate.month;
  copy.day = calendarDate.day;
  (0, $735220c2d4774dd3$export$c4e2ecac49351ef2)(copy);
  return copy;
}
function $11d87f3f76e88657$export$84c95a83c799e074(date, timeZone, disambiguation) {
  if (date instanceof (0, $35ea8db9cb2ccb90$export$d3b7288e7994edea)) {
    if (date.timeZone === timeZone) return date;
    return $11d87f3f76e88657$export$538b00033cc11c75(date, timeZone);
  }
  let ms2 = $11d87f3f76e88657$export$5107c82f94518f5c(date, timeZone, disambiguation);
  return $11d87f3f76e88657$export$1b96692a1ba042ac(ms2, timeZone);
}
function $11d87f3f76e88657$export$83aac07b4c37b25(date) {
  let ms2 = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(date) - date.offset;
  return new Date(ms2);
}
function $11d87f3f76e88657$export$538b00033cc11c75(date, timeZone) {
  let ms2 = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(date) - date.offset;
  return $11d87f3f76e88657$export$b4a036af3fc0b032($11d87f3f76e88657$export$1b96692a1ba042ac(ms2, timeZone), date.calendar);
}

// node_modules/@internationalized/date/dist/manipulation.mjs
var $735220c2d4774dd3$var$ONE_HOUR = 36e5;
function $735220c2d4774dd3$export$e16d8520af44a096(date, duration) {
  let mutableDate = date.copy();
  let days = "hour" in mutableDate ? $735220c2d4774dd3$var$addTimeFields(mutableDate, duration) : 0;
  $735220c2d4774dd3$var$addYears(mutableDate, duration.years || 0);
  if (mutableDate.calendar.balanceYearMonth) mutableDate.calendar.balanceYearMonth(mutableDate, date);
  mutableDate.month += duration.months || 0;
  $735220c2d4774dd3$var$balanceYearMonth(mutableDate);
  $735220c2d4774dd3$var$constrainMonthDay(mutableDate);
  mutableDate.day += (duration.weeks || 0) * 7;
  mutableDate.day += duration.days || 0;
  mutableDate.day += days;
  $735220c2d4774dd3$var$balanceDay(mutableDate);
  if (mutableDate.calendar.balanceDate) mutableDate.calendar.balanceDate(mutableDate);
  if (mutableDate.year < 1) {
    mutableDate.year = 1;
    mutableDate.month = 1;
    mutableDate.day = 1;
  }
  let maxYear = mutableDate.calendar.getYearsInEra(mutableDate);
  if (mutableDate.year > maxYear) {
    var _mutableDate_calendar_isInverseEra, _mutableDate_calendar;
    let isInverseEra = (_mutableDate_calendar_isInverseEra = (_mutableDate_calendar = mutableDate.calendar).isInverseEra) === null || _mutableDate_calendar_isInverseEra === void 0 ? void 0 : _mutableDate_calendar_isInverseEra.call(_mutableDate_calendar, mutableDate);
    mutableDate.year = maxYear;
    mutableDate.month = isInverseEra ? 1 : mutableDate.calendar.getMonthsInYear(mutableDate);
    mutableDate.day = isInverseEra ? 1 : mutableDate.calendar.getDaysInMonth(mutableDate);
  }
  if (mutableDate.month < 1) {
    mutableDate.month = 1;
    mutableDate.day = 1;
  }
  let maxMonth = mutableDate.calendar.getMonthsInYear(mutableDate);
  if (mutableDate.month > maxMonth) {
    mutableDate.month = maxMonth;
    mutableDate.day = mutableDate.calendar.getDaysInMonth(mutableDate);
  }
  mutableDate.day = Math.max(1, Math.min(mutableDate.calendar.getDaysInMonth(mutableDate), mutableDate.day));
  return mutableDate;
}
function $735220c2d4774dd3$var$addYears(date, years) {
  var _date_calendar_isInverseEra, _date_calendar;
  if ((_date_calendar_isInverseEra = (_date_calendar = date.calendar).isInverseEra) === null || _date_calendar_isInverseEra === void 0 ? void 0 : _date_calendar_isInverseEra.call(_date_calendar, date)) years = -years;
  date.year += years;
}
function $735220c2d4774dd3$var$balanceYearMonth(date) {
  while (date.month < 1) {
    $735220c2d4774dd3$var$addYears(date, -1);
    date.month += date.calendar.getMonthsInYear(date);
  }
  let monthsInYear = 0;
  while (date.month > (monthsInYear = date.calendar.getMonthsInYear(date))) {
    date.month -= monthsInYear;
    $735220c2d4774dd3$var$addYears(date, 1);
  }
}
function $735220c2d4774dd3$var$balanceDay(date) {
  while (date.day < 1) {
    date.month--;
    $735220c2d4774dd3$var$balanceYearMonth(date);
    date.day += date.calendar.getDaysInMonth(date);
  }
  while (date.day > date.calendar.getDaysInMonth(date)) {
    date.day -= date.calendar.getDaysInMonth(date);
    date.month++;
    $735220c2d4774dd3$var$balanceYearMonth(date);
  }
}
function $735220c2d4774dd3$var$constrainMonthDay(date) {
  date.month = Math.max(1, Math.min(date.calendar.getMonthsInYear(date), date.month));
  date.day = Math.max(1, Math.min(date.calendar.getDaysInMonth(date), date.day));
}
function $735220c2d4774dd3$export$c4e2ecac49351ef2(date) {
  if (date.calendar.constrainDate) date.calendar.constrainDate(date);
  date.year = Math.max(1, Math.min(date.calendar.getYearsInEra(date), date.year));
  $735220c2d4774dd3$var$constrainMonthDay(date);
}
function $735220c2d4774dd3$export$3e2544e88a25bff8(duration) {
  let inverseDuration = {};
  for (let key in duration) if (typeof duration[key] === "number") inverseDuration[key] = -duration[key];
  return inverseDuration;
}
function $735220c2d4774dd3$export$4e2d2ead65e5f7e3(date, duration) {
  return $735220c2d4774dd3$export$e16d8520af44a096(date, $735220c2d4774dd3$export$3e2544e88a25bff8(duration));
}
function $735220c2d4774dd3$export$adaa4cf7ef1b65be(date, fields) {
  let mutableDate = date.copy();
  if (fields.era != null) mutableDate.era = fields.era;
  if (fields.year != null) mutableDate.year = fields.year;
  if (fields.month != null) mutableDate.month = fields.month;
  if (fields.day != null) mutableDate.day = fields.day;
  $735220c2d4774dd3$export$c4e2ecac49351ef2(mutableDate);
  return mutableDate;
}
function $735220c2d4774dd3$export$e5d5e1c1822b6e56(value, fields) {
  let mutableValue = value.copy();
  if (fields.hour != null) mutableValue.hour = fields.hour;
  if (fields.minute != null) mutableValue.minute = fields.minute;
  if (fields.second != null) mutableValue.second = fields.second;
  if (fields.millisecond != null) mutableValue.millisecond = fields.millisecond;
  $735220c2d4774dd3$export$7555de1e070510cb(mutableValue);
  return mutableValue;
}
function $735220c2d4774dd3$var$balanceTime(time) {
  time.second += Math.floor(time.millisecond / 1e3);
  time.millisecond = $735220c2d4774dd3$var$nonNegativeMod(time.millisecond, 1e3);
  time.minute += Math.floor(time.second / 60);
  time.second = $735220c2d4774dd3$var$nonNegativeMod(time.second, 60);
  time.hour += Math.floor(time.minute / 60);
  time.minute = $735220c2d4774dd3$var$nonNegativeMod(time.minute, 60);
  let days = Math.floor(time.hour / 24);
  time.hour = $735220c2d4774dd3$var$nonNegativeMod(time.hour, 24);
  return days;
}
function $735220c2d4774dd3$export$7555de1e070510cb(time) {
  time.millisecond = Math.max(0, Math.min(time.millisecond, 1e3));
  time.second = Math.max(0, Math.min(time.second, 59));
  time.minute = Math.max(0, Math.min(time.minute, 59));
  time.hour = Math.max(0, Math.min(time.hour, 23));
}
function $735220c2d4774dd3$var$nonNegativeMod(a2, b2) {
  let result = a2 % b2;
  if (result < 0) result += b2;
  return result;
}
function $735220c2d4774dd3$var$addTimeFields(time, duration) {
  time.hour += duration.hours || 0;
  time.minute += duration.minutes || 0;
  time.second += duration.seconds || 0;
  time.millisecond += duration.milliseconds || 0;
  return $735220c2d4774dd3$var$balanceTime(time);
}
function $735220c2d4774dd3$export$d52ced6badfb9a4c(value, field, amount, options) {
  let mutable = value.copy();
  switch (field) {
    case "era": {
      let eras = value.calendar.getEras();
      let eraIndex = eras.indexOf(value.era);
      if (eraIndex < 0) throw new Error("Invalid era: " + value.era);
      eraIndex = $735220c2d4774dd3$var$cycleValue(eraIndex, amount, 0, eras.length - 1, options === null || options === void 0 ? void 0 : options.round);
      mutable.era = eras[eraIndex];
      $735220c2d4774dd3$export$c4e2ecac49351ef2(mutable);
      break;
    }
    case "year":
      var _mutable_calendar_isInverseEra, _mutable_calendar;
      if ((_mutable_calendar_isInverseEra = (_mutable_calendar = mutable.calendar).isInverseEra) === null || _mutable_calendar_isInverseEra === void 0 ? void 0 : _mutable_calendar_isInverseEra.call(_mutable_calendar, mutable)) amount = -amount;
      mutable.year = $735220c2d4774dd3$var$cycleValue(value.year, amount, -Infinity, 9999, options === null || options === void 0 ? void 0 : options.round);
      if (mutable.year === -Infinity) mutable.year = 1;
      if (mutable.calendar.balanceYearMonth) mutable.calendar.balanceYearMonth(mutable, value);
      break;
    case "month":
      mutable.month = $735220c2d4774dd3$var$cycleValue(value.month, amount, 1, value.calendar.getMonthsInYear(value), options === null || options === void 0 ? void 0 : options.round);
      break;
    case "day":
      mutable.day = $735220c2d4774dd3$var$cycleValue(value.day, amount, 1, value.calendar.getDaysInMonth(value), options === null || options === void 0 ? void 0 : options.round);
      break;
    default:
      throw new Error("Unsupported field " + field);
  }
  if (value.calendar.balanceDate) value.calendar.balanceDate(mutable);
  $735220c2d4774dd3$export$c4e2ecac49351ef2(mutable);
  return mutable;
}
function $735220c2d4774dd3$export$dd02b3e0007dfe28(value, field, amount, options) {
  let mutable = value.copy();
  switch (field) {
    case "hour": {
      let hours = value.hour;
      let min2 = 0;
      let max2 = 23;
      if ((options === null || options === void 0 ? void 0 : options.hourCycle) === 12) {
        let isPM = hours >= 12;
        min2 = isPM ? 12 : 0;
        max2 = isPM ? 23 : 11;
      }
      mutable.hour = $735220c2d4774dd3$var$cycleValue(hours, amount, min2, max2, options === null || options === void 0 ? void 0 : options.round);
      break;
    }
    case "minute":
      mutable.minute = $735220c2d4774dd3$var$cycleValue(value.minute, amount, 0, 59, options === null || options === void 0 ? void 0 : options.round);
      break;
    case "second":
      mutable.second = $735220c2d4774dd3$var$cycleValue(value.second, amount, 0, 59, options === null || options === void 0 ? void 0 : options.round);
      break;
    case "millisecond":
      mutable.millisecond = $735220c2d4774dd3$var$cycleValue(value.millisecond, amount, 0, 999, options === null || options === void 0 ? void 0 : options.round);
      break;
    default:
      throw new Error("Unsupported field " + field);
  }
  return mutable;
}
function $735220c2d4774dd3$var$cycleValue(value, amount, min2, max2, round2 = false) {
  if (round2) {
    value += Math.sign(amount);
    if (value < min2) value = max2;
    let div = Math.abs(amount);
    if (amount > 0) value = Math.ceil(value / div) * div;
    else value = Math.floor(value / div) * div;
    if (value > max2) value = min2;
  } else {
    value += amount;
    if (value < min2) value = max2 - (min2 - value - 1);
    else if (value > max2) value = min2 + (value - max2 - 1);
  }
  return value;
}
function $735220c2d4774dd3$export$96b1d28349274637(dateTime, duration) {
  let ms2;
  if (duration.years != null && duration.years !== 0 || duration.months != null && duration.months !== 0 || duration.weeks != null && duration.weeks !== 0 || duration.days != null && duration.days !== 0) {
    let res2 = $735220c2d4774dd3$export$e16d8520af44a096((0, $11d87f3f76e88657$export$b21e0b124e224484)(dateTime), {
      years: duration.years,
      months: duration.months,
      weeks: duration.weeks,
      days: duration.days
    });
    ms2 = (0, $11d87f3f76e88657$export$5107c82f94518f5c)(res2, dateTime.timeZone);
  } else
    ms2 = (0, $11d87f3f76e88657$export$bd4fb2bc8bb06fb)(dateTime) - dateTime.offset;
  ms2 += duration.milliseconds || 0;
  ms2 += (duration.seconds || 0) * 1e3;
  ms2 += (duration.minutes || 0) * 6e4;
  ms2 += (duration.hours || 0) * 36e5;
  let res = (0, $11d87f3f76e88657$export$1b96692a1ba042ac)(ms2, dateTime.timeZone);
  return (0, $11d87f3f76e88657$export$b4a036af3fc0b032)(res, dateTime.calendar);
}
function $735220c2d4774dd3$export$6814caac34ca03c7(dateTime, duration) {
  return $735220c2d4774dd3$export$96b1d28349274637(dateTime, $735220c2d4774dd3$export$3e2544e88a25bff8(duration));
}
function $735220c2d4774dd3$export$9a297d111fc86b79(dateTime, field, amount, options) {
  switch (field) {
    case "hour": {
      let min2 = 0;
      let max2 = 23;
      if ((options === null || options === void 0 ? void 0 : options.hourCycle) === 12) {
        let isPM = dateTime.hour >= 12;
        min2 = isPM ? 12 : 0;
        max2 = isPM ? 23 : 11;
      }
      let plainDateTime = (0, $11d87f3f76e88657$export$b21e0b124e224484)(dateTime);
      let minDate = (0, $11d87f3f76e88657$export$b4a036af3fc0b032)($735220c2d4774dd3$export$e5d5e1c1822b6e56(plainDateTime, {
        hour: min2
      }), new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)());
      let minAbsolute = [
        (0, $11d87f3f76e88657$export$5107c82f94518f5c)(minDate, dateTime.timeZone, "earlier"),
        (0, $11d87f3f76e88657$export$5107c82f94518f5c)(minDate, dateTime.timeZone, "later")
      ].filter((ms3) => (0, $11d87f3f76e88657$export$1b96692a1ba042ac)(ms3, dateTime.timeZone).day === minDate.day)[0];
      let maxDate = (0, $11d87f3f76e88657$export$b4a036af3fc0b032)($735220c2d4774dd3$export$e5d5e1c1822b6e56(plainDateTime, {
        hour: max2
      }), new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)());
      let maxAbsolute = [
        (0, $11d87f3f76e88657$export$5107c82f94518f5c)(maxDate, dateTime.timeZone, "earlier"),
        (0, $11d87f3f76e88657$export$5107c82f94518f5c)(maxDate, dateTime.timeZone, "later")
      ].filter((ms3) => (0, $11d87f3f76e88657$export$1b96692a1ba042ac)(ms3, dateTime.timeZone).day === maxDate.day).pop();
      let ms2 = (0, $11d87f3f76e88657$export$bd4fb2bc8bb06fb)(dateTime) - dateTime.offset;
      let hours = Math.floor(ms2 / $735220c2d4774dd3$var$ONE_HOUR);
      let remainder = ms2 % $735220c2d4774dd3$var$ONE_HOUR;
      ms2 = $735220c2d4774dd3$var$cycleValue(hours, amount, Math.floor(minAbsolute / $735220c2d4774dd3$var$ONE_HOUR), Math.floor(maxAbsolute / $735220c2d4774dd3$var$ONE_HOUR), options === null || options === void 0 ? void 0 : options.round) * $735220c2d4774dd3$var$ONE_HOUR + remainder;
      return (0, $11d87f3f76e88657$export$b4a036af3fc0b032)((0, $11d87f3f76e88657$export$1b96692a1ba042ac)(ms2, dateTime.timeZone), dateTime.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return $735220c2d4774dd3$export$dd02b3e0007dfe28(dateTime, field, amount, options);
    case "era":
    case "year":
    case "month":
    case "day": {
      let res = $735220c2d4774dd3$export$d52ced6badfb9a4c((0, $11d87f3f76e88657$export$b21e0b124e224484)(dateTime), field, amount, options);
      let ms2 = (0, $11d87f3f76e88657$export$5107c82f94518f5c)(res, dateTime.timeZone);
      return (0, $11d87f3f76e88657$export$b4a036af3fc0b032)((0, $11d87f3f76e88657$export$1b96692a1ba042ac)(ms2, dateTime.timeZone), dateTime.calendar);
    }
    default:
      throw new Error("Unsupported field " + field);
  }
}
function $735220c2d4774dd3$export$31b5430eb18be4f8(dateTime, fields, disambiguation) {
  let plainDateTime = (0, $11d87f3f76e88657$export$b21e0b124e224484)(dateTime);
  let res = $735220c2d4774dd3$export$e5d5e1c1822b6e56($735220c2d4774dd3$export$adaa4cf7ef1b65be(plainDateTime, fields), fields);
  if (res.compare(plainDateTime) === 0) return dateTime;
  let ms2 = (0, $11d87f3f76e88657$export$5107c82f94518f5c)(res, dateTime.timeZone, disambiguation);
  return (0, $11d87f3f76e88657$export$b4a036af3fc0b032)((0, $11d87f3f76e88657$export$1b96692a1ba042ac)(ms2, dateTime.timeZone), dateTime.calendar);
}

// node_modules/@internationalized/date/dist/string.mjs
var $fae977aafc393c5c$var$requiredDurationTimeGroups = [
  "hours",
  "minutes",
  "seconds"
];
var $fae977aafc393c5c$var$requiredDurationGroups = [
  "years",
  "months",
  "weeks",
  "days",
  ...$fae977aafc393c5c$var$requiredDurationTimeGroups
];
function $fae977aafc393c5c$export$f59dee82248f5ad4(time) {
  return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}:${String(time.second).padStart(2, "0")}${time.millisecond ? String(time.millisecond / 1e3).slice(1) : ""}`;
}
function $fae977aafc393c5c$export$60dfd74aa96791bd(date) {
  let gregorianDate = (0, $11d87f3f76e88657$export$b4a036af3fc0b032)(date, new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)());
  let year;
  if (gregorianDate.era === "BC") year = gregorianDate.year === 1 ? "0000" : "-" + String(Math.abs(1 - gregorianDate.year)).padStart(6, "00");
  else year = String(gregorianDate.year).padStart(4, "0");
  return `${year}-${String(gregorianDate.month).padStart(2, "0")}-${String(gregorianDate.day).padStart(2, "0")}`;
}
function $fae977aafc393c5c$export$4223de14708adc63(date) {
  return `${$fae977aafc393c5c$export$60dfd74aa96791bd(date)}T${$fae977aafc393c5c$export$f59dee82248f5ad4(date)}`;
}
function $fae977aafc393c5c$var$offsetToString(offset3) {
  let sign = Math.sign(offset3) < 0 ? "-" : "+";
  offset3 = Math.abs(offset3);
  let offsetHours = Math.floor(offset3 / 36e5);
  let offsetMinutes = offset3 % 36e5 / 6e4;
  return `${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
}
function $fae977aafc393c5c$export$bf79f1ebf4b18792(date) {
  return `${$fae977aafc393c5c$export$4223de14708adc63(date)}${$fae977aafc393c5c$var$offsetToString(date.offset)}[${date.timeZone}]`;
}

// node_modules/@swc/helpers/esm/_check_private_redeclaration.js
function _check_private_redeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

// node_modules/@swc/helpers/esm/_class_private_field_init.js
function _class_private_field_init(obj, privateMap, value) {
  _check_private_redeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

// node_modules/@internationalized/date/dist/CalendarDate.mjs
function $35ea8db9cb2ccb90$var$shiftArgs(args) {
  let calendar = typeof args[0] === "object" ? args.shift() : new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)();
  let era;
  if (typeof args[0] === "string") era = args.shift();
  else {
    let eras = calendar.getEras();
    era = eras[eras.length - 1];
  }
  let year = args.shift();
  let month = args.shift();
  let day = args.shift();
  return [
    calendar,
    era,
    year,
    month,
    day
  ];
}
var $35ea8db9cb2ccb90$var$_type = /* @__PURE__ */ new WeakMap();
var $35ea8db9cb2ccb90$export$99faa760c7908e4f = class _$35ea8db9cb2ccb90$export$99faa760c7908e4f {
  /** Returns a copy of this date. */
  copy() {
    if (this.era) return new _$35ea8db9cb2ccb90$export$99faa760c7908e4f(this.calendar, this.era, this.year, this.month, this.day);
    else return new _$35ea8db9cb2ccb90$export$99faa760c7908e4f(this.calendar, this.year, this.month, this.day);
  }
  /** Returns a new `CalendarDate` with the given duration added to it. */
  add(duration) {
    return (0, $735220c2d4774dd3$export$e16d8520af44a096)(this, duration);
  }
  /** Returns a new `CalendarDate` with the given duration subtracted from it. */
  subtract(duration) {
    return (0, $735220c2d4774dd3$export$4e2d2ead65e5f7e3)(this, duration);
  }
  /** Returns a new `CalendarDate` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(fields) {
    return (0, $735220c2d4774dd3$export$adaa4cf7ef1b65be)(this, fields);
  }
  /**
  * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(field, amount, options) {
    return (0, $735220c2d4774dd3$export$d52ced6badfb9a4c)(this, field, amount, options);
  }
  /** Converts the date to a native JavaScript Date object, with the time set to midnight in the given time zone. */
  toDate(timeZone) {
    return (0, $11d87f3f76e88657$export$e67a095c620b86fe)(this, timeZone);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return (0, $fae977aafc393c5c$export$60dfd74aa96791bd)(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(b2) {
    return (0, $14e0f24ef4ac5c92$export$68781ddf31c0090f)(this, b2);
  }
  constructor(...args) {
    (0, _class_private_field_init)(this, $35ea8db9cb2ccb90$var$_type, {
      writable: true,
      value: void 0
    });
    let [calendar, era, year, month, day] = $35ea8db9cb2ccb90$var$shiftArgs(args);
    this.calendar = calendar;
    this.era = era;
    this.year = year;
    this.month = month;
    this.day = day;
    (0, $735220c2d4774dd3$export$c4e2ecac49351ef2)(this);
  }
};
var $35ea8db9cb2ccb90$var$_type2 = /* @__PURE__ */ new WeakMap();
var $35ea8db9cb2ccb90$export$ca871e8dbb80966f = class _$35ea8db9cb2ccb90$export$ca871e8dbb80966f {
  /** Returns a copy of this date. */
  copy() {
    if (this.era) return new _$35ea8db9cb2ccb90$export$ca871e8dbb80966f(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
    else return new _$35ea8db9cb2ccb90$export$ca871e8dbb80966f(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(duration) {
    return (0, $735220c2d4774dd3$export$e16d8520af44a096)(this, duration);
  }
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(duration) {
    return (0, $735220c2d4774dd3$export$4e2d2ead65e5f7e3)(this, duration);
  }
  /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(fields) {
    return (0, $735220c2d4774dd3$export$adaa4cf7ef1b65be)((0, $735220c2d4774dd3$export$e5d5e1c1822b6e56)(this, fields), fields);
  }
  /**
  * Returns a new `CalendarDateTime` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(field, amount, options) {
    switch (field) {
      case "era":
      case "year":
      case "month":
      case "day":
        return (0, $735220c2d4774dd3$export$d52ced6badfb9a4c)(this, field, amount, options);
      default:
        return (0, $735220c2d4774dd3$export$dd02b3e0007dfe28)(this, field, amount, options);
    }
  }
  /** Converts the date to a native JavaScript Date object in the given time zone. */
  toDate(timeZone, disambiguation) {
    return (0, $11d87f3f76e88657$export$e67a095c620b86fe)(this, timeZone, disambiguation);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return (0, $fae977aafc393c5c$export$4223de14708adc63)(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(b2) {
    let res = (0, $14e0f24ef4ac5c92$export$68781ddf31c0090f)(this, b2);
    if (res === 0) return (0, $14e0f24ef4ac5c92$export$c19a80a9721b80f6)(this, (0, $11d87f3f76e88657$export$b21e0b124e224484)(b2));
    return res;
  }
  constructor(...args) {
    (0, _class_private_field_init)(this, $35ea8db9cb2ccb90$var$_type2, {
      writable: true,
      value: void 0
    });
    let [calendar, era, year, month, day] = $35ea8db9cb2ccb90$var$shiftArgs(args);
    this.calendar = calendar;
    this.era = era;
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = args.shift() || 0;
    this.minute = args.shift() || 0;
    this.second = args.shift() || 0;
    this.millisecond = args.shift() || 0;
    (0, $735220c2d4774dd3$export$c4e2ecac49351ef2)(this);
  }
};
var $35ea8db9cb2ccb90$var$_type3 = /* @__PURE__ */ new WeakMap();
var $35ea8db9cb2ccb90$export$d3b7288e7994edea = class _$35ea8db9cb2ccb90$export$d3b7288e7994edea {
  /** Returns a copy of this date. */
  copy() {
    if (this.era) return new _$35ea8db9cb2ccb90$export$d3b7288e7994edea(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
    else return new _$35ea8db9cb2ccb90$export$d3b7288e7994edea(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `ZonedDateTime` with the given duration added to it. */
  add(duration) {
    return (0, $735220c2d4774dd3$export$96b1d28349274637)(this, duration);
  }
  /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */
  subtract(duration) {
    return (0, $735220c2d4774dd3$export$6814caac34ca03c7)(this, duration);
  }
  /** Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(fields, disambiguation) {
    return (0, $735220c2d4774dd3$export$31b5430eb18be4f8)(this, fields, disambiguation);
  }
  /**
  * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(field, amount, options) {
    return (0, $735220c2d4774dd3$export$9a297d111fc86b79)(this, field, amount, options);
  }
  /** Converts the date to a native JavaScript Date object. */
  toDate() {
    return (0, $11d87f3f76e88657$export$83aac07b4c37b25)(this);
  }
  /** Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone identifier. */
  toString() {
    return (0, $fae977aafc393c5c$export$bf79f1ebf4b18792)(this);
  }
  /** Converts the date to an ISO 8601 formatted string in UTC. */
  toAbsoluteString() {
    return this.toDate().toISOString();
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(b2) {
    return this.toDate().getTime() - (0, $11d87f3f76e88657$export$84c95a83c799e074)(b2, this.timeZone).toDate().getTime();
  }
  constructor(...args) {
    (0, _class_private_field_init)(this, $35ea8db9cb2ccb90$var$_type3, {
      writable: true,
      value: void 0
    });
    let [calendar, era, year, month, day] = $35ea8db9cb2ccb90$var$shiftArgs(args);
    let timeZone = args.shift();
    let offset3 = args.shift();
    this.calendar = calendar;
    this.era = era;
    this.year = year;
    this.month = month;
    this.day = day;
    this.timeZone = timeZone;
    this.offset = offset3;
    this.hour = args.shift() || 0;
    this.minute = args.shift() || 0;
    this.second = args.shift() || 0;
    this.millisecond = args.shift() || 0;
    (0, $735220c2d4774dd3$export$c4e2ecac49351ef2)(this);
  }
};

// node_modules/@internationalized/date/dist/JapaneseCalendar.mjs
var $62225008020f0a13$var$ERA_START_DATES = [
  [
    1868,
    9,
    8
  ],
  [
    1912,
    7,
    30
  ],
  [
    1926,
    12,
    25
  ],
  [
    1989,
    1,
    8
  ],
  [
    2019,
    5,
    1
  ]
];
var $62225008020f0a13$var$ERA_END_DATES = [
  [
    1912,
    7,
    29
  ],
  [
    1926,
    12,
    24
  ],
  [
    1989,
    1,
    7
  ],
  [
    2019,
    4,
    30
  ]
];
var $62225008020f0a13$var$ERA_ADDENDS = [
  1867,
  1911,
  1925,
  1988,
  2018
];
var $62225008020f0a13$var$ERA_NAMES = [
  "meiji",
  "taisho",
  "showa",
  "heisei",
  "reiwa"
];
function $62225008020f0a13$var$findEraFromGregorianDate(date) {
  const idx = $62225008020f0a13$var$ERA_START_DATES.findIndex(([year, month, day]) => {
    if (date.year < year) return true;
    if (date.year === year && date.month < month) return true;
    if (date.year === year && date.month === month && date.day < day) return true;
    return false;
  });
  if (idx === -1) return $62225008020f0a13$var$ERA_START_DATES.length - 1;
  if (idx === 0) return 0;
  return idx - 1;
}
function $62225008020f0a13$var$toGregorian(date) {
  let eraAddend = $62225008020f0a13$var$ERA_ADDENDS[$62225008020f0a13$var$ERA_NAMES.indexOf(date.era)];
  if (!eraAddend) throw new Error("Unknown era: " + date.era);
  return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(date.year + eraAddend, date.month, date.day);
}
var $62225008020f0a13$export$b746ab2b60cdffbf = class extends (0, $3b62074eb05584b2$export$80ee6245ec4f29ec) {
  fromJulianDay(jd2) {
    let date = super.fromJulianDay(jd2);
    let era = $62225008020f0a13$var$findEraFromGregorianDate(date);
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, $62225008020f0a13$var$ERA_NAMES[era], date.year - $62225008020f0a13$var$ERA_ADDENDS[era], date.month, date.day);
  }
  toJulianDay(date) {
    return super.toJulianDay($62225008020f0a13$var$toGregorian(date));
  }
  balanceDate(date) {
    let gregorianDate = $62225008020f0a13$var$toGregorian(date);
    let era = $62225008020f0a13$var$findEraFromGregorianDate(gregorianDate);
    if ($62225008020f0a13$var$ERA_NAMES[era] !== date.era) {
      date.era = $62225008020f0a13$var$ERA_NAMES[era];
      date.year = gregorianDate.year - $62225008020f0a13$var$ERA_ADDENDS[era];
    }
    this.constrainDate(date);
  }
  constrainDate(date) {
    let idx = $62225008020f0a13$var$ERA_NAMES.indexOf(date.era);
    let end = $62225008020f0a13$var$ERA_END_DATES[idx];
    if (end != null) {
      let [endYear, endMonth, endDay] = end;
      let maxYear = endYear - $62225008020f0a13$var$ERA_ADDENDS[idx];
      date.year = Math.max(1, Math.min(maxYear, date.year));
      if (date.year === maxYear) {
        date.month = Math.min(endMonth, date.month);
        if (date.month === endMonth) date.day = Math.min(endDay, date.day);
      }
    }
    if (date.year === 1 && idx >= 0) {
      let [, startMonth, startDay] = $62225008020f0a13$var$ERA_START_DATES[idx];
      date.month = Math.max(startMonth, date.month);
      if (date.month === startMonth) date.day = Math.max(startDay, date.day);
    }
  }
  getEras() {
    return $62225008020f0a13$var$ERA_NAMES;
  }
  getYearsInEra(date) {
    let era = $62225008020f0a13$var$ERA_NAMES.indexOf(date.era);
    let cur = $62225008020f0a13$var$ERA_START_DATES[era];
    let next = $62225008020f0a13$var$ERA_START_DATES[era + 1];
    if (next == null)
      return 9999 - cur[0] + 1;
    let years = next[0] - cur[0];
    if (date.month < next[1] || date.month === next[1] && date.day < next[2]) years++;
    return years;
  }
  getDaysInMonth(date) {
    return super.getDaysInMonth($62225008020f0a13$var$toGregorian(date));
  }
  getMinimumMonthInYear(date) {
    let start = $62225008020f0a13$var$getMinimums(date);
    return start ? start[1] : 1;
  }
  getMinimumDayInMonth(date) {
    let start = $62225008020f0a13$var$getMinimums(date);
    return start && date.month === start[1] ? start[2] : 1;
  }
  constructor(...args) {
    super(...args), this.identifier = "japanese";
  }
};
function $62225008020f0a13$var$getMinimums(date) {
  if (date.year === 1) {
    let idx = $62225008020f0a13$var$ERA_NAMES.indexOf(date.era);
    return $62225008020f0a13$var$ERA_START_DATES[idx];
  }
}

// node_modules/@internationalized/date/dist/BuddhistCalendar.mjs
var $8d73d47422ca7302$var$BUDDHIST_ERA_START = -543;
var $8d73d47422ca7302$export$42d20a78301dee44 = class extends (0, $3b62074eb05584b2$export$80ee6245ec4f29ec) {
  fromJulianDay(jd2) {
    let gregorianDate = super.fromJulianDay(jd2);
    let year = (0, $3b62074eb05584b2$export$c36e0ecb2d4fa69d)(gregorianDate.era, gregorianDate.year);
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, year - $8d73d47422ca7302$var$BUDDHIST_ERA_START, gregorianDate.month, gregorianDate.day);
  }
  toJulianDay(date) {
    return super.toJulianDay($8d73d47422ca7302$var$toGregorian(date));
  }
  getEras() {
    return [
      "BE"
    ];
  }
  getDaysInMonth(date) {
    return super.getDaysInMonth($8d73d47422ca7302$var$toGregorian(date));
  }
  balanceDate() {
  }
  constructor(...args) {
    super(...args), this.identifier = "buddhist";
  }
};
function $8d73d47422ca7302$var$toGregorian(date) {
  let [era, year] = (0, $3b62074eb05584b2$export$4475b7e617eb123c)(date.year + $8d73d47422ca7302$var$BUDDHIST_ERA_START);
  return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(era, year, date.month, date.day);
}

// node_modules/@internationalized/date/dist/TaiwanCalendar.mjs
var $5f31bd6f0c8940b2$var$TAIWAN_ERA_START = 1911;
function $5f31bd6f0c8940b2$var$gregorianYear(date) {
  return date.era === "minguo" ? date.year + $5f31bd6f0c8940b2$var$TAIWAN_ERA_START : 1 - date.year + $5f31bd6f0c8940b2$var$TAIWAN_ERA_START;
}
function $5f31bd6f0c8940b2$var$gregorianToTaiwan(year) {
  let y2 = year - $5f31bd6f0c8940b2$var$TAIWAN_ERA_START;
  if (y2 > 0) return [
    "minguo",
    y2
  ];
  else return [
    "before_minguo",
    1 - y2
  ];
}
var $5f31bd6f0c8940b2$export$65e01080afcb0799 = class extends (0, $3b62074eb05584b2$export$80ee6245ec4f29ec) {
  fromJulianDay(jd2) {
    let date = super.fromJulianDay(jd2);
    let extendedYear = (0, $3b62074eb05584b2$export$c36e0ecb2d4fa69d)(date.era, date.year);
    let [era, year] = $5f31bd6f0c8940b2$var$gregorianToTaiwan(extendedYear);
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, era, year, date.month, date.day);
  }
  toJulianDay(date) {
    return super.toJulianDay($5f31bd6f0c8940b2$var$toGregorian(date));
  }
  getEras() {
    return [
      "before_minguo",
      "minguo"
    ];
  }
  balanceDate(date) {
    let [era, year] = $5f31bd6f0c8940b2$var$gregorianToTaiwan($5f31bd6f0c8940b2$var$gregorianYear(date));
    date.era = era;
    date.year = year;
  }
  isInverseEra(date) {
    return date.era === "before_minguo";
  }
  getDaysInMonth(date) {
    return super.getDaysInMonth($5f31bd6f0c8940b2$var$toGregorian(date));
  }
  getYearsInEra(date) {
    return date.era === "before_minguo" ? 9999 : 9999 - $5f31bd6f0c8940b2$var$TAIWAN_ERA_START;
  }
  constructor(...args) {
    super(...args), this.identifier = "roc";
  }
};
function $5f31bd6f0c8940b2$var$toGregorian(date) {
  let [era, year] = (0, $3b62074eb05584b2$export$4475b7e617eb123c)($5f31bd6f0c8940b2$var$gregorianYear(date));
  return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(era, year, date.month, date.day);
}

// node_modules/@internationalized/date/dist/PersianCalendar.mjs
var $f3ed2e4472ae7e25$var$PERSIAN_EPOCH = 1948320;
var $f3ed2e4472ae7e25$var$MONTH_START = [
  0,
  31,
  62,
  93,
  124,
  155,
  186,
  216,
  246,
  276,
  306,
  336
  // Esfand
];
var $f3ed2e4472ae7e25$export$37fccdbfd14c5939 = class {
  fromJulianDay(jd2) {
    let daysSinceEpoch = jd2 - $f3ed2e4472ae7e25$var$PERSIAN_EPOCH;
    let year = 1 + Math.floor((33 * daysSinceEpoch + 3) / 12053);
    let farvardin1 = 365 * (year - 1) + Math.floor((8 * year + 21) / 33);
    let dayOfYear = daysSinceEpoch - farvardin1;
    let month = dayOfYear < 216 ? Math.floor(dayOfYear / 31) : Math.floor((dayOfYear - 6) / 30);
    let day = dayOfYear - $f3ed2e4472ae7e25$var$MONTH_START[month] + 1;
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, year, month + 1, day);
  }
  toJulianDay(date) {
    let jd2 = $f3ed2e4472ae7e25$var$PERSIAN_EPOCH - 1 + 365 * (date.year - 1) + Math.floor((8 * date.year + 21) / 33);
    jd2 += $f3ed2e4472ae7e25$var$MONTH_START[date.month - 1];
    jd2 += date.day;
    return jd2;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInMonth(date) {
    if (date.month <= 6) return 31;
    if (date.month <= 11) return 30;
    let isLeapYear = (0, $2b4dce13dd5a17fa$export$842a2cf37af977e1)(25 * date.year + 11, 33) < 8;
    return isLeapYear ? 30 : 29;
  }
  getEras() {
    return [
      "AP"
    ];
  }
  getYearsInEra() {
    return 9377;
  }
  constructor() {
    this.identifier = "persian";
  }
};

// node_modules/@internationalized/date/dist/IndianCalendar.mjs
var $82c358003bdda0a8$var$INDIAN_ERA_START = 78;
var $82c358003bdda0a8$var$INDIAN_YEAR_START = 80;
var $82c358003bdda0a8$export$39f31c639fa15726 = class extends (0, $3b62074eb05584b2$export$80ee6245ec4f29ec) {
  fromJulianDay(jd2) {
    let date = super.fromJulianDay(jd2);
    let indianYear = date.year - $82c358003bdda0a8$var$INDIAN_ERA_START;
    let yDay = jd2 - (0, $3b62074eb05584b2$export$f297eb839006d339)(date.era, date.year, 1, 1);
    let leapMonth;
    if (yDay < $82c358003bdda0a8$var$INDIAN_YEAR_START) {
      indianYear--;
      leapMonth = (0, $3b62074eb05584b2$export$553d7fa8e3805fc0)(date.year - 1) ? 31 : 30;
      yDay += leapMonth + 155 + 90 + 10;
    } else {
      leapMonth = (0, $3b62074eb05584b2$export$553d7fa8e3805fc0)(date.year) ? 31 : 30;
      yDay -= $82c358003bdda0a8$var$INDIAN_YEAR_START;
    }
    let indianMonth;
    let indianDay;
    if (yDay < leapMonth) {
      indianMonth = 1;
      indianDay = yDay + 1;
    } else {
      let mDay = yDay - leapMonth;
      if (mDay < 155) {
        indianMonth = Math.floor(mDay / 31) + 2;
        indianDay = mDay % 31 + 1;
      } else {
        mDay -= 155;
        indianMonth = Math.floor(mDay / 30) + 7;
        indianDay = mDay % 30 + 1;
      }
    }
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, indianYear, indianMonth, indianDay);
  }
  toJulianDay(date) {
    let extendedYear = date.year + $82c358003bdda0a8$var$INDIAN_ERA_START;
    let [era, year] = (0, $3b62074eb05584b2$export$4475b7e617eb123c)(extendedYear);
    let leapMonth;
    let jd2;
    if ((0, $3b62074eb05584b2$export$553d7fa8e3805fc0)(year)) {
      leapMonth = 31;
      jd2 = (0, $3b62074eb05584b2$export$f297eb839006d339)(era, year, 3, 21);
    } else {
      leapMonth = 30;
      jd2 = (0, $3b62074eb05584b2$export$f297eb839006d339)(era, year, 3, 22);
    }
    if (date.month === 1) return jd2 + date.day - 1;
    jd2 += leapMonth + Math.min(date.month - 2, 5) * 31;
    if (date.month >= 8) jd2 += (date.month - 7) * 30;
    jd2 += date.day - 1;
    return jd2;
  }
  getDaysInMonth(date) {
    if (date.month === 1 && (0, $3b62074eb05584b2$export$553d7fa8e3805fc0)(date.year + $82c358003bdda0a8$var$INDIAN_ERA_START)) return 31;
    if (date.month >= 2 && date.month <= 6) return 31;
    return 30;
  }
  getYearsInEra() {
    return 9919;
  }
  getEras() {
    return [
      "saka"
    ];
  }
  balanceDate() {
  }
  constructor(...args) {
    super(...args), this.identifier = "indian";
  }
};

// node_modules/@internationalized/date/dist/IslamicCalendar.mjs
var $f2f3e0e3a817edbd$var$CIVIL_EPOC = 1948440;
var $f2f3e0e3a817edbd$var$ASTRONOMICAL_EPOC = 1948439;
var $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START = 1300;
var $f2f3e0e3a817edbd$var$UMALQURA_YEAR_END = 1600;
var $f2f3e0e3a817edbd$var$UMALQURA_START_DAYS = 460322;
function $f2f3e0e3a817edbd$var$islamicToJulianDay(epoch, year, month, day) {
  return day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30) + epoch - 1;
}
function $f2f3e0e3a817edbd$var$julianDayToIslamic(calendar, epoch, jd2) {
  let year = Math.floor((30 * (jd2 - epoch) + 10646) / 10631);
  let month = Math.min(12, Math.ceil((jd2 - (29 + $f2f3e0e3a817edbd$var$islamicToJulianDay(epoch, year, 1, 1))) / 29.5) + 1);
  let day = jd2 - $f2f3e0e3a817edbd$var$islamicToJulianDay(epoch, year, month, 1) + 1;
  return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(calendar, year, month, day);
}
function $f2f3e0e3a817edbd$var$isLeapYear(year) {
  return (14 + 11 * year) % 30 < 11;
}
var $f2f3e0e3a817edbd$export$2066795aadd37bfc = class {
  fromJulianDay(jd2) {
    return $f2f3e0e3a817edbd$var$julianDayToIslamic(this, $f2f3e0e3a817edbd$var$CIVIL_EPOC, jd2);
  }
  toJulianDay(date) {
    return $f2f3e0e3a817edbd$var$islamicToJulianDay($f2f3e0e3a817edbd$var$CIVIL_EPOC, date.year, date.month, date.day);
  }
  getDaysInMonth(date) {
    let length = 29 + date.month % 2;
    if (date.month === 12 && $f2f3e0e3a817edbd$var$isLeapYear(date.year)) length++;
    return length;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInYear(date) {
    return $f2f3e0e3a817edbd$var$isLeapYear(date.year) ? 355 : 354;
  }
  getYearsInEra() {
    return 9665;
  }
  getEras() {
    return [
      "AH"
    ];
  }
  constructor() {
    this.identifier = "islamic-civil";
  }
};
var $f2f3e0e3a817edbd$export$37f0887f2f9d22f7 = class extends $f2f3e0e3a817edbd$export$2066795aadd37bfc {
  fromJulianDay(jd2) {
    return $f2f3e0e3a817edbd$var$julianDayToIslamic(this, $f2f3e0e3a817edbd$var$ASTRONOMICAL_EPOC, jd2);
  }
  toJulianDay(date) {
    return $f2f3e0e3a817edbd$var$islamicToJulianDay($f2f3e0e3a817edbd$var$ASTRONOMICAL_EPOC, date.year, date.month, date.day);
  }
  constructor(...args) {
    super(...args), this.identifier = "islamic-tbla";
  }
};
var $f2f3e0e3a817edbd$var$UMALQURA_DATA = "qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=";
var $f2f3e0e3a817edbd$var$UMALQURA_MONTHLENGTH;
var $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE;
function $f2f3e0e3a817edbd$var$umalquraYearStart(year) {
  return $f2f3e0e3a817edbd$var$UMALQURA_START_DAYS + $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE[year - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START];
}
function $f2f3e0e3a817edbd$var$umalquraMonthLength(year, month) {
  let idx = year - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START;
  let mask = 1 << 11 - (month - 1);
  if (($f2f3e0e3a817edbd$var$UMALQURA_MONTHLENGTH[idx] & mask) === 0) return 29;
  else return 30;
}
function $f2f3e0e3a817edbd$var$umalquraMonthStart(year, month) {
  let day = $f2f3e0e3a817edbd$var$umalquraYearStart(year);
  for (let i = 1; i < month; i++) day += $f2f3e0e3a817edbd$var$umalquraMonthLength(year, i);
  return day;
}
function $f2f3e0e3a817edbd$var$umalquraYearLength(year) {
  return $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE[year + 1 - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START] - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE[year - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START];
}
var $f2f3e0e3a817edbd$export$5baab4758c231076 = class extends $f2f3e0e3a817edbd$export$2066795aadd37bfc {
  fromJulianDay(jd2) {
    let days = jd2 - $f2f3e0e3a817edbd$var$CIVIL_EPOC;
    let startDays = $f2f3e0e3a817edbd$var$umalquraYearStart($f2f3e0e3a817edbd$var$UMALQURA_YEAR_START);
    let endDays = $f2f3e0e3a817edbd$var$umalquraYearStart($f2f3e0e3a817edbd$var$UMALQURA_YEAR_END);
    if (days < startDays || days > endDays) return super.fromJulianDay(jd2);
    else {
      let y2 = $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START - 1;
      let m2 = 1;
      let d = 1;
      while (d > 0) {
        y2++;
        d = days - $f2f3e0e3a817edbd$var$umalquraYearStart(y2) + 1;
        let yearLength = $f2f3e0e3a817edbd$var$umalquraYearLength(y2);
        if (d === yearLength) {
          m2 = 12;
          break;
        } else if (d < yearLength) {
          let monthLength = $f2f3e0e3a817edbd$var$umalquraMonthLength(y2, m2);
          m2 = 1;
          while (d > monthLength) {
            d -= monthLength;
            m2++;
            monthLength = $f2f3e0e3a817edbd$var$umalquraMonthLength(y2, m2);
          }
          break;
        }
      }
      return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, y2, m2, days - $f2f3e0e3a817edbd$var$umalquraMonthStart(y2, m2) + 1);
    }
  }
  toJulianDay(date) {
    if (date.year < $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START || date.year > $f2f3e0e3a817edbd$var$UMALQURA_YEAR_END) return super.toJulianDay(date);
    return $f2f3e0e3a817edbd$var$CIVIL_EPOC + $f2f3e0e3a817edbd$var$umalquraMonthStart(date.year, date.month) + (date.day - 1);
  }
  getDaysInMonth(date) {
    if (date.year < $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START || date.year > $f2f3e0e3a817edbd$var$UMALQURA_YEAR_END) return super.getDaysInMonth(date);
    return $f2f3e0e3a817edbd$var$umalquraMonthLength(date.year, date.month);
  }
  getDaysInYear(date) {
    if (date.year < $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START || date.year > $f2f3e0e3a817edbd$var$UMALQURA_YEAR_END) return super.getDaysInYear(date);
    return $f2f3e0e3a817edbd$var$umalquraYearLength(date.year);
  }
  constructor() {
    super(), this.identifier = "islamic-umalqura";
    if (!$f2f3e0e3a817edbd$var$UMALQURA_MONTHLENGTH) $f2f3e0e3a817edbd$var$UMALQURA_MONTHLENGTH = new Uint16Array(Uint8Array.from(atob($f2f3e0e3a817edbd$var$UMALQURA_DATA), (c) => c.charCodeAt(0)).buffer);
    if (!$f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE) {
      $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE = new Uint32Array($f2f3e0e3a817edbd$var$UMALQURA_YEAR_END - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START + 1);
      let yearStart = 0;
      for (let year = $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START; year <= $f2f3e0e3a817edbd$var$UMALQURA_YEAR_END; year++) {
        $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START_TABLE[year - $f2f3e0e3a817edbd$var$UMALQURA_YEAR_START] = yearStart;
        for (let i = 1; i <= 12; i++) yearStart += $f2f3e0e3a817edbd$var$umalquraMonthLength(year, i);
      }
    }
  }
};

// node_modules/@internationalized/date/dist/HebrewCalendar.mjs
var $7c5f6fbf42389787$var$HEBREW_EPOCH = 347997;
var $7c5f6fbf42389787$var$HOUR_PARTS = 1080;
var $7c5f6fbf42389787$var$DAY_PARTS = 24 * $7c5f6fbf42389787$var$HOUR_PARTS;
var $7c5f6fbf42389787$var$MONTH_DAYS = 29;
var $7c5f6fbf42389787$var$MONTH_FRACT = 12 * $7c5f6fbf42389787$var$HOUR_PARTS + 793;
var $7c5f6fbf42389787$var$MONTH_PARTS = $7c5f6fbf42389787$var$MONTH_DAYS * $7c5f6fbf42389787$var$DAY_PARTS + $7c5f6fbf42389787$var$MONTH_FRACT;
function $7c5f6fbf42389787$var$isLeapYear(year) {
  return (0, $2b4dce13dd5a17fa$export$842a2cf37af977e1)(year * 7 + 1, 19) < 7;
}
function $7c5f6fbf42389787$var$hebrewDelay1(year) {
  let months = Math.floor((235 * year - 234) / 19);
  let parts = 12084 + 13753 * months;
  let day = months * 29 + Math.floor(parts / 25920);
  if ((0, $2b4dce13dd5a17fa$export$842a2cf37af977e1)(3 * (day + 1), 7) < 3) day += 1;
  return day;
}
function $7c5f6fbf42389787$var$hebrewDelay2(year) {
  let last = $7c5f6fbf42389787$var$hebrewDelay1(year - 1);
  let present = $7c5f6fbf42389787$var$hebrewDelay1(year);
  let next = $7c5f6fbf42389787$var$hebrewDelay1(year + 1);
  if (next - present === 356) return 2;
  if (present - last === 382) return 1;
  return 0;
}
function $7c5f6fbf42389787$var$startOfYear(year) {
  return $7c5f6fbf42389787$var$hebrewDelay1(year) + $7c5f6fbf42389787$var$hebrewDelay2(year);
}
function $7c5f6fbf42389787$var$getDaysInYear(year) {
  return $7c5f6fbf42389787$var$startOfYear(year + 1) - $7c5f6fbf42389787$var$startOfYear(year);
}
function $7c5f6fbf42389787$var$getYearType(year) {
  let yearLength = $7c5f6fbf42389787$var$getDaysInYear(year);
  if (yearLength > 380) yearLength -= 30;
  switch (yearLength) {
    case 353:
      return 0;
    case 354:
      return 1;
    case 355:
      return 2;
  }
}
function $7c5f6fbf42389787$var$getDaysInMonth(year, month) {
  if (month >= 6 && !$7c5f6fbf42389787$var$isLeapYear(year)) month++;
  if (month === 4 || month === 7 || month === 9 || month === 11 || month === 13) return 29;
  let yearType = $7c5f6fbf42389787$var$getYearType(year);
  if (month === 2) return yearType === 2 ? 30 : 29;
  if (month === 3) return yearType === 0 ? 29 : 30;
  if (month === 6) return $7c5f6fbf42389787$var$isLeapYear(year) ? 30 : 0;
  return 30;
}
var $7c5f6fbf42389787$export$ca405048b8fb5af = class {
  fromJulianDay(jd2) {
    let d = jd2 - $7c5f6fbf42389787$var$HEBREW_EPOCH;
    let m2 = d * $7c5f6fbf42389787$var$DAY_PARTS / $7c5f6fbf42389787$var$MONTH_PARTS;
    let year = Math.floor((19 * m2 + 234) / 235) + 1;
    let ys2 = $7c5f6fbf42389787$var$startOfYear(year);
    let dayOfYear = Math.floor(d - ys2);
    while (dayOfYear < 1) {
      year--;
      ys2 = $7c5f6fbf42389787$var$startOfYear(year);
      dayOfYear = Math.floor(d - ys2);
    }
    let month = 1;
    let monthStart = 0;
    while (monthStart < dayOfYear) {
      monthStart += $7c5f6fbf42389787$var$getDaysInMonth(year, month);
      month++;
    }
    month--;
    monthStart -= $7c5f6fbf42389787$var$getDaysInMonth(year, month);
    let day = dayOfYear - monthStart;
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, year, month, day);
  }
  toJulianDay(date) {
    let jd2 = $7c5f6fbf42389787$var$startOfYear(date.year);
    for (let month = 1; month < date.month; month++) jd2 += $7c5f6fbf42389787$var$getDaysInMonth(date.year, month);
    return jd2 + date.day + $7c5f6fbf42389787$var$HEBREW_EPOCH;
  }
  getDaysInMonth(date) {
    return $7c5f6fbf42389787$var$getDaysInMonth(date.year, date.month);
  }
  getMonthsInYear(date) {
    return $7c5f6fbf42389787$var$isLeapYear(date.year) ? 13 : 12;
  }
  getDaysInYear(date) {
    return $7c5f6fbf42389787$var$getDaysInYear(date.year);
  }
  getYearsInEra() {
    return 9999;
  }
  getEras() {
    return [
      "AM"
    ];
  }
  balanceYearMonth(date, previousDate) {
    if (previousDate.year !== date.year) {
      if ($7c5f6fbf42389787$var$isLeapYear(previousDate.year) && !$7c5f6fbf42389787$var$isLeapYear(date.year) && previousDate.month > 6) date.month--;
      else if (!$7c5f6fbf42389787$var$isLeapYear(previousDate.year) && $7c5f6fbf42389787$var$isLeapYear(date.year) && previousDate.month > 6) date.month++;
    }
  }
  constructor() {
    this.identifier = "hebrew";
  }
};

// node_modules/@internationalized/date/dist/EthiopicCalendar.mjs
var $b956b2d7a6cf451f$var$ETHIOPIC_EPOCH = 1723856;
var $b956b2d7a6cf451f$var$COPTIC_EPOCH = 1824665;
var $b956b2d7a6cf451f$var$AMETE_MIHRET_DELTA = 5500;
function $b956b2d7a6cf451f$var$ceToJulianDay(epoch, year, month, day) {
  return epoch + 365 * year + Math.floor(year / 4) + 30 * (month - 1) + day - 1;
}
function $b956b2d7a6cf451f$var$julianDayToCE(epoch, jd2) {
  let year = Math.floor(4 * (jd2 - epoch) / 1461);
  let month = 1 + Math.floor((jd2 - $b956b2d7a6cf451f$var$ceToJulianDay(epoch, year, 1, 1)) / 30);
  let day = jd2 + 1 - $b956b2d7a6cf451f$var$ceToJulianDay(epoch, year, month, 1);
  return [
    year,
    month,
    day
  ];
}
function $b956b2d7a6cf451f$var$getLeapDay(year) {
  return Math.floor(year % 4 / 3);
}
function $b956b2d7a6cf451f$var$getDaysInMonth(year, month) {
  if (month % 13 !== 0)
    return 30;
  else
    return $b956b2d7a6cf451f$var$getLeapDay(year) + 5;
}
var $b956b2d7a6cf451f$export$26ba6eab5e20cd7d = class {
  fromJulianDay(jd2) {
    let [year, month, day] = $b956b2d7a6cf451f$var$julianDayToCE($b956b2d7a6cf451f$var$ETHIOPIC_EPOCH, jd2);
    let era = "AM";
    if (year <= 0) {
      era = "AA";
      year += $b956b2d7a6cf451f$var$AMETE_MIHRET_DELTA;
    }
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, era, year, month, day);
  }
  toJulianDay(date) {
    let year = date.year;
    if (date.era === "AA") year -= $b956b2d7a6cf451f$var$AMETE_MIHRET_DELTA;
    return $b956b2d7a6cf451f$var$ceToJulianDay($b956b2d7a6cf451f$var$ETHIOPIC_EPOCH, year, date.month, date.day);
  }
  getDaysInMonth(date) {
    return $b956b2d7a6cf451f$var$getDaysInMonth(date.year, date.month);
  }
  getMonthsInYear() {
    return 13;
  }
  getDaysInYear(date) {
    return 365 + $b956b2d7a6cf451f$var$getLeapDay(date.year);
  }
  getYearsInEra(date) {
    return date.era === "AA" ? 9999 : 9991;
  }
  getEras() {
    return [
      "AA",
      "AM"
    ];
  }
  constructor() {
    this.identifier = "ethiopic";
  }
};
var $b956b2d7a6cf451f$export$d72e0c37005a4914 = class extends $b956b2d7a6cf451f$export$26ba6eab5e20cd7d {
  fromJulianDay(jd2) {
    let [year, month, day] = $b956b2d7a6cf451f$var$julianDayToCE($b956b2d7a6cf451f$var$ETHIOPIC_EPOCH, jd2);
    year += $b956b2d7a6cf451f$var$AMETE_MIHRET_DELTA;
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, "AA", year, month, day);
  }
  getEras() {
    return [
      "AA"
    ];
  }
  getYearsInEra() {
    return 9999;
  }
  constructor(...args) {
    super(...args), this.identifier = "ethioaa";
  }
};
var $b956b2d7a6cf451f$export$fe6243cbe1a4b7c1 = class extends $b956b2d7a6cf451f$export$26ba6eab5e20cd7d {
  fromJulianDay(jd2) {
    let [year, month, day] = $b956b2d7a6cf451f$var$julianDayToCE($b956b2d7a6cf451f$var$COPTIC_EPOCH, jd2);
    let era = "CE";
    if (year <= 0) {
      era = "BCE";
      year = 1 - year;
    }
    return new (0, $35ea8db9cb2ccb90$export$99faa760c7908e4f)(this, era, year, month, day);
  }
  toJulianDay(date) {
    let year = date.year;
    if (date.era === "BCE") year = 1 - year;
    return $b956b2d7a6cf451f$var$ceToJulianDay($b956b2d7a6cf451f$var$COPTIC_EPOCH, year, date.month, date.day);
  }
  getDaysInMonth(date) {
    let year = date.year;
    if (date.era === "BCE") year = 1 - year;
    return $b956b2d7a6cf451f$var$getDaysInMonth(year, date.month);
  }
  isInverseEra(date) {
    return date.era === "BCE";
  }
  balanceDate(date) {
    if (date.year <= 0) {
      date.era = date.era === "BCE" ? "CE" : "BCE";
      date.year = 1 - date.year;
    }
  }
  getEras() {
    return [
      "BCE",
      "CE"
    ];
  }
  getYearsInEra(date) {
    return date.era === "BCE" ? 9999 : 9715;
  }
  constructor(...args) {
    super(...args), this.identifier = "coptic";
  }
};

// node_modules/@internationalized/date/dist/createCalendar.mjs
function $64244302c3013299$export$dd0bbc9b26defe37(name) {
  switch (name) {
    case "buddhist":
      return new (0, $8d73d47422ca7302$export$42d20a78301dee44)();
    case "ethiopic":
      return new (0, $b956b2d7a6cf451f$export$26ba6eab5e20cd7d)();
    case "ethioaa":
      return new (0, $b956b2d7a6cf451f$export$d72e0c37005a4914)();
    case "coptic":
      return new (0, $b956b2d7a6cf451f$export$fe6243cbe1a4b7c1)();
    case "hebrew":
      return new (0, $7c5f6fbf42389787$export$ca405048b8fb5af)();
    case "indian":
      return new (0, $82c358003bdda0a8$export$39f31c639fa15726)();
    case "islamic-civil":
      return new (0, $f2f3e0e3a817edbd$export$2066795aadd37bfc)();
    case "islamic-tbla":
      return new (0, $f2f3e0e3a817edbd$export$37f0887f2f9d22f7)();
    case "islamic-umalqura":
      return new (0, $f2f3e0e3a817edbd$export$5baab4758c231076)();
    case "japanese":
      return new (0, $62225008020f0a13$export$b746ab2b60cdffbf)();
    case "persian":
      return new (0, $f3ed2e4472ae7e25$export$37fccdbfd14c5939)();
    case "roc":
      return new (0, $5f31bd6f0c8940b2$export$65e01080afcb0799)();
    case "gregory":
    default:
      return new (0, $3b62074eb05584b2$export$80ee6245ec4f29ec)();
  }
}

// node_modules/@internationalized/date/dist/DateFormatter.mjs
var $fb18d541ea1ad717$var$formatterCache = /* @__PURE__ */ new Map();
var $fb18d541ea1ad717$export$ad991b66133851cf = class {
  /** Formats a date as a string according to the locale and format options passed to the constructor. */
  format(value) {
    return this.formatter.format(value);
  }
  /** Formats a date to an array of parts such as separators, numbers, punctuation, and more. */
  formatToParts(value) {
    return this.formatter.formatToParts(value);
  }
  /** Formats a date range as a string. */
  formatRange(start, end) {
    if (typeof this.formatter.formatRange === "function")
      return this.formatter.formatRange(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    return `${this.formatter.format(start)} – ${this.formatter.format(end)}`;
  }
  /** Formats a date range as an array of parts. */
  formatRangeToParts(start, end) {
    if (typeof this.formatter.formatRangeToParts === "function")
      return this.formatter.formatRangeToParts(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    let startParts = this.formatter.formatToParts(start);
    let endParts = this.formatter.formatToParts(end);
    return [
      ...startParts.map((p) => ({
        ...p,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...endParts.map((p) => ({
        ...p,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let resolvedOptions = this.formatter.resolvedOptions();
    if ($fb18d541ea1ad717$var$hasBuggyResolvedHourCycle()) {
      if (!this.resolvedHourCycle) this.resolvedHourCycle = $fb18d541ea1ad717$var$getResolvedHourCycle(resolvedOptions.locale, this.options);
      resolvedOptions.hourCycle = this.resolvedHourCycle;
      resolvedOptions.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12";
    }
    if (resolvedOptions.calendar === "ethiopic-amete-alem") resolvedOptions.calendar = "ethioaa";
    return resolvedOptions;
  }
  constructor(locale, options = {}) {
    this.formatter = $fb18d541ea1ad717$var$getCachedDateFormatter(locale, options);
    this.options = options;
  }
};
var $fb18d541ea1ad717$var$hour12Preferences = {
  true: {
    // Only Japanese uses the h11 style for 12 hour time. All others use h12.
    ja: "h11"
  },
  false: {}
};
function $fb18d541ea1ad717$var$getCachedDateFormatter(locale, options = {}) {
  if (typeof options.hour12 === "boolean" && $fb18d541ea1ad717$var$hasBuggyHour12Behavior()) {
    options = {
      ...options
    };
    let pref = $fb18d541ea1ad717$var$hour12Preferences[String(options.hour12)][locale.split("-")[0]];
    let defaultHourCycle = options.hour12 ? "h12" : "h23";
    options.hourCycle = pref !== null && pref !== void 0 ? pref : defaultHourCycle;
    delete options.hour12;
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a2, b2) => a2[0] < b2[0] ? -1 : 1).join() : "");
  if ($fb18d541ea1ad717$var$formatterCache.has(cacheKey)) return $fb18d541ea1ad717$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.DateTimeFormat(locale, options);
  $fb18d541ea1ad717$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
var $fb18d541ea1ad717$var$_hasBuggyHour12Behavior = null;
function $fb18d541ea1ad717$var$hasBuggyHour12Behavior() {
  if ($fb18d541ea1ad717$var$_hasBuggyHour12Behavior == null) $fb18d541ea1ad717$var$_hasBuggyHour12Behavior = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false
  }).format(new Date(2020, 2, 3, 0)) === "24";
  return $fb18d541ea1ad717$var$_hasBuggyHour12Behavior;
}
var $fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle = null;
function $fb18d541ea1ad717$var$hasBuggyResolvedHourCycle() {
  if ($fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle == null) $fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle = new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hour12: false
  }).resolvedOptions().hourCycle === "h12";
  return $fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle;
}
function $fb18d541ea1ad717$var$getResolvedHourCycle(locale, options) {
  if (!options.timeStyle && !options.hour) return void 0;
  locale = locale.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, "");
  locale += (locale.includes("-u-") ? "" : "-u") + "-nu-latn";
  let formatter = $fb18d541ea1ad717$var$getCachedDateFormatter(locale, {
    ...options,
    timeZone: void 0
    // use local timezone
  });
  let min2 = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 0)).find((p) => p.type === "hour").value, 10);
  let max2 = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 23)).find((p) => p.type === "hour").value, 10);
  if (min2 === 0 && max2 === 23) return "h23";
  if (min2 === 24 && max2 === 23) return "h24";
  if (min2 === 0 && max2 === 11) return "h11";
  if (min2 === 12 && max2 === 11) return "h12";
  throw new Error("Unexpected hour cycle result");
}

// node_modules/radix-vue/dist/calendar-ChFCRr4K.js
function N(t, n) {
  const e = [];
  for (let r = 0; r < t.length; r += n)
    e.push(t.slice(r, r + n));
  return e;
}
function $(t, n = $14e0f24ef4ac5c92$export$aa8b41735afcabd2()) {
  return m(t) ? t.toDate() : t.toDate(n);
}
function w(t) {
  return t instanceof $35ea8db9cb2ccb90$export$ca871e8dbb80966f;
}
function m(t) {
  return t instanceof $35ea8db9cb2ccb90$export$d3b7288e7994edea;
}
function z(t) {
  return w(t) || m(t);
}
function R(t) {
  if (t instanceof Date) {
    const n = t.getFullYear(), e = t.getMonth() + 1;
    return new Date(n, e, 0).getDate();
  } else
    return t.set({ day: 100 }).day;
}
function q(t, n) {
  return t.compare(n) < 0;
}
function P(t, n) {
  return t.compare(n) > 0;
}
function W(t, n) {
  return t.compare(n) <= 0;
}
function G(t, n) {
  return t.compare(n) >= 0;
}
function V(t, n, e) {
  return G(t, n) && W(t, e);
}
function v(t, n, e) {
  return P(t, n) && q(t, e);
}
function H(t, n, e) {
  const r = $14e0f24ef4ac5c92$export$2061056d06d7cdf7(t, e);
  return n > r ? t.subtract({ days: r + 7 - n }) : n === r ? t : t.subtract({ days: r - n });
}
function J(t, n, e) {
  const r = $14e0f24ef4ac5c92$export$2061056d06d7cdf7(t, e), a2 = n === 0 ? 6 : n - 1;
  return r === a2 ? t : r > a2 ? t.add({ days: 7 - r + a2 }) : t.add({ days: a2 - r });
}
function b(t, n, e, r) {
  if (e === void 0 && r === void 0)
    return true;
  let a2 = t.add({ days: 1 });
  if (r != null && r(a2) || e != null && e(a2))
    return false;
  const s = n;
  for (; a2.compare(s) < 0; )
    if (a2 = a2.add({ days: 1 }), r != null && r(a2) || e != null && e(a2))
      return false;
  return true;
}
function A(t, n) {
  const e = [];
  let r = t.add({ days: 1 });
  const a2 = n;
  for (; r.compare(a2) < 0; )
    e.push(r), r = r.add({ days: 1 });
  return e;
}
function y(t) {
  const { dateObj: n, weekStartsOn: e, fixedWeeks: r, locale: a2 } = t, s = R(n), o = Array.from({ length: s }, (D, u) => n.set({ day: u + 1 })), f = $14e0f24ef4ac5c92$export$a5a3b454ada2268e(n), i = $14e0f24ef4ac5c92$export$a2258d9c4118825c(n), x = H(f, e, a2), T = J(i, e, a2), l = A(x.subtract({ days: 1 }), f), c = A(i, T.add({ days: 1 })), g = l.length + o.length + c.length;
  if (r && g < 42) {
    const D = 42 - g;
    let u = c[c.length - 1];
    u || (u = $14e0f24ef4ac5c92$export$a2258d9c4118825c(n));
    const k = Array.from({ length: D }, (K, C) => {
      const I = C + 1;
      return u.add({ days: I });
    });
    c.push(...k);
  }
  const p = l.concat(o, c), B = N(p, 7);
  return {
    value: n,
    cells: p,
    rows: B
  };
}
function rt(t) {
  const { numberOfMonths: n, dateObj: e, ...r } = t, a2 = [];
  if (!n || n === 1)
    return a2.push(
      y({
        ...r,
        dateObj: e
      })
    ), a2;
  a2.push(
    y({
      ...r,
      dateObj: e
    })
  );
  for (let s = 1; s < n; s++) {
    const o = e.add({ months: s });
    a2.push(
      y({
        ...r,
        dateObj: o
      })
    );
  }
  return a2;
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v2) => ({
  x: v2,
  y: v2
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x,
    right: x + width,
    bottom: y2 + height,
    x,
    y: y2
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn: fn2
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn2({
      x,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => d.overflows[0] > 0 && getSideAxis(d.placement) === initialSideAxis)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y3
            } = _ref;
            return {
              x: x2,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y2,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y: y2,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset3 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y: y2
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset3, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
var invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
var tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
var transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
var willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
var containValues = ["paint", "layout", "strict", "content"];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
var lastTraversableNodeNames = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x = ($2 ? round(rect.width) : rect.width) / width;
  let y2 = ($2 ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x,
    y: y2
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y: y2
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y2 = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y: y2
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
var absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el2) => isElement(el2) && getNodeName(el2) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a2, b2) {
  return a2.x === b2.x && a2.y === b2.y && a2.width === b2.width && a2.height === b2.height;
}
function observeMove(element, onMove) {
  let io2 = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io2) == null || _io.disconnect();
    io2 = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io2 = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io2 = new IntersectionObserver(handleObserve, options);
    }
    io2.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function isComponentPublicInstance(target) {
  return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement2(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === "#comment" ? null : element;
  }
  return target;
}
function toValue(source) {
  return typeof source === "function" ? source() : unref(source);
}
function arrow3(options) {
  return {
    name: "arrow",
    options,
    fn(args) {
      const element = unwrapElement2(toValue(options.element));
      if (element == null) {
        return {};
      }
      return arrow2({
        element,
        padding: options.padding
      }).fn(args);
    }
  };
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed(() => {
    var _toValue;
    return (_toValue = toValue(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = computed(() => toValue(options.middleware));
  const placementOption = computed(() => {
    var _toValue2;
    return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
  });
  const strategyOption = computed(() => {
    var _toValue3;
    return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
  });
  const transformOption = computed(() => {
    var _toValue4;
    return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = computed(() => unwrapElement2(reference.value));
  const floatingElement = computed(() => unwrapElement2(floating.value));
  const x = ref(0);
  const y2 = ref(0);
  const strategy = ref(strategyOption.value);
  const placement = ref(placementOption.value);
  const middlewareData = shallowRef({});
  const isPositioned = ref(false);
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: "0",
      top: "0"
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y2.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: "translate(" + xVal + "px, " + yVal + "px)",
        ...getDPR(floatingElement.value) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    const open = openOption.value;
    computePosition2(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x;
      y2.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = open !== false;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: "sync"
  });
  watch([referenceElement, floatingElement], attach, {
    flush: "sync"
  });
  watch(openOption, reset, {
    flush: "sync"
  });
  if (getCurrentScope()) {
    onScopeDispose(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y2),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}

// node_modules/@internationalized/number/dist/NumberFormatter.mjs
var $488c6ddbf4ef74c2$var$formatterCache = /* @__PURE__ */ new Map();
var $488c6ddbf4ef74c2$var$supportsSignDisplay = false;
try {
  $488c6ddbf4ef74c2$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", {
    signDisplay: "exceptZero"
  }).resolvedOptions().signDisplay === "exceptZero";
} catch {
}
var $488c6ddbf4ef74c2$var$supportsUnit = false;
try {
  $488c6ddbf4ef74c2$var$supportsUnit = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "degree"
  }).resolvedOptions().style === "unit";
} catch {
}
var $488c6ddbf4ef74c2$var$UNITS = {
  degree: {
    narrow: {
      default: "°",
      "ja-JP": " 度",
      "zh-TW": "度",
      "sl-SI": " °"
    }
  }
};
var $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5 = class {
  /** Formats a number value as a string, according to the locale and options provided to the constructor. */
  format(value) {
    let res = "";
    if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null) res = $488c6ddbf4ef74c2$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
    else res = this.numberFormatter.format(value);
    if (this.options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
      var _UNITS_unit;
      let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
      if (!unit) return res;
      let values = (_UNITS_unit = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || _UNITS_unit === void 0 ? void 0 : _UNITS_unit[unitDisplay];
      res += values[locale] || values.default;
    }
    return res;
  }
  /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */
  formatToParts(value) {
    return this.numberFormatter.formatToParts(value);
  }
  /** Formats a number range as a string. */
  formatRange(start, end) {
    if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    return `${this.format(start)} – ${this.format(end)}`;
  }
  /** Formats a number range as an array of parts. */
  formatRangeToParts(start, end) {
    if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    let startParts = this.numberFormatter.formatToParts(start);
    let endParts = this.numberFormatter.formatToParts(end);
    return [
      ...startParts.map((p) => ({
        ...p,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...endParts.map((p) => ({
        ...p,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let options = this.numberFormatter.resolvedOptions();
    if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null) options = {
      ...options,
      signDisplay: this.options.signDisplay
    };
    if (!$488c6ddbf4ef74c2$var$supportsUnit && this.options.style === "unit") options = {
      ...options,
      style: "unit",
      unit: this.options.unit,
      unitDisplay: this.options.unitDisplay
    };
    return options;
  }
  constructor(locale, options = {}) {
    this.numberFormatter = $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options);
    this.options = options;
  }
};
function $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options = {}) {
  let { numberingSystem } = options;
  if (numberingSystem && locale.includes("-nu-")) {
    if (!locale.includes("-u-")) locale += "-u-";
    locale += `-nu-${numberingSystem}`;
  }
  if (options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
    var _UNITS_unit;
    let { unit, unitDisplay = "short" } = options;
    if (!unit) throw new Error('unit option must be provided with style: "unit"');
    if (!((_UNITS_unit = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || _UNITS_unit === void 0 ? void 0 : _UNITS_unit[unitDisplay])) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
    options = {
      ...options,
      style: "decimal"
    };
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a2, b2) => a2[0] < b2[0] ? -1 : 1).join() : "");
  if ($488c6ddbf4ef74c2$var$formatterCache.has(cacheKey)) return $488c6ddbf4ef74c2$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.NumberFormat(locale, options);
  $488c6ddbf4ef74c2$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
function $488c6ddbf4ef74c2$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
  if (signDisplay === "auto") return numberFormat.format(num);
  else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
  else {
    let needsPositiveSign = false;
    if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
    else if (signDisplay === "exceptZero") {
      if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
      else needsPositiveSign = num > 0;
    }
    if (needsPositiveSign) {
      let negative = numberFormat.format(-num);
      let noSign = numberFormat.format(num);
      let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
      if ([
        ...minus
      ].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
      let positive = negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
      return positive;
    } else return numberFormat.format(num);
  }
}

// node_modules/@internationalized/number/dist/NumberParser.mjs
var $6c7bd7858deea686$var$CURRENCY_SIGN_REGEX = new RegExp("^.*\\(.*\\).*$");
var $6c7bd7858deea686$var$NUMBERING_SYSTEMS = [
  "latn",
  "arab",
  "hanidec",
  "deva",
  "beng"
];
var $6c7bd7858deea686$export$cd11ab140839f11d = class {
  /**
  * Parses the given string to a number. Returns NaN if a valid number could not be parsed.
  */
  parse(value) {
    return $6c7bd7858deea686$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
  }
  /**
  * Returns whether the given string could potentially be a valid number. This should be used to
  * validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
  * of the minus/plus sign characters can be checked.
  */
  isValidPartialNumber(value, minValue, maxValue) {
    return $6c7bd7858deea686$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
  }
  /**
  * Returns a numbering system for which the given string is valid in the current locale.
  * If no numbering system could be detected, the default numbering system for the current
  * locale is returned.
  */
  getNumberingSystem(value) {
    return $6c7bd7858deea686$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
  }
  constructor(locale, options = {}) {
    this.locale = locale;
    this.options = options;
  }
};
var $6c7bd7858deea686$var$numberParserCache = /* @__PURE__ */ new Map();
function $6c7bd7858deea686$var$getNumberParserImpl(locale, options, value) {
  let defaultParser = $6c7bd7858deea686$var$getCachedNumberParser(locale, options);
  if (!locale.includes("-nu-") && !defaultParser.isValidPartialNumber(value)) {
    for (let numberingSystem of $6c7bd7858deea686$var$NUMBERING_SYSTEMS) if (numberingSystem !== defaultParser.options.numberingSystem) {
      let parser = $6c7bd7858deea686$var$getCachedNumberParser(locale + (locale.includes("-u-") ? "-nu-" : "-u-nu-") + numberingSystem, options);
      if (parser.isValidPartialNumber(value)) return parser;
    }
  }
  return defaultParser;
}
function $6c7bd7858deea686$var$getCachedNumberParser(locale, options) {
  let cacheKey = locale + (options ? Object.entries(options).sort((a2, b2) => a2[0] < b2[0] ? -1 : 1).join() : "");
  let parser = $6c7bd7858deea686$var$numberParserCache.get(cacheKey);
  if (!parser) {
    parser = new $6c7bd7858deea686$var$NumberParserImpl(locale, options);
    $6c7bd7858deea686$var$numberParserCache.set(cacheKey, parser);
  }
  return parser;
}
var $6c7bd7858deea686$var$NumberParserImpl = class {
  parse(value) {
    let fullySanitizedValue = this.sanitize(value);
    if (this.symbols.group)
      fullySanitizedValue = $6c7bd7858deea686$var$replaceAll(fullySanitizedValue, this.symbols.group, "");
    if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, ".");
    if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, "-");
    fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
    if (this.options.style === "percent") {
      let isNegative = fullySanitizedValue.indexOf("-");
      fullySanitizedValue = fullySanitizedValue.replace("-", "");
      fullySanitizedValue = fullySanitizedValue.replace("+", "");
      let index = fullySanitizedValue.indexOf(".");
      if (index === -1) index = fullySanitizedValue.length;
      fullySanitizedValue = fullySanitizedValue.replace(".", "");
      if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
      else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
      else if (index - 2 === -2) fullySanitizedValue = "0.00";
      else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
      if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
    }
    let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
    if (isNaN(newValue)) return NaN;
    if (this.options.style === "percent") {
      var _this_options_minimumFractionDigits, _this_options_maximumFractionDigits;
      let options = {
        ...this.options,
        style: "decimal",
        minimumFractionDigits: Math.min(((_this_options_minimumFractionDigits = this.options.minimumFractionDigits) !== null && _this_options_minimumFractionDigits !== void 0 ? _this_options_minimumFractionDigits : 0) + 2, 20),
        maximumFractionDigits: Math.min(((_this_options_maximumFractionDigits = this.options.maximumFractionDigits) !== null && _this_options_maximumFractionDigits !== void 0 ? _this_options_maximumFractionDigits : 0) + 2, 20)
      };
      return new $6c7bd7858deea686$export$cd11ab140839f11d(this.locale, options).parse(new (0, $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5)(this.locale, options).format(newValue));
    }
    if (this.options.currencySign === "accounting" && $6c7bd7858deea686$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
    return newValue;
  }
  sanitize(value) {
    value = value.replace(this.symbols.literals, "");
    if (this.symbols.minusSign) value = value.replace("-", this.symbols.minusSign);
    if (this.options.numberingSystem === "arab") {
      if (this.symbols.decimal) {
        value = value.replace(",", this.symbols.decimal);
        value = value.replace(String.fromCharCode(1548), this.symbols.decimal);
      }
      if (this.symbols.group) value = $6c7bd7858deea686$var$replaceAll(value, ".", this.symbols.group);
    }
    if (this.options.locale === "fr-FR" && this.symbols.group) {
      value = $6c7bd7858deea686$var$replaceAll(value, " ", this.symbols.group);
      value = $6c7bd7858deea686$var$replaceAll(value, /\u00A0/g, this.symbols.group);
    }
    return value;
  }
  isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
    value = this.sanitize(value);
    if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
    else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
    if (this.symbols.group && value.startsWith(this.symbols.group)) return false;
    if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
    if (this.symbols.group) value = $6c7bd7858deea686$var$replaceAll(value, this.symbols.group, "");
    value = value.replace(this.symbols.numeral, "");
    if (this.symbols.decimal) value = value.replace(this.symbols.decimal, "");
    return value.length === 0;
  }
  constructor(locale, options = {}) {
    this.locale = locale;
    if (options.roundingIncrement !== 1 && options.roundingIncrement != null) {
      if (options.maximumFractionDigits == null && options.minimumFractionDigits == null) {
        options.maximumFractionDigits = 0;
        options.minimumFractionDigits = 0;
      } else if (options.maximumFractionDigits == null) options.maximumFractionDigits = options.minimumFractionDigits;
      else if (options.minimumFractionDigits == null) options.minimumFractionDigits = options.maximumFractionDigits;
    }
    this.formatter = new Intl.NumberFormat(locale, options);
    this.options = this.formatter.resolvedOptions();
    this.symbols = $6c7bd7858deea686$var$getSymbols(locale, this.formatter, this.options, options);
    var _this_options_minimumFractionDigits, _this_options_maximumFractionDigits;
    if (this.options.style === "percent" && (((_this_options_minimumFractionDigits = this.options.minimumFractionDigits) !== null && _this_options_minimumFractionDigits !== void 0 ? _this_options_minimumFractionDigits : 0) > 18 || ((_this_options_maximumFractionDigits = this.options.maximumFractionDigits) !== null && _this_options_maximumFractionDigits !== void 0 ? _this_options_maximumFractionDigits : 0) > 18)) console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
  }
};
var $6c7bd7858deea686$var$nonLiteralParts = /* @__PURE__ */ new Set([
  "decimal",
  "fraction",
  "integer",
  "minusSign",
  "plusSign",
  "group"
]);
var $6c7bd7858deea686$var$pluralNumbers = [
  0,
  4,
  2,
  1,
  11,
  20,
  3,
  7,
  100,
  21,
  0.1,
  1.1
];
function $6c7bd7858deea686$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
  var _allParts_find, _posAllParts_find, _decimalParts_find, _allParts_find1;
  let symbolFormatter = new Intl.NumberFormat(locale, {
    ...intlOptions,
    // Resets so we get the full range of symbols
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 21,
    roundingIncrement: 1,
    roundingPriority: "auto",
    roundingMode: "halfExpand"
  });
  let allParts = symbolFormatter.formatToParts(-10000.111);
  let posAllParts = symbolFormatter.formatToParts(10000.111);
  let pluralParts = $6c7bd7858deea686$var$pluralNumbers.map((n) => symbolFormatter.formatToParts(n));
  var _allParts_find_value;
  let minusSign = (_allParts_find_value = (_allParts_find = allParts.find((p) => p.type === "minusSign")) === null || _allParts_find === void 0 ? void 0 : _allParts_find.value) !== null && _allParts_find_value !== void 0 ? _allParts_find_value : "-";
  let plusSign = (_posAllParts_find = posAllParts.find((p) => p.type === "plusSign")) === null || _posAllParts_find === void 0 ? void 0 : _posAllParts_find.value;
  if (!plusSign && ((originalOptions === null || originalOptions === void 0 ? void 0 : originalOptions.signDisplay) === "exceptZero" || (originalOptions === null || originalOptions === void 0 ? void 0 : originalOptions.signDisplay) === "always")) plusSign = "+";
  let decimalParts = new Intl.NumberFormat(locale, {
    ...intlOptions,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).formatToParts(1e-3);
  let decimal = (_decimalParts_find = decimalParts.find((p) => p.type === "decimal")) === null || _decimalParts_find === void 0 ? void 0 : _decimalParts_find.value;
  let group = (_allParts_find1 = allParts.find((p) => p.type === "group")) === null || _allParts_find1 === void 0 ? void 0 : _allParts_find1.value;
  let allPartsLiterals = allParts.filter((p) => !$6c7bd7858deea686$var$nonLiteralParts.has(p.type)).map((p) => $6c7bd7858deea686$var$escapeRegex(p.value));
  let pluralPartsLiterals = pluralParts.flatMap((p) => p.filter((p2) => !$6c7bd7858deea686$var$nonLiteralParts.has(p2.type)).map((p2) => $6c7bd7858deea686$var$escapeRegex(p2.value)));
  let sortedLiterals = [
    .../* @__PURE__ */ new Set([
      ...allPartsLiterals,
      ...pluralPartsLiterals
    ])
  ].sort((a2, b2) => b2.length - a2.length);
  let literals = sortedLiterals.length === 0 ? new RegExp("[\\p{White_Space}]", "gu") : new RegExp(`${sortedLiterals.join("|")}|[\\p{White_Space}]`, "gu");
  let numerals = [
    ...new Intl.NumberFormat(intlOptions.locale, {
      useGrouping: false
    }).format(9876543210)
  ].reverse();
  let indexes = new Map(numerals.map((d, i) => [
    d,
    i
  ]));
  let numeral = new RegExp(`[${numerals.join("")}]`, "g");
  let index = (d) => String(indexes.get(d));
  return {
    minusSign,
    plusSign,
    decimal,
    group,
    literals,
    numeral,
    index
  };
}
function $6c7bd7858deea686$var$replaceAll(str, find, replace) {
  if (str.replaceAll) return str.replaceAll(find, replace);
  return str.split(find).join(replace);
}
function $6c7bd7858deea686$var$escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// node_modules/radix-vue/dist/index.js
function te(a2, t) {
  const e = typeof a2 == "string" && !t ? `${a2}Context` : t, n = Symbol(e);
  return [(r) => {
    const i = inject(n, r);
    if (i || i === null)
      return i;
    throw new Error(
      `Injection \`${n.toString()}\` not found. Component must be used within ${Array.isArray(a2) ? `one of the following components: ${a2.join(
        ", "
      )}` : `\`${a2}\``}`
    );
  }, (r) => (provide(n, r), r)];
}
function jt(a2, t, e) {
  const n = e.originalEvent.target, l = new CustomEvent(a2, {
    bubbles: false,
    cancelable: true,
    detail: e
  });
  t && n.addEventListener(a2, t, { once: true }), n.dispatchEvent(l);
}
function Ut(a2, t = Number.NEGATIVE_INFINITY, e = Number.POSITIVE_INFINITY) {
  return Math.min(e, Math.max(t, a2));
}
function Da(a2, t) {
  let e = a2;
  const n = t.toString(), l = n.indexOf("."), s = l >= 0 ? n.length - l : 0;
  if (s > 0) {
    const r = 10 ** s;
    e = Math.round(e * r) / r;
  }
  return e;
}
function Wr(a2, t, e, n) {
  t = Number(t), e = Number(e);
  const l = (a2 - (Number.isNaN(t) ? 0 : t)) % n;
  let s = Da(Math.abs(l) * 2 >= n ? a2 + Math.sign(l) * (n - Math.abs(l)) : a2 - l, n);
  return Number.isNaN(t) ? !Number.isNaN(e) && s > e && (s = Math.floor(Da(e / n, n)) * n) : s < t ? s = t : !Number.isNaN(e) && s > e && (s = t + Math.floor(Da((e - t) / n, n)) * n), s = Da(s, n), s;
}
function jr(a2) {
  return a2 && a2.__esModule && Object.prototype.hasOwnProperty.call(a2, "default") ? a2.default : a2;
}
var Ur = function a(t, e) {
  if (t === e) return true;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor) return false;
    var n, l, s;
    if (Array.isArray(t)) {
      if (n = t.length, n != e.length) return false;
      for (l = n; l-- !== 0; )
        if (!a(t[l], e[l])) return false;
      return true;
    }
    if (t.constructor === RegExp) return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === e.toString();
    if (s = Object.keys(t), n = s.length, n !== Object.keys(e).length) return false;
    for (l = n; l-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, s[l])) return false;
    for (l = n; l-- !== 0; ) {
      var r = s[l];
      if (!a(t[r], e[r])) return false;
    }
    return true;
  }
  return t !== t && e !== e;
};
var Qe = jr(Ur);
function Gr(a2, t) {
  if (a2.length !== t.length)
    return false;
  for (let e = 0; e < a2.length; e++)
    if (a2[e] !== t[e])
      return false;
  return true;
}
function Bt(a2, t, e) {
  const n = a2.findIndex((i) => Qe(i, t)), l = a2.findIndex((i) => Qe(i, e));
  if (n === -1 || l === -1)
    return [];
  const [s, r] = [n, l].sort((i, u) => i - u);
  return a2.slice(s, r + 1);
}
var ha = typeof document < "u";
function ht(a2) {
  return a2 == null;
}
function Yt(a2) {
  const { defaultValue: t, defaultPlaceholder: e, granularity: n = "day", locale: l = "en" } = a2;
  if (Array.isArray(t) && t.length)
    return t.at(-1).copy();
  if (t && !Array.isArray(t))
    return t.copy();
  if (e)
    return e.copy();
  const s = /* @__PURE__ */ new Date(), r = s.getFullYear(), i = s.getMonth() + 1, u = s.getDate(), d = ["hour", "minute", "second"], c = new $fb18d541ea1ad717$export$ad991b66133851cf(l), f = $64244302c3013299$export$dd0bbc9b26defe37(c.resolvedOptions().calendar);
  return d.includes(n ?? "day") ? $11d87f3f76e88657$export$b4a036af3fc0b032(new $35ea8db9cb2ccb90$export$ca871e8dbb80966f(r, i, u, 0, 0, 0), f) : $11d87f3f76e88657$export$b4a036af3fc0b032(new $35ea8db9cb2ccb90$export$99faa760c7908e4f(r, i, u), f);
}
var qr = [
  "ach",
  "af",
  "am",
  "an",
  "ar",
  "ast",
  "az",
  "be",
  "bg",
  "bn",
  "br",
  "bs",
  "ca",
  "cak",
  "ckb",
  "cs",
  "cy",
  "da",
  "de",
  "dsb",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fr",
  "fy",
  "ga",
  "gd",
  "gl",
  "he",
  "hr",
  "hsb",
  "hu",
  "ia",
  "id",
  "it",
  "ja",
  "ka",
  "kk",
  "kn",
  "ko",
  "lb",
  "lo",
  "lt",
  "lv",
  "meh",
  "ml",
  "ms",
  "nl",
  "nn",
  "no",
  "oc",
  "pl",
  "pt",
  "rm",
  "ro",
  "ru",
  "sc",
  "scn",
  "sk",
  "sl",
  "sr",
  "sv",
  "szl",
  "tg",
  "th",
  "tr",
  "uk",
  "zh-CN",
  "zh-TW"
];
var Yr = ["year", "month", "day"];
var gn = {
  ach: { year: "mwaka", month: "dwe", day: "nino" },
  af: { year: "jjjj", month: "mm", day: "dd" },
  am: { year: "ዓዓዓዓ", month: "ሚሜ", day: "ቀቀ" },
  an: { year: "aaaa", month: "mm", day: "dd" },
  ar: { year: "سنة", month: "شهر", day: "يوم" },
  ast: { year: "aaaa", month: "mm", day: "dd" },
  az: { year: "iiii", month: "aa", day: "gg" },
  be: { year: "гггг", month: "мм", day: "дд" },
  bg: { year: "гггг", month: "мм", day: "дд" },
  bn: { year: "yyyy", month: "মিমি", day: "dd" },
  br: { year: "bbbb", month: "mm", day: "dd" },
  bs: { year: "gggg", month: "mm", day: "dd" },
  ca: { year: "aaaa", month: "mm", day: "dd" },
  cak: { year: "jjjj", month: "ii", day: "q'q'" },
  ckb: { year: "ساڵ", month: "مانگ", day: "ڕۆژ" },
  cs: { year: "rrrr", month: "mm", day: "dd" },
  cy: { year: "bbbb", month: "mm", day: "dd" },
  da: { year: "åååå", month: "mm", day: "dd" },
  de: { year: "jjjj", month: "mm", day: "tt" },
  dsb: { year: "llll", month: "mm", day: "źź" },
  el: { year: "εεεε", month: "μμ", day: "ηη" },
  en: { year: "yyyy", month: "mm", day: "dd" },
  eo: { year: "jjjj", month: "mm", day: "tt" },
  es: { year: "aaaa", month: "mm", day: "dd" },
  et: { year: "aaaa", month: "kk", day: "pp" },
  eu: { year: "uuuu", month: "hh", day: "ee" },
  fa: { year: "سال", month: "ماه", day: "روز" },
  ff: { year: "hhhh", month: "ll", day: "ññ" },
  fi: { year: "vvvv", month: "kk", day: "pp" },
  fr: { year: "aaaa", month: "mm", day: "jj" },
  fy: { year: "jjjj", month: "mm", day: "dd" },
  ga: { year: "bbbb", month: "mm", day: "ll" },
  gd: { year: "bbbb", month: "mm", day: "ll" },
  gl: { year: "aaaa", month: "mm", day: "dd" },
  he: { year: "שנה", month: "חודש", day: "יום" },
  hr: { year: "gggg", month: "mm", day: "dd" },
  hsb: { year: "llll", month: "mm", day: "dd" },
  hu: { year: "éééé", month: "hh", day: "nn" },
  ia: { year: "aaaa", month: "mm", day: "dd" },
  id: { year: "tttt", month: "bb", day: "hh" },
  it: { year: "aaaa", month: "mm", day: "gg" },
  ja: { year: " 年 ", month: "月", day: "日" },
  ka: { year: "წწწწ", month: "თთ", day: "რრ" },
  kk: { year: "жжжж", month: "аа", day: "кк" },
  kn: { year: "ವವವವ", month: "ಮಿಮೀ", day: "ದಿದಿ" },
  ko: { year: "연도", month: "월", day: "일" },
  lb: { year: "jjjj", month: "mm", day: "dd" },
  lo: { year: "ປປປປ", month: "ດດ", day: "ວວ" },
  lt: { year: "mmmm", month: "mm", day: "dd" },
  lv: { year: "gggg", month: "mm", day: "dd" },
  meh: { year: "aaaa", month: "mm", day: "dd" },
  ml: { year: "വർഷം", month: "മാസം", day: "തീയതി" },
  ms: { year: "tttt", month: "mm", day: "hh" },
  nl: { year: "jjjj", month: "mm", day: "dd" },
  nn: { year: "åååå", month: "mm", day: "dd" },
  no: { year: "åååå", month: "mm", day: "dd" },
  oc: { year: "aaaa", month: "mm", day: "jj" },
  pl: { year: "rrrr", month: "mm", day: "dd" },
  pt: { year: "aaaa", month: "mm", day: "dd" },
  rm: { year: "oooo", month: "mm", day: "dd" },
  ro: { year: "aaaa", month: "ll", day: "zz" },
  ru: { year: "гггг", month: "мм", day: "дд" },
  sc: { year: "aaaa", month: "mm", day: "dd" },
  scn: { year: "aaaa", month: "mm", day: "jj" },
  sk: { year: "rrrr", month: "mm", day: "dd" },
  sl: { year: "llll", month: "mm", day: "dd" },
  sr: { year: "гггг", month: "мм", day: "дд" },
  sv: { year: "åååå", month: "mm", day: "dd" },
  szl: { year: "rrrr", month: "mm", day: "dd" },
  tg: { year: "сссс", month: "мм", day: "рр" },
  th: { year: "ปปปป", month: "ดด", day: "วว" },
  tr: { year: "yyyy", month: "aa", day: "gg" },
  uk: { year: "рррр", month: "мм", day: "дд" },
  "zh-CN": { year: "年", month: "月", day: "日" },
  "zh-TW": { year: "年", month: "月", day: "日" }
};
function Xr(a2) {
  if (Wo(a2))
    return gn[a2];
  {
    const t = ei(a2);
    return Wo(t) ? gn[t] : gn.en;
  }
}
function bn(a2, t, e) {
  return Zr(a2) ? Xr(e)[a2] : Qr(a2) ? t : Jr(a2) ? "––" : "";
}
function Wo(a2) {
  return qr.includes(a2);
}
function Zr(a2) {
  return Yr.includes(a2);
}
function Jr(a2) {
  return a2 === "hour" || a2 === "minute" || a2 === "second";
}
function Qr(a2) {
  return a2 === "era" || a2 === "dayPeriod";
}
function ei(a2) {
  return Intl.Locale ? new Intl.Locale(a2).language : a2.split("-")[0];
}
var Wn = ["day", "month", "year"];
var xl = ["hour", "minute", "second", "dayPeriod"];
var Sl = [...Wn, ...xl];
function ti(a2) {
  return Wn.includes(a2);
}
function El(a2) {
  return Sl.includes(a2);
}
function ai(a2, t) {
  const e = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hourCycle: t === 24 ? "h24" : void 0,
    hour12: t === 24 ? false : void 0
  };
  return a2 === "day" && (delete e.second, delete e.hour, delete e.minute, delete e.timeZoneName), a2 === "hour" && (delete e.minute, delete e.second), a2 === "minute" && delete e.second, e;
}
function Pl(a2) {
  const t = a2.querySelector("[data-selected]");
  if (t)
    return t.focus();
  const e = a2.querySelector("[data-today]");
  if (e)
    return e.focus();
  const n = a2.querySelector("[data-radix-vue-calendar-day]");
  if (n)
    return n.focus();
}
function ni(a2, t) {
  var e;
  const n = shallowRef();
  return watchEffect(() => {
    n.value = a2();
  }, {
    ...t,
    flush: (e = void 0) != null ? e : "sync"
  }), readonly(n);
}
function oi(a2, t) {
  let e, n, l;
  const s = ref(true), r = () => {
    s.value = true, l();
  };
  watch(a2, r, { flush: "sync" });
  const i = typeof t == "function" ? t : t.get, u = typeof t == "function" ? void 0 : t.set, d = customRef((c, f) => (n = c, l = f, {
    get() {
      return s.value && (e = i(), s.value = false), n(), e;
    },
    set(v2) {
      u == null || u(v2);
    }
  }));
  return Object.isExtensible(d) && (d.trigger = r), d;
}
function bt(a2) {
  return getCurrentScope() ? (onScopeDispose(a2), true) : false;
}
function ua() {
  const a2 = /* @__PURE__ */ new Set(), t = (l) => {
    a2.delete(l);
  };
  return {
    on: (l) => {
      a2.add(l);
      const s = () => t(l);
      return bt(s), {
        off: s
      };
    },
    off: t,
    trigger: (...l) => Promise.all(Array.from(a2).map((s) => s(...l)))
  };
}
function li(a2) {
  let t = false, e;
  const n = effectScope(true);
  return (...l) => (t || (e = n.run(() => a2(...l)), t = true), e);
}
function Dl(a2) {
  let t = 0, e, n;
  const l = () => {
    t -= 1, n && t <= 0 && (n.stop(), e = void 0, n = void 0);
  };
  return (...s) => (t += 1, e || (n = effectScope(true), e = n.run(() => a2(...s))), bt(l), e);
}
function je(a2) {
  return typeof a2 == "function" ? a2() : unref(a2);
}
function si(a2) {
  if (!isRef(a2))
    return reactive(a2);
  const t = new Proxy({}, {
    get(e, n, l) {
      return unref(Reflect.get(a2.value, n, l));
    },
    set(e, n, l) {
      return isRef(a2.value[n]) && !isRef(l) ? a2.value[n].value = l : a2.value[n] = l, true;
    },
    deleteProperty(e, n) {
      return Reflect.deleteProperty(a2.value, n);
    },
    has(e, n) {
      return Reflect.has(a2.value, n);
    },
    ownKeys() {
      return Object.keys(a2.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(t);
}
function $l(a2) {
  return si(computed(a2));
}
var Je = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var ri = (a2) => typeof a2 < "u";
var ii = (a2) => a2 != null;
var ui = Object.prototype.toString;
var di = (a2) => ui.call(a2) === "[object Object]";
var Na = () => {
};
var jo = ci();
function ci() {
  var a2, t;
  return Je && ((a2 = window == null ? void 0 : window.navigator) == null ? void 0 : a2.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Bl(a2, t) {
  function e(...n) {
    return new Promise((l, s) => {
      Promise.resolve(a2(() => t.apply(this, n), { fn: t, thisArg: this, args: n })).then(l).catch(s);
    });
  }
  return e;
}
var Il = (a2) => a2();
function fi(a2, t = {}) {
  let e, n, l = Na;
  const s = (i) => {
    clearTimeout(i), l(), l = Na;
  };
  return (i) => {
    const u = je(a2), d = je(t.maxWait);
    return e && s(e), u <= 0 || d !== void 0 && d <= 0 ? (n && (s(n), n = null), Promise.resolve(i())) : new Promise((c, f) => {
      l = t.rejectOnCancel ? f : c, d && !n && (n = setTimeout(() => {
        e && s(e), n = null, c(i());
      }, d)), e = setTimeout(() => {
        n && s(n), n = null, c(i());
      }, u);
    });
  };
}
function pi(a2 = Il) {
  const t = ref(true);
  function e() {
    t.value = false;
  }
  function n() {
    t.value = true;
  }
  const l = (...s) => {
    t.value && a2(...s);
  };
  return { isActive: readonly(t), pause: e, resume: n, eventFilter: l };
}
function Tl(a2) {
  return getCurrentInstance();
}
function Tt(a2, t = 1e4) {
  return customRef((e, n) => {
    let l = je(a2), s;
    const r = () => setTimeout(() => {
      l = je(a2), n();
    }, je(t));
    return bt(() => {
      clearTimeout(s);
    }), {
      get() {
        return e(), l;
      },
      set(i) {
        l = i, n(), clearTimeout(s), s = r();
      }
    };
  });
}
function jn(a2, t = 200, e = {}) {
  return Bl(
    fi(t, e),
    a2
  );
}
function vi(a2, t, e = {}) {
  const {
    eventFilter: n = Il,
    ...l
  } = e;
  return watch(
    a2,
    Bl(
      n,
      t
    ),
    l
  );
}
function Uo(a2, t, e = {}) {
  const {
    eventFilter: n,
    ...l
  } = e, { eventFilter: s, pause: r, resume: i, isActive: u } = pi(n);
  return { stop: vi(
    a2,
    t,
    {
      ...l,
      eventFilter: s
    }
  ), pause: r, resume: i, isActive: u };
}
function mi(a2, t, ...[e]) {
  const {
    flush: n = "sync",
    deep: l = false,
    immediate: s = true,
    direction: r = "both",
    transform: i = {}
  } = e || {}, u = [], d = "ltr" in i && i.ltr || ((v2) => v2), c = "rtl" in i && i.rtl || ((v2) => v2);
  return (r === "both" || r === "ltr") && u.push(Uo(
    a2,
    (v2) => {
      u.forEach((p) => p.pause()), t.value = d(v2), u.forEach((p) => p.resume());
    },
    { flush: n, deep: l, immediate: s }
  )), (r === "both" || r === "rtl") && u.push(Uo(
    t,
    (v2) => {
      u.forEach((p) => p.pause()), a2.value = c(v2), u.forEach((p) => p.resume());
    },
    { flush: n, deep: l, immediate: s }
  )), () => {
    u.forEach((v2) => v2.stop());
  };
}
function hi(a2, t) {
  Tl() && onBeforeUnmount(a2, t);
}
function yi(a2, t = true, e) {
  Tl() ? onMounted(a2, e) : t ? a2() : nextTick(a2);
}
function Un(a2, t, e = {}) {
  const {
    immediate: n = true
  } = e, l = ref(false);
  let s = null;
  function r() {
    s && (clearTimeout(s), s = null);
  }
  function i() {
    l.value = false, r();
  }
  function u(...d) {
    r(), l.value = true, s = setTimeout(() => {
      l.value = false, s = null, a2(...d);
    }, je(t));
  }
  return n && (l.value = true, Je && u()), bt(i), {
    isPending: readonly(l),
    start: u,
    stop: i
  };
}
function gi(a2 = 1e3, t = {}) {
  const {
    controls: e = false,
    callback: n
  } = t, l = Un(
    n ?? Na,
    a2,
    t
  ), s = computed(() => !l.isPending.value);
  return e ? {
    ready: s,
    ...l
  } : s;
}
function bi(a2, t, e) {
  const n = watch(a2, (...l) => (nextTick(() => n()), t(...l)), e);
  return n;
}
function $e(a2) {
  var t;
  const e = je(a2);
  return (t = e == null ? void 0 : e.$el) != null ? t : e;
}
var Rt = Je ? window : void 0;
function He(...a2) {
  let t, e, n, l;
  if (typeof a2[0] == "string" || Array.isArray(a2[0]) ? ([e, n, l] = a2, t = Rt) : [t, e, n, l] = a2, !t)
    return Na;
  Array.isArray(e) || (e = [e]), Array.isArray(n) || (n = [n]);
  const s = [], r = () => {
    s.forEach((c) => c()), s.length = 0;
  }, i = (c, f, v2, p) => (c.addEventListener(f, v2, p), () => c.removeEventListener(f, v2, p)), u = watch(
    () => [$e(t), je(l)],
    ([c, f]) => {
      if (r(), !c)
        return;
      const v2 = di(f) ? { ...f } : f;
      s.push(
        ...e.flatMap((p) => n.map((g) => i(c, p, g, v2)))
      );
    },
    { immediate: true, flush: "post" }
  ), d = () => {
    u(), r();
  };
  return bt(d), d;
}
function Ci(a2) {
  return typeof a2 == "function" ? a2 : typeof a2 == "string" ? (t) => t.key === a2 : Array.isArray(a2) ? (t) => a2.includes(t.key) : () => true;
}
function Gn(...a2) {
  let t, e, n = {};
  a2.length === 3 ? (t = a2[0], e = a2[1], n = a2[2]) : a2.length === 2 ? typeof a2[1] == "object" ? (t = true, e = a2[0], n = a2[1]) : (t = a2[0], e = a2[1]) : (t = true, e = a2[0]);
  const {
    target: l = Rt,
    eventName: s = "keydown",
    passive: r = false,
    dedupe: i = false
  } = n, u = Ci(t);
  return He(l, s, (c) => {
    c.repeat && je(i) || u(c) && e(c);
  }, r);
}
function Ga() {
  const a2 = ref(false), t = getCurrentInstance();
  return t && onMounted(() => {
    a2.value = true;
  }, t), a2;
}
function Rl(a2) {
  const t = Ga();
  return computed(() => (t.value, !!a2()));
}
function Al(a2, t, e = {}) {
  const { window: n = Rt, ...l } = e;
  let s;
  const r = Rl(() => n && "MutationObserver" in n), i = () => {
    s && (s.disconnect(), s = void 0);
  }, u = computed(() => {
    const v2 = je(a2), p = (Array.isArray(v2) ? v2 : [v2]).map($e).filter(ii);
    return new Set(p);
  }), d = watch(
    () => u.value,
    (v2) => {
      i(), r.value && v2.size && (s = new MutationObserver(t), v2.forEach((p) => s.observe(p, l)));
    },
    { immediate: true, flush: "post" }
  ), c = () => s == null ? void 0 : s.takeRecords(), f = () => {
    i(), d();
  };
  return bt(f), {
    isSupported: r,
    stop: f,
    takeRecords: c
  };
}
function wi(a2 = {}) {
  var t;
  const {
    window: e = Rt,
    deep: n = true,
    triggerOnRemoval: l = false
  } = a2, s = (t = a2.document) != null ? t : e == null ? void 0 : e.document, r = () => {
    var d;
    let c = s == null ? void 0 : s.activeElement;
    if (n)
      for (; c != null && c.shadowRoot; )
        c = (d = c == null ? void 0 : c.shadowRoot) == null ? void 0 : d.activeElement;
    return c;
  }, i = ref(), u = () => {
    i.value = r();
  };
  return e && (He(e, "blur", (d) => {
    d.relatedTarget === null && u();
  }, true), He(e, "focus", u, true)), l && Al(s, (d) => {
    d.filter((c) => c.removedNodes.length).map((c) => Array.from(c.removedNodes)).flat().forEach((c) => {
      c === i.value && u();
    });
  }, {
    childList: true,
    subtree: true
  }), u(), i;
}
function Ol(a2, t = {}) {
  const {
    immediate: e = true,
    fpsLimit: n = void 0,
    window: l = Rt
  } = t, s = ref(false), r = n ? 1e3 / n : null;
  let i = 0, u = null;
  function d(v2) {
    if (!s.value || !l)
      return;
    i || (i = v2);
    const p = v2 - i;
    if (r && p < r) {
      u = l.requestAnimationFrame(d);
      return;
    }
    i = v2, a2({ delta: p, timestamp: v2 }), u = l.requestAnimationFrame(d);
  }
  function c() {
    !s.value && l && (s.value = true, i = 0, u = l.requestAnimationFrame(d));
  }
  function f() {
    s.value = false, u != null && l && (l.cancelAnimationFrame(u), u = null);
  }
  return e && c(), bt(f), {
    isActive: readonly(s),
    pause: f,
    resume: c
  };
}
function _i(a2) {
  return JSON.parse(JSON.stringify(a2));
}
function xi(a2) {
  const t = getCurrentInstance(), e = oi(
    () => null,
    () => t.proxy.$el
  );
  return onUpdated(e.trigger), onMounted(e.trigger), e;
}
function tt(a2, t, e = {}) {
  const { window: n = Rt, ...l } = e;
  let s;
  const r = Rl(() => n && "ResizeObserver" in n), i = () => {
    s && (s.disconnect(), s = void 0);
  }, u = computed(() => Array.isArray(a2) ? a2.map((f) => $e(f)) : [$e(a2)]), d = watch(
    u,
    (f) => {
      if (i(), r.value && n) {
        s = new ResizeObserver(t);
        for (const v2 of f)
          v2 && s.observe(v2, l);
      }
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    i(), d();
  };
  return bt(c), {
    isSupported: r,
    stop: c
  };
}
function Si(a2, t = {}) {
  const e = wi(t), n = computed(() => $e(a2));
  return { focused: computed(() => n.value && e.value ? n.value.contains(e.value) : false) };
}
function kl(a2 = xi()) {
  const t = shallowRef(), e = () => {
    const n = $e(a2);
    n && (t.value = n.parentElement);
  };
  return yi(e), watch(() => je(a2), e), t;
}
function ne(a2, t, e, n = {}) {
  var l, s, r;
  const {
    clone: i = false,
    passive: u = false,
    eventName: d,
    deep: c = false,
    defaultValue: f,
    shouldEmit: v2
  } = n, p = getCurrentInstance(), g = e || (p == null ? void 0 : p.emit) || ((l = p == null ? void 0 : p.$emit) == null ? void 0 : l.bind(p)) || ((r = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : r.bind(p == null ? void 0 : p.proxy));
  let m2 = d;
  t || (t = "modelValue"), m2 = m2 || `update:${t.toString()}`;
  const _ = (h2) => i ? typeof i == "function" ? i(h2) : _i(h2) : h2, C = () => ri(a2[t]) ? _(a2[t]) : f, $2 = (h2) => {
    v2 ? v2(h2) && g(m2, h2) : g(m2, h2);
  };
  if (u) {
    const h2 = C(), E = ref(h2);
    let P2 = false;
    return watch(
      () => a2[t],
      (D) => {
        P2 || (P2 = true, E.value = _(D), nextTick(() => P2 = false));
      }
    ), watch(
      E,
      (D) => {
        !P2 && (D !== a2[t] || c) && $2(D);
      },
      { deep: c }
    ), E;
  } else
    return computed({
      get() {
        return C();
      },
      set(h2) {
        $2(h2);
      }
    });
}
function qa(a2) {
  return a2 ? a2.flatMap((t) => t.type === Fragment ? qa(t.children) : [t]) : [];
}
function me() {
  let a2 = document.activeElement;
  if (a2 == null)
    return null;
  for (; a2 != null && a2.shadowRoot != null && a2.shadowRoot.activeElement != null; )
    a2 = a2.shadowRoot.activeElement;
  return a2;
}
var Ei = ["INPUT", "TEXTAREA"];
function At(a2, t, e, n = {}) {
  if (!t || n.enableIgnoredElement && Ei.includes(t.nodeName))
    return null;
  const {
    arrowKeyOptions: l = "both",
    attributeName: s = "[data-radix-vue-collection-item]",
    itemsArray: r = [],
    loop: i = true,
    dir: u = "ltr",
    preventScroll: d = true,
    focus: c = false
  } = n, [f, v2, p, g, m2, _] = [
    a2.key === "ArrowRight",
    a2.key === "ArrowLeft",
    a2.key === "ArrowUp",
    a2.key === "ArrowDown",
    a2.key === "Home",
    a2.key === "End"
  ], C = p || g, $2 = f || v2;
  if (!m2 && !_ && (!C && !$2 || l === "vertical" && $2 || l === "horizontal" && C))
    return null;
  const h2 = e ? Array.from(e.querySelectorAll(s)) : r;
  if (!h2.length)
    return null;
  d && a2.preventDefault();
  let E = null;
  return $2 || C ? E = Ml(h2, t, {
    goForward: C ? g : u === "ltr" ? f : v2,
    loop: i
  }) : m2 ? E = h2.at(0) || null : _ && (E = h2.at(-1) || null), c && (E == null || E.focus()), E;
}
function Ml(a2, t, e, n = a2.length) {
  if (--n === 0)
    return null;
  const l = a2.indexOf(t), s = e.goForward ? l + 1 : l - 1;
  if (!e.loop && (s < 0 || s >= a2.length))
    return null;
  const r = (s + a2.length) % a2.length, i = a2[r];
  return i ? i.hasAttribute("disabled") && i.getAttribute("disabled") !== "false" ? Ml(
    a2,
    i,
    e,
    n
  ) : i : null;
}
function Cn(a2) {
  if (a2 === null || typeof a2 != "object")
    return false;
  const t = Object.getPrototypeOf(a2);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in a2 ? false : Symbol.toStringTag in a2 ? Object.prototype.toString.call(a2) === "[object Module]" : true;
}
function $n(a2, t, e = ".", n) {
  if (!Cn(t))
    return $n(a2, {}, e, n);
  const l = Object.assign({}, t);
  for (const s in a2) {
    if (s === "__proto__" || s === "constructor")
      continue;
    const r = a2[s];
    r != null && (n && n(l, s, r, e) || (Array.isArray(r) && Array.isArray(l[s]) ? l[s] = [...r, ...l[s]] : Cn(r) && Cn(l[s]) ? l[s] = $n(
      r,
      l[s],
      (e ? `${e}.` : "") + s.toString(),
      n
    ) : l[s] = r));
  }
  return l;
}
function Pi(a2) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((e, n) => $n(e, n, "", a2), {})
  );
}
var Di = Pi();
var [Ya, $i] = te("ConfigProvider");
var xv = defineComponent({
  inheritAttrs: false,
  __name: "ConfigProvider",
  props: {
    dir: { default: "ltr" },
    scrollBody: { type: [Boolean, Object], default: true },
    nonce: { default: void 0 },
    useId: { type: Function, default: void 0 }
  },
  setup(a2) {
    const t = a2, { dir: e, scrollBody: n, nonce: l } = toRefs(t);
    return $i({
      dir: e,
      scrollBody: n,
      nonce: l,
      useId: t.useId
    }), (s, r) => renderSlot(s.$slots, "default");
  }
});
var Bi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var Ii = (a2 = 21) => {
  let t = "", e = a2;
  for (; e--; )
    t += Bi[Math.random() * 64 | 0];
  return t;
};
var Ti = Dl(() => {
  const a2 = ref(/* @__PURE__ */ new Map()), t = ref(), e = computed(() => {
    for (const r of a2.value.values())
      if (r)
        return true;
    return false;
  }), n = Ya({
    scrollBody: ref(true)
  });
  let l = null;
  const s = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", jo && (l == null || l()), t.value = void 0;
  };
  return watch(e, (r, i) => {
    var f;
    if (!Je)
      return;
    if (!r) {
      i && s();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const u = window.innerWidth - document.documentElement.clientWidth, d = { padding: u, margin: 0 }, c = (f = n.scrollBody) != null && f.value ? typeof n.scrollBody.value == "object" ? Di({
      padding: n.scrollBody.value.padding === true ? u : n.scrollBody.value.padding,
      margin: n.scrollBody.value.margin === true ? u : n.scrollBody.value.margin
    }, d) : d : { padding: 0, margin: 0 };
    u > 0 && (document.body.style.paddingRight = typeof c.padding == "number" ? `${c.padding}px` : String(c.padding), document.body.style.marginRight = typeof c.margin == "number" ? `${c.margin}px` : String(c.margin), document.body.style.setProperty("--scrollbar-width", `${u}px`), document.body.style.overflow = "hidden"), jo && (l = He(
      document,
      "touchmove",
      (v2) => Ri(v2),
      { passive: false }
    )), nextTick(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: true, flush: "sync" }), a2;
});
function ya(a2) {
  const t = Ii(6), e = Ti();
  e.value.set(t, a2 ?? false);
  const n = computed({
    get: () => e.value.get(t) ?? false,
    set: (l) => e.value.set(t, l)
  });
  return hi(() => {
    e.value.delete(t);
  }), n;
}
function Vl(a2) {
  const t = window.getComputedStyle(a2);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && a2.clientWidth < a2.scrollWidth || t.overflowY === "auto" && a2.clientHeight < a2.scrollHeight)
    return true;
  {
    const e = a2.parentNode;
    return !(e instanceof Element) || e.tagName === "BODY" ? false : Vl(e);
  }
}
function Ri(a2) {
  const t = a2 || window.event, e = t.target;
  return e instanceof Element && Vl(e) ? false : t.touches.length > 1 ? true : (t.preventDefault && t.cancelable && t.preventDefault(), false);
}
var Ai = "data-radix-vue-collection-item";
function Fe(a2, t = Ai) {
  const e = a2 ?? Symbol();
  return { createCollection: (s) => {
    const r = ref([]);
    function i() {
      const u = $e(s);
      return u ? r.value = Array.from(
        u.querySelectorAll(`[${t}]:not([data-disabled])`)
      ) : r.value = [];
    }
    return onBeforeUpdate(() => {
      r.value = [];
    }), onMounted(i), onUpdated(i), watch(() => s == null ? void 0 : s.value, i, { immediate: true }), provide(e, r), r;
  }, injectCollection: () => inject(e, ref([])) };
}
function qn(a2) {
  const t = ref(a2);
  function e() {
    return t.value;
  }
  function n(m2) {
    t.value = m2;
  }
  function l(m2, _) {
    return new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, _).format(m2);
  }
  function s(m2, _ = true) {
    return z(m2) && _ ? l($(m2), {
      dateStyle: "long",
      timeStyle: "long"
    }) : l($(m2), {
      dateStyle: "long"
    });
  }
  function r(m2, _ = {}) {
    return new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, { month: "long", year: "numeric", ..._ }).format(m2);
  }
  function i(m2, _ = {}) {
    return new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, { month: "long", ..._ }).format(m2);
  }
  function u() {
    const m2 = $14e0f24ef4ac5c92$export$d0bdf45af03a6ea3($14e0f24ef4ac5c92$export$aa8b41735afcabd2());
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((C) => ({ label: i($(m2.set({ month: C }))), value: C }));
  }
  function d(m2, _ = {}) {
    return new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, { year: "numeric", ..._ }).format(m2);
  }
  function c(m2, _) {
    return m(m2) ? new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, {
      ..._,
      timeZone: m2.timeZone
    }).formatToParts($(m2)) : new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, _).formatToParts($(m2));
  }
  function f(m2, _ = "narrow") {
    return new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, { weekday: _ }).format(m2);
  }
  function v2(m2) {
    var $2;
    return (($2 = new $fb18d541ea1ad717$export$ad991b66133851cf(t.value, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(m2).find((h2) => h2.type === "dayPeriod")) == null ? void 0 : $2.value) === "PM" ? "PM" : "AM";
  }
  const p = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function g(m2, _, C = {}) {
    const $2 = { ...p, ...C }, E = c(m2, $2).find((P2) => P2.type === _);
    return E ? E.value : "";
  }
  return {
    setLocale: n,
    getLocale: e,
    fullMonth: i,
    fullYear: d,
    fullMonthAndYear: r,
    toParts: c,
    custom: l,
    part: g,
    dayPeriod: v2,
    selectedDate: s,
    dayOfWeek: f,
    getMonths: u
  };
}
function we(a2) {
  const t = Ya({
    dir: ref("ltr")
  });
  return computed(() => {
    var e;
    return (a2 == null ? void 0 : a2.value) || ((e = t.dir) == null ? void 0 : e.value) || "ltr";
  });
}
function Te(a2) {
  const t = getCurrentInstance(), e = t == null ? void 0 : t.type.emits, n = {};
  return e != null && e.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), e == null || e.forEach((l) => {
    n[toHandlerKey(camelize(l))] = (...s) => a2(l, ...s);
  }), n;
}
var wn = 0;
function Yn() {
  watchEffect((a2) => {
    if (!Je)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? Go()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? Go()
    ), wn++, a2(() => {
      wn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), wn--;
    });
  });
}
function Go() {
  const a2 = document.createElement("span");
  return a2.setAttribute("data-radix-focus-guard", ""), a2.tabIndex = 0, a2.style.outline = "none", a2.style.opacity = "0", a2.style.position = "fixed", a2.style.pointerEvents = "none", a2;
}
function at(a2) {
  return computed(() => {
    var t;
    return je(a2) ? !!((t = $e(a2)) != null && t.closest("form")) : true;
  });
}
function Ot(a2) {
  const t = getCurrentInstance(), e = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((l, s) => {
    const r = (t == null ? void 0 : t.type.props[s]).default;
    return r !== void 0 && (l[s] = r), l;
  }, {}), n = toRef(a2);
  return computed(() => {
    const l = {}, s = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(s).forEach((r) => {
      l[camelize(r)] = s[r];
    }), Object.keys({ ...e, ...l }).reduce((r, i) => (n.value[i] !== void 0 && (r[i] = n.value[i]), r), {});
  });
}
function Se(a2, t) {
  const e = Ot(a2), n = t ? Te(t) : {};
  return computed(() => ({
    ...e.value,
    ...n
  }));
}
function R2() {
  const a2 = getCurrentInstance(), t = ref(), e = computed(() => {
    var r, i;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : $e(t);
  }), n = Object.assign({}, a2.exposed), l = {};
  for (const r in a2.props)
    Object.defineProperty(l, r, {
      enumerable: true,
      configurable: true,
      get: () => a2.props[r]
    });
  if (Object.keys(n).length > 0)
    for (const r in n)
      Object.defineProperty(l, r, {
        enumerable: true,
        configurable: true,
        get: () => n[r]
      });
  Object.defineProperty(l, "$el", {
    enumerable: true,
    configurable: true,
    get: () => a2.vnode.el
  }), a2.exposed = l;
  function s(r) {
    t.value = r, r && (Object.defineProperty(l, "$el", {
      enumerable: true,
      configurable: true,
      get: () => r instanceof Element ? r : r.$el
    }), a2.exposed = l);
  }
  return { forwardRef: s, currentRef: t, currentElement: e };
}
function Fl(a2, t) {
  const e = Tt(false, 300), n = ref(null), l = ua();
  function s() {
    n.value = null, e.value = false;
  }
  function r(i, u) {
    const d = i.currentTarget, c = { x: i.clientX, y: i.clientY }, f = Oi(c, d.getBoundingClientRect()), v2 = ki(c, f), p = Mi(u.getBoundingClientRect()), g = Fi([...v2, ...p]);
    n.value = g, e.value = true;
  }
  return watchEffect((i) => {
    if (a2.value && t.value) {
      const u = (c) => r(c, t.value), d = (c) => r(c, a2.value);
      a2.value.addEventListener("pointerleave", u), t.value.addEventListener("pointerleave", d), i(() => {
        var c, f;
        (c = a2.value) == null || c.removeEventListener("pointerleave", u), (f = t.value) == null || f.removeEventListener("pointerleave", d);
      });
    }
  }), watchEffect((i) => {
    var u;
    if (n.value) {
      const d = (c) => {
        var _, C;
        if (!n.value)
          return;
        const f = c.target, v2 = { x: c.clientX, y: c.clientY }, p = ((_ = a2.value) == null ? void 0 : _.contains(f)) || ((C = t.value) == null ? void 0 : C.contains(f)), g = !Vi(v2, n.value), m2 = !!f.closest("[data-grace-area-trigger]");
        p ? s() : (g || m2) && (s(), l.trigger());
      };
      (u = a2.value) == null || u.ownerDocument.addEventListener("pointermove", d), i(() => {
        var c;
        return (c = a2.value) == null ? void 0 : c.ownerDocument.removeEventListener("pointermove", d);
      });
    }
  }), {
    isPointerInTransit: e,
    onPointerExit: l.on
  };
}
function Oi(a2, t) {
  const e = Math.abs(t.top - a2.y), n = Math.abs(t.bottom - a2.y), l = Math.abs(t.right - a2.x), s = Math.abs(t.left - a2.x);
  switch (Math.min(e, n, l, s)) {
    case s:
      return "left";
    case l:
      return "right";
    case e:
      return "top";
    case n:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function ki(a2, t, e = 5) {
  const n = [];
  switch (t) {
    case "top":
      n.push(
        { x: a2.x - e, y: a2.y + e },
        { x: a2.x + e, y: a2.y + e }
      );
      break;
    case "bottom":
      n.push(
        { x: a2.x - e, y: a2.y - e },
        { x: a2.x + e, y: a2.y - e }
      );
      break;
    case "left":
      n.push(
        { x: a2.x + e, y: a2.y - e },
        { x: a2.x + e, y: a2.y + e }
      );
      break;
    case "right":
      n.push(
        { x: a2.x - e, y: a2.y - e },
        { x: a2.x - e, y: a2.y + e }
      );
      break;
  }
  return n;
}
function Mi(a2) {
  const { top: t, right: e, bottom: n, left: l } = a2;
  return [
    { x: l, y: t },
    { x: e, y: t },
    { x: e, y: n },
    { x: l, y: n }
  ];
}
function Vi(a2, t) {
  const { x: e, y: n } = a2;
  let l = false;
  for (let s = 0, r = t.length - 1; s < t.length; r = s++) {
    const i = t[s].x, u = t[s].y, d = t[r].x, c = t[r].y;
    u > n != c > n && e < (d - i) * (n - u) / (c - u) + i && (l = !l);
  }
  return l;
}
function Fi(a2) {
  const t = a2.slice();
  return t.sort((e, n) => e.x < n.x ? -1 : e.x > n.x ? 1 : e.y < n.y ? -1 : e.y > n.y ? 1 : 0), Ni(t);
}
function Ni(a2) {
  if (a2.length <= 1)
    return a2.slice();
  const t = [];
  for (let n = 0; n < a2.length; n++) {
    const l = a2[n];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], r = t[t.length - 2];
      if ((s.x - r.x) * (l.y - r.y) >= (s.y - r.y) * (l.x - r.x))
        t.pop();
      else break;
    }
    t.push(l);
  }
  t.pop();
  const e = [];
  for (let n = a2.length - 1; n >= 0; n--) {
    const l = a2[n];
    for (; e.length >= 2; ) {
      const s = e[e.length - 1], r = e[e.length - 2];
      if ((s.x - r.x) * (l.y - r.y) >= (s.y - r.y) * (l.x - r.x))
        e.pop();
      else break;
    }
    e.push(l);
  }
  return e.pop(), t.length === 1 && e.length === 1 && t[0].x === e[0].x && t[0].y === e[0].y ? t : t.concat(e);
}
var Li = function(a2) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(a2) ? a2[0] : a2;
  return t.ownerDocument.body;
};
var Kt = /* @__PURE__ */ new WeakMap();
var $a = /* @__PURE__ */ new WeakMap();
var Ba = {};
var _n = 0;
var Nl = function(a2) {
  return a2 && (a2.host || Nl(a2.parentNode));
};
var zi = function(a2, t) {
  return t.map(function(e) {
    if (a2.contains(e))
      return e;
    var n = Nl(e);
    return n && a2.contains(n) ? n : (console.error("aria-hidden", e, "in not contained inside", a2, ". Doing nothing"), null);
  }).filter(function(e) {
    return !!e;
  });
};
var Ki = function(a2, t, e, n) {
  var l = zi(t, Array.isArray(a2) ? a2 : [a2]);
  Ba[e] || (Ba[e] = /* @__PURE__ */ new WeakMap());
  var s = Ba[e], r = [], i = /* @__PURE__ */ new Set(), u = new Set(l), d = function(f) {
    !f || i.has(f) || (i.add(f), d(f.parentNode));
  };
  l.forEach(d);
  var c = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(v2) {
      if (i.has(v2))
        c(v2);
      else
        try {
          var p = v2.getAttribute(n), g = p !== null && p !== "false", m2 = (Kt.get(v2) || 0) + 1, _ = (s.get(v2) || 0) + 1;
          Kt.set(v2, m2), s.set(v2, _), r.push(v2), m2 === 1 && g && $a.set(v2, true), _ === 1 && v2.setAttribute(e, "true"), g || v2.setAttribute(n, "true");
        } catch (C) {
          console.error("aria-hidden: cannot operate on ", v2, C);
        }
    });
  };
  return c(t), i.clear(), _n++, function() {
    r.forEach(function(f) {
      var v2 = Kt.get(f) - 1, p = s.get(f) - 1;
      Kt.set(f, v2), s.set(f, p), v2 || ($a.has(f) || f.removeAttribute(n), $a.delete(f)), p || f.removeAttribute(e);
    }), _n--, _n || (Kt = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ new WeakMap(), $a = /* @__PURE__ */ new WeakMap(), Ba = {});
  };
};
var Hi = function(a2, t, e) {
  e === void 0 && (e = "data-aria-hidden");
  var n = Array.from(Array.isArray(a2) ? a2 : [a2]), l = Li(a2);
  return l ? (n.push.apply(n, Array.from(l.querySelectorAll("[aria-live]"))), Ki(n, l, e, "aria-hidden")) : function() {
    return null;
  };
};
function ga(a2) {
  let t;
  watch(() => $e(a2), (e) => {
    e ? t = Hi(e) : t && t();
  }), onUnmounted(() => {
    t && t();
  });
}
var Wi = 0;
function ge(a2, t = "radix") {
  if (a2)
    return a2;
  const e = Ya({ useId: void 0 });
  return useId ? `${t}-${useId()}` : e.useId ? `${t}-${e.useId()}` : `${t}-${++Wi}`;
}
function ji(a2, t) {
  const e = ref(), n = (s, r) => {
    if (t.multiple && Array.isArray(a2.value))
      if (t.selectionBehavior === "replace")
        a2.value = [s], e.value = s;
      else {
        const i = a2.value.findIndex((u) => r(u));
        i !== -1 ? a2.value.splice(i, 1) : a2.value.push(s);
      }
    else
      t.selectionBehavior === "replace" ? a2.value = { ...s } : !Array.isArray(a2.value) && r(a2.value) ? a2.value = void 0 : a2.value = { ...s };
    return a2.value;
  };
  function l(s, r, i, u) {
    var v2;
    if (!(e != null && e.value) || !t.multiple || !Array.isArray(a2.value))
      return;
    const c = (v2 = i().filter((p) => p.ref.dataset.disabled !== "").find((p) => p.ref === r)) == null ? void 0 : v2.value;
    if (!c)
      return;
    let f = null;
    switch (s) {
      case "prev":
      case "next": {
        f = Bt(u, e.value, c);
        break;
      }
      case "first": {
        f = Bt(u, e.value, u == null ? void 0 : u[0]);
        break;
      }
      case "last": {
        f = Bt(u, e.value, u == null ? void 0 : u[u.length - 1]);
        break;
      }
    }
    a2.value = f;
  }
  return {
    firstValue: e,
    onSelectItem: n,
    handleMultipleReplace: l
  };
}
function Ll(a2) {
  const t = ref(), e = computed(() => {
    var l;
    return ((l = t.value) == null ? void 0 : l.width) ?? 0;
  }), n = computed(() => {
    var l;
    return ((l = t.value) == null ? void 0 : l.height) ?? 0;
  });
  return onMounted(() => {
    const l = $e(a2);
    if (l) {
      t.value = { width: l.offsetWidth, height: l.offsetHeight };
      const s = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let u, d;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, f = Array.isArray(c) ? c[0] : c;
          u = f.inlineSize, d = f.blockSize;
        } else
          u = l.offsetWidth, d = l.offsetHeight;
        t.value = { width: u, height: d };
      });
      return s.observe(l, { box: "border-box" }), () => s.unobserve(l);
    } else
      t.value = void 0;
  }), {
    width: e,
    height: n
  };
}
function zl(a2, t) {
  const e = ref(a2);
  function n(s) {
    return t[e.value][s] ?? e.value;
  }
  return {
    state: e,
    dispatch: (s) => {
      e.value = n(s);
    }
  };
}
var Ui = "data-item-text";
function ba(a2) {
  const t = Tt("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (l, s) => {
      if (!(a2 != null && a2.value) && !s)
        return;
      t.value = t.value + l;
      const r = (a2 == null ? void 0 : a2.value) ?? s, i = me(), u = r.map((p) => {
        var g;
        return {
          ref: p,
          textValue: ((g = (p.querySelector(`[${Ui}]`) ?? p).textContent) == null ? void 0 : g.trim()) ?? ""
        };
      }), d = u.find((p) => p.ref === i), c = u.map((p) => p.textValue), f = Zn(c, t.value, d == null ? void 0 : d.textValue), v2 = u.find((p) => p.textValue === f);
      return v2 && v2.ref.focus(), v2 == null ? void 0 : v2.ref;
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function Xn(a2, t) {
  return a2.map((e, n) => a2[(t + n) % a2.length]);
}
function Zn(a2, t, e) {
  const l = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, s = e ? a2.indexOf(e) : -1;
  let r = Xn(a2, Math.max(s, 0));
  l.length === 1 && (r = r.filter((d) => d !== e));
  const u = r.find(
    (d) => d.toLowerCase().startsWith(l.toLowerCase())
  );
  return u !== e ? u : void 0;
}
function Sv(a2, t) {
  return {
    inheritAttrs: false,
    name: `${a2.__name ?? ""}Wrapper`,
    setup(e, n) {
      return () => {
        const l = typeof (t == null ? void 0 : t.props) == "function" ? t == null ? void 0 : t.props(n.attrs) : t == null ? void 0 : t.props, { forwardRef: s } = R2(), r = mergeProps(l, n.attrs);
        return h(a2, { ...r, ref: s }, n.slots);
      };
    }
  };
}
function nt() {
  return {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    SPACE_CODE: "Space"
  };
}
var Jn = defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(a2, { attrs: t, slots: e }) {
    return () => {
      var u, d;
      if (!e.default)
        return null;
      const n = qa(e.default()), l = n.findIndex((c) => c.type !== Comment);
      if (l === -1)
        return n;
      const s = n[l];
      (u = s.props) == null || delete u.ref;
      const r = s.props ? mergeProps(t, s.props) : t;
      t.class && ((d = s.props) != null && d.class) && delete s.props.class;
      const i = cloneVNode(s, r);
      for (const c in r)
        c.startsWith("on") && (i.props || (i.props = {}), i.props[c] = r[c]);
      return n.length === 1 ? i : (n[l] = i, n);
    };
  }
});
var O = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(a2, { attrs: t, slots: e }) {
    const n = a2.asChild ? "template" : a2.as;
    return typeof n == "string" && ["area", "img", "input"].includes(n) ? () => h(n, t) : n !== "template" ? () => h(a2.as, t, { default: e.default }) : () => h(Jn, t, { default: e.default });
  }
});
function Re() {
  const a2 = ref(), t = computed(() => {
    var e, n;
    return ["#text", "#comment"].includes((e = a2.value) == null ? void 0 : e.$el.nodeName) ? (n = a2.value) == null ? void 0 : n.$el.nextElementSibling : $e(a2);
  });
  return {
    primitiveElement: a2,
    currentElement: t
  };
}
var [Kl, Gi] = te("CollapsibleRoot");
var qi = defineComponent({
  __name: "CollapsibleRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(a2, { expose: t, emit: e }) {
    const n = a2, s = ne(n, "open", e, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), r = ne(n, "disabled");
    return Gi({
      contentId: "",
      disabled: r,
      open: s,
      onOpenToggle: () => {
        s.value = !s.value;
      }
    }), t({ open: s }), R2(), (i, u) => (openBlock(), createBlock(unref(O), {
      as: i.as,
      "as-child": n.asChild,
      "data-state": unref(s) ? "open" : "closed",
      "data-disabled": unref(r) ? "" : void 0
    }, {
      default: withCtx(() => [
        renderSlot(i.$slots, "default", { open: unref(s) })
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state", "data-disabled"]));
  }
});
var Yi = defineComponent({
  __name: "CollapsibleTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = Kl();
    return (n, l) => {
      var s, r;
      return openBlock(), createBlock(unref(O), {
        type: n.as === "button" ? "button" : void 0,
        as: n.as,
        "as-child": t.asChild,
        "aria-controls": unref(e).contentId,
        "aria-expanded": unref(e).open.value,
        "data-state": unref(e).open.value ? "open" : "closed",
        "data-disabled": (s = unref(e).disabled) != null && s.value ? "" : void 0,
        disabled: (r = unref(e).disabled) == null ? void 0 : r.value,
        onClick: unref(e).onOpenToggle
      }, {
        default: withCtx(() => [
          renderSlot(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["type", "as", "as-child", "aria-controls", "aria-expanded", "data-state", "data-disabled", "disabled", "onClick"]);
    };
  }
});
function Xi(a2, t) {
  var _;
  const e = ref({}), n = ref("none"), l = ref(a2), s = a2.value ? "mounted" : "unmounted";
  let r;
  const i = ((_ = t.value) == null ? void 0 : _.ownerDocument.defaultView) ?? Rt, { state: u, dispatch: d } = zl(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  }), c = (C) => {
    var $2;
    if (Je) {
      const h2 = new CustomEvent(C, { bubbles: false, cancelable: false });
      ($2 = t.value) == null || $2.dispatchEvent(h2);
    }
  };
  watch(
    a2,
    async (C, $2) => {
      var E;
      const h2 = $2 !== C;
      if (await nextTick(), h2) {
        const P2 = n.value, D = Ia(t.value);
        C ? (d("MOUNT"), c("enter"), D === "none" && c("after-enter")) : D === "none" || ((E = e.value) == null ? void 0 : E.display) === "none" ? (d("UNMOUNT"), c("leave"), c("after-leave")) : $2 && P2 !== D ? (d("ANIMATION_OUT"), c("leave")) : (d("UNMOUNT"), c("after-leave"));
      }
    },
    { immediate: true }
  );
  const f = (C) => {
    const $2 = Ia(t.value), h2 = $2.includes(
      C.animationName
    ), E = u.value === "mounted" ? "enter" : "leave";
    if (C.target === t.value && h2 && (c(`after-${E}`), d("ANIMATION_END"), !l.value)) {
      const P2 = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", r = i == null ? void 0 : i.setTimeout(() => {
        var D;
        ((D = t.value) == null ? void 0 : D.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = P2);
      });
    }
    C.target === t.value && $2 === "none" && d("ANIMATION_END");
  }, v2 = (C) => {
    C.target === t.value && (n.value = Ia(t.value));
  }, p = watch(
    t,
    (C, $2) => {
      C ? (e.value = getComputedStyle(C), C.addEventListener("animationstart", v2), C.addEventListener("animationcancel", f), C.addEventListener("animationend", f)) : (d("ANIMATION_END"), r !== void 0 && (i == null || i.clearTimeout(r)), $2 == null || $2.removeEventListener("animationstart", v2), $2 == null || $2.removeEventListener("animationcancel", f), $2 == null || $2.removeEventListener("animationend", f));
    },
    { immediate: true }
  ), g = watch(u, () => {
    const C = Ia(t.value);
    n.value = u.value === "mounted" ? C : "none";
  });
  return onUnmounted(() => {
    p(), g();
  }), {
    isPresent: computed(
      () => ["mounted", "unmountSuspended"].includes(u.value)
    )
  };
}
function Ia(a2) {
  return a2 && getComputedStyle(a2).animationName || "none";
}
var Pe = defineComponent({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: true
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(a2, { slots: t, expose: e }) {
    var d;
    const { present: n, forceMount: l } = toRefs(a2), s = ref(), { isPresent: r } = Xi(n, s);
    e({ present: r });
    let i = t.default({ present: r });
    i = qa(i || []);
    const u = getCurrentInstance();
    if (i && (i == null ? void 0 : i.length) > 1) {
      const c = (d = u == null ? void 0 : u.parent) != null && d.type.name ? `<${u.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${c}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((f) => `  - ${f}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => l.value || n.value || r.value ? h(t.default({ present: r })[0], {
      ref: (c) => {
        const f = $e(c);
        return typeof (f == null ? void 0 : f.hasAttribute) > "u" || (f != null && f.hasAttribute("data-radix-popper-content-wrapper") ? s.value = f.firstElementChild : s.value = f), f;
      }
    }) : null;
  }
});
var Zi = defineComponent({
  inheritAttrs: false,
  __name: "CollapsibleContent",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Kl();
    e.contentId || (e.contentId = ge(void 0, "radix-vue-collapsible-content"));
    const n = ref(), { forwardRef: l, currentElement: s } = R2(), r = ref(0), i = ref(0), u = computed(() => e.open.value), d = ref(u.value), c = ref();
    return watch(
      () => {
        var f;
        return [u.value, (f = n.value) == null ? void 0 : f.present];
      },
      async () => {
        await nextTick();
        const f = s.value;
        if (!f)
          return;
        c.value = c.value || {
          transitionDuration: f.style.transitionDuration,
          animationName: f.style.animationName
        }, f.style.transitionDuration = "0s", f.style.animationName = "none";
        const v2 = f.getBoundingClientRect();
        i.value = v2.height, r.value = v2.width, d.value || (f.style.transitionDuration = c.value.transitionDuration, f.style.animationName = c.value.animationName);
      },
      {
        immediate: true
      }
    ), onMounted(() => {
      requestAnimationFrame(() => {
        d.value = false;
      });
    }), (f, v2) => (openBlock(), createBlock(unref(Pe), {
      ref_key: "presentRef",
      ref: n,
      present: f.forceMount || unref(e).open.value,
      "force-mount": true
    }, {
      default: withCtx(() => {
        var p, g;
        return [
          createVNode(unref(O), mergeProps(f.$attrs, {
            id: unref(e).contentId,
            ref: unref(l),
            "as-child": t.asChild,
            as: f.as,
            "data-state": unref(e).open.value ? "open" : "closed",
            "data-disabled": (p = unref(e).disabled) != null && p.value ? "" : void 0,
            hidden: !((g = n.value) != null && g.present),
            style: {
              "--radix-collapsible-content-height": `${i.value}px`,
              "--radix-collapsible-content-width": `${r.value}px`
            }
          }), {
            default: withCtx(() => {
              var m2;
              return [
                (m2 = n.value) != null && m2.present ? renderSlot(f.$slots, "default", { key: 0 }) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 16, ["id", "as-child", "as", "data-state", "data-disabled", "hidden", "style"])
        ];
      }),
      _: 3
    }, 8, ["present"]));
  }
});
function Hl({ type: a2, defaultValue: t, modelValue: e }) {
  const n = e || t;
  if (ht(a2) && ht(e) && ht(t))
    throw new Error("Either the `type` or the `value` or `default-value` prop must be defined.");
  if (e !== void 0 && t !== void 0 && typeof e != typeof t)
    throw new Error(
      `Invalid prop \`value\` of value \`${e}\` supplied, should be the same type as the \`defaultValue\` prop, which is \`${t}\`. The \`value\` prop must be:
  ${a2 === "single" ? "- a string" : a2 === "multiple" ? "- an array of strings" : `- a string
- an array of strings`}
  - \`undefined\``
    );
  const l = e !== void 0 || t !== void 0;
  if (a2 && l) {
    const s = Array.isArray(e) || Array.isArray(t), r = e !== void 0 ? "modelValue" : "defaultValue", i = r === "modelValue" ? typeof e : typeof t;
    if (a2 === "single" && s)
      return console.error(`Invalid prop \`${r}\` of type ${i} supplied with type \`single\`. The \`modelValue\` prop must be a string or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${r} prop.`), "multiple";
    if (a2 === "multiple" && !s)
      return console.error(`Invalid prop \`${r}\` of type ${i} supplied with type \`multiple\`. The \`modelValue\` prop must be an array of strings or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${r} prop.`), "single";
  }
  return l ? Array.isArray(n) ? "multiple" : "single" : a2;
}
function Ji({ type: a2, defaultValue: t, modelValue: e }) {
  return a2 || Hl({ type: a2, defaultValue: t, modelValue: e });
}
function Qi({ type: a2, defaultValue: t }) {
  return t !== void 0 ? t : a2 === "single" ? void 0 : [];
}
function Wl(a2, t) {
  const e = ref(Ji(a2)), n = ne(a2, "modelValue", t, {
    defaultValue: Qi(a2),
    passive: a2.modelValue === void 0,
    deep: true
  });
  watch(
    () => [a2.type, a2.modelValue, a2.defaultValue],
    () => {
      const r = Hl(a2);
      e.value !== r && (e.value = r);
    },
    { immediate: true }
  );
  function l(r) {
    if (e.value === "single")
      n.value = r === n.value ? void 0 : r;
    else {
      const i = [...n.value || []];
      if (i.includes(r)) {
        const u = i.findIndex((d) => d === r);
        i.splice(u, 1);
      } else
        i.push(r);
      n.value = i;
    }
  }
  const s = computed(() => e.value === "single");
  return {
    modelValue: n,
    type: e,
    changeModelValue: l,
    isSingle: s
  };
}
var [Xa, eu] = te("AccordionRoot");
var Ev = defineComponent({
  __name: "AccordionRoot",
  props: {
    collapsible: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dir: {},
    orientation: { default: "vertical" },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { dir: l, disabled: s } = toRefs(e), r = we(l), { modelValue: i, changeModelValue: u, isSingle: d } = Wl(e, n), { forwardRef: c, currentElement: f } = R2();
    return eu({
      disabled: s,
      direction: r,
      orientation: e.orientation,
      parentElement: f,
      isSingle: d,
      collapsible: e.collapsible,
      modelValue: i,
      changeModelValue: u
    }), (v2, p) => (openBlock(), createBlock(unref(O), {
      ref: unref(c),
      "as-child": v2.asChild,
      as: v2.as
    }, {
      default: withCtx(() => [
        renderSlot(v2.$slots, "default", { modelValue: unref(i) })
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
var [Qn, tu] = te("AccordionItem");
var Pv = defineComponent({
  __name: "AccordionItem",
  props: {
    disabled: { type: Boolean },
    value: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2, { expose: t }) {
    const e = a2, n = Xa(), l = computed(
      () => n.isSingle.value ? e.value === n.modelValue.value : Array.isArray(n.modelValue.value) && n.modelValue.value.includes(e.value)
    ), s = computed(() => n.disabled.value || e.disabled), r = computed(() => s.value ? "" : void 0), i = computed(
      () => l.value ? "open" : "closed"
      /* Closed */
    );
    t({ open: l, dataDisabled: r });
    const { currentRef: u, currentElement: d } = R2();
    tu({
      open: l,
      dataState: i,
      disabled: s,
      dataDisabled: r,
      triggerId: "",
      currentRef: u,
      currentElement: d,
      value: computed(() => e.value)
    });
    function c(f) {
      var m2;
      const v2 = f.target;
      if (Array.from(((m2 = n.parentElement.value) == null ? void 0 : m2.querySelectorAll("[data-radix-vue-collection-item]")) ?? []).findIndex((_) => _ === v2) === -1)
        return null;
      At(
        f,
        d.value,
        n.parentElement.value,
        {
          arrowKeyOptions: n.orientation,
          dir: n.direction.value,
          focus: true
        }
      );
    }
    return (f, v2) => (openBlock(), createBlock(unref(qi), {
      "data-orientation": unref(n).orientation,
      "data-disabled": r.value,
      "data-state": i.value,
      disabled: s.value,
      open: l.value,
      as: e.as,
      "as-child": e.asChild,
      onKeydown: withKeys(c, ["up", "down", "left", "right", "home", "end"])
    }, {
      default: withCtx(() => [
        renderSlot(f.$slots, "default", { open: l.value })
      ]),
      _: 3
    }, 8, ["data-orientation", "data-disabled", "data-state", "disabled", "open", "as", "as-child"]));
  }
});
var Dv = defineComponent({
  __name: "AccordionContent",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Xa(), n = Qn();
    return R2(), (l, s) => (openBlock(), createBlock(unref(Zi), {
      role: "region",
      hidden: !unref(n).open.value,
      "as-child": t.asChild,
      "force-mount": t.forceMount,
      "aria-labelledby": unref(n).triggerId,
      "data-state": unref(n).dataState.value,
      "data-disabled": unref(n).dataDisabled.value,
      "data-orientation": unref(e).orientation,
      style: { "--radix-accordion-content-width": "var(--radix-collapsible-content-width)", "--radix-accordion-content-height": "var(--radix-collapsible-content-height)" }
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["hidden", "as-child", "force-mount", "aria-labelledby", "data-state", "data-disabled", "data-orientation"]));
  }
});
var $v = defineComponent({
  __name: "AccordionHeader",
  props: {
    asChild: { type: Boolean },
    as: { default: "h3" }
  },
  setup(a2) {
    const t = a2, e = Xa(), n = Qn();
    return R2(), (l, s) => (openBlock(), createBlock(unref(O), {
      as: t.as,
      "as-child": t.asChild,
      "data-orientation": unref(e).orientation,
      "data-state": unref(n).dataState.value,
      "data-disabled": unref(n).dataDisabled.value
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-orientation", "data-state", "data-disabled"]));
  }
});
var Bv = defineComponent({
  __name: "AccordionTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Xa(), n = Qn();
    n.triggerId || (n.triggerId = ge(void 0, "radix-vue-accordion-trigger"));
    function l() {
      const s = e.isSingle.value && n.open.value && !e.collapsible;
      n.disabled.value || s || e.changeModelValue(n.value.value);
    }
    return (s, r) => (openBlock(), createBlock(unref(Yi), {
      id: unref(n).triggerId,
      ref: unref(n).currentRef,
      "data-radix-vue-collection-item": "",
      as: t.as,
      "as-child": t.asChild,
      "aria-disabled": unref(n).disabled.value || void 0,
      "aria-expanded": unref(n).open.value || false,
      "data-disabled": unref(n).dataDisabled.value,
      "data-orientation": unref(e).orientation,
      "data-state": unref(n).dataState.value,
      disabled: unref(n).disabled.value,
      onClick: l
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "as", "as-child", "aria-disabled", "aria-expanded", "data-disabled", "data-orientation", "data-state", "disabled"]));
  }
});
var [ot, au] = te("DialogRoot");
var nu = defineComponent({
  inheritAttrs: false,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: false },
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "open", t, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    }), s = ref(), r = ref(), { modal: i } = toRefs(e);
    return au({
      open: l,
      modal: i,
      openModal: () => {
        l.value = true;
      },
      onOpenChange: (u) => {
        l.value = u;
      },
      onOpenToggle: () => {
        l.value = !l.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: s,
      contentElement: r
    }), (u, d) => renderSlot(u.$slots, "default", { open: unref(l) });
  }
});
var ou = defineComponent({
  __name: "DialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = ot(), { forwardRef: n, currentElement: l } = R2();
    return e.contentId || (e.contentId = ge(void 0, "radix-vue-dialog-content")), onMounted(() => {
      e.triggerElement.value = l.value;
    }), (s, r) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      ref: unref(n),
      type: s.as === "button" ? "button" : void 0,
      "aria-haspopup": "dialog",
      "aria-expanded": unref(e).open.value || false,
      "aria-controls": unref(e).open.value ? unref(e).contentId : void 0,
      "data-state": unref(e).open.value ? "open" : "closed",
      onClick: unref(e).onOpenToggle
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "aria-expanded", "aria-controls", "data-state", "onClick"]));
  }
});
var rt2 = defineComponent({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = Ga();
    return (e, n) => unref(t) || e.forceMount ? (openBlock(), createBlock(Teleport, {
      key: 0,
      to: e.to,
      disabled: e.disabled
    }, [
      renderSlot(e.$slots, "default")
    ], 8, ["to", "disabled"])) : createCommentVNode("", true);
  }
});
var Iv = defineComponent({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var lu = "dismissableLayer.pointerDownOutside";
var su = "dismissableLayer.focusOutside";
function jl(a2, t) {
  const e = t.closest(
    "[data-dismissable-layer]"
  ), n = a2.dataset.dismissableLayer === "" ? a2 : a2.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    a2.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(e && n === e || l.indexOf(n) < l.indexOf(e));
}
function Ul(a2, t) {
  var s;
  const e = ((s = t == null ? void 0 : t.value) == null ? void 0 : s.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), n = ref(false), l = ref(() => {
  });
  return watchEffect((r) => {
    if (!Je)
      return;
    const i = async (d) => {
      const c = d.target;
      if (t != null && t.value) {
        if (jl(t.value, c)) {
          n.value = false;
          return;
        }
        if (d.target && !n.value) {
          let f = function() {
            jt(
              lu,
              a2,
              v2
            );
          };
          const v2 = { originalEvent: d };
          d.pointerType === "touch" ? (e.removeEventListener("click", l.value), l.value = f, e.addEventListener("click", l.value, {
            once: true
          })) : f();
        } else
          e.removeEventListener("click", l.value);
        n.value = false;
      }
    }, u = window.setTimeout(() => {
      e.addEventListener("pointerdown", i);
    }, 0);
    r(() => {
      window.clearTimeout(u), e.removeEventListener("pointerdown", i), e.removeEventListener("click", l.value);
    });
  }), {
    onPointerDownCapture: () => n.value = true
  };
}
function Gl(a2, t) {
  var l;
  const e = ((l = t == null ? void 0 : t.value) == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), n = ref(false);
  return watchEffect((s) => {
    if (!Je)
      return;
    const r = async (i) => {
      t != null && t.value && (await nextTick(), !(!t.value || jl(t.value, i.target)) && i.target && !n.value && jt(
        su,
        a2,
        { originalEvent: i }
      ));
    };
    e.addEventListener("focusin", r), s(() => e.removeEventListener("focusin", r));
  }), {
    onFocusCapture: () => n.value = true,
    onBlurCapture: () => n.value = false
  };
}
var Ge = reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var Ct = defineComponent({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l, currentElement: s } = R2(), r = computed(
      () => {
        var g;
        return ((g = s.value) == null ? void 0 : g.ownerDocument) ?? globalThis.document;
      }
    ), i = computed(() => Ge.layersRoot), u = computed(() => s.value ? Array.from(i.value).indexOf(s.value) : -1), d = computed(() => Ge.layersWithOutsidePointerEventsDisabled.size > 0), c = computed(() => {
      const g = Array.from(i.value), [m2] = [...Ge.layersWithOutsidePointerEventsDisabled].slice(-1), _ = g.indexOf(m2);
      return u.value >= _;
    }), f = Ul(async (g) => {
      const m2 = [...Ge.branches].some(
        (_) => _ == null ? void 0 : _.contains(g.target)
      );
      !c.value || m2 || (n("pointerDownOutside", g), n("interactOutside", g), await nextTick(), g.defaultPrevented || n("dismiss"));
    }, s), v2 = Gl((g) => {
      [...Ge.branches].some(
        (_) => _ == null ? void 0 : _.contains(g.target)
      ) || (n("focusOutside", g), n("interactOutside", g), g.defaultPrevented || n("dismiss"));
    }, s);
    Gn("Escape", (g) => {
      u.value === i.value.size - 1 && (n("escapeKeyDown", g), g.defaultPrevented || n("dismiss"));
    });
    let p;
    return watchEffect((g) => {
      s.value && (e.disableOutsidePointerEvents && (Ge.layersWithOutsidePointerEventsDisabled.size === 0 && (p = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), Ge.layersWithOutsidePointerEventsDisabled.add(s.value)), i.value.add(s.value), g(() => {
        e.disableOutsidePointerEvents && Ge.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = p);
      }));
    }), watchEffect((g) => {
      g(() => {
        s.value && (i.value.delete(s.value), Ge.layersWithOutsidePointerEventsDisabled.delete(s.value));
      });
    }), (g, m2) => (openBlock(), createBlock(unref(O), {
      ref: unref(l),
      "as-child": g.asChild,
      as: g.as,
      "data-dismissable-layer": "",
      style: normalizeStyle({
        pointerEvents: d.value ? c.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: unref(v2).onFocusCapture,
      onBlurCapture: unref(v2).onBlurCapture,
      onPointerdownCapture: unref(f).onPointerDownCapture
    }, {
      default: withCtx(() => [
        renderSlot(g.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
});
var ru = defineComponent({
  __name: "DismissableLayerBranch",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e, currentElement: n } = R2();
    return onMounted(() => {
      Ge.branches.add(n.value);
    }), onUnmounted(() => {
      Ge.branches.delete(n.value);
    }), (l, s) => (openBlock(), createBlock(unref(O), mergeProps({ ref: unref(e) }, t), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var xn = "focusScope.autoFocusOnMount";
var Sn = "focusScope.autoFocusOnUnmount";
var qo = { bubbles: false, cancelable: true };
function Ma(a2, { select: t = false } = {}) {
  const e = me();
  for (const n of a2)
    if (pt(n, { select: t }), me() !== e)
      return true;
}
function iu(a2) {
  const t = eo(a2), e = Yo(t, a2), n = Yo(t.reverse(), a2);
  return [e, n];
}
function eo(a2) {
  const t = [], e = document.createTreeWalker(a2, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const l = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || l ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; e.nextNode(); ) t.push(e.currentNode);
  return t;
}
function Yo(a2, t) {
  for (const e of a2)
    if (!uu(e, { upTo: t }))
      return e;
}
function uu(a2, { upTo: t }) {
  if (getComputedStyle(a2).visibility === "hidden")
    return true;
  for (; a2; ) {
    if (t !== void 0 && a2 === t)
      return false;
    if (getComputedStyle(a2).display === "none")
      return true;
    a2 = a2.parentElement;
  }
  return false;
}
function du(a2) {
  return a2 instanceof HTMLInputElement && "select" in a2;
}
function pt(a2, { select: t = false } = {}) {
  if (a2 && a2.focus) {
    const e = me();
    a2.focus({ preventScroll: true }), a2 !== e && du(a2) && t && a2.select();
  }
}
var cu = li(() => ref([]));
function fu() {
  const a2 = cu();
  return {
    add(t) {
      const e = a2.value[0];
      t !== e && (e == null || e.pause()), a2.value = Xo(a2.value, t), a2.value.unshift(t);
    },
    remove(t) {
      var e;
      a2.value = Xo(a2.value, t), (e = a2.value[0]) == null || e.resume();
    }
  };
}
function Xo(a2, t) {
  const e = [...a2], n = e.indexOf(t);
  return n !== -1 && e.splice(n, 1), e;
}
function pu(a2) {
  return a2.filter((t) => t.tagName !== "A");
}
var Za = defineComponent({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: false },
    trapped: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { currentRef: l, currentElement: s } = R2(), r = ref(null), i = fu(), u = reactive({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    });
    watchEffect((c) => {
      if (!Je)
        return;
      const f = s.value;
      if (!e.trapped)
        return;
      function v2(_) {
        if (u.paused || !f)
          return;
        const C = _.target;
        f.contains(C) ? r.value = C : pt(r.value, { select: true });
      }
      function p(_) {
        if (u.paused || !f)
          return;
        const C = _.relatedTarget;
        C !== null && (f.contains(C) || pt(r.value, { select: true }));
      }
      function g(_) {
        f.contains(r.value) || pt(f);
      }
      document.addEventListener("focusin", v2), document.addEventListener("focusout", p);
      const m2 = new MutationObserver(g);
      f && m2.observe(f, { childList: true, subtree: true }), c(() => {
        document.removeEventListener("focusin", v2), document.removeEventListener("focusout", p), m2.disconnect();
      });
    }), watchEffect(async (c) => {
      const f = s.value;
      if (await nextTick(), !f)
        return;
      i.add(u);
      const v2 = me();
      if (!f.contains(v2)) {
        const g = new CustomEvent(xn, qo);
        f.addEventListener(xn, (m2) => n("mountAutoFocus", m2)), f.dispatchEvent(g), g.defaultPrevented || (Ma(pu(eo(f)), {
          select: true
        }), me() === v2 && pt(f));
      }
      c(() => {
        f.removeEventListener(xn, (_) => n("mountAutoFocus", _));
        const g = new CustomEvent(Sn, qo), m2 = (_) => {
          n("unmountAutoFocus", _);
        };
        f.addEventListener(Sn, m2), f.dispatchEvent(g), setTimeout(() => {
          g.defaultPrevented || pt(v2 ?? document.body, { select: true }), f.removeEventListener(Sn, m2), i.remove(u);
        }, 0);
      });
    });
    function d(c) {
      if (!e.loop && !e.trapped || u.paused)
        return;
      const f = c.key === "Tab" && !c.altKey && !c.ctrlKey && !c.metaKey, v2 = me();
      if (f && v2) {
        const p = c.currentTarget, [g, m2] = iu(p);
        g && m2 ? !c.shiftKey && v2 === m2 ? (c.preventDefault(), e.loop && pt(g, { select: true })) : c.shiftKey && v2 === g && (c.preventDefault(), e.loop && pt(m2, { select: true })) : v2 === p && c.preventDefault();
      }
    }
    return (c, f) => (openBlock(), createBlock(unref(O), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": c.asChild,
      as: c.as,
      onKeydown: d
    }, {
      default: withCtx(() => [
        renderSlot(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
var vu = "menu.itemSelect";
var Bn = ["Enter", " "];
var mu = ["ArrowDown", "PageUp", "Home"];
var ql = ["ArrowUp", "PageDown", "End"];
var hu = [...mu, ...ql];
var yu = {
  ltr: [...Bn, "ArrowRight"],
  rtl: [...Bn, "ArrowLeft"]
};
var gu = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
};
function to(a2) {
  return a2 ? "open" : "closed";
}
function La(a2) {
  return a2 === "indeterminate";
}
function ao(a2) {
  return La(a2) ? "indeterminate" : a2 ? "checked" : "unchecked";
}
function In(a2) {
  const t = me();
  for (const e of a2)
    if (e === t || (e.focus(), me() !== t))
      return;
}
function bu(a2, t) {
  const { x: e, y: n } = a2;
  let l = false;
  for (let s = 0, r = t.length - 1; s < t.length; r = s++) {
    const i = t[s].x, u = t[s].y, d = t[r].x, c = t[r].y;
    u > n != c > n && e < (d - i) * (n - u) / (c - u) + i && (l = !l);
  }
  return l;
}
function Cu(a2, t) {
  if (!t)
    return false;
  const e = { x: a2.clientX, y: a2.clientY };
  return bu(e, t);
}
function da(a2) {
  return a2.pointerType === "mouse";
}
var wu = "DialogTitle";
var _u = "DialogContent";
function xu({
  titleName: a2 = wu,
  contentName: t = _u,
  componentLink: e = "dialog.html#title",
  titleId: n,
  descriptionId: l,
  contentElement: s
}) {
  const r = `Warning: \`${t}\` requires a \`${a2}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a2}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${e}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  onMounted(() => {
    var c;
    document.getElementById(n) || console.warn(r);
    const d = (c = s.value) == null ? void 0 : c.getAttribute("aria-describedby");
    l && d && (document.getElementById(l) || console.warn(i));
  });
}
var Yl = defineComponent({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = ot(), { forwardRef: s, currentElement: r } = R2();
    return l.titleId || (l.titleId = ge(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = ge(void 0, "radix-vue-dialog-description")), onMounted(() => {
      l.contentElement = r, me() !== document.body && (l.triggerElement.value = me());
    }), xu({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (i, u) => (openBlock(), createBlock(unref(Za), {
      "as-child": "",
      loop: "",
      trapped: e.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (d) => n("openAutoFocus", d)),
      onUnmountAutoFocus: u[6] || (u[6] = (d) => n("closeAutoFocus", d))
    }, {
      default: withCtx(() => [
        createVNode(unref(Ct), mergeProps({
          id: unref(l).contentId,
          ref: unref(s),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": unref(l).descriptionId,
          "aria-labelledby": unref(l).titleId,
          "data-state": unref(to)(unref(l).open.value)
        }, i.$attrs, {
          onDismiss: u[0] || (u[0] = (d) => unref(l).onOpenChange(false)),
          onEscapeKeyDown: u[1] || (u[1] = (d) => n("escapeKeyDown", d)),
          onFocusOutside: u[2] || (u[2] = (d) => n("focusOutside", d)),
          onInteractOutside: u[3] || (u[3] = (d) => n("interactOutside", d)),
          onPointerDownOutside: u[4] || (u[4] = (d) => n("pointerDownOutside", d))
        }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
});
var Su = defineComponent({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = ot(), s = Te(n), { forwardRef: r, currentElement: i } = R2();
    return ga(i), (u, d) => (openBlock(), createBlock(Yl, mergeProps({ ...e, ...unref(s) }, {
      ref: unref(r),
      "trap-focus": unref(l).open.value,
      "disable-outside-pointer-events": true,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var f;
        c.defaultPrevented || (c.preventDefault(), (f = unref(l).triggerElement.value) == null || f.focus());
      }),
      onPointerDownOutside: d[1] || (d[1] = (c) => {
        const f = c.detail.originalEvent, v2 = f.button === 0 && f.ctrlKey === true;
        (f.button === 2 || v2) && c.preventDefault();
      }),
      onFocusOutside: d[2] || (d[2] = (c) => {
        c.preventDefault();
      })
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
});
var Eu = defineComponent({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    R2();
    const s = ot(), r = ref(false), i = ref(false);
    return (u, d) => (openBlock(), createBlock(Yl, mergeProps({ ...e, ...unref(l) }, {
      "trap-focus": false,
      "disable-outside-pointer-events": false,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var f;
        c.defaultPrevented || (r.value || (f = unref(s).triggerElement.value) == null || f.focus(), c.preventDefault()), r.value = false, i.value = false;
      }),
      onInteractOutside: d[1] || (d[1] = (c) => {
        var p;
        c.defaultPrevented || (r.value = true, c.detail.originalEvent.type === "pointerdown" && (i.value = true));
        const f = c.target;
        ((p = unref(s).triggerElement.value) == null ? void 0 : p.contains(f)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && i.value && c.preventDefault();
      })
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Pu = defineComponent({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = ot(), s = Te(n), { forwardRef: r } = R2();
    return (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(l).open.value
    }, {
      default: withCtx(() => [
        unref(l).modal.value ? (openBlock(), createBlock(Su, mergeProps({
          key: 0,
          ref: unref(r)
        }, { ...e, ...unref(s), ...i.$attrs }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (openBlock(), createBlock(Eu, mergeProps({
          key: 1,
          ref: unref(r)
        }, { ...e, ...unref(s), ...i.$attrs }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Du = defineComponent({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = ot();
    return ya(true), R2(), (e, n) => (openBlock(), createBlock(unref(O), {
      as: e.as,
      "as-child": e.asChild,
      "data-state": unref(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
});
var $u = defineComponent({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = ot(), { forwardRef: e } = R2();
    return (n, l) => {
      var s;
      return (s = unref(t)) != null && s.modal.value ? (openBlock(), createBlock(unref(Pe), {
        key: 0,
        present: n.forceMount || unref(t).open.value
      }, {
        default: withCtx(() => [
          createVNode(Du, mergeProps(n.$attrs, {
            ref: unref(e),
            as: n.as,
            "as-child": n.asChild
          }), {
            default: withCtx(() => [
              renderSlot(n.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : createCommentVNode("", true);
    };
  }
});
var Xl = defineComponent({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = ot();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      type: n.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (s) => unref(e).onOpenChange(false))
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
});
var Bu = defineComponent({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(a2) {
    const t = a2, e = ot();
    return R2(), (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).titleId
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var Iu = defineComponent({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = ot();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).descriptionId
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var Tv = defineComponent({
  __name: "AlertDialogRoot",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(nu), mergeProps(unref(l), { modal: true }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Rv = defineComponent({
  __name: "AlertDialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(ou), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Av = defineComponent({
  __name: "AlertDialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [Tu, Ru] = te("AlertDialogContent");
var Ov = defineComponent({
  __name: "AlertDialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    R2();
    const s = ref();
    return Ru({
      onCancelElementChange: (r) => {
        s.value = r;
      }
    }), (r, i) => (openBlock(), createBlock(unref(Pu), mergeProps({ ...e, ...unref(l) }, {
      role: "alertdialog",
      onPointerDownOutside: i[0] || (i[0] = withModifiers(() => {
      }, ["prevent"])),
      onInteractOutside: i[1] || (i[1] = withModifiers(() => {
      }, ["prevent"])),
      onOpenAutoFocus: i[2] || (i[2] = () => {
        nextTick(() => {
          var u;
          (u = s.value) == null || u.focus({
            preventScroll: true
          });
        });
      })
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var kv = defineComponent({
  __name: "AlertDialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref($u), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Mv = defineComponent({
  __name: "AlertDialogCancel",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = Tu(), { forwardRef: n, currentElement: l } = R2();
    return onMounted(() => {
      e.onCancelElementChange(l.value);
    }), (s, r) => (openBlock(), createBlock(unref(Xl), mergeProps(t, { ref: unref(n) }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Vv = defineComponent({
  __name: "AlertDialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Bu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Fv = defineComponent({
  __name: "AlertDialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Iu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Nv = defineComponent({
  __name: "AlertDialogAction",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Xl), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Lv = defineComponent({
  inheritAttrs: false,
  __name: "AspectRatio",
  props: {
    ratio: { default: 1 },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), n = computed(() => 1 / t.ratio * 100);
    return (l, s) => (openBlock(), createElementBlock("div", {
      style: normalizeStyle(`position: relative; width: 100%; padding-bottom: ${n.value}%`),
      "data-radix-aspect-ratio-wrapper": ""
    }, [
      createVNode(unref(O), mergeProps({
        ref: unref(e),
        "as-child": l.asChild,
        as: l.as,
        style: { position: "absolute", inset: "0px" }
      }, l.$attrs), {
        default: withCtx(() => [
          renderSlot(l.$slots, "default", { aspect: n.value })
        ]),
        _: 3
      }, 16, ["as-child", "as"])
    ], 4));
  }
});
var [Zl, Au] = te("AvatarRoot");
var zv = defineComponent({
  __name: "AvatarRoot",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    return R2(), Au({
      imageLoadingStatus: ref("loading")
    }), (t, e) => (openBlock(), createBlock(unref(O), {
      "as-child": t.asChild,
      as: t.as
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Ou(a2, t) {
  const e = ref("idle"), n = ref(false), l = (s) => () => {
    n.value && (e.value = s);
  };
  return onMounted(() => {
    n.value = true, watch([() => a2.value, () => t == null ? void 0 : t.value], ([s, r]) => {
      if (!s)
        e.value = "error";
      else {
        const i = new window.Image();
        e.value = "loading", i.onload = l("loaded"), i.onerror = l("error"), i.src = s, r && (i.referrerPolicy = r);
      }
    }, { immediate: true });
  }), onUnmounted(() => {
    n.value = false;
  }), e;
}
var Kv = defineComponent({
  __name: "AvatarImage",
  props: {
    src: {},
    referrerPolicy: {},
    asChild: { type: Boolean },
    as: { default: "img" }
  },
  emits: ["loadingStatusChange"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { src: l, referrerPolicy: s } = toRefs(e);
    R2();
    const r = Zl(), i = Ou(l, s);
    return watch(
      i,
      (u) => {
        n("loadingStatusChange", u), u !== "idle" && (r.imageLoadingStatus.value = u);
      },
      { immediate: true }
    ), (u, d) => withDirectives((openBlock(), createBlock(unref(O), {
      role: "img",
      "as-child": u.asChild,
      as: u.as,
      src: unref(l),
      "referrer-policy": unref(s)
    }, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "src", "referrer-policy"])), [
      [vShow, unref(i) === "loaded"]
    ]);
  }
});
var Hv = defineComponent({
  __name: "AvatarFallback",
  props: {
    delayMs: { default: 0 },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, e = Zl();
    R2();
    const n = ref(false);
    let l;
    return watch(e.imageLoadingStatus, (s) => {
      s === "loading" && (n.value = false, t.delayMs ? l = setTimeout(() => {
        n.value = true, clearTimeout(l);
      }, t.delayMs) : n.value = true);
    }, { immediate: true }), (s, r) => n.value && unref(e).imageLoadingStatus.value !== "loaded" ? (openBlock(), createBlock(unref(O), {
      key: 0,
      "as-child": s.asChild,
      as: s.as
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"])) : createCommentVNode("", true);
  }
});
function ku(a2) {
  function t(n) {
    return Array.isArray(a2.date.value) ? a2.date.value.some((l) => $14e0f24ef4ac5c92$export$ea39ec197993aef0(l, n)) : a2.date.value ? $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2.date.value, n) : false;
  }
  const e = computed(
    () => {
      var n, l, s, r;
      if (Array.isArray(a2.date.value)) {
        if (!a2.date.value.length)
          return false;
        for (const i of a2.date.value)
          if ((n = a2.isDateDisabled) != null && n.call(a2, i) || (l = a2.isDateUnavailable) != null && l.call(a2, i))
            return true;
      } else {
        if (!a2.date.value)
          return false;
        if ((s = a2.isDateDisabled) != null && s.call(a2, a2.date.value) || (r = a2.isDateUnavailable) != null && r.call(a2, a2.date.value))
          return true;
      }
      return false;
    }
  );
  return {
    isDateSelected: t,
    isInvalid: e
  };
}
function Mu(a2, t) {
  const e = t(a2), n = e.compare(a2), l = {};
  return n >= 7 && (l.day = 1), n >= R(a2) && (l.month = 1), e.set({ ...l });
}
function Vu(a2, t) {
  const e = t(a2), n = a2.compare(e), l = {};
  return n >= 7 && (l.day = 35), n >= R(a2) && (l.month = 13), e.set({ ...l });
}
function Fu(a2, t) {
  return t(a2);
}
function Nu(a2, t) {
  return t(a2);
}
function Jl(a2) {
  const t = qn(a2.locale.value), e = computed(() => {
    const m2 = {
      calendar: a2.placeholder.value.calendar.identifier
    };
    return a2.placeholder.value.calendar.identifier === "gregory" && a2.placeholder.value.era === "BC" && (m2.era = "short"), m2;
  }), n = ref(rt({
    dateObj: a2.placeholder.value,
    weekStartsOn: a2.weekStartsOn.value,
    locale: a2.locale.value,
    fixedWeeks: a2.fixedWeeks.value,
    numberOfMonths: a2.numberOfMonths.value
  })), l = computed(() => n.value.map((m2) => m2.value));
  function s(m2) {
    return !l.value.some((_) => $14e0f24ef4ac5c92$export$5a8da0c44a3afdf2(m2, _));
  }
  const r = (m2 = "month", _) => {
    if (!a2.maxValue.value || !n.value.length)
      return false;
    if (a2.disabled.value)
      return true;
    const C = n.value[n.value.length - 1].value;
    if (_ || a2.nextPage.value) {
      const h2 = Mu(C, _ || a2.nextPage.value);
      return P(h2, a2.maxValue.value);
    }
    if (m2 === "year") {
      const h2 = C.add({ years: 1 }).set({ day: 1, month: 1 });
      return P(h2, a2.maxValue.value);
    }
    const $2 = C.add({ months: 1 }).set({ day: 1 });
    return P($2, a2.maxValue.value);
  }, i = (m2 = "month", _) => {
    if (!a2.minValue.value || !n.value.length)
      return false;
    if (a2.disabled.value)
      return true;
    const C = n.value[0].value;
    if (_ || a2.prevPage.value) {
      const h2 = Vu(C, _ || a2.prevPage.value);
      return q(h2, a2.minValue.value);
    }
    if (m2 === "year") {
      const h2 = C.subtract({ years: 1 }).set({ day: 35, month: 13 });
      return q(h2, a2.minValue.value);
    }
    const $2 = C.subtract({ months: 1 }).set({ day: 35 });
    return q($2, a2.minValue.value);
  };
  function u(m2) {
    var _;
    return !!((_ = a2.isDateDisabled) != null && _.call(a2, m2) || a2.disabled.value || a2.maxValue.value && P(m2, a2.maxValue.value) || a2.minValue.value && q(m2, a2.minValue.value));
  }
  const d = (m2) => {
    var _;
    return !!((_ = a2.isDateUnavailable) != null && _.call(a2, m2));
  }, c = computed(() => n.value.length ? n.value[0].rows[0].map((m2) => t.dayOfWeek($(m2), a2.weekdayFormat.value)) : []), f = (m2 = "month", _) => {
    const C = n.value[0].value;
    if (_ || a2.nextPage.value) {
      const E = Fu(C, _ || a2.nextPage.value), P2 = rt({
        dateObj: E,
        weekStartsOn: a2.weekStartsOn.value,
        locale: a2.locale.value,
        fixedWeeks: a2.fixedWeeks.value,
        numberOfMonths: a2.numberOfMonths.value
      });
      n.value = P2;
      const D = {};
      if (!_) {
        const I = P2[0].value.compare(C);
        I >= R(C) && (D.day = 1), I >= 365 && (D.month = 1);
      }
      a2.placeholder.value = P2[0].value.set({ ...D });
      return;
    }
    const $2 = m2 === "month" ? C.add({ months: a2.pagedNavigation.value ? a2.numberOfMonths.value : 1 }) : C.add({ years: 1 }), h2 = rt({
      dateObj: $2,
      weekStartsOn: a2.weekStartsOn.value,
      locale: a2.locale.value,
      fixedWeeks: a2.fixedWeeks.value,
      numberOfMonths: a2.numberOfMonths.value
    });
    n.value = h2, a2.placeholder.value = h2[0].value.set({ day: 1 });
  }, v2 = (m2 = "month", _) => {
    const C = n.value[0].value;
    if (_ || a2.prevPage.value) {
      const E = Nu(C, _ || a2.prevPage.value), P2 = rt({
        dateObj: E,
        weekStartsOn: a2.weekStartsOn.value,
        locale: a2.locale.value,
        fixedWeeks: a2.fixedWeeks.value,
        numberOfMonths: a2.numberOfMonths.value
      });
      n.value = P2;
      const D = {};
      if (!_) {
        const I = C.compare(P2[0].value);
        I >= R(C) && (D.day = 1), I >= 365 && (D.month = 1);
      }
      a2.placeholder.value = P2[0].value.set({ ...D });
      return;
    }
    const $2 = m2 === "month" ? C.subtract({ months: a2.pagedNavigation.value ? a2.numberOfMonths.value : 1 }) : C.subtract({ years: 1 }), h2 = rt({
      dateObj: $2,
      weekStartsOn: a2.weekStartsOn.value,
      locale: a2.locale.value,
      fixedWeeks: a2.fixedWeeks.value,
      numberOfMonths: a2.numberOfMonths.value
    });
    n.value = h2, a2.placeholder.value = h2[0].value.set({ day: 1 });
  };
  watch(a2.placeholder, (m2) => {
    l.value.some((_) => $14e0f24ef4ac5c92$export$5a8da0c44a3afdf2(_, m2)) || (n.value = rt({
      dateObj: m2,
      weekStartsOn: a2.weekStartsOn.value,
      locale: a2.locale.value,
      fixedWeeks: a2.fixedWeeks.value,
      numberOfMonths: a2.numberOfMonths.value
    }));
  }), watch([a2.locale, a2.weekStartsOn, a2.fixedWeeks, a2.numberOfMonths], () => {
    n.value = rt({
      dateObj: a2.placeholder.value,
      weekStartsOn: a2.weekStartsOn.value,
      locale: a2.locale.value,
      fixedWeeks: a2.fixedWeeks.value,
      numberOfMonths: a2.numberOfMonths.value
    });
  });
  const p = computed(() => {
    if (!n.value.length)
      return "";
    if (a2.locale.value !== t.getLocale() && t.setLocale(a2.locale.value), n.value.length === 1) {
      const D = n.value[0].value;
      return `${t.fullMonthAndYear($(D), e.value)}`;
    }
    const m2 = $(n.value[0].value), _ = $(n.value[n.value.length - 1].value), C = t.fullMonth(m2, e.value), $2 = t.fullMonth(_, e.value), h2 = t.fullYear(m2, e.value), E = t.fullYear(_, e.value);
    return h2 === E ? `${C} - ${$2} ${E}` : `${C} ${h2} - ${$2} ${E}`;
  }), g = computed(() => `${a2.calendarLabel.value ?? "Event Date"}, ${p.value}`);
  return {
    isDateDisabled: u,
    isDateUnavailable: d,
    isNextButtonDisabled: r,
    isPrevButtonDisabled: i,
    grid: n,
    weekdays: c,
    visibleView: l,
    isOutsideVisibleView: s,
    formatter: t,
    nextPage: f,
    prevPage: v2,
    headingValue: p,
    fullCalendarLabel: g
  };
}
var Lu = { style: { border: "0px", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: "0px", position: "absolute", "white-space": "nowrap", width: "1px" } };
var zu = {
  role: "heading",
  "aria-level": "2"
};
var [Xt, Ku] = te("CalendarRoot");
var Hu = defineComponent({
  __name: "CalendarRoot",
  props: {
    modelValue: {},
    multiple: { type: Boolean, default: false },
    defaultValue: { default: void 0 },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    pagedNavigation: { type: Boolean, default: false },
    preventDeselect: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    weekdayFormat: { default: "narrow" },
    calendarLabel: {},
    fixedWeeks: { type: Boolean, default: false },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    numberOfMonths: { default: 1 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    initialFocus: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: void 0 },
    isDateUnavailable: { type: Function, default: void 0 },
    dir: {},
    nextPage: {},
    prevPage: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["update:modelValue", "update:placeholder"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, {
      locale: l,
      disabled: s,
      readonly: r,
      initialFocus: i,
      pagedNavigation: u,
      weekStartsOn: d,
      weekdayFormat: c,
      fixedWeeks: f,
      multiple: v2,
      minValue: p,
      maxValue: g,
      numberOfMonths: m2,
      preventDeselect: _,
      isDateDisabled: C,
      isDateUnavailable: $2,
      calendarLabel: h2,
      defaultValue: E,
      nextPage: P2,
      prevPage: D,
      dir: I
    } = toRefs(e), { primitiveElement: M, currentElement: V2 } = Re(), A2 = we(I), F = ne(e, "modelValue", n, {
      defaultValue: E.value,
      passive: e.modelValue === void 0
    }), j = Yt({
      defaultPlaceholder: e.placeholder,
      defaultValue: F.value,
      locale: e.locale
    }), H2 = ne(e, "placeholder", n, {
      defaultValue: e.defaultPlaceholder ?? j.copy(),
      passive: e.placeholder === void 0
    });
    function Q(de) {
      H2.value = de.copy();
    }
    const {
      fullCalendarLabel: G2,
      headingValue: J2,
      isDateDisabled: z2,
      isDateUnavailable: K,
      isNextButtonDisabled: L,
      isPrevButtonDisabled: N2,
      weekdays: Z,
      isOutsideVisibleView: Y,
      nextPage: re,
      prevPage: X,
      formatter: se,
      grid: fe
    } = Jl({
      locale: l,
      placeholder: H2,
      weekStartsOn: d,
      fixedWeeks: f,
      numberOfMonths: m2,
      minValue: p,
      maxValue: g,
      disabled: s,
      weekdayFormat: c,
      pagedNavigation: u,
      isDateDisabled: C.value,
      isDateUnavailable: $2.value,
      calendarLabel: h2,
      nextPage: P2,
      prevPage: D
    }), {
      isInvalid: xe,
      isDateSelected: Ee
    } = ku({
      date: F,
      isDateDisabled: z2,
      isDateUnavailable: K
    });
    watch(F, (de) => {
      if (Array.isArray(de) && de.length) {
        const Ie = de[de.length - 1];
        Ie && !$14e0f24ef4ac5c92$export$91b62ebf2ba703ee(H2.value, Ie) && Q(Ie);
      } else !Array.isArray(de) && de && !$14e0f24ef4ac5c92$export$91b62ebf2ba703ee(H2.value, de) && Q(de);
    });
    function be(de) {
      if (v2.value) {
        if (!F.value)
          F.value = [de.copy()];
        else if (Array.isArray(F.value)) {
          if (F.value.findIndex((Ae) => $14e0f24ef4ac5c92$export$ea39ec197993aef0(Ae, de)) === -1)
            F.value = [...F.value, de];
          else if (!_.value) {
            const Ae = F.value.filter((We) => !$14e0f24ef4ac5c92$export$ea39ec197993aef0(We, de));
            if (!Ae.length) {
              H2.value = de.copy(), F.value = void 0;
              return;
            }
            F.value = Ae.map((We) => We.copy());
          }
        }
      } else {
        if (!F.value) {
          F.value = de.copy();
          return;
        }
        !_.value && $14e0f24ef4ac5c92$export$91b62ebf2ba703ee(F.value, de) ? (H2.value = de.copy(), F.value = void 0) : F.value = de.copy();
      }
    }
    return onMounted(() => {
      i.value && Pl(V2.value);
    }), Ku({
      isDateUnavailable: K,
      dir: A2,
      isDateDisabled: z2,
      locale: l,
      formatter: se,
      modelValue: F,
      placeholder: H2,
      disabled: s,
      initialFocus: i,
      pagedNavigation: u,
      weekStartsOn: d,
      weekdayFormat: c,
      fixedWeeks: f,
      multiple: v2,
      numberOfMonths: m2,
      readonly: r,
      preventDeselect: _,
      fullCalendarLabel: G2,
      headingValue: J2,
      isInvalid: xe,
      isDateSelected: Ee,
      isNextButtonDisabled: L,
      isPrevButtonDisabled: N2,
      isOutsideVisibleView: Y,
      nextPage: re,
      prevPage: X,
      parentElement: V2,
      onPlaceholderChange: Q,
      onDateChange: be
    }), (de, Ie) => (openBlock(), createBlock(unref(O), {
      ref_key: "primitiveElement",
      ref: M,
      as: de.as,
      "as-child": de.asChild,
      role: "application",
      "aria-label": unref(G2),
      "data-readonly": unref(r) ? "" : void 0,
      "data-disabled": unref(s) ? "" : void 0,
      "data-invalid": unref(xe) ? "" : void 0,
      dir: unref(A2)
    }, {
      default: withCtx(() => [
        renderSlot(de.$slots, "default", {
          date: unref(H2),
          grid: unref(fe),
          weekDays: unref(Z),
          weekStartsOn: unref(d),
          locale: unref(l),
          fixedWeeks: unref(f)
        }),
        createBaseVNode("div", Lu, [
          createBaseVNode("div", zu, toDisplayString(unref(G2)), 1)
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "aria-label", "data-readonly", "data-disabled", "data-invalid", "dir"]));
  }
});
var Wu = defineComponent({
  __name: "CalendarHeader",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ju = defineComponent({
  __name: "CalendarHeading",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = Xt();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "data-disabled": unref(e).disabled.value ? "" : void 0
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {
          headingValue: unref(e).headingValue.value
        }, () => [
          createTextVNode(toDisplayString(unref(e).headingValue.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["data-disabled"]));
  }
});
var Uu = defineComponent({
  __name: "CalendarGrid",
  props: {
    asChild: { type: Boolean },
    as: { default: "table" }
  },
  setup(a2) {
    const t = a2, e = Xt(), n = computed(() => e.disabled.value ? true : void 0), l = computed(() => e.readonly.value ? true : void 0);
    return (s, r) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      tabindex: "-1",
      role: "grid",
      "aria-readonly": l.value,
      "aria-disabled": n.value,
      "data-readonly": l.value && "",
      "data-disabled": n.value && ""
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-readonly", "aria-disabled", "data-readonly", "data-disabled"]));
  }
});
var Gu = defineComponent({
  __name: "CalendarCell",
  props: {
    date: {},
    asChild: { type: Boolean },
    as: { default: "td" }
  },
  setup(a2) {
    const t = Xt();
    return (e, n) => {
      var l, s;
      return openBlock(), createBlock(unref(O), {
        as: e.as,
        "as-child": e.asChild,
        role: "gridcell",
        "aria-selected": unref(t).isDateSelected(e.date) ? true : void 0,
        "aria-disabled": unref(t).isDateDisabled(e.date) || ((s = (l = unref(t)).isDateUnavailable) == null ? void 0 : s.call(l, e.date)),
        "data-disabled": unref(t).isDateDisabled(e.date) ? "" : void 0
      }, {
        default: withCtx(() => [
          renderSlot(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-selected", "aria-disabled", "data-disabled"]);
    };
  }
});
var qu = defineComponent({
  __name: "CalendarHeadCell",
  props: {
    asChild: { type: Boolean },
    as: { default: "th" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Yu = defineComponent({
  __name: "CalendarNext",
  props: {
    step: { default: "month" },
    nextPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = computed(() => n.disabled.value || n.isNextButtonDisabled(t.step, t.nextPage)), n = Xt();
    return (l, s) => (openBlock(), createBlock(unref(O), {
      as: t.as,
      "as-child": t.asChild,
      "aria-label": "Next page",
      type: l.as === "button" ? "button" : void 0,
      "aria-disabled": e.value || void 0,
      "data-disabled": e.value || void 0,
      disabled: e.value,
      onClick: s[0] || (s[0] = (r) => unref(n).nextPage(t.step, t.nextPage))
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Next page")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "type", "aria-disabled", "data-disabled", "disabled"]));
  }
});
var Xu = defineComponent({
  __name: "CalendarPrev",
  props: {
    step: { default: "month" },
    prevPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = computed(() => n.disabled.value || n.isPrevButtonDisabled(t.step, t.prevPage)), n = Xt();
    return (l, s) => (openBlock(), createBlock(unref(O), {
      "aria-label": "Previous page",
      as: t.as,
      "as-child": t.asChild,
      type: l.as === "button" ? "button" : void 0,
      "aria-disabled": e.value || void 0,
      "data-disabled": e.value || void 0,
      disabled: e.value,
      onClick: s[0] || (s[0] = (r) => unref(n).prevPage(t.step, t.prevPage))
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Prev page")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "type", "aria-disabled", "data-disabled", "disabled"]));
  }
});
var Zu = defineComponent({
  __name: "CalendarGridHead",
  props: {
    asChild: { type: Boolean },
    as: { default: "thead" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, { "aria-hidden": "true" }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ju = defineComponent({
  __name: "CalendarGridBody",
  props: {
    asChild: { type: Boolean },
    as: { default: "tbody" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Qu = defineComponent({
  __name: "CalendarGridRow",
  props: {
    asChild: { type: Boolean },
    as: { default: "tr" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ed = defineComponent({
  __name: "CalendarCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = nt(), n = Xt(), { primitiveElement: l, currentElement: s } = Re(), r = computed(() => t.day.day.toLocaleString(n.locale.value)), i = computed(() => n.formatter.custom($(t.day), {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })), u = computed(() => n.isDateDisabled(t.day)), d = computed(
      () => {
        var h2;
        return (h2 = n.isDateUnavailable) == null ? void 0 : h2.call(n, t.day);
      }
    ), c = computed(() => $14e0f24ef4ac5c92$export$629b0a497aa65267(t.day, $14e0f24ef4ac5c92$export$aa8b41735afcabd2())), f = computed(() => !$14e0f24ef4ac5c92$export$a18c89cbd24170ff(t.day, t.month)), v2 = computed(
      () => n.isOutsideVisibleView(t.day)
    ), p = computed(() => !n.disabled.value && $14e0f24ef4ac5c92$export$ea39ec197993aef0(t.day, n.placeholder.value)), g = computed(() => n.isDateSelected(t.day)), m2 = "[data-radix-vue-calendar-cell-trigger]:not([data-disabled]):not([data-outside-view]):not([data-outside-visible-view])";
    function _(h2) {
      var E;
      n.readonly.value || n.isDateDisabled(h2) || (E = n.isDateUnavailable) != null && E.call(n, h2) || n.onDateChange(h2);
    }
    function C() {
      _(t.day);
    }
    function $2(h2) {
      h2.preventDefault(), h2.stopPropagation();
      const E = n.parentElement.value, P2 = E ? Array.from(E.querySelectorAll(m2)) : [];
      let I = P2.indexOf(s.value);
      const M = 7, V2 = n.dir.value === "rtl" ? -1 : 1;
      switch (h2.code) {
        case e.ARROW_RIGHT:
          I += V2;
          break;
        case e.ARROW_LEFT:
          I -= V2;
          break;
        case e.ARROW_UP:
          I -= M;
          break;
        case e.ARROW_DOWN:
          I += M;
          break;
        case e.ENTER:
        case e.SPACE_CODE:
          _(t.day);
          return;
        default:
          return;
      }
      if (I >= 0 && I < P2.length) {
        P2[I].focus();
        return;
      }
      if (I < 0) {
        if (n.isPrevButtonDisabled("month"))
          return;
        n.prevPage(), nextTick(() => {
          const A2 = E ? Array.from(E.querySelectorAll(m2)) : [];
          if (!n.pagedNavigation.value) {
            const F = R(n.placeholder.value);
            A2[F - Math.abs(I)].focus();
            return;
          }
          A2[A2.length - Math.abs(I)].focus();
        });
        return;
      }
      if (I >= P2.length) {
        if (n.isNextButtonDisabled("month"))
          return;
        n.nextPage(), nextTick(() => {
          const A2 = E ? Array.from(E.querySelectorAll(m2)) : [];
          if (!n.pagedNavigation.value) {
            const F = R(n.placeholder.value.add({ months: n.numberOfMonths.value - 1 }));
            A2[A2.length - F + I - P2.length].focus();
            return;
          }
          A2[I - P2.length].focus();
        });
      }
    }
    return (h2, E) => (openBlock(), createBlock(unref(O), mergeProps({
      ref_key: "primitiveElement",
      ref: l
    }, t, {
      role: "button",
      "aria-label": i.value,
      "data-radix-vue-calendar-cell-trigger": "",
      "aria-disabled": u.value || d.value ? true : void 0,
      "data-selected": g.value ? true : void 0,
      "data-value": h2.day.toString(),
      "data-disabled": u.value ? "" : void 0,
      "data-unavailable": d.value ? "" : void 0,
      "data-today": c.value ? "" : void 0,
      "data-outside-view": f.value ? "" : void 0,
      "data-outside-visible-view": v2.value ? "" : void 0,
      "data-focused": p.value ? "" : void 0,
      tabindex: p.value ? 0 : f.value || u.value ? void 0 : -1,
      onClick: C,
      onKeydown: [
        withKeys($2, ["up", "down", "left", "right", "space", "enter"]),
        E[0] || (E[0] = withKeys(withModifiers(() => {
        }, ["prevent"]), ["enter"]))
      ]
    }), {
      default: withCtx(() => [
        renderSlot(h2.$slots, "default", { dayValue: r.value }, () => [
          createTextVNode(toDisplayString(r.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["aria-label", "aria-disabled", "data-selected", "data-value", "data-disabled", "data-unavailable", "data-today", "data-outside-view", "data-outside-visible-view", "data-focused", "tabindex"]));
  }
});
function za(a2) {
  return a2 === "indeterminate";
}
function Ql(a2) {
  return za(a2) ? "indeterminate" : a2 ? "checked" : "unchecked";
}
var td = ["value", "checked", "name", "disabled", "required"];
var [ad, nd] = te("CheckboxRoot");
var Wv = defineComponent({
  inheritAttrs: false,
  __name: "CheckboxRoot",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: [Boolean, String], default: void 0 },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    value: { default: "on" },
    id: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { disabled: l } = toRefs(e), s = ne(e, "checked", n, {
      defaultValue: e.defaultChecked,
      passive: e.checked === void 0
    }), { forwardRef: r, currentElement: i } = R2(), u = at(i), d = computed(() => {
      var c;
      return e.id && i.value ? (c = document.querySelector(`[for="${e.id}"]`)) == null ? void 0 : c.innerText : void 0;
    });
    return nd({
      disabled: l,
      state: s
    }), (c, f) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps(c.$attrs, {
        id: c.id,
        ref: unref(r),
        role: "checkbox",
        "as-child": e.asChild,
        as: c.as,
        type: c.as === "button" ? "button" : void 0,
        "aria-checked": unref(za)(unref(s)) ? "mixed" : unref(s),
        "aria-required": e.required,
        "aria-label": c.$attrs["aria-label"] || d.value,
        "data-state": unref(Ql)(unref(s)),
        "data-disabled": unref(l) ? "" : void 0,
        disabled: unref(l),
        onKeydown: withKeys(withModifiers(() => {
        }, ["prevent"]), ["enter"]),
        onClick: f[0] || (f[0] = (v2) => s.value = unref(za)(unref(s)) ? true : !unref(s))
      }), {
        default: withCtx(() => [
          renderSlot(c.$slots, "default", { checked: unref(s) })
        ]),
        _: 3
      }, 16, ["id", "as-child", "as", "type", "aria-checked", "aria-required", "aria-label", "data-state", "data-disabled", "disabled", "onKeydown"]),
      unref(u) ? (openBlock(), createElementBlock("input", {
        key: 0,
        type: "checkbox",
        tabindex: "-1",
        "aria-hidden": "true",
        value: c.value,
        checked: !!unref(s),
        name: e.name,
        disabled: e.disabled,
        required: e.required,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, td)) : createCommentVNode("", true)
    ], 64));
  }
});
var jv = defineComponent({
  __name: "CheckboxIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const { forwardRef: t } = R2(), e = ad();
    return (n, l) => (openBlock(), createBlock(unref(Pe), {
      present: n.forceMount || unref(za)(unref(e).state.value) || unref(e).state.value === true
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(t),
          "data-state": unref(Ql)(unref(e).state.value),
          "data-disabled": unref(e).disabled.value ? "" : void 0,
          style: { pointerEvents: "none" },
          "as-child": n.asChild,
          as: n.as
        }, n.$attrs), {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var [es, od] = te("PopperRoot");
var kt = defineComponent({
  inheritAttrs: false,
  __name: "PopperRoot",
  setup(a2) {
    const t = ref();
    return od({
      anchor: t,
      onAnchorChange: (e) => t.value = e
    }), (e, n) => renderSlot(e.$slots, "default");
  }
});
var Mt = defineComponent({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e, currentElement: n } = R2(), l = es();
    return watchEffect(() => {
      l.onAnchorChange(t.element ?? n.value);
    }), (s, r) => (openBlock(), createBlock(unref(O), {
      ref: unref(e),
      as: s.as,
      "as-child": s.asChild
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function ld(a2) {
  return a2 !== null;
}
function sd(a2) {
  return {
    name: "transformOrigin",
    options: a2,
    fn(t) {
      var _, C, $2;
      const { placement: e, rects: n, middlewareData: l } = t, r = ((_ = l.arrow) == null ? void 0 : _.centerOffset) !== 0, i = r ? 0 : a2.arrowWidth, u = r ? 0 : a2.arrowHeight, [d, c] = Tn(e), f = { start: "0%", center: "50%", end: "100%" }[c], v2 = (((C = l.arrow) == null ? void 0 : C.x) ?? 0) + i / 2, p = ((($2 = l.arrow) == null ? void 0 : $2.y) ?? 0) + u / 2;
      let g = "", m2 = "";
      return d === "bottom" ? (g = r ? f : `${v2}px`, m2 = `${-u}px`) : d === "top" ? (g = r ? f : `${v2}px`, m2 = `${n.floating.height + u}px`) : d === "right" ? (g = `${-u}px`, m2 = r ? f : `${p}px`) : d === "left" && (g = `${n.floating.width + u}px`, m2 = r ? f : `${p}px`), { data: { x: g, y: m2 } };
    }
  };
}
function Tn(a2) {
  const [t, e = "center"] = a2.split("-");
  return [t, e];
}
var ts = {
  side: "bottom",
  sideOffset: 0,
  align: "center",
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: false,
  updatePositionStrategy: "optimized",
  prioritizePosition: false
};
var [rd, id] = te("PopperContent");
var It = defineComponent({
  inheritAttrs: false,
  __name: "PopperContent",
  props: mergeDefaults({
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  }, {
    ...ts
  }),
  emits: ["placed"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = es(), { forwardRef: s, currentElement: r } = R2(), i = ref(), u = ref(), { width: d, height: c } = Ll(u), f = computed(
      () => e.side + (e.align !== "center" ? `-${e.align}` : "")
    ), v2 = computed(() => typeof e.collisionPadding == "number" ? e.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...e.collisionPadding }), p = computed(() => Array.isArray(e.collisionBoundary) ? e.collisionBoundary : [e.collisionBoundary]), g = computed(() => ({
      padding: v2.value,
      boundary: p.value.filter(ld),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: p.value.length > 0
    })), m2 = ni(() => [
      offset2({
        mainAxis: e.sideOffset + c.value,
        alignmentAxis: e.alignOffset
      }),
      e.prioritizePosition && e.avoidCollisions && flip2({
        ...g.value
      }),
      e.avoidCollisions && shift2({
        mainAxis: true,
        crossAxis: !!e.prioritizePosition,
        limiter: e.sticky === "partial" ? limitShift2() : void 0,
        ...g.value
      }),
      !e.prioritizePosition && e.avoidCollisions && flip2({
        ...g.value
      }),
      size2({
        ...g.value,
        apply: ({ elements: A2, rects: F, availableWidth: j, availableHeight: H2 }) => {
          const { width: Q, height: G2 } = F.reference, J2 = A2.floating.style;
          J2.setProperty(
            "--radix-popper-available-width",
            `${j}px`
          ), J2.setProperty(
            "--radix-popper-available-height",
            `${H2}px`
          ), J2.setProperty(
            "--radix-popper-anchor-width",
            `${Q}px`
          ), J2.setProperty(
            "--radix-popper-anchor-height",
            `${G2}px`
          );
        }
      }),
      u.value && arrow3({ element: u.value, padding: e.arrowPadding }),
      sd({
        arrowWidth: d.value,
        arrowHeight: c.value
      }),
      e.hideWhenDetached && hide2({ strategy: "referenceHidden", ...g.value })
    ]), { floatingStyles: _, placement: C, isPositioned: $2, middlewareData: h2 } = useFloating(
      l.anchor,
      i,
      {
        strategy: "fixed",
        placement: f,
        whileElementsMounted: (...A2) => autoUpdate(...A2, {
          animationFrame: e.updatePositionStrategy === "always"
        }),
        middleware: m2
      }
    ), E = computed(
      () => Tn(C.value)[0]
    ), P2 = computed(
      () => Tn(C.value)[1]
    );
    watchPostEffect(() => {
      $2.value && n("placed");
    });
    const D = computed(
      () => {
        var A2;
        return ((A2 = h2.value.arrow) == null ? void 0 : A2.centerOffset) !== 0;
      }
    ), I = ref("");
    watchEffect(() => {
      r.value && (I.value = window.getComputedStyle(r.value).zIndex);
    });
    const M = computed(() => {
      var A2;
      return ((A2 = h2.value.arrow) == null ? void 0 : A2.x) ?? 0;
    }), V2 = computed(() => {
      var A2;
      return ((A2 = h2.value.arrow) == null ? void 0 : A2.y) ?? 0;
    });
    return id({
      placedSide: E,
      onArrowChange: (A2) => u.value = A2,
      arrowX: M,
      arrowY: V2,
      shouldHideArrow: D
    }), (A2, F) => {
      var j, H2, Q;
      return openBlock(), createElementBlock("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-radix-popper-content-wrapper": "",
        style: normalizeStyle({
          ...unref(_),
          transform: unref($2) ? unref(_).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: I.value,
          "--radix-popper-transform-origin": [
            (j = unref(h2).transformOrigin) == null ? void 0 : j.x,
            (H2 = unref(h2).transformOrigin) == null ? void 0 : H2.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Q = unref(h2).hide) == null ? void 0 : Q.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        createVNode(unref(O), mergeProps({ ref: unref(s) }, A2.$attrs, {
          "as-child": e.asChild,
          as: A2.as,
          "data-side": E.value,
          "data-align": P2.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: unref($2) ? void 0 : "none"
          }
        }), {
          default: withCtx(() => [
            renderSlot(A2.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
});
var ud = createBaseVNode("polygon", { points: "0,0 30,0 15,10" }, null, -1);
var dd = defineComponent({
  __name: "Arrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      width: e.width,
      height: e.height,
      viewBox: e.asChild ? void 0 : "0 0 30 10",
      preserveAspectRatio: e.asChild ? void 0 : "none"
    }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default", {}, () => [
          ud
        ])
      ]),
      _: 3
    }, 16, ["width", "height", "viewBox", "preserveAspectRatio"]));
  }
});
var cd = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var Zt = defineComponent({
  inheritAttrs: false,
  __name: "PopperArrow",
  props: {
    width: {},
    height: {},
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const { forwardRef: t } = R2(), e = rd(), n = computed(() => cd[e.placedSide.value]);
    return (l, s) => {
      var r, i, u, d;
      return openBlock(), createElementBlock("span", {
        ref: (c) => {
          unref(e).onArrowChange(c);
        },
        style: normalizeStyle({
          position: "absolute",
          left: (r = unref(e).arrowX) != null && r.value ? `${(i = unref(e).arrowX) == null ? void 0 : i.value}px` : void 0,
          top: (u = unref(e).arrowY) != null && u.value ? `${(d = unref(e).arrowY) == null ? void 0 : d.value}px` : void 0,
          [n.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[unref(e).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[unref(e).placedSide.value],
          visibility: unref(e).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [
        createVNode(dd, mergeProps(l.$attrs, {
          ref: unref(t),
          style: {
            display: "block"
          },
          as: l.as,
          "as-child": l.asChild,
          width: l.width,
          height: l.height
        }), {
          default: withCtx(() => [
            renderSlot(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["as", "as-child", "width", "height"])
      ], 4);
    };
  }
});
var Jt = defineComponent({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    return R2(), (t, e) => (openBlock(), createBlock(unref(O), {
      as: t.as,
      "as-child": t.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
var no = defineComponent({
  __name: "VisuallyHiddenInput",
  props: {
    name: {},
    value: {},
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  setup(a2) {
    const t = a2, e = computed(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" ? [{ name: t.name, value: t.value }] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((n, l) => typeof n == "object" ? Object.entries(n).map(([s, r]) => ({ name: `[${l}][${t.name}][${s}]`, value: r })) : { name: `[${t.name}][${l}]`, value: n }) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([n, l]) => ({ name: `[${t.name}][${n}]`, value: l })) : []);
    return (n, l) => (openBlock(true), createElementBlock(Fragment, null, renderList(e.value, (s) => (openBlock(), createBlock(Jt, {
      key: s.name,
      as: "input",
      type: "hidden",
      hidden: "",
      readonly: "",
      name: s.name,
      value: s.value,
      required: n.required,
      disabled: n.disabled
    }, null, 8, ["name", "value", "required", "disabled"]))), 128));
  }
});
var fd = "data-radix-vue-collection-item";
var [oo, pd] = te("CollectionProvider");
function Ca(a2 = fd) {
  const t = ref(/* @__PURE__ */ new Map()), e = ref(), n = pd({
    collectionRef: e,
    itemMap: t,
    attrName: a2
  }), { getItems: l } = ea(n), s = computed(() => Array.from(n.itemMap.value.values())), r = computed(() => n.itemMap.value.size);
  return { getItems: l, reactiveItems: s, itemMapSize: r };
}
var wa = defineComponent({
  name: "CollectionSlot",
  setup(a2, { slots: t }) {
    const e = oo(), { primitiveElement: n, currentElement: l } = Re();
    return watch(l, () => {
      e.collectionRef.value = l.value;
    }), () => h(Jn, { ref: n }, t);
  }
});
var Qt = defineComponent({
  name: "CollectionItem",
  inheritAttrs: false,
  props: {
    value: {
      // It accepts any value
      validator: () => true
    }
  },
  setup(a2, { slots: t, attrs: e }) {
    const n = oo(), { primitiveElement: l, currentElement: s } = Re();
    return watchEffect((r) => {
      if (s.value) {
        const i = markRaw(s.value);
        n.itemMap.value.set(i, { ref: s.value, value: a2.value }), r(() => n.itemMap.value.delete(i));
      }
    }), () => h(Jn, { ...e, [n.attrName]: "", ref: l }, t);
  }
});
function ea(a2) {
  const t = a2 ?? oo();
  return { getItems: () => {
    const n = t.collectionRef.value;
    if (!n)
      return [];
    const l = Array.from(n.querySelectorAll(`[${t.attrName}]`));
    return Array.from(t.itemMap.value.values()).sort(
      (i, u) => l.indexOf(i.ref) - l.indexOf(u.ref)
    );
  } };
}
var [it, vd] = te("ComboboxRoot");
var Uv = defineComponent({
  __name: "ComboboxRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean },
    searchTerm: {},
    selectedValue: {},
    multiple: { type: Boolean },
    disabled: { type: Boolean },
    name: {},
    dir: {},
    filterFunction: {},
    displayValue: {},
    resetSearchTermOnBlur: { type: Boolean, default: true },
    resetSearchTermOnSelect: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:open", "update:searchTerm", "update:selectedValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { multiple: l, disabled: s, dir: r } = toRefs(e), i = we(r), u = ne(e, "searchTerm", n, {
      // @ts-expect-error ignore the type error here
      defaultValue: "",
      passive: e.searchTerm === void 0
    }), d = ne(e, "modelValue", n, {
      // @ts-expect-error ignore the type error here
      defaultValue: e.defaultValue ?? l.value ? [] : void 0,
      passive: e.modelValue === void 0,
      deep: true
    }), c = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    }), f = ne(e, "selectedValue", n, {
      defaultValue: void 0,
      passive: e.selectedValue === void 0
    });
    async function v2(L) {
      var N2, Z;
      c.value = L, await nextTick(), L ? (d.value && (Array.isArray(d.value) && l.value ? f.value = (N2 = h2().find((Y) => {
        var re, X;
        return ((X = (re = Y.ref) == null ? void 0 : re.dataset) == null ? void 0 : X.state) === "checked";
      })) == null ? void 0 : N2.value : f.value = d.value), await nextTick(), (Z = m2.value) == null || Z.focus(), H2()) : (g.value = false, e.resetSearchTermOnBlur && M("blur"));
    }
    function p(L) {
      if (Array.isArray(d.value) && l.value) {
        const N2 = d.value.findIndex((Y) => Qe(Y, L)), Z = [...d.value];
        N2 === -1 ? Z.push(L) : Z.splice(N2, 1), d.value = Z;
      } else
        d.value = L, v2(false);
    }
    const g = ref(false), m2 = ref(), _ = ref(), { forwardRef: C, currentElement: $2 } = R2(), { getItems: h2, reactiveItems: E, itemMapSize: P2 } = Ca("data-radix-vue-combobox-item"), D = ref([]);
    watch(() => P2.value, () => {
      D.value = h2().map((L) => L.value);
    }, {
      immediate: true,
      flush: "post"
    });
    const I = computed(() => {
      if (g.value) {
        if (e.filterFunction)
          return e.filterFunction(D.value, u.value);
        const L = D.value.filter((N2) => typeof N2 == "string");
        if (L.length)
          return L.filter((N2) => {
            var Z;
            return N2.toLowerCase().includes((Z = u.value) == null ? void 0 : Z.toLowerCase());
          });
      }
      return D.value;
    });
    function M(L) {
      const N2 = L === "blur" || L === "select" && e.resetSearchTermOnSelect;
      !l.value && d.value && !Array.isArray(d.value) ? e.displayValue ? u.value = e.displayValue(d.value) : typeof d.value != "object" ? u.value = d.value.toString() : N2 && (u.value = "") : N2 && (u.value = "");
    }
    const V2 = computed(() => I.value.findIndex((L) => Qe(L, f.value))), A2 = computed(() => {
      var L;
      return (L = E.value.find((N2) => Qe(N2.value, f.value))) == null ? void 0 : L.ref;
    }), F = computed(() => JSON.stringify(d.value));
    watch(F, async () => {
      await nextTick(), await nextTick(), M("select");
    }, {
      // If searchTerm is provided with value during initialization, we don't reset it immediately
      immediate: !e.searchTerm
    }), watch(() => [I.value.length, u.value.length], async ([L, N2], [Z, Y]) => {
      await nextTick(), await nextTick(), L && (Y > N2 || V2.value === -1) && (f.value = I.value[0]);
    });
    const j = at($2);
    function H2() {
      var L;
      A2.value instanceof Element && ((L = A2.value) == null || L.scrollIntoView({ block: "nearest" }));
    }
    function Q() {
      A2.value instanceof Element && A2.value.focus && A2.value.focus();
    }
    const G2 = ref(false);
    function J2() {
      G2.value = true;
    }
    function z2() {
      requestAnimationFrame(() => {
        G2.value = false;
      });
    }
    async function K(L) {
      var N2;
      I.value.length && f.value && A2.value instanceof Element && (L.preventDefault(), L.stopPropagation(), G2.value || (N2 = A2.value) == null || N2.click());
    }
    return vd({
      searchTerm: u,
      modelValue: d,
      // @ts-expect-error ignoring
      onValueChange: p,
      isUserInputted: g,
      multiple: l,
      disabled: s,
      open: c,
      onOpenChange: v2,
      filteredOptions: I,
      contentId: "",
      inputElement: m2,
      selectedElement: A2,
      onInputElementChange: (L) => m2.value = L,
      onInputNavigation: async (L) => {
        const N2 = V2.value;
        N2 === 0 && L === "up" || N2 === I.value.length - 1 && L === "down" || (N2 === -1 && I.value.length || L === "home" ? f.value = I.value[0] : L === "end" ? f.value = I.value[I.value.length - 1] : f.value = I.value[L === "up" ? N2 - 1 : N2 + 1], await nextTick(), H2(), Q(), nextTick(() => {
          var Z;
          return (Z = m2.value) == null ? void 0 : Z.focus({ preventScroll: true });
        }));
      },
      onInputEnter: K,
      onCompositionEnd: z2,
      onCompositionStart: J2,
      selectedValue: f,
      onSelectedValueChange: (L) => f.value = L,
      parentElement: $2,
      contentElement: _,
      onContentElementChange: (L) => _.value = L
    }), (L, N2) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(C),
          style: {
            pointerEvents: unref(c) ? "auto" : void 0
          },
          as: L.as,
          "as-child": L.asChild,
          dir: unref(i)
        }, L.$attrs), {
          default: withCtx(() => [
            renderSlot(L.$slots, "default", {
              open: unref(c),
              modelValue: unref(d)
            }),
            unref(j) && e.name ? (openBlock(), createBlock(unref(no), {
              key: 0,
              name: e.name,
              value: unref(d)
            }, null, 8, ["name", "value"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16, ["style", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
});
var Gv = defineComponent({
  __name: "ComboboxInput",
  props: {
    type: { default: "text" },
    disabled: { type: Boolean },
    autoFocus: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(a2) {
    const t = a2, e = it(), { forwardRef: n, currentElement: l } = R2();
    onMounted(() => {
      const c = l.value.nodeName === "INPUT" ? l.value : l.value.querySelector("input");
      c && (e.onInputElementChange(c), setTimeout(() => {
        t.autoFocus && (c == null || c.focus());
      }, 1));
    });
    const s = computed(() => t.disabled || e.disabled.value || false), r = ref();
    watchSyncEffect(() => {
      var c;
      return r.value = (c = e.selectedElement.value) == null ? void 0 : c.id;
    });
    function i(c) {
      e.open.value ? e.onInputNavigation(c.key === "ArrowUp" ? "up" : "down") : e.onOpenChange(true);
    }
    function u(c) {
      e.open.value && e.onInputNavigation(c.key === "Home" ? "home" : "end");
    }
    function d(c) {
      var f;
      e.searchTerm.value = (f = c.target) == null ? void 0 : f.value, e.open.value || e.onOpenChange(true), e.isUserInputted.value = true;
    }
    return (c, f) => (openBlock(), createBlock(unref(O), {
      ref: unref(n),
      as: c.as,
      "as-child": c.asChild,
      type: c.type,
      disabled: s.value,
      value: unref(e).searchTerm.value,
      "aria-expanded": unref(e).open.value,
      "aria-controls": unref(e).contentId,
      "aria-disabled": s.value ?? void 0,
      "aria-activedescendant": r.value,
      "aria-autocomplete": "list",
      role: "combobox",
      autocomplete: "false",
      onInput: d,
      onKeydown: [
        withKeys(withModifiers(i, ["prevent"]), ["down", "up"]),
        withKeys(unref(e).onInputEnter, ["enter"]),
        withKeys(withModifiers(u, ["prevent"]), ["home", "end"])
      ],
      onCompositionstart: unref(e).onCompositionStart,
      onCompositionend: unref(e).onCompositionEnd
    }, {
      default: withCtx(() => [
        renderSlot(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "type", "disabled", "value", "aria-expanded", "aria-controls", "aria-disabled", "aria-activedescendant", "onKeydown", "onCompositionstart", "onCompositionend"]));
  }
});
var qv = defineComponent({
  __name: "ComboboxAnchor",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const { forwardRef: t } = R2();
    return (e, n) => (openBlock(), createBlock(unref(Mt), { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(t),
          "as-child": e.asChild,
          as: e.as
        }, e.$attrs), {
          default: withCtx(() => [
            renderSlot(e.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as"])
      ]),
      _: 3
    }));
  }
});
var Yv = defineComponent({
  __name: "ComboboxTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = it(), n = computed(() => t.disabled || e.disabled.value || false);
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      type: l.as === "button" ? "button" : void 0,
      tabindex: "-1",
      "aria-label": "Show popup",
      "aria-haspopup": "listbox",
      "aria-expanded": unref(e).open.value,
      "aria-controls": unref(e).contentId,
      "data-state": unref(e).open.value ? "open" : "closed",
      disabled: n.value,
      "data-disabled": n.value ? "" : void 0,
      "aria-disabled": n.value ?? void 0,
      onClick: s[0] || (s[0] = (r) => unref(e).onOpenChange(!unref(e).open.value))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "aria-expanded", "aria-controls", "data-state", "disabled", "data-disabled", "aria-disabled"]));
  }
});
var Xv = defineComponent({
  __name: "ComboboxCancel",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = it();
    function n() {
      var l;
      e.searchTerm.value = "", (l = e.inputElement.value) == null || l.focus();
    }
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps({
      type: l.as === "button" ? "button" : void 0
    }, t, {
      tabindex: "-1",
      onClick: n
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
});
var [as, md] = te("ComboboxGroup");
var Zv = defineComponent({
  __name: "ComboboxGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { currentRef: e, currentElement: n } = R2(), l = ge(void 0, "radix-vue-combobox-group"), s = it(), r = ref(false);
    function i() {
      if (!n.value)
        return;
      const u = n.value.querySelectorAll("[data-radix-vue-combobox-item]:not([data-hidden])");
      r.value = !!u.length;
    }
    return Al(n, () => {
      nextTick(() => {
        i();
      });
    }, { childList: true }), watch(() => s.searchTerm.value, () => {
      nextTick(() => {
        i();
      });
    }, { immediate: true }), md({
      id: l
    }), (u, d) => withDirectives((openBlock(), createBlock(unref(O), mergeProps(t, {
      ref_key: "currentRef",
      ref: e,
      role: "group",
      "aria-labelledby": unref(l)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-labelledby"])), [
      [vShow, r.value]
    ]);
  }
});
var Jv = defineComponent({
  __name: "ComboboxLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = as({ id: "" });
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).id
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var [hd, yd] = te("ComboboxContent");
var gd = defineComponent({
  __name: "ComboboxContentImpl",
  props: {
    position: { default: "inline" },
    bodyLock: { type: Boolean },
    dismissable: { type: Boolean, default: true },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { position: l } = toRefs(e), s = it();
    ya(e.bodyLock);
    const { forwardRef: r, currentElement: i } = R2();
    ga(s.parentElement);
    const u = computed(() => e.position === "popper" ? e : {}), d = Ot(u.value);
    function c(v2) {
      s.onSelectedValueChange("");
    }
    onMounted(() => {
      s.onContentElementChange(i.value);
    });
    const f = {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-combobox-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-combobox-content-available-width": "var(--radix-popper-available-width)",
      "--radix-combobox-content-available-height": "var(--radix-popper-available-height)",
      "--radix-combobox-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-combobox-trigger-height": "var(--radix-popper-anchor-height)"
    };
    return yd({ position: l }), (v2, p) => (openBlock(), createBlock(unref(wa), null, {
      default: withCtx(() => [
        v2.dismissable ? (openBlock(), createBlock(unref(Ct), {
          key: 0,
          "as-child": "",
          "disable-outside-pointer-events": v2.disableOutsidePointerEvents,
          onDismiss: p[0] || (p[0] = (g) => unref(s).onOpenChange(false)),
          onFocusOutside: p[1] || (p[1] = (g) => {
            var m2;
            (m2 = unref(s).parentElement.value) != null && m2.contains(g.target) && g.preventDefault(), n("focusOutside", g);
          }),
          onInteractOutside: p[2] || (p[2] = (g) => n("interactOutside", g)),
          onEscapeKeyDown: p[3] || (p[3] = (g) => n("escapeKeyDown", g)),
          onPointerDownOutside: p[4] || (p[4] = (g) => {
            var m2;
            (m2 = unref(s).parentElement.value) != null && m2.contains(g.target) && g.preventDefault(), n("pointerDownOutside", g);
          })
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(unref(l) === "popper" ? unref(It) : unref(O)), mergeProps({ ...v2.$attrs, ...unref(d) }, {
              id: unref(s).contentId,
              ref: unref(r),
              role: "listbox",
              "data-state": unref(s).open.value ? "open" : "closed",
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none",
                ...unref(l) === "popper" ? f : {}
              },
              onPointerleave: c
            }), {
              default: withCtx(() => [
                renderSlot(v2.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "data-state", "style"]))
          ]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])) : (openBlock(), createBlock(resolveDynamicComponent(unref(l) === "popper" ? unref(It) : unref(O)), mergeProps({ key: 1 }, { ...v2.$attrs, ...u.value }, {
          id: unref(s).contentId,
          ref: unref(r),
          role: "listbox",
          "data-state": unref(s).open.value ? "open" : "closed",
          style: {
            // flex layout so we can place the scroll buttons properly
            display: "flex",
            flexDirection: "column",
            // reset the outline by default as the content MAY get focused
            outline: "none",
            ...unref(l) === "popper" ? f : {}
          },
          onPointerleave: c
        }), {
          default: withCtx(() => [
            renderSlot(v2.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "data-state", "style"]))
      ]),
      _: 3
    }));
  }
});
var Qv = defineComponent({
  __name: "ComboboxContent",
  props: {
    forceMount: { type: Boolean },
    position: {},
    bodyLock: { type: Boolean },
    dismissable: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t), { forwardRef: s } = R2(), r = it();
    return r.contentId || (r.contentId = ge(void 0, "radix-vue-combobox-content")), (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(r).open.value
    }, {
      default: withCtx(() => [
        createVNode(gd, mergeProps({ ...unref(l), ...i.$attrs }, { ref: unref(s) }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var em = defineComponent({
  __name: "ComboboxEmpty",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = it(), n = computed(() => e.filteredOptions.value.length === 0);
    return (l, s) => n.value ? (openBlock(), createBlock(unref(O), normalizeProps(mergeProps({ key: 0 }, t)), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("No options")
        ])
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
function Ja(a2) {
  const t = Ya({
    nonce: ref()
  });
  return computed(() => {
    var e;
    return (a2 == null ? void 0 : a2.value) || ((e = t.nonce) == null ? void 0 : e.value);
  });
}
var tm = defineComponent({
  __name: "ComboboxViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), { nonce: n } = toRefs(t), l = Ja(n);
    return (s, r) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps({ ...s.$attrs, ...t }, {
        ref: unref(e),
        "data-radix-combobox-viewport": "",
        role: "presentation",
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "auto"
        }
      }), {
        default: withCtx(() => [
          renderSlot(s.$slots, "default")
        ]),
        _: 3
      }, 16),
      createVNode(unref(O), {
        as: "style",
        nonce: unref(l)
      }, {
        default: withCtx(() => [
          createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-combobox-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
});
var [bd, Cd] = te("ComboboxItem");
var wd = "combobox.select";
var am = defineComponent({
  __name: "ComboboxItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { disabled: l } = toRefs(e), s = it();
    as({ id: "", options: ref([]) });
    const { forwardRef: r } = R2(), i = computed(
      () => {
        var m2, _;
        return s.multiple.value && Array.isArray(s.modelValue.value) ? (m2 = s.modelValue.value) == null ? void 0 : m2.some((C) => Qe(C, e.value)) : Qe((_ = s.modelValue) == null ? void 0 : _.value, e.value);
      }
    ), u = computed(() => Qe(s.selectedValue.value, e.value)), d = ge(void 0, "radix-vue-combobox-item"), c = ge(void 0, "radix-vue-combobox-option"), f = computed(() => s.isUserInputted.value ? s.searchTerm.value === "" || !!s.filteredOptions.value.find((m2) => Qe(m2, e.value)) : true);
    async function v2(m2) {
      n("select", m2), !(m2 != null && m2.defaultPrevented) && !l.value && m2 && s.onValueChange(e.value);
    }
    function p(m2) {
      if (!m2)
        return;
      const _ = { originalEvent: m2, value: e.value };
      jt(wd, v2, _);
    }
    async function g(m2) {
      await nextTick(), !m2.defaultPrevented && s.onSelectedValueChange(e.value);
    }
    if (e.value === "")
      throw new Error(
        "A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder."
      );
    return Cd({
      isSelected: i
    }), (m2, _) => (openBlock(), createBlock(unref(Qt), { value: m2.value }, {
      default: withCtx(() => [
        withDirectives(createVNode(unref(O), {
          id: unref(c),
          ref: unref(r),
          role: "option",
          tabindex: "-1",
          "aria-labelledby": unref(d),
          "data-highlighted": u.value ? "" : void 0,
          "aria-selected": i.value,
          "data-state": i.value ? "checked" : "unchecked",
          "aria-disabled": unref(l) || void 0,
          "data-disabled": unref(l) ? "" : void 0,
          as: m2.as,
          "as-child": m2.asChild,
          "data-hidden": f.value ? void 0 : true,
          onClick: p,
          onPointermove: g
        }, {
          default: withCtx(() => [
            renderSlot(m2.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(m2.value), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "as", "as-child", "data-hidden"]), [
          [vShow, f.value]
        ])
      ]),
      _: 3
    }, 8, ["value"]));
  }
});
var nm = defineComponent({
  __name: "ComboboxItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = bd();
    return (n, l) => unref(e).isSelected.value ? (openBlock(), createBlock(unref(O), mergeProps({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
var om = defineComponent({
  __name: "ComboboxSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, { "aria-hidden": "true" }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var lm = defineComponent({
  __name: "ComboboxArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2, e = it(), n = hd();
    return R2(), (l, s) => unref(e).open.value && unref(n).position.value === "popper" ? (openBlock(), createBlock(unref(Zt), normalizeProps(mergeProps({ key: 0 }, t)), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
var sm = defineComponent({
  __name: "ComboboxPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Qa = defineComponent({
  __name: "MenuAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Mt), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var lo = defineComponent({
  __name: "MenuArrow",
  props: {
    width: {},
    height: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Zt), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function _d() {
  const a2 = ref(false);
  return onMounted(() => {
    He("keydown", () => {
      a2.value = true;
    }, { capture: true, passive: true }), He(["pointerdown", "pointermove"], () => {
      a2.value = false;
    }, { capture: true, passive: true });
  }), a2;
}
var xd = Dl(_d);
var [Vt, ns] = te(["MenuRoot", "MenuSub"], "MenuContext");
var [_a, Sd] = te("MenuRoot");
var so = defineComponent({
  __name: "MenuRoot",
  props: {
    open: { type: Boolean, default: false },
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { modal: l, dir: s } = toRefs(e), r = we(s), i = ne(e, "open", n), u = ref(), d = xd();
    return ns({
      open: i,
      onOpenChange: (c) => {
        i.value = c;
      },
      content: u,
      onContentChange: (c) => {
        u.value = c;
      }
    }), Sd({
      onClose: () => {
        i.value = false;
      },
      isUsingKeyboardRef: d,
      dir: r,
      modal: l
    }), (c, f) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        renderSlot(c.$slots, "default")
      ]),
      _: 3
    }));
  }
});
var Ed = "rovingFocusGroup.onEntryFocus";
var Pd = { bubbles: false, cancelable: true };
var en = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Dd(a2, t) {
  return t !== "rtl" ? a2 : a2 === "ArrowLeft" ? "ArrowRight" : a2 === "ArrowRight" ? "ArrowLeft" : a2;
}
function os(a2, t, e) {
  const n = Dd(a2.key, e);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(n)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(n)))
    return en[n];
}
function ls(a2, t = false) {
  const e = me();
  for (const n of a2)
    if (n === e || (n.focus({ preventScroll: t }), me() !== e))
      return;
}
function $d(a2, t) {
  return a2.map((e, n) => a2[(t + n) % a2.length]);
}
var [Bd, Id] = te("RovingFocusGroup");
var Ft = defineComponent({
  __name: "RovingFocusGroup",
  props: {
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: false },
    currentTabStopId: {},
    defaultCurrentTabStopId: {},
    preventScrollOnEntryFocus: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(a2, { expose: t, emit: e }) {
    const n = a2, l = e, { loop: s, orientation: r, dir: i } = toRefs(n), u = we(i), d = ne(n, "currentTabStopId", l, {
      defaultValue: n.defaultCurrentTabStopId,
      passive: n.currentTabStopId === void 0
    }), c = ref(false), f = ref(false), v2 = ref(0), { getItems: p } = Ca();
    function g(_) {
      const C = !f.value;
      if (_.currentTarget && _.target === _.currentTarget && C && !c.value) {
        const $2 = new CustomEvent(Ed, Pd);
        if (_.currentTarget.dispatchEvent($2), l("entryFocus", $2), !$2.defaultPrevented) {
          const h2 = p().map((I) => I.ref).filter((I) => I.dataset.disabled !== ""), E = h2.find((I) => I.getAttribute("data-active") === "true"), P2 = h2.find(
            (I) => I.id === d.value
          ), D = [E, P2, ...h2].filter(
            Boolean
          );
          ls(D, n.preventScrollOnEntryFocus);
        }
      }
      f.value = false;
    }
    function m2() {
      setTimeout(() => {
        f.value = false;
      }, 1);
    }
    return t({
      getItems: p
    }), Id({
      loop: s,
      dir: u,
      orientation: r,
      currentTabStopId: d,
      onItemFocus: (_) => {
        d.value = _;
      },
      onItemShiftTab: () => {
        c.value = true;
      },
      onFocusableItemAdd: () => {
        v2.value++;
      },
      onFocusableItemRemove: () => {
        v2.value--;
      }
    }), (_, C) => (openBlock(), createBlock(unref(wa), null, {
      default: withCtx(() => [
        createVNode(unref(O), {
          tabindex: c.value || v2.value === 0 ? -1 : 0,
          "data-orientation": unref(r),
          as: _.as,
          "as-child": _.asChild,
          dir: unref(u),
          style: { outline: "none" },
          onMousedown: C[0] || (C[0] = ($2) => f.value = true),
          onMouseup: m2,
          onFocus: g,
          onBlur: C[1] || (C[1] = ($2) => c.value = false)
        }, {
          default: withCtx(() => [
            renderSlot(_.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
});
var Nt = defineComponent({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {},
    focusable: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    allowShiftKey: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, e = Bd(), n = computed(() => t.tabStopId || ge()), l = computed(
      () => e.currentTabStopId.value === n.value
    ), { getItems: s } = ea();
    onMounted(() => {
      t.focusable && e.onFocusableItemAdd();
    }), onUnmounted(() => {
      t.focusable && e.onFocusableItemRemove();
    });
    function r(i) {
      if (i.key === "Tab" && i.shiftKey) {
        e.onItemShiftTab();
        return;
      }
      if (i.target !== i.currentTarget)
        return;
      const u = os(
        i,
        e.orientation.value,
        e.dir.value
      );
      if (u !== void 0) {
        if (i.metaKey || i.ctrlKey || i.altKey || !t.allowShiftKey && i.shiftKey)
          return;
        i.preventDefault();
        let d = [...s().map((c) => c.ref).filter((c) => c.dataset.disabled !== "")];
        if (u === "last")
          d.reverse();
        else if (u === "prev" || u === "next") {
          u === "prev" && d.reverse();
          const c = d.indexOf(
            i.currentTarget
          );
          d = e.loop.value ? $d(d, c + 1) : d.slice(c + 1);
        }
        nextTick(() => ls(d));
      }
    }
    return (i, u) => (openBlock(), createBlock(unref(Qt), null, {
      default: withCtx(() => [
        createVNode(unref(O), {
          tabindex: l.value ? 0 : -1,
          "data-orientation": unref(e).orientation.value,
          "data-active": i.active,
          "data-disabled": i.focusable ? void 0 : "",
          as: i.as,
          "as-child": i.asChild,
          onMousedown: u[0] || (u[0] = (d) => {
            i.focusable ? unref(e).onItemFocus(n.value) : d.preventDefault();
          }),
          onFocus: u[1] || (u[1] = (d) => unref(e).onItemFocus(n.value)),
          onKeydown: r
        }, {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
      ]),
      _: 3
    }));
  }
});
var [ro, Td] = te("MenuContent");
var io = defineComponent({
  __name: "MenuContentImpl",
  props: mergeDefaults({
    loop: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    disableOutsideScroll: { type: Boolean },
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  }, {
    ...ts
  }),
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus", "dismiss"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Vt(), s = _a(), { trapFocus: r, disableOutsidePointerEvents: i, loop: u } = toRefs(e);
    Yn(), ya(i.value);
    const d = ref(""), c = ref(0), f = ref(0), v2 = ref(null), p = ref("right"), g = ref(0), m2 = ref(null), { createCollection: _ } = Fe(), { forwardRef: C, currentElement: $2 } = R2(), h2 = _($2);
    watch($2, (A2) => {
      l.onContentChange(A2);
    });
    const { handleTypeaheadSearch: E } = ba(h2);
    onUnmounted(() => {
      window.clearTimeout(c.value);
    });
    function P2(A2) {
      var j, H2;
      return p.value === ((j = v2.value) == null ? void 0 : j.side) && Cu(A2, (H2 = v2.value) == null ? void 0 : H2.area);
    }
    async function D(A2) {
      var F;
      n("openAutoFocus", A2), !A2.defaultPrevented && (A2.preventDefault(), (F = $2.value) == null || F.focus({
        preventScroll: true
      }));
    }
    function I(A2) {
      if (A2.defaultPrevented)
        return;
      const j = A2.target.closest("[data-radix-menu-content]") === A2.currentTarget, H2 = A2.ctrlKey || A2.altKey || A2.metaKey, Q = A2.key.length === 1, G2 = At(
        A2,
        me(),
        $2.value,
        {
          loop: u.value,
          arrowKeyOptions: "vertical",
          dir: s == null ? void 0 : s.dir.value,
          focus: true,
          attributeName: "[data-radix-vue-collection-item]:not([data-disabled])"
        }
      );
      if (G2)
        return G2 == null ? void 0 : G2.focus();
      if (A2.code === "Space" || (j && (A2.key === "Tab" && A2.preventDefault(), !H2 && Q && E(A2.key)), A2.target !== $2.value) || !hu.includes(A2.key))
        return;
      A2.preventDefault();
      const J2 = h2.value;
      ql.includes(A2.key) && J2.reverse(), In(J2);
    }
    function M(A2) {
      var F, j;
      (j = (F = A2 == null ? void 0 : A2.currentTarget) == null ? void 0 : F.contains) != null && j.call(F, A2.target) || (window.clearTimeout(c.value), d.value = "");
    }
    function V2(A2) {
      var H2;
      if (!da(A2))
        return;
      const F = A2.target, j = g.value !== A2.clientX;
      if ((H2 = A2 == null ? void 0 : A2.currentTarget) != null && H2.contains(F) && j) {
        const Q = A2.clientX > g.value ? "right" : "left";
        p.value = Q, g.value = A2.clientX;
      }
    }
    return Td({
      onItemEnter: (A2) => !!P2(A2),
      onItemLeave: (A2) => {
        var F;
        P2(A2) || ((F = $2.value) == null || F.focus(), m2.value = null);
      },
      onTriggerLeave: (A2) => !!P2(A2),
      searchRef: d,
      pointerGraceTimerRef: f,
      onPointerGraceIntentChange: (A2) => {
        v2.value = A2;
      }
    }), (A2, F) => (openBlock(), createBlock(unref(Za), {
      "as-child": "",
      trapped: unref(r),
      onMountAutoFocus: D,
      onUnmountAutoFocus: F[7] || (F[7] = (j) => n("closeAutoFocus", j))
    }, {
      default: withCtx(() => [
        createVNode(unref(Ct), {
          "as-child": "",
          "disable-outside-pointer-events": unref(i),
          onEscapeKeyDown: F[2] || (F[2] = (j) => n("escapeKeyDown", j)),
          onPointerDownOutside: F[3] || (F[3] = (j) => n("pointerDownOutside", j)),
          onFocusOutside: F[4] || (F[4] = (j) => n("focusOutside", j)),
          onInteractOutside: F[5] || (F[5] = (j) => n("interactOutside", j)),
          onDismiss: F[6] || (F[6] = (j) => n("dismiss"))
        }, {
          default: withCtx(() => [
            createVNode(unref(Ft), {
              "current-tab-stop-id": m2.value,
              "onUpdate:currentTabStopId": F[0] || (F[0] = (j) => m2.value = j),
              "as-child": "",
              orientation: "vertical",
              dir: unref(s).dir.value,
              loop: unref(u),
              onEntryFocus: F[1] || (F[1] = (j) => {
                n("entryFocus", j), unref(s).isUsingKeyboardRef.value || j.preventDefault();
              })
            }, {
              default: withCtx(() => [
                createVNode(unref(It), {
                  ref: unref(C),
                  role: "menu",
                  as: A2.as,
                  "as-child": A2.asChild,
                  "aria-orientation": "vertical",
                  "data-radix-menu-content": "",
                  "data-state": unref(to)(unref(l).open.value),
                  dir: unref(s).dir.value,
                  side: A2.side,
                  "side-offset": A2.sideOffset,
                  align: A2.align,
                  "align-offset": A2.alignOffset,
                  "avoid-collisions": A2.avoidCollisions,
                  "collision-boundary": A2.collisionBoundary,
                  "collision-padding": A2.collisionPadding,
                  "arrow-padding": A2.arrowPadding,
                  "prioritize-position": A2.prioritizePosition,
                  sticky: A2.sticky,
                  "hide-when-detached": A2.hideWhenDetached,
                  onKeydown: I,
                  onBlur: M,
                  onPointermove: V2
                }, {
                  default: withCtx(() => [
                    renderSlot(A2.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["as", "as-child", "data-state", "dir", "side", "side-offset", "align", "align-offset", "avoid-collisions", "collision-boundary", "collision-padding", "arrow-padding", "prioritize-position", "sticky", "hide-when-detached"])
              ]),
              _: 3
            }, 8, ["current-tab-stop-id", "dir", "loop"])
          ]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
});
var ss = defineComponent({
  inheritAttrs: false,
  __name: "MenuItemImpl",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = ro(), { forwardRef: n } = R2(), l = ref(false);
    async function s(i) {
      if (!i.defaultPrevented && da(i)) {
        if (t.disabled)
          e.onItemLeave(i);
        else if (!e.onItemEnter(i)) {
          const d = i.currentTarget;
          d == null || d.focus({ preventScroll: true });
        }
      }
    }
    async function r(i) {
      await nextTick(), !i.defaultPrevented && da(i) && e.onItemLeave(i);
    }
    return (i, u) => (openBlock(), createBlock(unref(Qt), {
      value: { textValue: i.textValue }
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(n),
          role: "menuitem",
          tabindex: "-1"
        }, i.$attrs, {
          as: i.as,
          "as-child": i.asChild,
          "data-radix-vue-collection-item": "",
          "aria-disabled": i.disabled || void 0,
          "data-disabled": i.disabled ? "" : void 0,
          "data-highlighted": l.value ? "" : void 0,
          onPointermove: s,
          onPointerleave: r,
          onFocus: u[0] || (u[0] = async (d) => {
            await nextTick(), !(d.defaultPrevented || i.disabled) && (l.value = true);
          }),
          onBlur: u[1] || (u[1] = async (d) => {
            await nextTick(), !d.defaultPrevented && (l.value = false);
          })
        }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["as", "as-child", "aria-disabled", "data-disabled", "data-highlighted"])
      ]),
      _: 3
    }, 8, ["value"]));
  }
});
var xa = defineComponent({
  __name: "MenuItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l, currentElement: s } = R2(), r = _a(), i = ro(), u = ref(false);
    async function d() {
      const c = s.value;
      if (!e.disabled && c) {
        const f = new CustomEvent(vu, {
          bubbles: true,
          cancelable: true
        });
        n("select", f), await nextTick(), f.defaultPrevented ? u.value = false : r.onClose();
      }
    }
    return (c, f) => (openBlock(), createBlock(ss, mergeProps(e, {
      ref: unref(l),
      onClick: d,
      onPointerdown: f[0] || (f[0] = () => {
        u.value = true;
      }),
      onPointerup: f[1] || (f[1] = async (v2) => {
        var p;
        await nextTick(), !v2.defaultPrevented && (u.value || (p = v2.currentTarget) == null || p.click());
      }),
      onKeydown: f[2] || (f[2] = async (v2) => {
        const p = unref(i).searchRef.value !== "";
        c.disabled || p && v2.key === " " || unref(Bn).includes(v2.key) && (v2.currentTarget.click(), v2.preventDefault());
      })
    }), {
      default: withCtx(() => [
        renderSlot(c.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [Rd, rs] = te(
  ["MenuCheckboxItem", "MenuRadioItem"],
  "MenuItemIndicatorContext"
);
var uo = defineComponent({
  __name: "MenuItemIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = Rd({
      checked: ref(false)
    });
    return (e, n) => (openBlock(), createBlock(unref(Pe), {
      present: e.forceMount || unref(La)(unref(t).checked.value) || unref(t).checked.value === true
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          as: e.as,
          "as-child": e.asChild,
          "data-state": unref(ao)(unref(t).checked.value)
        }, {
          default: withCtx(() => [
            renderSlot(e.$slots, "default")
          ]),
          _: 3
        }, 8, ["as", "as-child", "data-state"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var co = defineComponent({
  __name: "MenuCheckboxItem",
  props: {
    checked: { type: [Boolean, String], default: false },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select", "update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = ne(e, "checked", n);
    return rs({ checked: l }), (s, r) => (openBlock(), createBlock(xa, mergeProps({ role: "menuitemcheckbox" }, e, {
      "aria-checked": unref(La)(unref(l)) ? "mixed" : unref(l),
      "data-state": unref(ao)(unref(l)),
      onSelect: r[0] || (r[0] = async (i) => {
        n("select", i), unref(La)(unref(l)) ? l.value = true : l.value = !unref(l);
      })
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", { checked: unref(l) })
      ]),
      _: 3
    }, 16, ["aria-checked", "data-state"]));
  }
});
var Ad = defineComponent({
  __name: "MenuRootContentModal",
  props: {
    loop: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Se(e, n), s = Vt(), { forwardRef: r, currentElement: i } = R2();
    return ga(i), (u, d) => (openBlock(), createBlock(io, mergeProps(unref(l), {
      ref: unref(r),
      "trap-focus": unref(s).open.value,
      "disable-outside-pointer-events": unref(s).open.value,
      "disable-outside-scroll": true,
      onDismiss: d[0] || (d[0] = (c) => unref(s).onOpenChange(false)),
      onFocusOutside: d[1] || (d[1] = withModifiers((c) => n("focusOutside", c), ["prevent"]))
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus", "disable-outside-pointer-events"]));
  }
});
var Od = defineComponent({
  __name: "MenuRootContentNonModal",
  props: {
    loop: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t), s = Vt();
    return (r, i) => (openBlock(), createBlock(io, mergeProps(unref(l), {
      "trap-focus": false,
      "disable-outside-pointer-events": false,
      "disable-outside-scroll": false,
      onDismiss: i[0] || (i[0] = (u) => unref(s).onOpenChange(false))
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var fo = defineComponent({
  __name: "MenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t), s = Vt(), r = _a();
    return (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(s).open.value
    }, {
      default: withCtx(() => [
        unref(r).modal.value ? (openBlock(), createBlock(Ad, normalizeProps(mergeProps({ key: 0 }, { ...i.$attrs, ...unref(l) })), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (openBlock(), createBlock(Od, normalizeProps(mergeProps({ key: 1 }, { ...i.$attrs, ...unref(l) })), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var tn = defineComponent({
  __name: "MenuGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), mergeProps({ role: "group" }, t), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var po = defineComponent({
  __name: "MenuLabel",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var vo = defineComponent({
  __name: "MenuPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [kd, Md] = te("MenuRadioGroup");
var mo = defineComponent({
  __name: "MenuRadioGroup",
  props: {
    modelValue: { default: "" },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "modelValue", t);
    return Md({
      modelValue: l,
      onValueChange: (s) => {
        l.value = s;
      }
    }), (s, r) => (openBlock(), createBlock(tn, normalizeProps(guardReactiveProps(e)), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", { modelValue: unref(l) })
      ]),
      _: 3
    }, 16));
  }
});
var ho = defineComponent({
  __name: "MenuRadioItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { value: l } = toRefs(e), s = kd(), r = computed(
      () => s.modelValue.value === (l == null ? void 0 : l.value)
    );
    return rs({ checked: r }), (i, u) => (openBlock(), createBlock(xa, mergeProps({ role: "menuitemradio" }, e, {
      "aria-checked": r.value,
      "data-state": unref(ao)(r.value),
      onSelect: u[0] || (u[0] = async (d) => {
        n("select", d), unref(s).onValueChange(unref(l));
      })
    }), {
      default: withCtx(() => [
        renderSlot(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-checked", "data-state"]));
  }
});
var yo = defineComponent({
  __name: "MenuSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      role: "separator",
      "aria-orientation": "horizontal"
    }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [is, Vd] = te("MenuSub");
var go = defineComponent({
  __name: "MenuSub",
  props: {
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "open", t, {
      defaultValue: false,
      passive: e.open === void 0
    }), s = Vt(), r = ref(), i = ref();
    return watchEffect((u) => {
      (s == null ? void 0 : s.open.value) === false && (l.value = false), u(() => l.value = false);
    }), ns({
      open: l,
      onOpenChange: (u) => {
        l.value = u;
      },
      content: i,
      onContentChange: (u) => {
        i.value = u;
      }
    }), Vd({
      triggerId: "",
      contentId: "",
      trigger: r,
      onTriggerChange: (u) => {
        r.value = u;
      }
    }), (u, d) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }));
  }
});
var bo = defineComponent({
  __name: "MenuSubContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t), s = Vt(), r = _a(), i = is(), { forwardRef: u, currentElement: d } = R2();
    return i.contentId || (i.contentId = ge(void 0, "radix-vue-menu-sub-content")), (c, f) => (openBlock(), createBlock(unref(Pe), {
      present: c.forceMount || unref(s).open.value
    }, {
      default: withCtx(() => [
        createVNode(io, mergeProps(unref(l), {
          id: unref(i).contentId,
          ref: unref(u),
          "aria-labelledby": unref(i).triggerId,
          align: "start",
          side: unref(r).dir.value === "rtl" ? "left" : "right",
          "disable-outside-pointer-events": false,
          "disable-outside-scroll": false,
          "trap-focus": false,
          onOpenAutoFocus: f[0] || (f[0] = withModifiers((v2) => {
            var p;
            unref(r).isUsingKeyboardRef.value && ((p = unref(d)) == null || p.focus());
          }, ["prevent"])),
          onCloseAutoFocus: f[1] || (f[1] = withModifiers(() => {
          }, ["prevent"])),
          onFocusOutside: f[2] || (f[2] = (v2) => {
            v2.defaultPrevented || v2.target !== unref(i).trigger.value && unref(s).onOpenChange(false);
          }),
          onEscapeKeyDown: f[3] || (f[3] = (v2) => {
            unref(r).onClose(), v2.preventDefault();
          }),
          onKeydown: f[4] || (f[4] = (v2) => {
            var m2, _;
            const p = (m2 = v2.currentTarget) == null ? void 0 : m2.contains(v2.target), g = unref(gu)[unref(r).dir.value].includes(v2.key);
            p && g && (unref(s).onOpenChange(false), (_ = unref(i).trigger.value) == null || _.focus(), v2.preventDefault());
          })
        }), {
          default: withCtx(() => [
            renderSlot(c.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "aria-labelledby", "side"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Co = defineComponent({
  __name: "MenuSubTrigger",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Vt(), n = _a(), l = is(), s = ro(), r = ref(null);
    l.triggerId || (l.triggerId = ge(void 0, "radix-vue-menu-sub-trigger"));
    function i() {
      r.value && window.clearTimeout(r.value), r.value = null;
    }
    onUnmounted(() => {
      i();
    });
    function u(f) {
      !da(f) || s.onItemEnter(f) || !t.disabled && !e.open.value && !r.value && (s.onPointerGraceIntentChange(null), r.value = window.setTimeout(() => {
        e.onOpenChange(true), i();
      }, 100));
    }
    async function d(f) {
      var p, g;
      if (!da(f))
        return;
      i();
      const v2 = (p = e.content.value) == null ? void 0 : p.getBoundingClientRect();
      if (v2 != null && v2.width) {
        const m2 = (g = e.content.value) == null ? void 0 : g.dataset.side, _ = m2 === "right", C = _ ? -5 : 5, $2 = v2[_ ? "left" : "right"], h2 = v2[_ ? "right" : "left"];
        s.onPointerGraceIntentChange({
          area: [
            // Apply a bleed on clientX to ensure that our exit point is
            // consistently within polygon bounds
            { x: f.clientX + C, y: f.clientY },
            { x: $2, y: v2.top },
            { x: h2, y: v2.top },
            { x: h2, y: v2.bottom },
            { x: $2, y: v2.bottom }
          ],
          side: m2
        }), window.clearTimeout(s.pointerGraceTimerRef.value), s.pointerGraceTimerRef.value = window.setTimeout(
          () => s.onPointerGraceIntentChange(null),
          300
        );
      } else {
        if (s.onTriggerLeave(f))
          return;
        s.onPointerGraceIntentChange(null);
      }
    }
    async function c(f) {
      var p;
      const v2 = s.searchRef.value !== "";
      t.disabled || v2 && f.key === " " || yu[n.dir.value].includes(f.key) && (e.onOpenChange(true), await nextTick(), (p = e.content.value) == null || p.focus(), f.preventDefault());
    }
    return (f, v2) => (openBlock(), createBlock(Qa, { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(ss, mergeProps(t, {
          id: unref(l).triggerId,
          ref: (p) => {
            var g;
            (g = unref(l)) == null || g.onTriggerChange(p == null ? void 0 : p.$el);
          },
          "aria-haspopup": "menu",
          "aria-expanded": unref(e).open.value,
          "aria-controls": unref(l).contentId,
          "data-state": unref(to)(unref(e).open.value),
          onClick: v2[0] || (v2[0] = async (p) => {
            t.disabled || p.defaultPrevented || (p.currentTarget.focus(), unref(e).open.value || unref(e).onOpenChange(true));
          }),
          onPointermove: u,
          onPointerleave: d,
          onKeydown: c
        }), {
          default: withCtx(() => [
            renderSlot(f.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "data-state"])
      ]),
      _: 3
    }));
  }
});
var [us, Fd] = te("ContextMenuRoot");
var rm = defineComponent({
  inheritAttrs: false,
  __name: "ContextMenuRoot",
  props: {
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { dir: l, modal: s } = toRefs(e);
    R2();
    const r = we(l), i = ref(false);
    return Fd({
      open: i,
      onOpenChange: (u) => {
        i.value = u;
      },
      dir: r,
      modal: s
    }), watch(i, (u) => {
      n("update:open", u);
    }), (u, d) => (openBlock(), createBlock(unref(so), {
      open: i.value,
      "onUpdate:open": d[0] || (d[0] = (c) => i.value = c),
      dir: unref(r),
      modal: unref(s)
    }, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 8, ["open", "dir", "modal"]));
  }
});
function Zo(a2) {
  return a2.pointerType !== "mouse";
}
var im = defineComponent({
  inheritAttrs: false,
  __name: "ContextMenuTrigger",
  props: {
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, { disabled: e } = toRefs(t), { forwardRef: n } = R2(), l = us(), s = ref({ x: 0, y: 0 }), r = computed(() => ({
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        left: s.value.x,
        right: s.value.x,
        top: s.value.y,
        bottom: s.value.y,
        ...s.value
      })
    })), i = ref(0);
    function u() {
      window.clearTimeout(i.value);
    }
    function d(p) {
      s.value = { x: p.clientX, y: p.clientY }, l.onOpenChange(true);
    }
    async function c(p) {
      e.value || (await nextTick(), p.defaultPrevented || (u(), d(p), p.preventDefault()));
    }
    async function f(p) {
      e.value || (await nextTick(), Zo(p) && !p.defaultPrevented && (u(), i.value = window.setTimeout(() => d(p), 700)));
    }
    async function v2(p) {
      e.value || (await nextTick(), Zo(p) && !p.defaultPrevented && u());
    }
    return (p, g) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(Qa), {
        as: "template",
        element: r.value
      }, null, 8, ["element"]),
      createVNode(unref(O), mergeProps({
        ref: unref(n),
        as: p.as,
        "as-child": p.asChild,
        "data-state": unref(l).open.value ? "open" : "closed",
        "data-disabled": unref(e) ? "" : void 0,
        style: {
          WebkitTouchCallout: "none"
        }
      }, p.$attrs, {
        onContextmenu: c,
        onPointerdown: f,
        onPointermove: v2,
        onPointercancel: v2,
        onPointerup: v2
      }), {
        default: withCtx(() => [
          renderSlot(p.$slots, "default")
        ]),
        _: 3
      }, 16, ["as", "as-child", "data-state", "data-disabled"])
    ], 64));
  }
});
var um = defineComponent({
  __name: "ContextMenuPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(vo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var dm = defineComponent({
  __name: "ContextMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    alignOffset: { default: 0 },
    avoidCollisions: { type: Boolean, default: true },
    collisionBoundary: { default: () => [] },
    collisionPadding: { default: 0 },
    sticky: { default: "partial" },
    hideWhenDetached: { type: Boolean, default: false },
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    R2();
    const s = us(), r = ref(false);
    return (i, u) => (openBlock(), createBlock(unref(fo), mergeProps(unref(l), {
      side: "right",
      "side-offset": 2,
      align: "start",
      style: {
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      },
      onCloseAutoFocus: u[0] || (u[0] = (d) => {
        !d.defaultPrevented && r.value && d.preventDefault(), r.value = false;
      }),
      onInteractOutside: u[1] || (u[1] = (d) => {
        !d.defaultPrevented && !unref(s).modal.value && (r.value = true);
      })
    }), {
      default: withCtx(() => [
        renderSlot(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var cm = defineComponent({
  __name: "ContextMenuArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(lo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var fm = defineComponent({
  __name: "ContextMenuItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(xa), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var pm = defineComponent({
  __name: "ContextMenuGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(tn), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var vm = defineComponent({
  __name: "ContextMenuSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(yo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var mm = defineComponent({
  __name: "ContextMenuCheckboxItem",
  props: {
    checked: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select", "update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(co), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var hm = defineComponent({
  __name: "ContextMenuItemIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(uo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ym = defineComponent({
  __name: "ContextMenuLabel",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(po), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var gm = defineComponent({
  __name: "ContextMenuRadioGroup",
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(mo), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var bm = defineComponent({
  __name: "ContextMenuRadioItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(ho), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Cm = defineComponent({
  __name: "ContextMenuSub",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    const l = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    });
    return (s, r) => (openBlock(), createBlock(unref(go), {
      open: unref(l),
      "onUpdate:open": r[0] || (r[0] = (i) => isRef(l) ? l.value = i : null)
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", { open: unref(l) })
      ]),
      _: 3
    }, 8, ["open"]));
  }
});
var wm = defineComponent({
  __name: "ContextMenuSubContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(bo), mergeProps(unref(l), { style: {
      "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
      "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
      "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var _m = defineComponent({
  __name: "ContextMenuSubTrigger",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Co), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Nd = ["hour", "minute", "second"];
function Ht(a2) {
  const { formatter: t } = a2, e = Wn.map((n) => [n, a2.value[n]]);
  if ("hour" in a2.value) {
    const n = xl.map((s) => s === "dayPeriod" ? [s, t.dayPeriod($(a2.value))] : [s, a2.value[s]]), l = [...e, ...n];
    return Object.fromEntries(l);
  }
  return Object.fromEntries(e);
}
function ds(a2) {
  const t = Sl.map((e) => e === "dayPeriod" ? [e, "AM"] : [e, null]).filter(([e]) => e === "literal" || e === null || a2 === "minute" && e === "second" || a2 === "hour" && (e === "second" || e === "minute") ? false : a2 === "day" ? !Nd.includes(e) && e !== "dayPeriod" : true);
  return Object.fromEntries(t);
}
function Ld(a2) {
  const { segmentValues: t, formatter: e, locale: n } = a2;
  function l(r) {
    if ("hour" in t) {
      const i = t[r];
      return i !== null ? r === "day" && t.month !== null ? e.part(a2.dateRef.set({ [r]: i, month: t.month }), r, {
        hourCycle: a2.hourCycle === 24 ? "h24" : void 0
      }) : e.part(a2.dateRef.set({ [r]: i }), r, {
        hourCycle: a2.hourCycle === 24 ? "h24" : void 0
      }) : bn(r, "", n.value);
    } else {
      if (ti(r)) {
        const i = t[r];
        return i !== null ? r === "day" && t.month !== null ? e.part(a2.dateRef.set({ [r]: i, month: t.month }), r) : e.part(a2.dateRef.set({ [r]: i }), r) : bn(r, "", n.value);
      }
      return "";
    }
  }
  return Object.keys(t).reduce((r, i) => {
    if (!El(i))
      return r;
    if ("hour" in t && i === "dayPeriod") {
      const u = t[i];
      u !== null ? r[i] = u : r[i] = bn(i, "AM", n.value);
    } else
      r[i] = l(i);
    return r;
  }, {});
}
function zd(a2) {
  const { granularity: t, formatter: e, contentObj: n, hideTimeZone: l, hourCycle: s } = a2;
  return e.toParts(a2.dateRef, ai(t, s)).map((u) => ["literal", "timeZoneName", null].includes(u.type) || !El(u.type) ? {
    part: u.type,
    value: u.value
  } : {
    part: u.type,
    value: n[u.type]
  }).filter((u) => !(u.part === null || u.value === null || u.part === "timeZoneName" && (!m(a2.dateRef) || l)));
}
function Rn(a2) {
  const t = Ld(a2), e = zd({
    contentObj: t,
    ...a2
  });
  return {
    obj: t,
    arr: e
  };
}
function st(a2) {
  const t = nt();
  return a2 === t.ARROW_RIGHT || a2 === t.ARROW_LEFT;
}
function Dt(a2) {
  return !Number.isNaN(Number.parseInt(a2));
}
function ut(a2) {
  const t = nt();
  return !!([
    t.ENTER,
    t.ARROW_UP,
    t.ARROW_DOWN,
    t.ARROW_LEFT,
    t.ARROW_RIGHT,
    t.BACKSPACE,
    t.SPACE,
    "a",
    "A",
    "p",
    "P"
  ].includes(a2) || Dt(a2));
}
function Ka(a2) {
  return Array.from(a2.querySelectorAll("[data-radix-vue-date-field-segment]")).filter((t) => t.getAttribute("data-radix-vue-date-field-segment") !== "literal");
}
var Kd = ["id", "value", "name", "disabled", "required"];
var [Hd, Wd] = te("DateFieldRoot");
var jd = defineComponent({
  inheritAttrs: false,
  __name: "DateFieldRoot",
  props: {
    defaultValue: { default: void 0 },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    modelValue: {},
    hourCycle: {},
    granularity: {},
    hideTimeZone: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDateUnavailable: { type: Function, default: void 0 },
    name: {},
    required: { type: Boolean },
    id: {},
    dir: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:placeholder"],
  setup(a2, { expose: t, emit: e }) {
    const n = a2, l = e, { locale: s, disabled: r, readonly: i, isDateUnavailable: u, granularity: d, defaultValue: c, dir: f } = toRefs(n), v2 = qn(n.locale), p = we(f), { primitiveElement: g, currentElement: m2 } = Re(), _ = ref(/* @__PURE__ */ new Set());
    onMounted(() => {
      Ka(m2.value).forEach((K) => _.value.add(K));
    });
    const C = ne(n, "modelValue", l, {
      defaultValue: c.value,
      passive: n.modelValue === void 0
    }), $2 = Yt({
      defaultPlaceholder: n.placeholder,
      granularity: d.value,
      defaultValue: C.value,
      locale: n.locale
    }), h2 = ne(n, "placeholder", l, {
      defaultValue: n.defaultPlaceholder ?? $2.copy(),
      passive: n.placeholder === void 0
    }), E = computed(() => n.granularity ? z(h2.value) ? n.granularity : "day" : z(h2.value) ? "minute" : "day"), P2 = computed(() => {
      var K;
      return C.value ? !!((K = u.value) != null && K.call(u, C.value) || n.minValue && q(C.value, n.minValue) || n.maxValue && q(n.maxValue, C.value)) : false;
    }), D = ds(E.value), I = ref(C.value ? { ...Ht({ value: C.value, formatter: v2 }) } : { ...D }), M = computed(() => Rn({
      granularity: E.value,
      dateRef: h2.value,
      formatter: v2,
      hideTimeZone: n.hideTimeZone,
      hourCycle: n.hourCycle,
      segmentValues: I.value,
      locale: s
    })), V2 = computed(() => M.value.arr), A2 = computed(() => V2.value.filter(({ part: K }) => K !== "literal"));
    watch(s, (K) => {
      v2.getLocale() !== K && (v2.setLocale(K), nextTick(() => {
        _.value.clear(), Ka(m2.value).forEach((L) => _.value.add(L));
      }));
    }), watch(C, (K) => {
      !ht(K) && h2.value.compare(K) !== 0 && (h2.value = K.copy());
    }), watch([C, s], ([K]) => {
      ht(K) ? Object.values(I.value).every((L) => L !== null) && K === void 0 && (I.value = { ...D }) : I.value = { ...Ht({ value: K, formatter: v2 }) };
    });
    const F = ref(null), j = computed(() => Array.from(_.value).findIndex((K) => {
      var L;
      return K.getAttribute("data-radix-vue-date-field-segment") === ((L = F.value) == null ? void 0 : L.getAttribute("data-radix-vue-date-field-segment"));
    })), H2 = computed(() => {
      const K = p.value === "rtl" ? -1 : 1;
      return (K < 0 ? j.value < 0 : j.value > _.value.size - 1) ? null : Array.from(_.value)[j.value + K];
    }), Q = computed(() => {
      const K = p.value === "rtl" ? -1 : 1;
      return (K > 0 ? j.value < 0 : j.value > _.value.size - 1) ? null : Array.from(_.value)[j.value - K];
    }), G2 = nt();
    function J2(K) {
      var L, N2;
      st(K.key) && (K.key === G2.ARROW_LEFT && ((L = Q.value) == null || L.focus()), K.key === G2.ARROW_RIGHT && ((N2 = H2.value) == null || N2.focus()));
    }
    function z2(K) {
      F.value = K;
    }
    return Wd({
      isDateUnavailable: u.value,
      locale: s,
      modelValue: C,
      placeholder: h2,
      disabled: r,
      formatter: v2,
      hourCycle: n.hourCycle,
      readonly: i,
      segmentValues: I,
      isInvalid: P2,
      segmentContents: A2,
      elements: _,
      setFocusedElement: z2,
      focusNext() {
        var K;
        (K = H2.value) == null || K.focus();
      }
    }), t({
      /** Helper to set the focused element inside the DateField */
      setFocusedElement: z2
    }), (K, L) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps(K.$attrs, {
        ref_key: "primitiveElement",
        ref: g,
        role: "group",
        "aria-disabled": unref(r) ? true : void 0,
        "data-disabled": unref(r) ? "" : void 0,
        "data-readonly": unref(i) ? "" : void 0,
        "data-invalid": P2.value ? "" : void 0,
        dir: unref(p),
        onKeydown: withKeys(J2, ["left", "right"])
      }), {
        default: withCtx(() => [
          renderSlot(K.$slots, "default", {
            modelValue: unref(C),
            segments: V2.value,
            isInvalid: P2.value
          })
        ]),
        _: 3
      }, 16, ["aria-disabled", "data-disabled", "data-readonly", "data-invalid", "dir"]),
      createBaseVNode("input", {
        id: K.id,
        type: "text",
        tabindex: "-1",
        "aria-hidden": "true",
        value: unref(C) ? unref(C).toString() : "",
        name: K.name,
        disabled: unref(r),
        required: K.required,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        },
        onFocus: L[0] || (L[0] = (N2) => {
          var Z, Y;
          return (Y = (Z = Array.from(_.value)) == null ? void 0 : Z[0]) == null ? void 0 : Y.focus();
        })
      }, null, 40, Kd)
    ], 64));
  }
});
function wt(a2) {
  return {
    role: "spinbutton",
    contenteditable: true,
    tabindex: a2.disabled ? void 0 : 0,
    spellcheck: false,
    inputmode: "numeric",
    autocorrect: "off",
    enterkeyhint: "next",
    style: "caret-color: transparent;"
  };
}
function Ud(a2) {
  const { segmentValues: t, placeholder: e } = a2, n = t.day === null, l = t.day ? e.set({ day: t.day }) : e, s = l.day, r = 1, i = R(l), u = n ? "Empty" : `${s}`;
  return {
    ...wt(a2),
    "aria-label": "day,",
    "aria-valuemin": r,
    "aria-valuemax": i,
    "aria-valuenow": s,
    "aria-valuetext": u,
    "data-placeholder": n ? "" : void 0
  };
}
function Gd(a2) {
  const { segmentValues: t, placeholder: e, formatter: n } = a2, l = t.month === null, s = t.month ? e.set({ month: t.month }) : e, r = s.month, i = 1, u = 12, d = l ? "Empty" : `${r} - ${n.fullMonth($(s))}`;
  return {
    ...wt(a2),
    "aria-label": "month, ",
    contenteditable: true,
    "aria-valuemin": i,
    "aria-valuemax": u,
    "aria-valuenow": r,
    "aria-valuetext": d,
    "data-placeholder": l ? "" : void 0
  };
}
function qd(a2) {
  const { segmentValues: t, placeholder: e } = a2, n = t.year === null, l = t.year ? e.set({ year: t.year }) : e, s = 1, r = 9999, i = l.year, u = n ? "Empty" : `${i}`;
  return {
    ...wt(a2),
    "aria-label": "year, ",
    "aria-valuemin": s,
    "aria-valuemax": r,
    "aria-valuenow": i,
    "aria-valuetext": u,
    "data-placeholder": n ? "" : void 0
  };
}
function Yd(a2) {
  const { segmentValues: t, hourCycle: e, placeholder: n } = a2;
  if (!("hour" in t) || !("hour" in n))
    return {};
  const l = t.hour === null, s = t.hour ? n.set({ hour: t.hour }) : n, r = e === 12 ? 1 : 0, i = e === 12 ? 12 : 23, u = s.hour, d = l ? "Empty" : `${u} ${t.dayPeriod ?? ""}`;
  return {
    ...wt(a2),
    "aria-label": "hour, ",
    "aria-valuemin": r,
    "aria-valuemax": i,
    "aria-valuenow": u,
    "aria-valuetext": d,
    "data-placeholder": l ? "" : void 0
  };
}
function Xd(a2) {
  const { segmentValues: t, placeholder: e } = a2;
  if (!("minute" in t) || !("minute" in e))
    return {};
  const n = t.minute === null, s = (t.minute ? e.set({ minute: t.minute }) : e).minute, r = 0, i = 59, u = n ? "Empty" : `${s}`;
  return {
    ...wt(a2),
    "aria-label": "minute, ",
    "aria-valuemin": r,
    "aria-valuemax": i,
    "aria-valuenow": s,
    "aria-valuetext": u,
    "data-placeholder": n ? "" : void 0
  };
}
function Zd(a2) {
  const { segmentValues: t, placeholder: e } = a2;
  if (!("second" in t) || !("second" in e))
    return {};
  const n = t.second === null, s = (t.second ? e.set({ second: t.second }) : e).second, r = 0, i = 59, u = n ? "Empty" : `${s}`;
  return {
    ...wt(a2),
    "aria-label": "second, ",
    "aria-valuemin": r,
    "aria-valuemax": i,
    "aria-valuenow": s,
    "aria-valuetext": u,
    "data-placeholder": n ? "" : void 0
  };
}
function Jd(a2) {
  const { segmentValues: t } = a2;
  if (!("dayPeriod" in t))
    return {};
  const e = 0, n = 12, l = t.hour ? t.hour > 12 ? t.hour - 12 : t.hour : 0, s = t.dayPeriod ?? "AM";
  return {
    ...wt(a2),
    inputmode: "text",
    "aria-label": "AM/PM",
    "aria-valuemin": e,
    "aria-valuemax": n,
    "aria-valuenow": l,
    "aria-valuetext": s
  };
}
function Qd(a2) {
  return {
    "aria-hidden": true,
    "data-segment": "literal"
  };
}
function ec(a2) {
  return {
    role: "textbox",
    "aria-label": "timezone, ",
    "data-readonly": true,
    "data-segment": "timeZoneName",
    tabindex: a2.disabled ? void 0 : 0,
    style: "caret-color: transparent;"
  };
}
function tc(a2) {
  const { segmentValues: t, placeholder: e } = a2, n = 0, l = 0, s = 0, r = "era" in t ? t.era : e.era;
  return {
    ...wt(a2),
    "aria-label": "era",
    "aria-valuemin": n,
    "aria-valuemax": l,
    "aria-valuenow": s,
    "aria-valuetext": r
  };
}
var ac = {
  day: {
    attrs: Ud
  },
  month: {
    attrs: Gd
  },
  year: {
    attrs: qd
  },
  hour: {
    attrs: Yd
  },
  minute: {
    attrs: Xd
  },
  second: {
    attrs: Zd
  },
  dayPeriod: {
    attrs: Jd
  },
  literal: {
    attrs: Qd
  },
  timeZoneName: {
    attrs: ec
  },
  era: {
    attrs: tc
  }
};
function cs(a2) {
  const t = nt();
  function e({ e: h2, part: E, dateRef: P2, prevValue: D }) {
    const I = h2.key === t.ARROW_UP ? 1 : -1, M = 0, V2 = 59;
    if (D === null)
      return I > 0 ? M : V2;
    const A2 = [E, I];
    return P2.set({ [E]: D }).cycle(...A2)[E];
  }
  function n(h2) {
    if (a2.hasLeftFocus.value = false, h2 === null)
      return h2;
    const E = h2.toString();
    return E.length === 1 ? (a2.modelValue.value = void 0, null) : Number.parseInt(E.slice(0, -1));
  }
  function l({ e: h2, part: E, dateRef: P2, prevValue: D, hourCycle: I }) {
    const M = h2.key === t.ARROW_UP ? 1 : -1;
    if (D === null)
      return P2[E];
    if (E === "hour" && "hour" in P2) {
      const A2 = [E, M, { hourCycle: I }];
      return P2.set({ [E]: D }).cycle(...A2)[E];
    }
    const V2 = [E, M];
    return E === "day" && a2.segmentValues.value.month !== null ? P2.set({ [E]: D, month: a2.segmentValues.value.month }).cycle(...V2)[E] : P2.set({ [E]: D }).cycle(...V2)[E];
  }
  function s(h2, E, P2) {
    let D = false;
    const I = Math.floor(h2 / 10);
    if (a2.hasLeftFocus.value && (a2.hasLeftFocus.value = false, P2 = null), P2 === null)
      return E === 0 ? (a2.lastKeyZero.value = true, { value: null, moveToNext: D }) : ((a2.lastKeyZero.value || E > I) && (D = true), a2.lastKeyZero.value = false, { value: E, moveToNext: D });
    const M = P2.toString().length, V2 = Number.parseInt(P2.toString() + E.toString());
    return M === 2 || V2 > h2 ? ((E > I || V2 > h2) && (D = true), { value: E, moveToNext: D }) : (D = true, { value: V2, moveToNext: D });
  }
  function r(h2, E) {
    let D = false;
    const I = Math.floor(59 / 10);
    if (a2.hasLeftFocus.value && (a2.hasLeftFocus.value = false, E = null), E === null)
      return h2 === 0 ? (a2.lastKeyZero.value = true, { value: 0, moveToNext: D }) : ((a2.lastKeyZero.value || h2 > I) && (D = true), a2.lastKeyZero.value = false, { value: h2, moveToNext: D });
    const M = E.toString().length, V2 = Number.parseInt(E.toString() + h2.toString());
    return M === 2 || V2 > 59 ? (h2 > I && (D = true), { value: h2, moveToNext: D }) : (D = true, { value: V2, moveToNext: D });
  }
  function i(h2, E) {
    let D = false;
    const I = Math.floor(24 / 10);
    if (a2.hasLeftFocus.value && (a2.hasLeftFocus.value = false, E = null), E === null)
      return h2 === 0 ? (a2.lastKeyZero.value = true, { value: 0, moveToNext: D }) : ((a2.lastKeyZero.value || h2 > I) && (D = true), a2.lastKeyZero.value = false, { value: h2, moveToNext: D });
    const M = E.toString().length, V2 = Number.parseInt(E.toString() + h2.toString());
    return M === 2 || V2 > 24 ? (h2 > I && (D = true), { value: h2, moveToNext: D }) : (D = true, { value: V2, moveToNext: D });
  }
  function u(h2, E) {
    let P2 = false;
    if (a2.hasLeftFocus.value && (a2.hasLeftFocus.value = false, E = null), E === null)
      return { value: h2 === 0 ? 1 : h2, moveToNext: P2 };
    const D = E.toString() + h2.toString();
    return D.length > 4 ? { value: h2 === 0 ? 1 : h2, moveToNext: P2 } : (D.length === 4 && (P2 = true), { value: Number.parseInt(D), moveToNext: P2 });
  }
  const d = computed(() => {
    var h2;
    return ((h2 = ac[a2.part]) == null ? void 0 : h2.attrs({
      disabled: a2.disabled.value,
      placeholder: a2.placeholder.value,
      hourCycle: a2.hourCycle,
      segmentValues: a2.segmentValues.value,
      formatter: a2.formatter
    })) ?? {};
  });
  function c(h2) {
    if (!ut(h2.key) || st(h2.key))
      return;
    const E = a2.segmentValues.value.day;
    if (h2.key === t.ARROW_DOWN || h2.key === t.ARROW_UP) {
      a2.segmentValues.value.day = l({ e: h2, part: "day", dateRef: a2.placeholder.value, prevValue: E });
      return;
    }
    if (Dt(h2.key)) {
      const P2 = Number.parseInt(h2.key), D = a2.segmentValues.value.month, I = D ? R(a2.placeholder.value.set({ month: D })) : R(a2.placeholder.value), { value: M, moveToNext: V2 } = s(I, P2, E);
      a2.segmentValues.value.day = M, V2 && a2.focusNext();
    }
    h2.key === t.BACKSPACE && (a2.hasLeftFocus.value = false, a2.segmentValues.value.day = n(E));
  }
  function f(h2) {
    if (!ut(h2.key) || st(h2.key))
      return;
    const E = a2.segmentValues.value.month;
    if (h2.key === t.ARROW_DOWN || h2.key === t.ARROW_UP) {
      a2.segmentValues.value.month = l({ e: h2, part: "month", dateRef: a2.placeholder.value, prevValue: E });
      return;
    }
    if (Dt(h2.key)) {
      const P2 = Number.parseInt(h2.key), { value: D, moveToNext: I } = s(12, P2, E);
      a2.segmentValues.value.month = D, I && a2.focusNext();
    }
    h2.key === t.BACKSPACE && (a2.hasLeftFocus.value = false, a2.segmentValues.value.month = n(E));
  }
  function v2(h2) {
    if (!ut(h2.key) || st(h2.key))
      return;
    const E = a2.segmentValues.value.year;
    if (h2.key === t.ARROW_DOWN || h2.key === t.ARROW_UP) {
      a2.segmentValues.value.year = l({ e: h2, part: "year", dateRef: a2.placeholder.value, prevValue: E });
      return;
    }
    if (Dt(h2.key)) {
      const P2 = Number.parseInt(h2.key), { value: D, moveToNext: I } = u(P2, E);
      a2.segmentValues.value.year = D, I && a2.focusNext();
    }
    h2.key === t.BACKSPACE && (a2.hasLeftFocus.value = false, a2.segmentValues.value.year = n(E));
  }
  function p(h2) {
    const E = a2.placeholder.value;
    if (!ut(h2.key) || st(h2.key) || !("hour" in E) || !("hour" in a2.segmentValues.value))
      return;
    const P2 = a2.segmentValues.value.hour, D = a2.hourCycle;
    if (h2.key === t.ARROW_UP || h2.key === t.ARROW_DOWN) {
      a2.segmentValues.value.hour = l({ e: h2, part: "hour", dateRef: a2.placeholder.value, prevValue: P2, hourCycle: D }), "dayPeriod" in a2.segmentValues.value && (a2.segmentValues.value.hour < 12 ? a2.segmentValues.value.dayPeriod = "AM" : a2.segmentValues.value.hour && (a2.segmentValues.value.dayPeriod = "PM"));
      return;
    }
    if (Dt(h2.key)) {
      const I = Number.parseInt(h2.key), { value: M, moveToNext: V2 } = i(I, P2);
      "dayPeriod" in a2.segmentValues.value && M && M > 12 ? a2.segmentValues.value.dayPeriod = "PM" : "dayPeriod" in a2.segmentValues.value && M && (a2.segmentValues.value.dayPeriod = "AM"), a2.segmentValues.value.hour = M, V2 && a2.focusNext();
    }
    h2.key === t.BACKSPACE && (a2.hasLeftFocus.value = false, a2.segmentValues.value.hour = n(P2));
  }
  function g(h2) {
    const E = a2.placeholder.value;
    if (!ut(h2.key) || st(h2.key) || !("minute" in E) || !("minute" in a2.segmentValues.value))
      return;
    const P2 = a2.segmentValues.value.minute;
    if (a2.segmentValues.value.minute = e({ e: h2, part: "minute", dateRef: a2.placeholder.value, prevValue: P2 }), Dt(h2.key)) {
      const D = Number.parseInt(h2.key), { value: I, moveToNext: M } = r(D, P2);
      a2.segmentValues.value.minute = I, M && a2.focusNext();
    }
    h2.key === t.BACKSPACE && (a2.hasLeftFocus.value = false, a2.segmentValues.value.minute = n(P2));
  }
  function m2(h2) {
    const E = a2.placeholder.value;
    if (!ut(h2.key) || st(h2.key) || !("second" in E) || !("second" in a2.segmentValues.value))
      return;
    const P2 = a2.segmentValues.value.second;
    if (a2.segmentValues.value.second = e({ e: h2, part: "second", dateRef: a2.placeholder.value, prevValue: P2 }), Dt(h2.key)) {
      const D = Number.parseInt(h2.key), { value: I, moveToNext: M } = r(D, P2);
      a2.segmentValues.value.second = I, M && a2.focusNext();
    }
    h2.key === t.BACKSPACE && (a2.hasLeftFocus.value = false, a2.segmentValues.value.second = n(P2));
  }
  function _(h2) {
    if (!((!ut(h2.key) || st(h2.key)) && h2.key !== "a" && h2.key !== "p" || !("hour" in a2.placeholder.value) || !("dayPeriod" in a2.segmentValues.value))) {
      if (h2.key === t.ARROW_UP || h2.key === t.ARROW_DOWN) {
        if (a2.segmentValues.value.dayPeriod === "AM") {
          a2.segmentValues.value.dayPeriod = "PM", a2.segmentValues.value.hour = a2.segmentValues.value.hour + 12;
          return;
        }
        a2.segmentValues.value.dayPeriod = "AM", a2.segmentValues.value.hour = a2.segmentValues.value.hour - 12;
        return;
      }
      if (["a", "A"].includes(h2.key) && a2.segmentValues.value.dayPeriod !== "AM") {
        a2.segmentValues.value.dayPeriod = "AM", a2.segmentValues.value.hour = a2.segmentValues.value.hour - 12;
        return;
      }
      ["p", "P"].includes(h2.key) && a2.segmentValues.value.dayPeriod !== "PM" && (a2.segmentValues.value.dayPeriod = "PM", a2.segmentValues.value.hour = a2.segmentValues.value.hour + 12);
    }
  }
  function C(h2) {
    a2.disabled.value && h2.preventDefault();
  }
  function $2(h2) {
    const E = a2.disabled.value, P2 = a2.readonly.value;
    if (h2.key !== t.TAB && h2.preventDefault(), E || P2)
      return;
    if ({
      day: c,
      month: f,
      year: v2,
      hour: p,
      minute: g,
      second: m2,
      dayPeriod: _,
      timeZoneName: () => {
      }
    }[a2.part](h2), ![t.ARROW_LEFT, t.ARROW_RIGHT].includes(h2.key) && h2.key !== t.TAB && h2.key !== t.SHIFT && ut(h2.key) && Object.values(a2.segmentValues.value).every((I) => I !== null)) {
      const I = { ...a2.segmentValues.value };
      let M = a2.placeholder.value.copy();
      Object.keys(I).forEach((V2) => {
        const A2 = I[V2];
        M = M.set({ [V2]: A2 });
      }), a2.modelValue.value = M.copy();
    }
  }
  return {
    handleSegmentClick: C,
    handleSegmentKeydown: $2,
    attributes: d
  };
}
var nc = defineComponent({
  __name: "DateFieldInput",
  props: {
    part: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Hd(), n = ref(true), l = ref(false), {
      handleSegmentClick: s,
      handleSegmentKeydown: r,
      attributes: i
    } = cs({
      hasLeftFocus: n,
      lastKeyZero: l,
      placeholder: e.placeholder,
      hourCycle: e.hourCycle,
      segmentValues: e.segmentValues,
      formatter: e.formatter,
      part: t.part,
      disabled: e.disabled,
      readonly: e.readonly,
      focusNext: e.focusNext,
      modelValue: e.modelValue
    }), u = computed(() => e.disabled.value), d = computed(() => e.readonly.value), c = computed(() => e.isInvalid.value);
    return (f, v2) => (openBlock(), createBlock(unref(O), mergeProps({
      as: f.as,
      "as-child": f.asChild
    }, unref(i), {
      contenteditable: u.value || d.value ? false : f.part !== "literal",
      "data-radix-vue-date-field-segment": f.part,
      "aria-disabled": u.value ? true : void 0,
      "aria-readonly": d.value ? true : void 0,
      "data-disabled": u.value ? "" : void 0,
      "data-invalid": c.value ? "" : void 0,
      "aria-invalid": c.value ? true : void 0
    }, toHandlers(f.part !== "literal" ? {
      mousedown: unref(s),
      keydown: unref(r),
      focusout: () => {
        n.value = true;
      },
      focusin: (p) => {
        unref(e).setFocusedElement(p.target);
      }
    } : {})), {
      default: withCtx(() => [
        renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 16, ["as", "as-child", "contenteditable", "data-radix-vue-date-field-segment", "aria-disabled", "aria-readonly", "data-disabled", "data-invalid", "aria-invalid"]));
  }
});
var xm = defineComponent({
  __name: "DatePickerHeader",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Wu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Sm = defineComponent({
  __name: "DatePickerHeading",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(ju), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(({ headingValue: l }) => [
        renderSlot(e.$slots, "default", { headingValue: l }, () => [
          createTextVNode(toDisplayString(l), 1)
        ])
      ]),
      _: 3
    }, 16));
  }
});
var Em = defineComponent({
  __name: "DatePickerGrid",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Uu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Pm = defineComponent({
  __name: "DatePickerCell",
  props: {
    date: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Gu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Dm = defineComponent({
  __name: "DatePickerHeadCell",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(qu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var $m = defineComponent({
  __name: "DatePickerNext",
  props: {
    step: {},
    nextPage: { type: Function },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Yu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Bm = defineComponent({
  __name: "DatePickerPrev",
  props: {
    step: {},
    prevPage: { type: Function },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Xu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Im = defineComponent({
  __name: "DatePickerGridHead",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Zu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Tm = defineComponent({
  __name: "DatePickerGridBody",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Ju), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Rm = defineComponent({
  __name: "DatePickerGridRow",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Qu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Am = defineComponent({
  __name: "DatePickerCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(ed), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Om = defineComponent({
  __name: "DatePickerInput",
  props: {
    part: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(nc), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [wo, oc] = te("DatePickerRoot");
var km = defineComponent({
  inheritAttrs: false,
  __name: "DatePickerRoot",
  props: {
    defaultValue: { default: void 0 },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    modelValue: {},
    hourCycle: {},
    granularity: {},
    hideTimeZone: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDateUnavailable: { type: Function, default: void 0 },
    name: {},
    required: { type: Boolean },
    id: {},
    dir: {},
    asChild: { type: Boolean },
    as: {},
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    modal: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: void 0 },
    pagedNavigation: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    weekdayFormat: { default: "narrow" },
    fixedWeeks: { type: Boolean, default: false },
    numberOfMonths: { default: 1 },
    preventDeselect: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:placeholder", "update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, {
      locale: l,
      disabled: s,
      readonly: r,
      pagedNavigation: i,
      weekStartsOn: u,
      weekdayFormat: d,
      fixedWeeks: c,
      numberOfMonths: f,
      preventDeselect: v2,
      isDateDisabled: p,
      isDateUnavailable: g,
      defaultOpen: m2,
      modal: _,
      id: C,
      name: $2,
      required: h2,
      minValue: E,
      maxValue: P2,
      granularity: D,
      hideTimeZone: I,
      hourCycle: M,
      defaultValue: V2,
      dir: A2
    } = toRefs(e), F = we(A2), j = ne(e, "modelValue", n, {
      defaultValue: V2.value,
      passive: e.modelValue === void 0
    }), H2 = computed(() => Yt({
      defaultPlaceholder: e.placeholder,
      granularity: e.granularity,
      defaultValue: j.value,
      locale: e.locale
    })), Q = ne(e, "placeholder", n, {
      defaultValue: e.defaultPlaceholder ?? H2.value.copy(),
      passive: e.placeholder === void 0
    }), G2 = ne(e, "open", n, {
      defaultValue: m2.value,
      passive: e.open === void 0
    }), J2 = ref();
    return watch(j, (z2) => {
      z2 && z2.compare(Q.value) !== 0 && (Q.value = z2.copy());
    }), oc({
      isDateUnavailable: g.value,
      isDateDisabled: p.value,
      locale: l,
      disabled: s,
      pagedNavigation: i,
      weekStartsOn: u,
      weekdayFormat: d,
      fixedWeeks: c,
      numberOfMonths: f,
      readonly: r,
      preventDeselect: v2,
      modelValue: j,
      placeholder: Q,
      defaultOpen: m2,
      modal: _,
      open: G2,
      id: C,
      name: $2,
      required: h2,
      minValue: E,
      maxValue: P2,
      granularity: D,
      hideTimeZone: I,
      hourCycle: M,
      dateFieldRef: J2,
      dir: F,
      onDateChange(z2) {
        !z2 || !j.value ? j.value = (z2 == null ? void 0 : z2.copy()) ?? void 0 : !v2.value && z2 && j.value.compare(z2) === 0 ? j.value = void 0 : j.value = z2.copy();
      },
      onPlaceholderChange(z2) {
        Q.value = z2.copy();
      }
    }), (z2, K) => (openBlock(), createBlock(unref(Cs), {
      open: unref(G2),
      "onUpdate:open": K[0] || (K[0] = (L) => isRef(G2) ? G2.value = L : null),
      "default-open": unref(m2),
      modal: unref(_)
    }, {
      default: withCtx(() => [
        renderSlot(z2.$slots, "default")
      ]),
      _: 3
    }, 8, ["open", "default-open", "modal"]));
  }
});
var Mm = defineComponent({
  __name: "DatePickerCalendar",
  setup(a2) {
    const t = wo();
    return (e, n) => (openBlock(), createBlock(unref(Hu), mergeProps({
      isDateDisabled: unref(t).isDateDisabled,
      isDateUnavailable: unref(t).isDateUnavailable,
      minValue: unref(t).minValue.value,
      maxValue: unref(t).maxValue.value,
      locale: unref(t).locale.value,
      disabled: unref(t).disabled.value,
      pagedNavigation: unref(t).pagedNavigation.value,
      weekStartsOn: unref(t).weekStartsOn.value,
      weekdayFormat: unref(t).weekdayFormat.value,
      fixedWeeks: unref(t).fixedWeeks.value,
      numberOfMonths: unref(t).numberOfMonths.value,
      readonly: unref(t).readonly.value,
      preventDeselect: unref(t).preventDeselect.value,
      dir: unref(t).dir.value
    }, {
      "model-value": unref(t).modelValue.value,
      placeholder: unref(t).placeholder.value,
      "initial-focus": "",
      multiple: false,
      "onUpdate:modelValue": n[0] || (n[0] = (l) => {
        l && unref(t).modelValue.value && unref($14e0f24ef4ac5c92$export$91b62ebf2ba703ee)(l, unref(t).modelValue.value) || unref(t).onDateChange(l);
      }),
      "onUpdate:placeholder": n[1] || (n[1] = (l) => {
        unref($14e0f24ef4ac5c92$export$91b62ebf2ba703ee)(l, unref(t).placeholder.value) || unref(t).onPlaceholderChange(l);
      })
    }), {
      default: withCtx(({ weekDays: l, grid: s, date: r, weekStartsOn: i, locale: u, fixedWeeks: d }) => [
        renderSlot(e.$slots, "default", {
          date: r,
          grid: s,
          weekDays: l,
          weekStartsOn: i,
          locale: u,
          fixedWeeks: d
        })
      ]),
      _: 3
    }, 16, ["model-value", "placeholder"]));
  }
});
var Vm = defineComponent({
  __name: "DatePickerField",
  setup(a2) {
    const t = wo();
    return (e, n) => (openBlock(), createBlock(unref(jd), mergeProps({
      ref: unref(t).dateFieldRef,
      "model-value": unref(t).modelValue.value,
      placeholder: unref(t).placeholder.value
    }, {
      id: unref(t).id.value,
      name: unref(t).name.value,
      disabled: unref(t).disabled.value,
      minValue: unref(t).minValue.value,
      maxValue: unref(t).maxValue.value,
      readonly: unref(t).readonly.value,
      hourCycle: unref(t).hourCycle.value,
      granularity: unref(t).granularity.value,
      hideTimeZone: unref(t).hideTimeZone.value,
      locale: unref(t).locale.value,
      isDateUnavailable: unref(t).isDateUnavailable,
      required: unref(t).required.value,
      dir: unref(t).dir.value
    }, {
      "onUpdate:modelValue": n[0] || (n[0] = (l) => {
        l && unref(t).modelValue.value && l.compare(unref(t).modelValue.value) === 0 || unref(t).onDateChange(l);
      }),
      "onUpdate:placeholder": n[1] || (n[1] = (l) => {
        l.compare(unref(t).placeholder.value) !== 0 && unref(t).onPlaceholderChange(l);
      })
    }), {
      default: withCtx(({ segments: l, modelValue: s }) => [
        renderSlot(e.$slots, "default", {
          segments: l,
          modelValue: s
        })
      ]),
      _: 3
    }, 16, ["model-value", "placeholder"]));
  }
});
var Fm = defineComponent({
  __name: "DatePickerAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Ds), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Nm = defineComponent({
  __name: "DatePickerArrow",
  props: {
    width: {},
    height: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Es), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Lm = defineComponent({
  __name: "DatePickerClose",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Ps), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var zm = defineComponent({
  __name: "DatePickerTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = wo();
    return (n, l) => (openBlock(), createBlock(unref(ws), mergeProps({ "data-radix-vue-date-field-segment": "trigger" }, t, {
      disabled: unref(e).disabled.value,
      onFocusin: l[0] || (l[0] = (s) => {
        var r;
        (r = unref(e).dateFieldRef.value) == null || r.setFocusedElement(s.target);
      })
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["disabled"]));
  }
});
var Km = defineComponent({
  __name: "DatePickerContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return (s, r) => (openBlock(), createBlock(unref(_s), null, {
      default: withCtx(() => [
        createVNode(unref(Ss), normalizeProps(guardReactiveProps({ ...unref(l), ...s.$attrs })), {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }));
  }
});
var Hm = defineComponent({
  __name: "DateRangePickerHeader",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(gf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Wm = defineComponent({
  __name: "DateRangePickerHeading",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(bf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(({ headingValue: l }) => [
        renderSlot(e.$slots, "default", { headingValue: l }, () => [
          createTextVNode(toDisplayString(l), 1)
        ])
      ]),
      _: 3
    }, 16));
  }
});
var jm = defineComponent({
  __name: "DateRangePickerGrid",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Cf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Um = defineComponent({
  __name: "DateRangePickerCell",
  props: {
    date: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(wf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Gm = defineComponent({
  __name: "DateRangePickerHeadCell",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(_f), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var qm = defineComponent({
  __name: "DateRangePickerNext",
  props: {
    step: {},
    nextPage: { type: Function },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(xf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ym = defineComponent({
  __name: "DateRangePickerPrev",
  props: {
    step: {},
    prevPage: { type: Function },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Sf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Xm = defineComponent({
  __name: "DateRangePickerGridHead",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Ef), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Zm = defineComponent({
  __name: "DateRangePickerGridBody",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Pf), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Jm = defineComponent({
  __name: "DateRangePickerGridRow",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Df), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Qm = defineComponent({
  __name: "DateRangePickerCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref($f), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var eh = defineComponent({
  __name: "DateRangePickerInput",
  props: {
    part: {},
    type: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(dc), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [_o, lc] = te("DateRangePickerRoot");
var th = defineComponent({
  inheritAttrs: false,
  __name: "DateRangePickerRoot",
  props: {
    defaultValue: { default: () => ({ start: void 0, end: void 0 }) },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    modelValue: {},
    hourCycle: {},
    granularity: {},
    hideTimeZone: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDateUnavailable: { type: Function, default: void 0 },
    name: {},
    required: { type: Boolean },
    id: {},
    dir: {},
    asChild: { type: Boolean },
    as: {},
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    modal: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: void 0 },
    pagedNavigation: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    weekdayFormat: { default: "narrow" },
    fixedWeeks: { type: Boolean, default: false },
    numberOfMonths: { default: 1 },
    preventDeselect: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:placeholder", "update:startValue", "update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, {
      locale: l,
      disabled: s,
      readonly: r,
      pagedNavigation: i,
      weekStartsOn: u,
      weekdayFormat: d,
      fixedWeeks: c,
      numberOfMonths: f,
      preventDeselect: v2,
      isDateDisabled: p,
      isDateUnavailable: g,
      defaultOpen: m2,
      modal: _,
      id: C,
      name: $2,
      required: h2,
      minValue: E,
      maxValue: P2,
      granularity: D,
      hideTimeZone: I,
      hourCycle: M,
      dir: V2
    } = toRefs(e), A2 = we(V2), F = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue ?? { start: void 0, end: void 0 },
      passive: e.modelValue === void 0
    }), j = Yt({
      defaultPlaceholder: e.placeholder,
      granularity: e.granularity,
      defaultValue: F.value.start,
      locale: e.locale
    }), H2 = ne(e, "placeholder", n, {
      defaultValue: e.defaultPlaceholder ?? j.copy(),
      passive: e.placeholder === void 0
    }), Q = ne(e, "open", n, {
      defaultValue: m2.value,
      passive: e.open === void 0
    }), G2 = ref();
    return watch(F, (J2) => {
      J2.start && J2.start.compare(H2.value) !== 0 && (H2.value = J2.start.copy());
    }), lc({
      isDateUnavailable: g.value,
      isDateDisabled: p.value,
      locale: l,
      disabled: s,
      pagedNavigation: i,
      weekStartsOn: u,
      weekdayFormat: d,
      fixedWeeks: c,
      numberOfMonths: f,
      readonly: r,
      preventDeselect: v2,
      modelValue: F,
      placeholder: H2,
      defaultOpen: m2,
      modal: _,
      open: Q,
      id: C,
      name: $2,
      required: h2,
      minValue: E,
      maxValue: P2,
      granularity: D,
      hideTimeZone: I,
      hourCycle: M,
      dateFieldRef: G2,
      dir: A2,
      onStartValueChange(J2) {
        n("update:startValue", J2);
      },
      onDateChange(J2) {
        var z2, K;
        F.value = { start: (z2 = J2.start) == null ? void 0 : z2.copy(), end: (K = J2.end) == null ? void 0 : K.copy() };
      },
      onPlaceholderChange(J2) {
        H2.value = J2.copy();
      }
    }), (J2, z2) => (openBlock(), createBlock(unref(Cs), {
      open: unref(Q),
      "onUpdate:open": z2[0] || (z2[0] = (K) => isRef(Q) ? Q.value = K : null),
      "default-open": unref(m2),
      modal: unref(_)
    }, {
      default: withCtx(() => [
        renderSlot(J2.$slots, "default")
      ]),
      _: 3
    }, 8, ["open", "default-open", "modal"]));
  }
});
var ah = defineComponent({
  __name: "DateRangePickerCalendar",
  setup(a2) {
    const t = _o();
    return (e, n) => (openBlock(), createBlock(unref(yf), mergeProps({
      isDateDisabled: unref(t).isDateDisabled,
      isDateUnavailable: unref(t).isDateUnavailable,
      locale: unref(t).locale.value,
      disabled: unref(t).disabled.value,
      pagedNavigation: unref(t).pagedNavigation.value,
      weekStartsOn: unref(t).weekStartsOn.value,
      weekdayFormat: unref(t).weekdayFormat.value,
      fixedWeeks: unref(t).fixedWeeks.value,
      numberOfMonths: unref(t).numberOfMonths.value,
      readonly: unref(t).readonly.value,
      preventDeselect: unref(t).preventDeselect.value,
      minValue: unref(t).minValue.value,
      maxValue: unref(t).maxValue.value,
      dir: unref(t).dir.value
    }, {
      "initial-focus": "",
      "model-value": unref(t).modelValue.value,
      placeholder: unref(t).placeholder.value,
      "onUpdate:startValue": n[0] || (n[0] = (l) => {
        unref(t).onStartValueChange(l);
      }),
      "onUpdate:modelValue": n[1] || (n[1] = (l) => {
        l.start && unref(t).modelValue.value.start && l.end && unref(t).modelValue.value.end && unref($14e0f24ef4ac5c92$export$91b62ebf2ba703ee)(l.start, unref(t).modelValue.value.start) && unref($14e0f24ef4ac5c92$export$91b62ebf2ba703ee)(l.end, unref(t).modelValue.value.end) || unref(t).onDateChange(l);
      }),
      "onUpdate:placeholder": n[2] || (n[2] = (l) => {
        unref($14e0f24ef4ac5c92$export$91b62ebf2ba703ee)(l, unref(t).placeholder.value) || unref(t).onPlaceholderChange(l);
      })
    }), {
      default: withCtx(({ weekDays: l, grid: s, date: r, weekStartsOn: i, locale: u, fixedWeeks: d }) => [
        renderSlot(e.$slots, "default", {
          date: r,
          grid: s,
          weekDays: l,
          weekStartsOn: i,
          locale: u,
          fixedWeeks: d
        })
      ]),
      _: 3
    }, 16, ["model-value", "placeholder"]));
  }
});
var nh = defineComponent({
  __name: "DateRangePickerField",
  setup(a2) {
    const t = _o();
    return (e, n) => (openBlock(), createBlock(unref(uc), mergeProps({
      ref: unref(t).dateFieldRef,
      "model-value": unref(t).modelValue.value,
      placeholder: unref(t).placeholder.value
    }, {
      id: unref(t).id.value,
      name: unref(t).name.value,
      disabled: unref(t).disabled.value,
      minValue: unref(t).minValue.value,
      maxValue: unref(t).maxValue.value,
      readonly: unref(t).readonly.value,
      hourCycle: unref(t).hourCycle.value,
      granularity: unref(t).granularity.value,
      hideTimeZone: unref(t).hideTimeZone.value,
      locale: unref(t).locale.value,
      isDateUnavailable: unref(t).isDateUnavailable,
      required: unref(t).required.value,
      dir: unref(t).dir.value
    }, {
      "onUpdate:modelValue": n[0] || (n[0] = (l) => {
        l.start && unref(t).modelValue.value.start && l.end && unref(t).modelValue.value.end && l.start.compare(unref(t).modelValue.value.start) === 0 && l.end.compare(unref(t).modelValue.value.end) === 0 || unref(t).onDateChange(l);
      }),
      "onUpdate:placeholder": n[1] || (n[1] = (l) => {
        unref($14e0f24ef4ac5c92$export$91b62ebf2ba703ee)(l, unref(t).placeholder.value) && l.compare(unref(t).placeholder.value) === 0 || unref(t).onPlaceholderChange(l);
      })
    }), {
      default: withCtx(({ segments: l, modelValue: s }) => [
        renderSlot(e.$slots, "default", {
          segments: l,
          modelValue: s
        })
      ]),
      _: 3
    }, 16, ["model-value", "placeholder"]));
  }
});
var oh = defineComponent({
  __name: "DateRangePickerAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Ds), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var lh = defineComponent({
  __name: "DateRangePickerArrow",
  props: {
    width: {},
    height: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Es), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var sh = defineComponent({
  __name: "DateRangePickerClose",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(Ps), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var rh = defineComponent({
  __name: "DateRangePickerTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = _o();
    return (n, l) => (openBlock(), createBlock(unref(ws), mergeProps({ "data-radix-vue-date-field-segment": "trigger" }, t, {
      disabled: unref(e).disabled.value,
      onFocusin: l[0] || (l[0] = (s) => {
        var r;
        (r = unref(e).dateFieldRef.value) == null || r.setFocusedElement(s.target);
      })
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["disabled"]));
  }
});
var ih = defineComponent({
  __name: "DateRangePickerContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return (s, r) => (openBlock(), createBlock(unref(_s), null, {
      default: withCtx(() => [
        createVNode(unref(Ss), normalizeProps(guardReactiveProps({ ...unref(l), ...s.$attrs })), {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }));
  }
});
var sc = ["id", "value", "name", "disabled", "required"];
var [rc, ic] = te("DateRangeFieldRoot");
var uc = defineComponent({
  inheritAttrs: false,
  __name: "DateRangeFieldRoot",
  props: {
    defaultValue: { default: void 0 },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    modelValue: {},
    hourCycle: {},
    granularity: {},
    hideTimeZone: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDateUnavailable: { type: Function, default: void 0 },
    name: {},
    required: { type: Boolean },
    id: {},
    dir: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:placeholder"],
  setup(a2, { expose: t, emit: e }) {
    var Y, re;
    const n = a2, l = e, { locale: s, disabled: r, readonly: i, isDateUnavailable: u, dir: d } = toRefs(n), c = qn(n.locale), { primitiveElement: f, currentElement: v2 } = Re(), p = ref(/* @__PURE__ */ new Set()), g = we(d);
    onMounted(() => {
      Ka(v2.value).forEach((X) => p.value.add(X));
    });
    const m2 = ne(n, "modelValue", l, {
      defaultValue: n.defaultValue ?? { start: void 0, end: void 0 },
      passive: n.modelValue === void 0
    }), _ = Yt({
      defaultPlaceholder: n.placeholder,
      granularity: n.granularity,
      defaultValue: m2.value.start,
      locale: n.locale
    }), C = ne(n, "placeholder", l, {
      defaultValue: n.defaultPlaceholder ?? _.copy(),
      passive: n.placeholder === void 0
    }), $2 = computed(() => n.granularity ? z(C.value) ? n.granularity : "day" : z(C.value) ? "minute" : "day"), h2 = computed(() => {
      var X;
      return m2.value.start ? !!((X = u.value) != null && X.call(u, m2.value.start) || n.minValue && q(m2.value.start, n.minValue) || n.maxValue && q(n.maxValue, m2.value.start)) : false;
    }), E = computed(() => {
      var X;
      return m2.value.end ? !!((X = u.value) != null && X.call(u, m2.value.end) || n.minValue && q(m2.value.end, n.minValue) || n.maxValue && q(n.maxValue, m2.value.end)) : false;
    }), P2 = computed(() => h2.value || E.value ? true : !m2.value.start || !m2.value.end ? false : !W(m2.value.start, m2.value.end) || u.value !== void 0 && !b(
      m2.value.start,
      m2.value.end,
      u.value,
      void 0
    )), D = ds($2.value), I = ref(m2.value.start ? { ...Ht({ value: m2.value.start, formatter: c }) } : { ...D }), M = ref(m2.value.end ? { ...Ht({ value: m2.value.end, formatter: c }) } : { ...D }), V2 = computed(() => Rn({
      granularity: $2.value,
      dateRef: C.value,
      formatter: c,
      hideTimeZone: n.hideTimeZone,
      hourCycle: n.hourCycle,
      segmentValues: I.value,
      locale: s
    })), A2 = computed(() => Rn({
      granularity: $2.value,
      dateRef: C.value,
      formatter: c,
      hideTimeZone: n.hideTimeZone,
      hourCycle: n.hourCycle,
      segmentValues: M.value,
      locale: s
    })), F = computed(() => ({
      start: V2.value.arr,
      end: A2.value.arr
    })), j = computed(() => ({ start: F.value.start.filter(({ part: X }) => X !== "literal"), end: F.value.end.filter(({ part: X }) => X !== "literal") })), H2 = ref((Y = m2.value.start) == null ? void 0 : Y.copy()), Q = ref((re = m2.value.end) == null ? void 0 : re.copy());
    watch([H2, Q], ([X, se]) => {
      m2.value = { start: X == null ? void 0 : X.copy(), end: se == null ? void 0 : se.copy() };
    }), watch(m2, (X) => {
      X.start && X.end && ((!H2.value || X.start.compare(H2.value) !== 0) && (H2.value = X.start.copy()), (!Q.value || X.end.compare(Q.value) !== 0) && (Q.value = X.end.copy()));
    }), watch([H2, s], ([X]) => {
      X !== void 0 ? I.value = { ...Ht({ value: X, formatter: c }) } : Object.values(I.value).every((se) => se !== null) && X === void 0 && (I.value = { ...D });
    }), watch(s, (X) => {
      c.getLocale() !== X && (c.setLocale(X), nextTick(() => {
        p.value.clear(), Ka(v2.value).forEach((se) => p.value.add(se));
      }));
    }), watch(m2, (X) => {
      X.start !== void 0 && C.value.compare(X.start) !== 0 && (C.value = X.start.copy());
    }), watch([Q, s], ([X]) => {
      X !== void 0 ? M.value = { ...Ht({ value: X, formatter: c }) } : Object.values(M.value).every((se) => se !== null) && X === void 0 && (M.value = { ...D });
    });
    const G2 = ref(null), J2 = computed(() => Array.from(p.value).findIndex((X) => {
      var se, fe;
      return X.getAttribute("data-radix-vue-date-field-segment") === ((se = G2.value) == null ? void 0 : se.getAttribute("data-radix-vue-date-field-segment")) && X.getAttribute("data-radix-vue-date-range-field-segment-type") === ((fe = G2.value) == null ? void 0 : fe.getAttribute("data-radix-vue-date-range-field-segment-type"));
    })), z2 = computed(() => {
      const X = g.value === "rtl" ? -1 : 1;
      return (X < 0 ? J2.value < 0 : J2.value > p.value.size - 1) ? null : Array.from(p.value)[J2.value + X];
    }), K = computed(() => {
      const X = g.value === "rtl" ? -1 : 1;
      return (X > 0 ? J2.value < 0 : J2.value > p.value.size - 1) ? null : Array.from(p.value)[J2.value - X];
    }), L = nt();
    function N2(X) {
      var se, fe;
      st(X.key) && (X.key === L.ARROW_LEFT && ((se = K.value) == null || se.focus()), X.key === L.ARROW_RIGHT && ((fe = z2.value) == null || fe.focus()));
    }
    function Z(X) {
      G2.value = X;
    }
    return ic({
      isDateUnavailable: u.value,
      locale: s,
      startValue: H2,
      endValue: Q,
      placeholder: C,
      disabled: r,
      formatter: c,
      hourCycle: n.hourCycle,
      readonly: i,
      segmentValues: { start: I, end: M },
      isInvalid: P2,
      segmentContents: j,
      elements: p,
      setFocusedElement: Z,
      focusNext() {
        var X;
        (X = z2.value) == null || X.focus();
      }
    }), t({
      setFocusedElement: Z
    }), (X, se) => {
      var fe, xe;
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(O), mergeProps(X.$attrs, {
          ref_key: "primitiveElement",
          ref: f,
          role: "group",
          "aria-disabled": unref(r) ? true : void 0,
          "data-disabled": unref(r) ? "" : void 0,
          "data-readonly": unref(i) ? "" : void 0,
          "data-invalid": P2.value ? "" : void 0,
          dir: unref(g),
          onKeydown: withKeys(N2, ["left", "right"])
        }), {
          default: withCtx(() => [
            renderSlot(X.$slots, "default", {
              modelValue: unref(m2),
              segments: F.value
            })
          ]),
          _: 3
        }, 16, ["aria-disabled", "data-disabled", "data-readonly", "data-invalid", "dir"]),
        createBaseVNode("input", {
          id: X.id,
          type: "text",
          tabindex: "-1",
          "aria-hidden": "true",
          value: `${(fe = unref(m2).start) == null ? void 0 : fe.toString()} - ${(xe = unref(m2).end) == null ? void 0 : xe.toString()}`,
          name: X.name,
          disabled: unref(r),
          required: X.required,
          style: {
            transform: "translateX(-100%)",
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0
          },
          onFocus: se[0] || (se[0] = (Ee) => {
            var be, de;
            return (de = (be = Array.from(p.value)) == null ? void 0 : be[0]) == null ? void 0 : de.focus();
          })
        }, null, 40, sc)
      ], 64);
    };
  }
});
var dc = defineComponent({
  __name: "DateRangeFieldInput",
  props: {
    part: {},
    type: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = rc(), n = ref(true), l = ref(false), {
      handleSegmentClick: s,
      handleSegmentKeydown: r,
      attributes: i
    } = cs({
      hasLeftFocus: n,
      lastKeyZero: l,
      placeholder: e.placeholder,
      hourCycle: e.hourCycle,
      segmentValues: e.segmentValues[t.type],
      formatter: e.formatter,
      part: t.part,
      disabled: e.disabled,
      readonly: e.readonly,
      focusNext: e.focusNext,
      modelValue: t.type === "start" ? e.startValue : e.endValue
    }), u = computed(() => e.disabled.value), d = computed(() => e.readonly.value), c = computed(() => e.isInvalid.value);
    return (f, v2) => (openBlock(), createBlock(unref(O), mergeProps({
      as: f.as,
      "as-child": f.asChild
    }, unref(i), {
      contenteditable: u.value || d.value ? false : f.part !== "literal",
      "data-radix-vue-date-field-segment": f.part,
      "aria-disabled": u.value ? true : void 0,
      "aria-readonly": d.value ? true : void 0,
      "data-disabled": u.value ? "" : void 0,
      "data-radix-vue-date-range-field-segment-type": f.type,
      "data-invalid": c.value ? "" : void 0,
      "aria-invalid": c.value ? true : void 0
    }, toHandlers(f.part !== "literal" ? {
      mousedown: unref(s),
      keydown: unref(r),
      focusout: () => {
        n.value = true;
      },
      focusin: (p) => {
        unref(e).setFocusedElement(p.target);
      }
    } : {})), {
      default: withCtx(() => [
        renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 16, ["as", "as-child", "contenteditable", "data-radix-vue-date-field-segment", "aria-disabled", "aria-readonly", "data-disabled", "data-radix-vue-date-range-field-segment-type", "data-invalid", "aria-invalid"]));
  }
});
var [fs, cc] = te("DropdownMenuRoot");
var uh = defineComponent({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 },
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    const l = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    }), s = ref(), { modal: r, dir: i } = toRefs(e), u = we(i);
    return cc({
      open: l,
      onOpenChange: (d) => {
        l.value = d;
      },
      onOpenToggle: () => {
        l.value = !l.value;
      },
      triggerId: "",
      triggerElement: s,
      contentId: "",
      modal: r,
      dir: u
    }), (d, c) => (openBlock(), createBlock(unref(so), {
      open: unref(l),
      "onUpdate:open": c[0] || (c[0] = (f) => isRef(l) ? l.value = f : null),
      dir: unref(u),
      modal: unref(r)
    }, {
      default: withCtx(() => [
        renderSlot(d.$slots, "default", { open: unref(l) })
      ]),
      _: 3
    }, 8, ["open", "dir", "modal"]));
  }
});
var dh = defineComponent({
  __name: "DropdownMenuTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = fs(), { forwardRef: n, currentElement: l } = R2();
    return onMounted(() => {
      e.triggerElement = l;
    }), e.triggerId || (e.triggerId = ge(void 0, "radix-vue-dropdown-menu-trigger")), (s, r) => (openBlock(), createBlock(unref(Qa), { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          id: unref(e).triggerId,
          ref: unref(n),
          type: s.as === "button" ? "button" : void 0,
          "as-child": t.asChild,
          as: s.as,
          "aria-haspopup": "menu",
          "aria-expanded": unref(e).open.value,
          "aria-controls": unref(e).open.value ? unref(e).contentId : void 0,
          "data-disabled": s.disabled ? "" : void 0,
          disabled: s.disabled,
          "data-state": unref(e).open.value ? "open" : "closed",
          onClick: r[0] || (r[0] = async (i) => {
            var u;
            !s.disabled && i.button === 0 && i.ctrlKey === false && ((u = unref(e)) == null || u.onOpenToggle(), await nextTick(), unref(e).open.value && i.preventDefault());
          }),
          onKeydown: r[1] || (r[1] = withKeys(
            (i) => {
              s.disabled || (["Enter", " "].includes(i.key) && unref(e).onOpenToggle(), i.key === "ArrowDown" && unref(e).onOpenChange(true), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
            },
            ["enter", "space", "arrow-down"]
          ))
        }, {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "type", "as-child", "as", "aria-expanded", "aria-controls", "data-disabled", "disabled", "data-state"])
      ]),
      _: 3
    }));
  }
});
var ch = defineComponent({
  __name: "DropdownMenuPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(vo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var fh = defineComponent({
  __name: "DropdownMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    R2();
    const s = fs(), r = ref(false);
    function i(u) {
      u.defaultPrevented || (r.value || setTimeout(() => {
        var d;
        (d = s.triggerElement.value) == null || d.focus();
      }, 0), r.value = false, u.preventDefault());
    }
    return s.contentId || (s.contentId = ge(void 0, "radix-vue-dropdown-menu-content")), (u, d) => {
      var c;
      return openBlock(), createBlock(unref(fo), mergeProps(unref(l), {
        id: unref(s).contentId,
        "aria-labelledby": (c = unref(s)) == null ? void 0 : c.triggerId,
        style: {
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        },
        onCloseAutoFocus: i,
        onInteractOutside: d[0] || (d[0] = (f) => {
          var m2;
          if (f.defaultPrevented) return;
          const v2 = f.detail.originalEvent, p = v2.button === 0 && v2.ctrlKey === true, g = v2.button === 2 || p;
          (!unref(s).modal.value || g) && (r.value = true), (m2 = unref(s).triggerElement.value) != null && m2.contains(f.target) && f.preventDefault();
        })
      }), {
        default: withCtx(() => [
          renderSlot(u.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});
var ph = defineComponent({
  __name: "DropdownMenuArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(lo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var vh = defineComponent({
  __name: "DropdownMenuItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(xa), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var mh = defineComponent({
  __name: "DropdownMenuGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(tn), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var hh = defineComponent({
  __name: "DropdownMenuSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(yo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var yh = defineComponent({
  __name: "DropdownMenuCheckboxItem",
  props: {
    checked: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select", "update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(co), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var gh = defineComponent({
  __name: "DropdownMenuItemIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(uo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var bh = defineComponent({
  __name: "DropdownMenuLabel",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(po), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ch = defineComponent({
  __name: "DropdownMenuRadioGroup",
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(mo), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var wh = defineComponent({
  __name: "DropdownMenuRadioItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(ho), normalizeProps(guardReactiveProps(unref(l))), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var _h = defineComponent({
  __name: "DropdownMenuSub",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "open", t, {
      passive: e.open === void 0,
      defaultValue: e.defaultOpen ?? false
    });
    return R2(), (s, r) => (openBlock(), createBlock(unref(go), {
      open: unref(l),
      "onUpdate:open": r[0] || (r[0] = (i) => isRef(l) ? l.value = i : null)
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", { open: unref(l) })
      ]),
      _: 3
    }, 8, ["open"]));
  }
});
var xh = defineComponent({
  __name: "DropdownMenuSubContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(bo), mergeProps(unref(l), { style: {
      "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
      "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
      "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Sh = defineComponent({
  __name: "DropdownMenuSubTrigger",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Co), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var fc = ["value", "name", "disabled", "required"];
var [ta, pc] = te("EditableRoot");
var Eh = defineComponent({
  inheritAttrs: false,
  __name: "EditableRoot",
  props: {
    defaultValue: {},
    modelValue: {},
    placeholder: { default: "Enter text..." },
    dir: {},
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean },
    activationMode: { default: "focus" },
    selectOnFocus: { type: Boolean, default: false },
    submitMode: { default: "blur" },
    startWithEditMode: { type: Boolean },
    maxLength: {},
    autoResize: { type: Boolean, default: false },
    id: {},
    name: {},
    required: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["update:modelValue", "submit", "update:state"],
  setup(a2, { expose: t, emit: e }) {
    const n = a2, l = e, {
      id: s,
      name: r,
      defaultValue: i,
      startWithEditMode: u,
      placeholder: d,
      maxLength: c,
      disabled: f,
      dir: v2,
      submitMode: p,
      activationMode: g,
      selectOnFocus: m2,
      readonly: _,
      autoResize: C,
      required: $2
    } = toRefs(n), h2 = ref(), E = we(v2), P2 = ref(u.value ?? false), D = ne(n, "modelValue", l, {
      defaultValue: i.value ?? "",
      passive: n.modelValue === void 0
    }), { primitiveElement: I, currentElement: M } = Re(), V2 = at(M), A2 = computed(() => typeof d.value == "string" ? { edit: d.value, preview: d.value } : d.value), F = ref(D.value);
    watch(() => D.value, () => {
      F.value = D.value;
    }, { immediate: true, deep: true });
    function j() {
      P2.value = false, l("update:state", "cancel");
    }
    function H2() {
      P2.value = true, F.value = D.value, l("update:state", "edit");
    }
    function Q() {
      D.value = F.value, P2.value = false, l("update:state", "submit"), l("submit", D.value);
    }
    function G2() {
      P2.value && (p.value === "blur" || p.value === "both" ? Q() : j());
    }
    const J2 = Ul(() => G2(), M), z2 = Gl(() => G2(), M), K = computed(() => D.value === "");
    return t({
      /** Function to submit the value of the editable */
      submit: Q,
      /** Function to cancel the value of the editable */
      cancel: j,
      /** Function to set the editable in edit mode */
      edit: H2
    }), pc({
      id: s,
      name: r,
      disabled: f,
      isEditing: P2,
      maxLength: c,
      modelValue: D,
      inputValue: F,
      placeholder: A2,
      edit: H2,
      cancel: j,
      submit: Q,
      activationMode: g,
      submitMode: p,
      selectOnFocus: m2,
      inputRef: h2,
      startWithEditMode: u,
      isEmpty: K,
      readonly: _,
      autoResize: C
    }), (L, N2) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps(L.$attrs, {
        ref_key: "primitiveElement",
        ref: I,
        as: L.as,
        "as-child": L.asChild,
        dir: unref(E),
        "data-dismissable-layer": "",
        onFocusCapture: unref(z2).onFocusCapture,
        onBlurCapture: unref(z2).onBlurCapture,
        onPointerdownCapture: unref(J2).onPointerDownCapture
      }), {
        default: withCtx(() => [
          renderSlot(L.$slots, "default", {
            modelValue: unref(D),
            isEditing: P2.value,
            isEmpty: K.value,
            submit: Q,
            cancel: j,
            edit: H2
          })
        ]),
        _: 3
      }, 16, ["as", "as-child", "dir", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]),
      unref(V2) ? (openBlock(), createElementBlock("input", {
        key: 0,
        type: "text",
        tabindex: "-1",
        "aria-hidden": "true",
        value: unref(D),
        name: unref(r),
        disabled: unref(f),
        required: unref($2),
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, fc)) : createCommentVNode("", true)
    ], 64));
  }
});
var Ph = defineComponent({
  __name: "EditableArea",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = ta();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "data-placeholder-shown": unref(e).isEditing.value ? void 0 : "",
      "data-focus": unref(e).isEditing.value ? "" : void 0,
      "data-focused": unref(e).isEditing.value ? "" : void 0,
      "data-empty": unref(e).isEmpty.value ? "" : void 0,
      "data-readonly": unref(e).readonly.value ? "" : void 0,
      "data-disabled": unref(e).disabled.value ? "" : void 0,
      style: unref(e).autoResize.value ? { display: "inline-grid" } : void 0
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-placeholder-shown", "data-focus", "data-focused", "data-empty", "data-readonly", "data-disabled", "style"]));
  }
});
var Dh = defineComponent({
  __name: "EditableInput",
  props: {
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(a2) {
    const t = a2, e = nt(), n = ta(), l = computed(() => n.disabled.value), s = computed(() => {
      var d;
      return (d = n.placeholder.value) == null ? void 0 : d.edit;
    }), { primitiveElement: r, currentElement: i } = Re();
    onMounted(() => {
      var d, c;
      n.inputRef.value = i.value, n.startWithEditMode.value && ((d = n.inputRef.value) == null || d.focus({ preventScroll: true }), n.selectOnFocus.value && ((c = n.inputRef.value) == null || c.select()));
    }), watch(n.isEditing, (d) => {
      d && nextTick(() => {
        var c, f;
        (c = n.inputRef.value) == null || c.focus({ preventScroll: true }), n.selectOnFocus.value && ((f = n.inputRef.value) == null || f.select());
      });
    });
    function u(d) {
      (n.submitMode.value === "enter" || n.submitMode.value === "both") && d.key === e.ENTER && !d.shiftKey && !d.metaKey && n.submit();
    }
    return (d, c) => (openBlock(), createBlock(unref(O), mergeProps({
      ref_key: "primitiveElement",
      ref: r
    }, t, {
      value: unref(n).inputValue.value,
      placeholder: s.value,
      disabled: l.value,
      maxlength: unref(n).maxLength.value,
      "data-disabled": l.value ? "" : void 0,
      "data-readonly": unref(n).readonly.value ? "" : void 0,
      readonly: unref(n).readonly.value,
      "aria-label": "editable input",
      hidden: unref(n).autoResize.value ? void 0 : !unref(n).isEditing.value,
      style: unref(n).autoResize.value ? { all: "unset", gridArea: "1 / 1 / auto / auto", visibility: unref(n).isEditing.value ? void 0 : "hidden" } : void 0,
      onInput: c[0] || (c[0] = (f) => unref(n).inputValue.value = f.target.value),
      onKeydown: [
        withKeys(u, ["enter", "space"]),
        withKeys(unref(n).cancel, ["esc"])
      ]
    }), {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["value", "placeholder", "disabled", "maxlength", "data-disabled", "data-readonly", "readonly", "hidden", "style", "onKeydown"]));
  }
});
var $h = defineComponent({
  __name: "EditablePreview",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, e = ta(), n = computed(() => {
      var r;
      return (r = e.placeholder.value) == null ? void 0 : r.preview;
    });
    function l() {
      e.activationMode.value === "focus" && e.edit();
    }
    function s() {
      e.activationMode.value === "dblclick" && e.edit();
    }
    return (r, i) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      tabindex: "0",
      "data-placeholder-shown": unref(e).isEditing.value ? void 0 : "",
      hidden: unref(e).autoResize.value ? void 0 : unref(e).isEditing.value,
      style: unref(e).autoResize.value ? {
        whiteSpace: "pre",
        userSelect: "none",
        gridArea: "1 / 1 / auto / auto",
        visibility: unref(e).isEditing.value ? "hidden" : void 0,
        overflow: "hidden",
        textOverflow: "ellipsis"
      } : void 0,
      onFocusin: l,
      onDblclick: s
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(unref(e).modelValue.value || n.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["data-placeholder-shown", "hidden", "style"]));
  }
});
var Bh = defineComponent({
  __name: "EditableSubmitTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = ta();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "submit",
      "aria-disabled": unref(e).disabled.value ? "" : void 0,
      "data-disabled": unref(e).disabled.value ? "" : void 0,
      disabled: unref(e).disabled.value,
      type: n.as === "button" ? "button" : void 0,
      hidden: unref(e).isEditing.value ? void 0 : "",
      onClick: unref(e).submit
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, () => [
          createTextVNode("Submit")
        ])
      ]),
      _: 3
    }, 16, ["aria-disabled", "data-disabled", "disabled", "type", "hidden", "onClick"]));
  }
});
var Ih = defineComponent({
  __name: "EditableCancelTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = ta();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "cancel",
      "aria-disabled": unref(e).disabled.value ? "" : void 0,
      "data-disabled": unref(e).disabled.value ? "" : void 0,
      disabled: unref(e).disabled.value,
      type: n.as === "button" ? "button" : void 0,
      hidden: unref(e).isEditing.value ? void 0 : "",
      onClick: unref(e).cancel
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, () => [
          createTextVNode("Cancel")
        ])
      ]),
      _: 3
    }, 16, ["aria-disabled", "data-disabled", "disabled", "type", "hidden", "onClick"]));
  }
});
var Th = defineComponent({
  __name: "EditableEditTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = ta();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "edit",
      "aria-disabled": unref(e).disabled.value ? "" : void 0,
      "data-disabled": unref(e).disabled.value ? "" : void 0,
      disabled: unref(e).disabled.value,
      type: n.as === "button" ? "button" : void 0,
      hidden: unref(e).isEditing.value ? "" : void 0,
      onClick: unref(e).edit
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, () => [
          createTextVNode("Edit")
        ])
      ]),
      _: 3
    }, 16, ["aria-disabled", "data-disabled", "disabled", "type", "hidden", "onClick"]));
  }
});
var [xo, vc] = te("HoverCardRoot");
var Rh = defineComponent({
  __name: "HoverCardRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    openDelay: { default: 700 },
    closeDelay: { default: 300 }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { openDelay: l, closeDelay: s } = toRefs(e);
    R2();
    const r = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    }), i = ref(0), u = ref(0), d = ref(false), c = ref(false), f = ref(false), v2 = ref();
    function p() {
      clearTimeout(u.value), i.value = window.setTimeout(() => r.value = true, l.value);
    }
    function g() {
      clearTimeout(i.value), !d.value && !c.value && (u.value = window.setTimeout(() => r.value = false, s.value));
    }
    function m2() {
      r.value = false;
    }
    return vc({
      open: r,
      onOpenChange(_) {
        r.value = _;
      },
      onOpen: p,
      onClose: g,
      onDismiss: m2,
      hasSelectionRef: d,
      isPointerDownOnContentRef: c,
      isPointerInTransitRef: f,
      triggerElement: v2
    }), (_, C) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        renderSlot(_.$slots, "default", { open: unref(r) })
      ]),
      _: 3
    }));
  }
});
function An(a2) {
  return (t) => t.pointerType === "touch" ? void 0 : a2();
}
function mc(a2) {
  const t = [], e = document.createTreeWalker(a2, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  for (; e.nextNode(); ) t.push(e.currentNode);
  return t;
}
var Ah = defineComponent({
  __name: "HoverCardTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  setup(a2) {
    const { forwardRef: t, currentElement: e } = R2(), n = xo();
    n.triggerElement = e;
    function l() {
      setTimeout(() => {
        !n.isPointerInTransitRef.value && !n.open.value && n.onClose();
      }, 0);
    }
    return (s, r) => (openBlock(), createBlock(unref(Mt), { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(t),
          "as-child": s.asChild,
          as: s.as,
          "data-state": unref(n).open.value ? "open" : "closed",
          "data-grace-area-trigger": "",
          onPointerenter: r[0] || (r[0] = (i) => unref(An)(unref(n).onOpen)(i)),
          onPointerleave: r[1] || (r[1] = (i) => unref(An)(l)(i)),
          onFocus: r[2] || (r[2] = (i) => unref(n).onOpen()),
          onBlur: r[3] || (r[3] = (i) => unref(n).onClose())
        }, {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 8, ["as-child", "as", "data-state"])
      ]),
      _: 3
    }));
  }
});
var Oh = defineComponent({
  __name: "HoverCardPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var hc = defineComponent({
  __name: "HoverCardContentImpl",
  props: {
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Ot(e), { forwardRef: s, currentElement: r } = R2(), i = xo(), { isPointerInTransit: u, onPointerExit: d } = Fl(i.triggerElement, r);
    mi(i.isPointerInTransitRef, u, { direction: "rtl" }), d(() => {
      i.onClose();
    });
    const c = ref(false);
    let f;
    watchEffect((p) => {
      if (c.value) {
        const g = document.body;
        f = g.style.userSelect || g.style.webkitUserSelect, g.style.userSelect = "none", g.style.webkitUserSelect = "none", p(() => {
          g.style.userSelect = f, g.style.webkitUserSelect = f;
        });
      }
    });
    function v2() {
      c.value = false, i.isPointerDownOnContentRef.value = false, nextTick(() => {
        var g;
        ((g = document.getSelection()) == null ? void 0 : g.toString()) !== "" && (i.hasSelectionRef.value = true);
      });
    }
    return onMounted(() => {
      r.value && (document.addEventListener("pointerup", v2), mc(r.value).forEach((g) => g.setAttribute("tabindex", "-1")));
    }), onUnmounted(() => {
      document.removeEventListener("pointerup", v2), i.hasSelectionRef.value = false, i.isPointerDownOnContentRef.value = false;
    }), (p, g) => (openBlock(), createBlock(unref(Ct), {
      "as-child": "",
      "disable-outside-pointer-events": false,
      onEscapeKeyDown: g[1] || (g[1] = (m2) => n("escapeKeyDown", m2)),
      onPointerDownOutside: g[2] || (g[2] = (m2) => n("pointerDownOutside", m2)),
      onFocusOutside: g[3] || (g[3] = withModifiers((m2) => n("focusOutside", m2), ["prevent"])),
      onDismiss: unref(i).onDismiss
    }, {
      default: withCtx(() => [
        createVNode(unref(It), mergeProps({ ...unref(l), ...p.$attrs }, {
          ref: unref(s),
          "data-state": unref(i).open.value ? "open" : "closed",
          style: {
            userSelect: c.value ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: c.value ? "text" : void 0,
            // re-namespace exposed content custom properties
            "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
            "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
            "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
          },
          onPointerdown: g[0] || (g[0] = (m2) => {
            m2.currentTarget.contains(m2.target) && (c.value = true), unref(i).hasSelectionRef.value = false, unref(i).isPointerDownOnContentRef.value = true;
          })
        }), {
          default: withCtx(() => [
            renderSlot(p.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "style"])
      ]),
      _: 3
    }, 8, ["onDismiss"]));
  }
});
var kh = defineComponent({
  __name: "HoverCardContent",
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t), { forwardRef: s } = R2(), r = xo();
    return (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(r).open.value
    }, {
      default: withCtx(() => [
        createVNode(hc, mergeProps(unref(l), {
          ref: unref(s),
          onPointerenter: u[0] || (u[0] = (d) => unref(An)(unref(r).onOpen)(d))
        }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Mh = defineComponent({
  __name: "HoverCardArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Zt), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Vh = defineComponent({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "label" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      onMousedown: n[0] || (n[0] = (l) => {
        !l.defaultPrevented && l.detail > 1 && l.preventDefault();
      })
    }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function yc(a2) {
  return a2 == null ? void 0 : a2.querySelector("[data-state=checked]");
}
function gc(a2, t, e) {
  return a2 === void 0 ? false : Array.isArray(a2) ? a2.some((n) => Gt(n, t, e)) : Gt(a2, t, e);
}
function Gt(a2, t, e) {
  return a2 === void 0 || t === void 0 ? false : typeof a2 == "string" ? a2 === t : typeof e == "function" ? e(a2, t) : typeof e == "string" ? (a2 == null ? void 0 : a2[e]) === (t == null ? void 0 : t[e]) : Qe(a2, t);
}
var [an, bc] = te("ListboxRoot");
var Fh = defineComponent({
  __name: "ListboxRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    multiple: { type: Boolean },
    orientation: { default: "vertical" },
    dir: {},
    disabled: { type: Boolean },
    selectionBehavior: { default: "toggle" },
    highlightOnHover: { type: Boolean },
    by: {},
    name: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "highlight", "entryFocus", "leave"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { multiple: l, highlightOnHover: s, orientation: r, disabled: i, selectionBehavior: u, dir: d } = toRefs(e), { getItems: c } = Ca(), { handleTypeaheadSearch: f } = ba(), { primitiveElement: v2, currentElement: p } = Re(), g = nt(), m2 = we(d), _ = at(p), C = ref(), $2 = ref(false), h2 = ref(true), E = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue ?? (l.value ? [] : void 0),
      passive: e.modelValue === void 0,
      deep: true
    });
    function P2(N2) {
      if ($2.value = true, Array.isArray(E.value)) {
        const Z = E.value.findIndex((Y) => Gt(Y, N2, e.by));
        if (e.selectionBehavior === "toggle") {
          const Y = [...E.value];
          Z === -1 ? Y.push(N2) : Y.splice(Z, 1), E.value = Y;
        } else
          E.value = [N2], C.value = N2;
      } else
        e.selectionBehavior === "toggle" && Gt(E.value, N2, e.by) ? E.value = void 0 : E.value = N2;
      setTimeout(() => {
        $2.value = false;
      }, 1);
    }
    const D = ref(null), I = ref(null), M = ref(false), V2 = ua(), A2 = ua();
    function F() {
      return c().map((N2) => N2.ref).filter((N2) => N2.dataset.disabled !== "");
    }
    function j(N2) {
      if (!N2)
        return;
      D.value = N2, D.value.focus(), D.value.scrollIntoView({ block: "nearest" });
      const Z = c().find((Y) => Y.ref === N2);
      n("highlight", Z);
    }
    function H2(N2) {
      D.value && D.value.click();
    }
    function Q(N2) {
      if ($2.value = true, M.value)
        A2.trigger(N2);
      else {
        const Z = N2.altKey || N2.ctrlKey || N2.metaKey;
        if (Z && N2.key === "a" && l.value) {
          const Y = c(), re = Y.map((X) => X.value);
          E.value = [...re], N2.preventDefault(), j(Y[Y.length - 1].ref);
        } else if (!Z) {
          const Y = f(N2.key, F());
          Y && j(Y);
        }
      }
      setTimeout(() => {
        $2.value = false;
      }, 1);
    }
    function G2(N2) {
      const Z = D.value;
      Z != null && Z.isConnected && (I.value = Z), D.value = null, n("leave", N2);
    }
    function J2(N2) {
      var Y, re;
      const Z = new CustomEvent("listbox.entryFocus", { bubbles: false, cancelable: true });
      if ((Y = N2.currentTarget) == null || Y.dispatchEvent(Z), n("entryFocus", Z), !Z.defaultPrevented)
        if (I.value)
          j(I.value);
        else {
          const X = (re = F()) == null ? void 0 : re[0];
          j(X);
        }
    }
    function z2(N2) {
      const Z = os(N2, r.value, m2.value);
      if (!Z)
        return;
      let Y = F();
      if (D.value) {
        if (Z === "last")
          Y.reverse();
        else if (Z === "prev" || Z === "next") {
          Z === "prev" && Y.reverse();
          const re = Y.indexOf(D.value);
          Y = Y.slice(re + 1);
        }
        K(N2, Y[0]);
      }
      if (Y.length) {
        const re = !D.value && Z === "prev" ? Y.length - 1 : 0;
        j(Y[re]);
      }
      if (M.value)
        return A2.trigger(N2);
    }
    function K(N2, Z) {
      var re;
      if (!(M.value || e.selectionBehavior !== "replace" || !l.value || !Array.isArray(E.value) || (N2.altKey || N2.ctrlKey || N2.metaKey) && !N2.shiftKey) && N2.shiftKey) {
        const X = c().filter((xe) => xe.ref.dataset.disabled !== "");
        let se = (re = X.find((xe) => xe.ref === Z)) == null ? void 0 : re.value;
        if (N2.key === g.END ? se = X[X.length - 1].value : N2.key === g.HOME && (se = X[0].value), !se || !C.value)
          return;
        const fe = Bt(X.map((xe) => xe.value), C.value, se);
        E.value = fe;
      }
    }
    async function L(N2) {
      if (M.value)
        V2.trigger(N2);
      else {
        await nextTick();
        const Y = F().find((re) => re.dataset.state === "checked");
        Y && j(Y);
      }
    }
    return watch(E, () => {
      $2.value || nextTick(() => {
        L();
      });
    }, { immediate: true, deep: true }), bc({
      modelValue: E,
      // @ts-expect-error ignoring
      onValueChange: P2,
      multiple: l,
      orientation: r,
      dir: m2,
      disabled: i,
      highlightOnHover: s,
      highlightedElement: D,
      isVirtual: M,
      virtualFocusHook: V2,
      virtualKeydownHook: A2,
      by: e.by,
      firstValue: C,
      selectionBehavior: u,
      focusable: h2,
      onLeave: G2,
      onEnter: J2,
      onChangeHighlight: j,
      onKeydownEnter: H2,
      onKeydownNavigation: z2,
      onKeydownTypeAhead: Q
    }), (N2, Z) => (openBlock(), createBlock(unref(O), {
      ref_key: "primitiveElement",
      ref: v2,
      as: N2.as,
      "as-child": N2.asChild,
      dir: unref(m2),
      "data-disabled": unref(i) ? "" : void 0,
      onPointerleave: G2,
      onFocusout: Z[0] || (Z[0] = async (Y) => {
        const re = Y.relatedTarget || Y.target;
        await nextTick(), D.value && unref(p) && !unref(p).contains(re) && G2(Y);
      })
    }, {
      default: withCtx(() => [
        renderSlot(N2.$slots, "default", { modelValue: unref(E) }),
        unref(_) && e.name ? (openBlock(), createBlock(unref(no), {
          key: 0,
          name: e.name,
          value: unref(E)
        }, null, 8, ["name", "value"])) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["as", "as-child", "dir", "data-disabled"]));
  }
});
var Nh = defineComponent({
  __name: "ListboxContent",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = an(), e = Tt(false, 10);
    return (n, l) => (openBlock(), createBlock(unref(wa), null, {
      default: withCtx(() => [
        createVNode(unref(O), {
          role: "listbox",
          as: n.as,
          "as-child": n.asChild,
          tabindex: unref(t).focusable.value ? unref(t).highlightedElement.value ? "-1" : "0" : void 0,
          "aria-orientation": unref(t).orientation.value,
          "aria-multiselectable": !!unref(t).multiple.value,
          "data-orientation": unref(t).orientation.value,
          onMousedown: l[0] || (l[0] = withModifiers((s) => e.value = true, ["left"])),
          onFocus: l[1] || (l[1] = (s) => {
            unref(e) || unref(t).onEnter(s);
          }),
          onKeydown: [
            l[2] || (l[2] = withKeys(withModifiers((s) => {
              unref(t).focusable.value && unref(t).onKeydownNavigation(s);
            }, ["prevent"]), ["down", "up", "left", "right", "home", "end"])),
            withKeys(unref(t).onKeydownEnter, ["enter"]),
            unref(t).onKeydownTypeAhead
          ]
        }, {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 8, ["as", "as-child", "tabindex", "aria-orientation", "aria-multiselectable", "data-orientation", "onKeydown"])
      ]),
      _: 3
    }));
  }
});
var Lh = defineComponent({
  __name: "ListboxFilter",
  props: {
    modelValue: {},
    autoFocus: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "modelValue", t, {
      defaultValue: "",
      passive: e.modelValue === void 0
    }), s = an();
    s.focusable.value = false;
    const { primitiveElement: r, currentElement: i } = Re();
    return onMounted(() => {
      setTimeout(() => {
        var u;
        e.autoFocus && ((u = i.value) == null || u.focus());
      }, 1);
    }), (u, d) => (openBlock(), createBlock(unref(O), {
      ref_key: "primitiveElement",
      ref: r,
      as: u.as,
      "as-child": u.asChild,
      value: unref(l),
      disabled: unref(s).disabled.value ? "" : void 0,
      "data-disabled": unref(s).disabled.value ? "" : void 0,
      type: "text",
      onKeydown: [
        withKeys(withModifiers(unref(s).onKeydownNavigation, ["prevent"]), ["down", "up", "home", "end"]),
        withKeys(unref(s).onKeydownEnter, ["enter"])
      ],
      onInput: d[0] || (d[0] = (c) => {
        l.value = c.target.value;
      })
    }, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default", { modelValue: unref(l) })
      ]),
      _: 3
    }, 8, ["as", "as-child", "value", "disabled", "data-disabled", "onKeydown"]));
  }
});
var Cc = "listbox.select";
var [wc, _c] = te("ListboxItem");
var zh = defineComponent({
  __name: "ListboxItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l, currentElement: s } = R2(), r = ge(void 0, "radix-vue-listbox-item"), i = an(), u = computed(() => s.value === i.highlightedElement.value), d = computed(() => gc(i.modelValue.value, e.value, i.by)), c = computed(() => i.disabled.value || e.disabled);
    async function f(p) {
      n("select", p), !(p != null && p.defaultPrevented) && !c.value && p && (i.onValueChange(e.value), i.onChangeHighlight(p.target));
    }
    function v2(p) {
      const g = { originalEvent: p, value: e.value };
      jt(Cc, f, g);
    }
    return _c({
      isSelected: d
    }), (p, g) => (openBlock(), createBlock(unref(Qt), { value: p.value }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          id: unref(r),
          ref: unref(l),
          role: "option",
          tabindex: unref(i).focusable.value ? u.value ? "0" : "-1" : void 0,
          "aria-selected": d.value,
          as: p.as,
          "as-child": p.asChild,
          disabled: c.value ? "" : void 0,
          "data-disabled": c.value ? "" : void 0,
          "data-highlighted": u.value ? "" : void 0,
          "data-state": d.value ? "checked" : "unchecked",
          onClick: v2,
          onKeydown: withKeys(withModifiers(v2, ["prevent"]), ["space"]),
          onPointermove: g[0] || (g[0] = (m2) => {
            unref(i).highlightOnHover.value ? unref(i).onChangeHighlight(unref(s)) : unref(i).focusable.value || unref(i).onChangeHighlight(unref(s));
          })
        }, {
          default: withCtx(() => [
            renderSlot(p.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "tabindex", "aria-selected", "as", "as-child", "disabled", "data-disabled", "data-highlighted", "data-state", "onKeydown"])
      ]),
      _: 3
    }, 8, ["value"]));
  }
});
var Kh = defineComponent({
  __name: "ListboxItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = wc();
    return (n, l) => unref(e).isSelected.value ? (openBlock(), createBlock(unref(O), mergeProps({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
function oa(a2, t, e) {
  let n = e.initialDeps ?? [], l;
  return () => {
    var s, r, i, u;
    let d;
    e.key && ((s = e.debug) != null && s.call(e)) && (d = Date.now());
    const c = a2();
    if (!(c.length !== n.length || c.some((p, g) => n[g] !== p)))
      return l;
    n = c;
    let v2;
    if (e.key && ((r = e.debug) != null && r.call(e)) && (v2 = Date.now()), l = t(...c), e.key && ((i = e.debug) != null && i.call(e))) {
      const p = Math.round((Date.now() - d) * 100) / 100, g = Math.round((Date.now() - v2) * 100) / 100, m2 = g / 16, _ = (C, $2) => {
        for (C = String(C); C.length < $2; )
          C = " " + C;
        return C;
      };
      console.info(
        `%c⏱ ${_(g, 5)} /${_(p, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * m2, 120)
        )}deg 100% 31%);`,
        e == null ? void 0 : e.key
      );
    }
    return (u = e == null ? void 0 : e.onChange) == null || u.call(e, l), l;
  };
}
function En(a2, t) {
  if (a2 === void 0)
    throw new Error("Unexpected undefined");
  return a2;
}
var xc = (a2, t) => Math.abs(a2 - t) < 1;
var Sc = (a2, t, e) => {
  let n;
  return function(...l) {
    a2.clearTimeout(n), n = a2.setTimeout(() => t.apply(this, l), e);
  };
};
var Ec = (a2) => a2;
var Pc = (a2) => {
  const t = Math.max(a2.startIndex - a2.overscan, 0), e = Math.min(a2.endIndex + a2.overscan, a2.count - 1), n = [];
  for (let l = t; l <= e; l++)
    n.push(l);
  return n;
};
var Dc = (a2, t) => {
  const e = a2.scrollElement;
  if (!e)
    return;
  const n = a2.targetWindow;
  if (!n)
    return;
  const l = (r) => {
    const { width: i, height: u } = r;
    t({ width: Math.round(i), height: Math.round(u) });
  };
  if (l(e.getBoundingClientRect()), !n.ResizeObserver)
    return () => {
    };
  const s = new n.ResizeObserver((r) => {
    const i = r[0];
    if (i != null && i.borderBoxSize) {
      const u = i.borderBoxSize[0];
      if (u) {
        l({ width: u.inlineSize, height: u.blockSize });
        return;
      }
    }
    l(e.getBoundingClientRect());
  });
  return s.observe(e, { box: "border-box" }), () => {
    s.unobserve(e);
  };
};
var Jo = {
  passive: true
};
var $c = typeof window > "u" ? true : "onscrollend" in window;
var Bc = (a2, t) => {
  const e = a2.scrollElement;
  if (!e)
    return;
  const n = a2.targetWindow;
  if (!n)
    return;
  let l = 0;
  const s = $c ? () => {
  } : Sc(
    n,
    () => {
      t(l, false);
    },
    a2.options.isScrollingResetDelay
  ), r = (d) => () => {
    l = e[a2.options.horizontal ? "scrollLeft" : "scrollTop"], s(), t(l, d);
  }, i = r(true), u = r(false);
  return u(), e.addEventListener("scroll", i, Jo), e.addEventListener("scrollend", u, Jo), () => {
    e.removeEventListener("scroll", i), e.removeEventListener("scrollend", u);
  };
};
var Ic = (a2, t, e) => {
  if (t != null && t.borderBoxSize) {
    const n = t.borderBoxSize[0];
    if (n)
      return Math.round(
        n[e.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return Math.round(
    a2.getBoundingClientRect()[e.options.horizontal ? "width" : "height"]
  );
};
var Tc = (a2, {
  adjustments: t = 0,
  behavior: e
}, n) => {
  var l, s;
  const r = a2 + t;
  (s = (l = n.scrollElement) == null ? void 0 : l.scrollTo) == null || s.call(l, {
    [n.options.horizontal ? "left" : "top"]: r,
    behavior: e
  });
};
var Rc = class {
  constructor(t) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = false, this.scrollToIndexTimeoutId = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let e = null;
      const n = () => e || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : e = new this.targetWindow.ResizeObserver((l) => {
        l.forEach((s) => {
          this._measureElement(s.target, s);
        });
      }));
      return {
        disconnect: () => {
          var l;
          return (l = n()) == null ? void 0 : l.disconnect();
        },
        observe: (l) => {
          var s;
          return (s = n()) == null ? void 0 : s.observe(l, { box: "border-box" });
        },
        unobserve: (l) => {
          var s;
          return (s = n()) == null ? void 0 : s.unobserve(l);
        }
      };
    })(), this.range = null, this.setOptions = (e) => {
      Object.entries(e).forEach(([n, l]) => {
        typeof l > "u" && delete e[n];
      }), this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: Ec,
        rangeExtractor: Pc,
        onChange: () => {
        },
        measureElement: Ic,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        ...e
      };
    }, this.notify = (e, n) => {
      var l, s;
      const { startIndex: r, endIndex: i } = this.range ?? {
        startIndex: void 0,
        endIndex: void 0
      }, u = this.calculateRange();
      (e || r !== (u == null ? void 0 : u.startIndex) || i !== (u == null ? void 0 : u.endIndex)) && ((s = (l = this.options).onChange) == null || s.call(l, this, n));
    }, this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((e) => e()), this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.observer.disconnect(), this.elementsCache.clear();
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var e;
      const n = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== n) {
        if (this.cleanup(), !n) {
          this.notify(false, false);
          return;
        }
        this.scrollElement = n, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((e = this.scrollElement) == null ? void 0 : e.window) ?? null, this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        }), this.unsubs.push(
          this.options.observeElementRect(this, (l) => {
            this.scrollRect = l, this.notify(false, false);
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (l, s) => {
            this.scrollAdjustments = 0, this.scrollDirection = s ? this.getScrollOffset() < l ? "forward" : "backward" : null, this.scrollOffset = l;
            const r = this.isScrolling;
            this.isScrolling = s, this.notify(r !== s, s);
          })
        );
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (e, n) => {
      const l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
      for (let r = n - 1; r >= 0; r--) {
        const i = e[r];
        if (l.has(i.lane))
          continue;
        const u = s.get(
          i.lane
        );
        if (u == null || i.end > u.end ? s.set(i.lane, i) : i.end < u.end && l.set(i.lane, true), l.size === this.options.lanes)
          break;
      }
      return s.size === this.options.lanes ? Array.from(s.values()).sort((r, i) => r.end === i.end ? r.index - i.index : r.end - i.end)[0] : void 0;
    }, this.getMeasurementOptions = oa(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (e, n, l, s, r) => (this.pendingMeasuredCacheIndexes = [], {
        count: e,
        paddingStart: n,
        scrollMargin: l,
        getItemKey: s,
        enabled: r
      }),
      {
        key: false
      }
    ), this.getMeasurements = oa(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: e, paddingStart: n, scrollMargin: l, getItemKey: s, enabled: r }, i) => {
        var u;
        if (!r)
          return this.measurementsCache = [], this.itemSizeCache.clear(), [];
        this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((f) => {
          this.itemSizeCache.set(f.key, f.size);
        }));
        const d = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const c = this.measurementsCache.slice(0, d);
        for (let f = d; f < e; f++) {
          let v2 = (u = this.measurementsCache[f]) == null ? void 0 : u.measureElement;
          v2 || (v2 = (E) => {
            const P2 = s(f), D = this.elementsCache.get(P2);
            if (!E) {
              D && (this.observer.unobserve(D), this.elementsCache.delete(P2));
              return;
            }
            D !== E && (D && this.observer.unobserve(D), this.observer.observe(E), this.elementsCache.set(P2, E)), E.isConnected && this.resizeItem(
              f,
              this.options.measureElement(E, void 0, this)
            );
          });
          const p = s(f), g = this.options.lanes === 1 ? c[f - 1] : this.getFurthestMeasurement(c, f), m2 = g ? g.end + this.options.gap : n + l, _ = i.get(p), C = typeof _ == "number" ? _ : this.options.estimateSize(f), $2 = m2 + C, h2 = g ? g.lane : f % this.options.lanes;
          c[f] = {
            index: f,
            start: m2,
            size: C,
            end: $2,
            key: p,
            lane: h2,
            measureElement: v2
          };
        }
        return this.measurementsCache = c, c;
      },
      {
        key: "getMeasurements",
        debug: () => this.options.debug
      }
    ), this.calculateRange = oa(
      () => [this.getMeasurements(), this.getSize(), this.getScrollOffset()],
      (e, n, l) => this.range = e.length > 0 && n > 0 ? Ac({
        measurements: e,
        outerSize: n,
        scrollOffset: l
      }) : null,
      {
        key: "calculateRange",
        debug: () => this.options.debug
      }
    ), this.getIndexes = oa(
      () => [
        this.options.rangeExtractor,
        this.calculateRange(),
        this.options.overscan,
        this.options.count
      ],
      (e, n, l, s) => n === null ? [] : e({
        startIndex: n.startIndex,
        endIndex: n.endIndex,
        overscan: l,
        count: s
      }),
      {
        key: "getIndexes",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (e) => {
      const n = this.options.indexAttribute, l = e.getAttribute(n);
      return l ? parseInt(l, 10) : (console.warn(
        `Missing attribute name '${n}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (e, n) => {
      const l = this.indexFromElement(e), s = this.getMeasurements()[l];
      if (!s || !e.isConnected) {
        this.elementsCache.forEach((i, u) => {
          i === e && (this.observer.unobserve(e), this.elementsCache.delete(u));
        });
        return;
      }
      const r = this.elementsCache.get(s.key);
      r !== e && (r && this.observer.unobserve(r), this.observer.observe(e), this.elementsCache.set(s.key, e)), this.resizeItem(l, this.options.measureElement(e, n, this));
    }, this.resizeItem = (e, n) => {
      const l = this.getMeasurements()[e];
      if (!l)
        return;
      const s = this.itemSizeCache.get(l.key) ?? l.size, r = n - s;
      r !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(l, r, this) : l.start < this.getScrollOffset() + this.scrollAdjustments) && (this.options.debug && console.info("correction", r), this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += r,
        behavior: void 0
      })), this.pendingMeasuredCacheIndexes.push(l.index), this.itemSizeCache = new Map(this.itemSizeCache.set(l.key, n)), this.notify(true, false));
    }, this.measureElement = (e) => {
      e && this._measureElement(e, void 0);
    }, this.getVirtualItems = oa(
      () => [this.getIndexes(), this.getMeasurements()],
      (e, n) => {
        const l = [];
        for (let s = 0, r = e.length; s < r; s++) {
          const i = e[s], u = n[i];
          l.push(u);
        }
        return l;
      },
      {
        key: "getIndexes",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (e) => {
      const n = this.getMeasurements();
      if (n.length !== 0)
        return En(
          n[ps(
            0,
            n.length - 1,
            (l) => En(n[l]).start,
            e
          )]
        );
    }, this.getOffsetForAlignment = (e, n) => {
      const l = this.getSize(), s = this.getScrollOffset();
      n === "auto" && (e <= s ? n = "start" : e >= s + l ? n = "end" : n = "start"), n === "start" ? e = e : n === "end" ? e = e - l : n === "center" && (e = e - l / 2);
      const r = this.options.horizontal ? "scrollWidth" : "scrollHeight", u = (this.scrollElement ? "document" in this.scrollElement ? this.scrollElement.document.documentElement[r] : this.scrollElement[r] : 0) - l;
      return Math.max(Math.min(u, e), 0);
    }, this.getOffsetForIndex = (e, n = "auto") => {
      e = Math.max(0, Math.min(e, this.options.count - 1));
      const l = this.getMeasurements()[e];
      if (!l)
        return;
      const s = this.getSize(), r = this.getScrollOffset();
      if (n === "auto")
        if (l.end >= r + s - this.options.scrollPaddingEnd)
          n = "end";
        else if (l.start <= r + this.options.scrollPaddingStart)
          n = "start";
        else
          return [r, n];
      const i = n === "end" ? l.end + this.options.scrollPaddingEnd : l.start - this.options.scrollPaddingStart;
      return [this.getOffsetForAlignment(i, n), n];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.cancelScrollToIndex = () => {
      this.scrollToIndexTimeoutId !== null && this.targetWindow && (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null);
    }, this.scrollToOffset = (e, { align: n = "start", behavior: l } = {}) => {
      this.cancelScrollToIndex(), l === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(e, n), {
        adjustments: void 0,
        behavior: l
      });
    }, this.scrollToIndex = (e, { align: n = "auto", behavior: l } = {}) => {
      e = Math.max(0, Math.min(e, this.options.count - 1)), this.cancelScrollToIndex(), l === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      );
      const s = this.getOffsetForIndex(e, n);
      if (!s) return;
      const [r, i] = s;
      this._scrollToOffset(r, { adjustments: void 0, behavior: l }), l !== "smooth" && this.isDynamicMode() && this.targetWindow && (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
        if (this.scrollToIndexTimeoutId = null, this.elementsCache.has(
          this.options.getItemKey(e)
        )) {
          const [d] = En(
            this.getOffsetForIndex(e, i)
          );
          xc(d, this.getScrollOffset()) || this.scrollToIndex(e, { align: i, behavior: l });
        } else
          this.scrollToIndex(e, { align: i, behavior: l });
      }));
    }, this.scrollBy = (e, { behavior: n } = {}) => {
      this.cancelScrollToIndex(), n === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + e, {
        adjustments: void 0,
        behavior: n
      });
    }, this.getTotalSize = () => {
      var e;
      const n = this.getMeasurements();
      let l;
      return n.length === 0 ? l = this.options.paddingStart : l = this.options.lanes === 1 ? ((e = n[n.length - 1]) == null ? void 0 : e.end) ?? 0 : Math.max(
        ...n.slice(-this.options.lanes).map((s) => s.end)
      ), l - this.options.scrollMargin + this.options.paddingEnd;
    }, this._scrollToOffset = (e, {
      adjustments: n,
      behavior: l
    }) => {
      this.options.scrollToFn(e, { behavior: l, adjustments: n }, this);
    }, this.measure = () => {
      var e, n;
      this.itemSizeCache = /* @__PURE__ */ new Map(), (n = (e = this.options).onChange) == null || n.call(e, this, false);
    }, this.setOptions(t);
  }
};
var ps = (a2, t, e, n) => {
  for (; a2 <= t; ) {
    const l = (a2 + t) / 2 | 0, s = e(l);
    if (s < n)
      a2 = l + 1;
    else if (s > n)
      t = l - 1;
    else
      return l;
  }
  return a2 > 0 ? a2 - 1 : 0;
};
function Ac({
  measurements: a2,
  outerSize: t,
  scrollOffset: e
}) {
  const n = a2.length - 1, s = ps(0, n, (i) => a2[i].start, e);
  let r = s;
  for (; r < n && a2[r].end < e + t; )
    r++;
  return { startIndex: s, endIndex: r };
}
function Oc(a2) {
  const t = new Rc(unref(a2)), e = shallowRef(t), n = t._didMount();
  return watch(
    () => unref(a2).getScrollElement(),
    (l) => {
      l && t._willUpdate();
    },
    {
      immediate: true
    }
  ), watch(
    () => unref(a2),
    (l) => {
      t.setOptions({
        ...l,
        onChange: (s, r) => {
          var i;
          triggerRef(e), (i = l.onChange) == null || i.call(l, s, r);
        }
      }), t._willUpdate(), triggerRef(e);
    },
    {
      immediate: true
    }
  ), onScopeDispose(n), e;
}
function vs(a2) {
  return Oc(
    computed(() => ({
      observeElementRect: Dc,
      observeElementOffset: Bc,
      scrollToFn: Tc,
      ...unref(a2)
    }))
  );
}
var Hh = defineComponent({
  __name: "ListboxVirtualizer",
  props: {
    options: {},
    estimateSize: {},
    textContent: { type: Function }
  },
  setup(a2) {
    const t = a2, e = useSlots(), n = an(), l = kl(), { getItems: s } = ea();
    n.isVirtual.value = true;
    const r = computed(() => {
      const v2 = l.value;
      if (v2) {
        const p = window.getComputedStyle(v2);
        return {
          start: Number.parseFloat(p.paddingBlockStart || p.paddingTop),
          end: Number.parseFloat(p.paddingBlockEnd || p.paddingBottom)
        };
      } else
        return { start: 0, end: 0 };
    }), i = vs(
      {
        get scrollPaddingStart() {
          return r.value.start;
        },
        get scrollPaddingEnd() {
          return r.value.end;
        },
        get count() {
          return t.options.length;
        },
        get horizontal() {
          return n.orientation.value === "horizontal";
        },
        estimateSize() {
          return t.estimateSize ?? 28;
        },
        getScrollElement() {
          return l.value;
        },
        overscan: 12
      }
    ), u = computed(() => i.value.getVirtualItems().map((v2) => ({
      item: v2,
      is: cloneVNode(e.default({
        option: t.options[v2.index],
        virtualizer: i.value,
        virtualItem: v2
      })[0], {
        key: `${v2.key}`,
        "data-index": v2.index,
        "aria-setsize": t.options.length,
        "aria-posinset": v2.index + 1,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translateY(${v2.start}px)`,
          overflowAnchor: "none"
        }
      })
    })));
    n.virtualFocusHook.on((v2) => {
      const p = t.options.findIndex((g) => Array.isArray(n.modelValue.value) ? Gt(g, n.modelValue.value[0], n.by) : Gt(g, n.modelValue.value, n.by));
      p !== -1 && (v2 == null || v2.preventDefault(), i.value.scrollToIndex(p, { align: "start" }), requestAnimationFrame(() => {
        const g = yc(l.value);
        g && v2 && (g == null || g.focus());
      }));
    });
    const d = Tt("", 1e3), c = computed(() => {
      const v2 = (p) => t.textContent ? t.textContent(p) : p.toString().toLowerCase();
      return t.options.map((p, g) => ({
        index: g,
        textContent: v2(p)
      }));
    });
    function f(v2, p) {
      var C, $2, h2, E;
      if (!((C = n.firstValue) != null && C.value) || !n.multiple.value || !Array.isArray(n.modelValue.value))
        return;
      const m2 = ($2 = s().filter((P2) => P2.ref.dataset.disabled !== "").find((P2) => P2.ref === n.highlightedElement.value)) == null ? void 0 : $2.value;
      if (!m2)
        return;
      let _ = null;
      switch (p) {
        case "prev":
        case "next": {
          _ = Bt(t.options, n.firstValue.value, m2);
          break;
        }
        case "first": {
          _ = Bt(t.options, n.firstValue.value, (h2 = t.options) == null ? void 0 : h2[0]);
          break;
        }
        case "last": {
          _ = Bt(t.options, n.firstValue.value, (E = t.options) == null ? void 0 : E[t.options.length - 1]);
          break;
        }
      }
      n.modelValue.value = _;
    }
    return n.virtualKeydownHook.on((v2) => {
      var _;
      const p = v2.altKey || v2.ctrlKey || v2.metaKey;
      if (v2.key === "Tab" && !p)
        return;
      let m2 = en[v2.key];
      if (p && v2.key === "a" && n.multiple.value ? (v2.preventDefault(), n.modelValue.value = [...t.options], m2 = "last") : v2.shiftKey && m2 && f(v2, m2), ["first", "last"].includes(m2)) {
        v2.preventDefault();
        const C = m2 === "first" ? 0 : t.options.length - 1;
        i.value.scrollToIndex(C), requestAnimationFrame(() => {
          const $2 = s(), h2 = m2 === "first" ? $2[0] : $2[$2.length - 1];
          n.onChangeHighlight(h2.ref);
        });
      } else if (!m2 && !p) {
        d.value += v2.key;
        const C = Number((_ = me()) == null ? void 0 : _.getAttribute("data-index")), $2 = c.value[C].textContent, h2 = c.value.map((D) => D.textContent), E = Zn(h2, d.value, $2), P2 = c.value.find((D) => D.textContent === E);
        P2 && (i.value.scrollToIndex(P2.index, { align: "start" }), requestAnimationFrame(() => {
          const D = l.value.querySelector(`[data-index="${P2.index}"]`);
          D instanceof HTMLElement && n.onChangeHighlight(D);
        }));
      }
    }), (v2, p) => (openBlock(), createElementBlock("div", {
      "data-radix-vue-virtualizer": "",
      style: normalizeStyle({
        position: "relative",
        width: "100%",
        height: `${unref(i).getTotalSize()}px`
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(u.value, ({ is: g, item: m2 }) => (openBlock(), createBlock(resolveDynamicComponent(g), {
        key: m2.index
      }))), 128))
    ], 4));
  }
});
var [kc, Mc] = te("ListboxGroup");
var Wh = defineComponent({
  __name: "ListboxGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = ge(void 0, "radix-vue-listbox-group");
    return Mc({ id: e }), (n, l) => (openBlock(), createBlock(unref(O), mergeProps({ role: "group" }, t, { "aria-labelledby": unref(e) }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
});
var jh = defineComponent({
  __name: "ListboxGroupLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = kc({ id: "" });
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).id
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var [nn, Vc] = te("MenubarRoot");
var Uh = defineComponent({
  __name: "MenubarRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    dir: {},
    loop: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l, currentElement: s } = R2(), { createCollection: r } = Fe("menubar");
    r(s);
    const i = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue ?? "",
      passive: e.modelValue === void 0
    }), u = ref(null), { dir: d, loop: c } = toRefs(e), f = we(d);
    return Vc({
      modelValue: i,
      dir: f,
      loop: c,
      onMenuOpen: (v2) => {
        i.value = v2, u.value = v2;
      },
      onMenuClose: () => {
        i.value = "";
      },
      onMenuToggle: (v2) => {
        i.value = i.value ? "" : v2, u.value = v2;
      }
    }), (v2, p) => (openBlock(), createBlock(unref(Ft), {
      "current-tab-stop-id": u.value,
      "onUpdate:currentTabStopId": p[0] || (p[0] = (g) => u.value = g),
      orientation: "horizontal",
      loop: unref(c),
      dir: unref(f),
      "as-child": ""
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(l),
          role: "menubar"
        }, {
          default: withCtx(() => [
            renderSlot(v2.$slots, "default", { modelValue: unref(i) })
          ]),
          _: 3
        }, 512)
      ]),
      _: 3
    }, 8, ["current-tab-stop-id", "loop", "dir"]));
  }
});
var [So, Fc] = te("MenubarMenu");
var Gh = defineComponent({
  __name: "MenubarMenu",
  props: {
    value: {}
  },
  setup(a2) {
    const e = ge(a2.value), n = nn();
    R2();
    const l = ref(), s = ref(false), r = computed(() => n.modelValue.value === e);
    return watch(r, () => {
      r.value || (s.value = false);
    }), Fc({
      value: e,
      triggerElement: l,
      triggerId: e,
      contentId: "",
      wasKeyboardTriggerOpenRef: s
    }), (i, u) => (openBlock(), createBlock(unref(so), {
      open: r.value,
      modal: false,
      dir: unref(n).dir.value,
      "onUpdate:open": u[0] || (u[0] = (d) => {
        d || unref(n).onMenuClose();
      })
    }, {
      default: withCtx(() => [
        renderSlot(i.$slots, "default")
      ]),
      _: 3
    }, 8, ["open", "dir"]));
  }
});
var qh = defineComponent({
  __name: "MenubarTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = nn(), e = So(), { forwardRef: n, currentElement: l } = R2(), s = ref(false), r = computed(() => t.modelValue.value === e.value);
    return onMounted(() => {
      e.triggerElement = l;
    }), (i, u) => (openBlock(), createBlock(unref(Nt), {
      "as-child": "",
      focusable: !i.disabled,
      "tab-stop-id": unref(e).value
    }, {
      default: withCtx(() => [
        createVNode(unref(Qa), { "as-child": "" }, {
          default: withCtx(() => [
            createVNode(unref(O), {
              id: unref(e).triggerId,
              ref: unref(n),
              as: i.as,
              type: i.as === "button" ? "button" : void 0,
              role: "menuitem",
              "aria-haspopup": "menu",
              "aria-expanded": r.value,
              "aria-controls": r.value ? unref(e).contentId : void 0,
              "data-highlighted": s.value ? "" : void 0,
              "data-state": r.value ? "open" : "closed",
              "data-disabled": i.disabled ? "" : void 0,
              disabled: i.disabled,
              "data-value": unref(e).value,
              "data-radix-vue-collection-item": "",
              onPointerdown: u[0] || (u[0] = (d) => {
                !i.disabled && d.button === 0 && d.ctrlKey === false && (unref(t).onMenuOpen(unref(e).value), r.value || d.preventDefault());
              }),
              onPointerenter: u[1] || (u[1] = () => {
                var c;
                !!unref(t).modelValue.value && !r.value && (unref(t).onMenuOpen(unref(e).value), (c = unref(l)) == null || c.focus());
              }),
              onKeydown: u[2] || (u[2] = withKeys((d) => {
                i.disabled || (["Enter", " "].includes(d.key) && unref(t).onMenuToggle(unref(e).value), d.key === "ArrowDown" && unref(t).onMenuOpen(unref(e).value), ["Enter", " ", "ArrowDown"].includes(d.key) && (unref(e).wasKeyboardTriggerOpenRef.value = true, d.preventDefault()));
              }, ["enter", "space", "arrow-down"])),
              onFocus: u[3] || (u[3] = (d) => s.value = true),
              onBlur: u[4] || (u[4] = (d) => s.value = false)
            }, {
              default: withCtx(() => [
                renderSlot(i.$slots, "default")
              ]),
              _: 3
            }, 8, ["id", "as", "type", "aria-expanded", "aria-controls", "data-highlighted", "data-state", "data-disabled", "disabled", "data-value"])
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["focusable", "tab-stop-id"]));
  }
});
var Yh = defineComponent({
  __name: "MenubarPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(vo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Xh = defineComponent({
  __name: "MenubarContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    R2();
    const s = nn(), r = So();
    r.contentId || (r.contentId = ge(void 0, "radix-vue-menubar-content"));
    const { injectCollection: i } = Fe("menubar"), u = i(), d = ref(false);
    function c(f) {
      const p = f.target.hasAttribute(
        "data-radix-menubar-subtrigger"
      ), m2 = (s.dir.value === "rtl" ? "ArrowRight" : "ArrowLeft") === f.key;
      if (!m2 && p)
        return;
      let C = u.value.map((E) => E.dataset.value);
      m2 && C.reverse();
      const $2 = C.indexOf(r.value);
      C = s.loop.value ? Xn(C, $2 + 1) : C.slice($2 + 1);
      const [h2] = C;
      h2 && s.onMenuOpen(h2);
    }
    return (f, v2) => (openBlock(), createBlock(unref(fo), mergeProps(unref(l), {
      id: unref(r).contentId,
      "data-radix-menubar-content": "",
      "aria-labelledby": unref(r).triggerId,
      style: {
        "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
        "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
        "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
      },
      onCloseAutoFocus: v2[0] || (v2[0] = (p) => {
        var m2;
        !!!unref(s).modelValue.value && !d.value && ((m2 = unref(r).triggerElement.value) == null || m2.focus()), d.value = false, p.preventDefault();
      }),
      onFocusOutside: v2[1] || (v2[1] = (p) => {
        const g = p.target;
        unref(u).some((_) => _.contains(g)) && p.preventDefault();
      }),
      onInteractOutside: v2[2] || (v2[2] = (p) => {
        d.value = true;
      }),
      onEntryFocus: v2[3] || (v2[3] = (p) => {
        unref(r).wasKeyboardTriggerOpenRef.value || p.preventDefault();
      }),
      onKeydown: withKeys(c, ["arrow-right", "arrow-left"])
    }), {
      default: withCtx(() => [
        renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 16, ["id", "aria-labelledby"]));
  }
});
var Zh = defineComponent({
  __name: "MenubarArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(lo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Jh = defineComponent({
  __name: "MenubarItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(xa), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Qh = defineComponent({
  __name: "MenubarGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(tn), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ey = defineComponent({
  __name: "MenubarSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(yo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ty = defineComponent({
  __name: "MenubarCheckboxItem",
  props: {
    checked: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select", "update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(co), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ay = defineComponent({
  __name: "MenubarItemIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(uo), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ny = defineComponent({
  __name: "MenubarLabel",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(po), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var oy = defineComponent({
  __name: "MenubarRadioGroup",
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = Te(t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(mo), normalizeProps(guardReactiveProps({ ...e, ...unref(l) })), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ly = defineComponent({
  __name: "MenubarRadioItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    return R2(), (s, r) => (openBlock(), createBlock(unref(ho), normalizeProps(guardReactiveProps(unref(l))), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var sy = defineComponent({
  __name: "MenubarSub",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    const l = ne(e, "open", n, {
      defaultValue: e.defaultOpen ?? false,
      passive: e.open === void 0
    });
    return (s, r) => (openBlock(), createBlock(unref(go), {
      open: unref(l),
      "onUpdate:open": r[0] || (r[0] = (i) => isRef(l) ? l.value = i : null)
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", { open: unref(l) })
      ]),
      _: 3
    }, 8, ["open"]));
  }
});
var ry = defineComponent({
  __name: "MenubarSubContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const l = Se(a2, t);
    R2();
    const { injectCollection: s } = Fe("menubar"), r = nn(), i = So(), u = s();
    function d(c) {
      if (c.target.hasAttribute(
        "data-radix-menubar-subtrigger"
      ))
        return;
      let p = u.value.map((_) => _.dataset.value);
      const g = p.indexOf(i.value);
      p = r.loop.value ? Xn(p, g + 1) : p.slice(g + 1);
      const [m2] = p;
      m2 && r.onMenuOpen(m2);
    }
    return (c, f) => (openBlock(), createBlock(unref(bo), mergeProps(unref(l), {
      "data-radix-menubar-content": "",
      style: {
        "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
        "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
        "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
      },
      onKeydown: withKeys(d, ["arrow-right"])
    }), {
      default: withCtx(() => [
        renderSlot(c.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var iy = defineComponent({
  __name: "MenubarSubTrigger",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Co), mergeProps(t, { "data-radix-menubar-subtrigger": "" }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [_t, ms] = te(["NavigationMenuRoot", "NavigationMenuSub"], "NavigationMenuContext");
var uy = defineComponent({
  __name: "NavigationMenuRoot",
  props: {
    modelValue: { default: void 0 },
    defaultValue: {},
    dir: {},
    orientation: { default: "horizontal" },
    delayDuration: { default: 200 },
    skipDelayDuration: { default: 300 },
    disableClickTrigger: { type: Boolean, default: false },
    disableHoverTrigger: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "nav" }
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "modelValue", t, {
      defaultValue: e.defaultValue ?? "",
      passive: e.modelValue === void 0
    }), s = ref(""), { forwardRef: r, currentElement: i } = R2(), u = ref(), d = ref(), { createCollection: c } = Fe("nav");
    c(u);
    const { delayDuration: f, skipDelayDuration: v2, dir: p, disableClickTrigger: g, disableHoverTrigger: m2 } = toRefs(e), _ = we(p), C = Tt(false, v2), $2 = computed(() => l.value !== "" || C.value ? 150 : f.value), h2 = jn((E) => {
      typeof E == "string" && (s.value = l.value, l.value = E);
    }, $2);
    return ms({
      isRootMenu: true,
      modelValue: l,
      previousValue: s,
      baseId: ge(void 0, "radix-navigation-menu"),
      disableClickTrigger: g,
      disableHoverTrigger: m2,
      dir: _,
      orientation: e.orientation,
      rootNavigationMenu: i,
      indicatorTrack: u,
      onIndicatorTrackChange: (E) => {
        u.value = E;
      },
      viewport: d,
      onViewportChange: (E) => {
        d.value = E;
      },
      onTriggerEnter: (E) => {
        h2(E);
      },
      onTriggerLeave: () => {
        C.value = true, h2("");
      },
      onContentEnter: () => {
        h2();
      },
      onContentLeave: () => {
        h2("");
      },
      onItemSelect: (E) => {
        s.value = l.value, l.value = E;
      },
      onItemDismiss: () => {
        s.value = l.value, l.value = "";
      }
    }), (E, P2) => (openBlock(), createBlock(unref(O), {
      ref: unref(r),
      "aria-label": "Main",
      as: E.as,
      "as-child": E.asChild,
      "data-orientation": E.orientation,
      dir: unref(_),
      "data-radix-navigation-menu": ""
    }, {
      default: withCtx(() => [
        renderSlot(E.$slots, "default", { modelValue: unref(l) })
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-orientation", "dir"]));
  }
});
function on(a2) {
  return a2 ? "open" : "closed";
}
function hs(a2, t) {
  return `${a2}-trigger-${t}`;
}
function Eo(a2, t) {
  return `${a2}-content-${t}`;
}
var Nc = "navigationMenu.linkSelect";
var Va = "navigationMenu.rootContentDismiss";
function On(a2) {
  const t = [], e = document.createTreeWalker(a2, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const l = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || l ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; e.nextNode(); ) t.push(e.currentNode);
  return t;
}
function ys(a2) {
  const t = me();
  return a2.some((e) => e === t ? true : (e.focus(), me() !== t));
}
function Lc(a2) {
  return a2.forEach((t) => {
    t.dataset.tabindex = t.getAttribute("tabindex") || "", t.setAttribute("tabindex", "-1");
  }), () => {
    a2.forEach((t) => {
      const e = t.dataset.tabindex;
      t.setAttribute("tabindex", e);
    });
  };
}
function gs(a2) {
  return (t) => t.pointerType === "mouse" ? a2(t) : void 0;
}
var [Po, zc] = te("NavigationMenuItem");
var dy = defineComponent({
  __name: "NavigationMenuItem",
  props: {
    value: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const { injectCollection: e } = Fe("nav"), n = e(), l = _t(), s = ge(t.value), r = ref(), i = ref(), u = Eo(l.baseId, s);
    let d = () => ({});
    const c = ref(false);
    async function f(m2 = "start") {
      const _ = document.getElementById(u);
      if (_) {
        d();
        const C = On(_);
        C.length && ys(m2 === "start" ? C : C.reverse());
      }
    }
    function v2() {
      const m2 = document.getElementById(u);
      if (m2) {
        const _ = On(m2);
        _.length && (d = Lc(_));
      }
    }
    zc({
      value: s,
      contentId: u,
      triggerRef: r,
      focusProxyRef: i,
      wasEscapeCloseRef: c,
      onEntryKeyDown: f,
      onFocusProxyEnter: f,
      onContentFocusOutside: v2,
      onRootContentClose: v2
    });
    function p() {
      var m2;
      l.onItemDismiss(), (m2 = r.value) == null || m2.focus();
    }
    function g(m2) {
      const _ = me();
      if (m2.keyCode === 32 || m2.key === "Enter")
        if (l.modelValue.value === s) {
          p(), m2.preventDefault();
          return;
        } else {
          m2.target.click(), m2.preventDefault();
          return;
        }
      const C = n.value.filter(
        (h2) => {
          var E;
          return (E = h2.parentElement) == null ? void 0 : E.hasAttribute("data-menu-item");
        }
      );
      if (!C.includes(_))
        return;
      const $2 = At(m2, _, void 0, {
        itemsArray: C,
        loop: false
      });
      $2 && ($2 == null || $2.focus()), m2.preventDefault(), m2.stopPropagation();
    }
    return (m2, _) => (openBlock(), createBlock(unref(O), {
      "as-child": m2.asChild,
      as: m2.as,
      "data-menu-item": "",
      onKeydown: withKeys(g, ["up", "down", "left", "right", "home", "end", "space"])
    }, {
      default: withCtx(() => [
        renderSlot(m2.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
var Kc = defineComponent({
  __name: "NavigationMenuContentImpl",
  props: {
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { injectCollection: l } = Fe("nav"), s = l(), { forwardRef: r, currentElement: i } = R2(), u = _t(), d = Po(), c = hs(u.baseId, d.value), f = Eo(u.baseId, d.value), v2 = ref(null), p = computed(() => {
      const E = s.value.map((A2) => A2.id.split("trigger-")[1]);
      u.dir.value === "rtl" && E.reverse();
      const P2 = E.indexOf(u.modelValue.value), D = E.indexOf(u.previousValue.value), I = d.value === u.modelValue.value, M = D === E.indexOf(d.value);
      if (!I && !M)
        return v2.value;
      const V2 = (() => {
        if (P2 !== D) {
          if (I && D !== -1)
            return P2 > D ? "from-end" : "from-start";
          if (M && P2 !== -1)
            return P2 > D ? "to-start" : "to-end";
        }
        return null;
      })();
      return v2.value = V2, V2;
    });
    function g(h2) {
      var E, P2;
      if (n("focusOutside", h2), n("interactOutside", h2), !h2.defaultPrevented) {
        d.onContentFocusOutside();
        const D = h2.target;
        (P2 = (E = u.rootNavigationMenu) == null ? void 0 : E.value) != null && P2.contains(D) && h2.preventDefault();
      }
    }
    function m2(h2) {
      var E;
      if (n("pointerDownOutside", h2), !h2.defaultPrevented) {
        const P2 = h2.target, D = s.value.some(
          (M) => M.contains(P2)
        ), I = u.isRootMenu && ((E = u.viewport.value) == null ? void 0 : E.contains(P2));
        (D || I || !u.isRootMenu) && h2.preventDefault();
      }
    }
    watchEffect((h2) => {
      const E = i.value;
      if (u.isRootMenu && E) {
        const P2 = () => {
          var D;
          u.onItemDismiss(), d.onRootContentClose(), E.contains(me()) && ((D = d.triggerRef.value) == null || D.focus());
        };
        E.addEventListener(Va, P2), h2(
          () => E.removeEventListener(Va, P2)
        );
      }
    });
    function _(h2) {
      var E, P2;
      n("escapeKeyDown", h2), h2.defaultPrevented || (u.onItemDismiss(), (P2 = (E = d.triggerRef) == null ? void 0 : E.value) == null || P2.focus(), d.wasEscapeCloseRef.value = true);
    }
    function C(h2) {
      var M;
      if (h2.target.closest("[data-radix-navigation-menu]") !== u.rootNavigationMenu.value)
        return;
      const E = h2.altKey || h2.ctrlKey || h2.metaKey, P2 = h2.key === "Tab" && !E, D = On(h2.currentTarget);
      if (P2) {
        const V2 = me(), A2 = D.findIndex(
          (H2) => H2 === V2
        ), j = h2.shiftKey ? D.slice(0, A2).reverse() : D.slice(A2 + 1, D.length);
        if (ys(j))
          h2.preventDefault();
        else {
          (M = d.focusProxyRef.value) == null || M.focus();
          return;
        }
      }
      const I = At(
        h2,
        me(),
        void 0,
        { itemsArray: D, loop: false, enableIgnoredElement: true }
      );
      I == null || I.focus();
    }
    function $2() {
      var E;
      const h2 = new Event(Va, {
        bubbles: true,
        cancelable: true
      });
      (E = i.value) == null || E.dispatchEvent(h2);
    }
    return (h2, E) => (openBlock(), createBlock(unref(Ct), mergeProps({
      id: unref(f),
      ref: unref(r),
      "aria-labelledby": unref(c),
      "data-motion": p.value,
      "data-state": unref(on)(unref(u).modelValue.value === unref(d).value),
      "data-orientation": unref(u).orientation
    }, e, {
      onKeydown: C,
      onEscapeKeyDown: _,
      onPointerDownOutside: m2,
      onFocusOutside: g,
      onDismiss: $2
    }), {
      default: withCtx(() => [
        renderSlot(h2.$slots, "default")
      ]),
      _: 3
    }, 16, ["id", "aria-labelledby", "data-motion", "data-state", "data-orientation"]));
  }
});
var cy = defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuContent",
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Te(n), { forwardRef: s } = R2(), r = Ga(), i = _t(), u = Po(), d = computed(() => u.value === i.modelValue.value), c = computed(() => i.viewport.value && !i.modelValue.value && i.previousValue.value ? i.previousValue.value === u.value : false);
    return (f, v2) => unref(r) ? (openBlock(), createBlock(Teleport, {
      key: 0,
      to: unref(i).viewport.value,
      disabled: !unref(i).viewport.value
    }, [
      createVNode(unref(Pe), {
        present: f.forceMount || d.value || c.value
      }, {
        default: withCtx(() => [
          createVNode(Kc, mergeProps({
            ref: unref(s),
            "data-state": unref(on)(d.value),
            style: {
              pointerEvents: !d.value && unref(i).isRootMenu ? "none" : void 0
            }
          }, { ...f.$attrs, ...e, ...unref(l) }, {
            onPointerenter: v2[0] || (v2[0] = (p) => unref(i).onContentEnter(unref(u).value)),
            onPointerleave: v2[1] || (v2[1] = (p) => unref(gs)(() => unref(i).onContentLeave())(p)),
            onPointerDownOutside: v2[2] || (v2[2] = (p) => n("pointerDownOutside", p)),
            onFocusOutside: v2[3] || (v2[3] = (p) => n("focusOutside", p)),
            onInteractOutside: v2[4] || (v2[4] = (p) => n("interactOutside", p))
          }), {
            default: withCtx(() => [
              renderSlot(f.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state", "style"])
        ]),
        _: 3
      }, 8, ["present"])
    ], 8, ["to", "disabled"])) : createCommentVNode("", true);
  }
});
var fy = defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), { injectCollection: n } = Fe("nav"), l = n(), s = _t(), r = ref(), i = computed(() => s.orientation === "horizontal"), u = computed(() => !!s.modelValue.value), d = ref();
    function c() {
      d.value && (r.value = {
        size: i.value ? d.value.offsetWidth : d.value.offsetHeight,
        offset: i.value ? d.value.offsetLeft : d.value.offsetTop
      });
    }
    return watchEffect(() => {
      if (!s.modelValue.value) {
        r.value = void 0;
        return;
      }
      const f = l.value;
      d.value = f.find(
        (v2) => v2.id.includes(s.modelValue.value)
      ), c();
    }), tt(d, c), tt(s.indicatorTrack, c), (f, v2) => unref(s).indicatorTrack.value ? (openBlock(), createBlock(Teleport, {
      key: 0,
      to: unref(s).indicatorTrack.value
    }, [
      createVNode(unref(Pe), {
        present: f.forceMount || u.value
      }, {
        default: withCtx(() => {
          var p, g, m2, _;
          return [
            createVNode(unref(O), mergeProps({
              ref: unref(e),
              "aria-hidden": "true",
              "data-state": u.value ? "visible" : "hidden",
              "data-orientation": unref(s).orientation,
              "as-child": t.asChild,
              as: f.as,
              style: {
                position: "absolute",
                ...i.value ? {
                  left: 0,
                  width: `${(p = r.value) == null ? void 0 : p.size}px`,
                  transform: `translateX(${(g = r.value) == null ? void 0 : g.offset}px)`
                } : {
                  top: 0,
                  height: `${(m2 = r.value) == null ? void 0 : m2.size}px`,
                  transform: `translateY(${(_ = r.value) == null ? void 0 : _.offset}px)`
                }
              }
            }, f.$attrs), {
              default: withCtx(() => [
                renderSlot(f.$slots, "default")
              ]),
              _: 3
            }, 16, ["data-state", "data-orientation", "as-child", "as", "style"])
          ];
        }),
        _: 3
      }, 8, ["present"])
    ], 8, ["to"])) : createCommentVNode("", true);
  }
});
var py = defineComponent({
  __name: "NavigationMenuLink",
  props: {
    active: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  emits: ["select"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    async function l(s) {
      var i;
      const r = new CustomEvent(Nc, {
        bubbles: true,
        cancelable: true,
        detail: {
          originalEvent: s
        }
      });
      if (n("select", r), !r.defaultPrevented && !s.metaKey) {
        const u = new CustomEvent(
          Va,
          {
            bubbles: true,
            cancelable: true
          }
        );
        (i = s.target) == null || i.dispatchEvent(u);
      }
    }
    return (s, r) => (openBlock(), createBlock(unref(O), {
      as: s.as,
      "data-active": s.active ? "" : void 0,
      "aria-current": s.active ? "page" : void 0,
      "as-child": e.asChild,
      "data-radix-vue-collection-item": "",
      onClick: l
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "data-active", "aria-current", "as-child"]));
  }
});
var vy = defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuList",
  props: {
    asChild: { type: Boolean },
    as: { default: "ul" }
  },
  setup(a2) {
    const t = a2, e = _t(), { forwardRef: n, currentElement: l } = R2();
    return onMounted(() => {
      e.onIndicatorTrackChange(l.value);
    }), (s, r) => (openBlock(), createBlock(unref(O), {
      ref: unref(n),
      style: { position: "relative" }
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps(s.$attrs, {
          "as-child": t.asChild,
          as: s.as,
          "data-orientation": unref(e).orientation
        }), {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-orientation"])
      ]),
      _: 3
    }, 512));
  }
});
var my = defineComponent({
  __name: "NavigationMenuSub",
  props: {
    modelValue: {},
    defaultValue: {},
    orientation: { default: "horizontal" },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "modelValue", t, {
      defaultValue: e.defaultValue ?? "",
      passive: e.modelValue === void 0
    }), s = ref(""), r = _t(), { forwardRef: i, currentElement: u } = R2(), d = ref(), c = ref(), { createCollection: f } = Fe("nav");
    return f(d), ms({
      ...r,
      isRootMenu: false,
      modelValue: l,
      previousValue: s,
      orientation: e.orientation,
      rootNavigationMenu: u,
      indicatorTrack: d,
      onIndicatorTrackChange: (v2) => {
        d.value = v2;
      },
      viewport: c,
      onViewportChange: (v2) => {
        c.value = v2;
      },
      onTriggerEnter: (v2) => {
        l.value = v2;
      },
      onTriggerLeave: () => {
      },
      onContentEnter: () => {
      },
      onContentLeave: () => {
      },
      onItemSelect: (v2) => {
        l.value = v2;
      },
      onItemDismiss: () => {
        l.value = "";
      }
    }), (v2, p) => (openBlock(), createBlock(unref(O), {
      ref: unref(i),
      "data-orientation": v2.orientation,
      "as-child": e.asChild,
      as: v2.as,
      "data-radix-navigation-menu": ""
    }, {
      default: withCtx(() => [
        renderSlot(v2.$slots, "default", { modelValue: unref(l) })
      ]),
      _: 3
    }, 8, ["data-orientation", "as-child", "as"]));
  }
});
var Hc = ["aria-owns"];
var hy = defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = _t(), n = Po(), { forwardRef: l, currentElement: s } = R2(), r = ref(""), i = ref(""), u = Tt(false, 300), d = ref(false), c = computed(() => n.value === e.modelValue.value);
    onMounted(() => {
      n.triggerRef = s, r.value = hs(e.baseId, n.value), i.value = Eo(e.baseId, n.value);
    });
    function f() {
      e.disableHoverTrigger.value || (d.value = false, n.wasEscapeCloseRef.value = false);
    }
    function v2($2) {
      if (!e.disableHoverTrigger.value && $2.pointerType === "mouse") {
        if (t.disabled || d.value || n.wasEscapeCloseRef.value || u.value)
          return;
        e.onTriggerEnter(n.value), u.value = true;
      }
    }
    function p($2) {
      if (!e.disableHoverTrigger.value && $2.pointerType === "mouse") {
        if (t.disabled)
          return;
        e.onTriggerLeave(), u.value = false;
      }
    }
    function g($2) {
      $2.pointerType === "mouse" && e.disableClickTrigger.value || u.value || (c.value ? e.onItemSelect("") : e.onItemSelect(n.value), d.value = c.value);
    }
    function m2($2) {
      const E = { horizontal: "ArrowDown", vertical: e.dir.value === "rtl" ? "ArrowLeft" : "ArrowRight" }[e.orientation];
      c.value && $2.key === E && (n.onEntryKeyDown(), $2.preventDefault(), $2.stopPropagation());
    }
    function _($2) {
      n.focusProxyRef.value = $e($2);
    }
    function C($2) {
      const h2 = document.getElementById(n.contentId), E = $2.relatedTarget, P2 = E === s.value, D = h2 == null ? void 0 : h2.contains(E);
      (P2 || !D) && n.onFocusProxyEnter(P2 ? "start" : "end");
    }
    return ($2, h2) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps({
        id: r.value,
        ref: unref(l),
        disabled: $2.disabled,
        "data-disabled": $2.disabled ? "" : void 0,
        "data-state": unref(on)(c.value),
        "aria-expanded": c.value,
        "aria-controls": i.value,
        "as-child": t.asChild,
        as: $2.as
      }, $2.$attrs, {
        "data-radix-vue-collection-item": "",
        onPointerenter: f,
        onPointermove: v2,
        onPointerleave: p,
        onClick: g,
        onKeydown: m2
      }), {
        default: withCtx(() => [
          renderSlot($2.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "disabled", "data-disabled", "data-state", "aria-expanded", "aria-controls", "as-child", "as"]),
      c.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createVNode(unref(Jt), {
          ref: _,
          "aria-hidden": "true",
          tabindex: 0,
          onFocus: C
        }),
        unref(e).viewport ? (openBlock(), createElementBlock("span", {
          key: 0,
          "aria-owns": i.value
        }, null, 8, Hc)) : createCommentVNode("", true)
      ], 64)) : createCommentVNode("", true)
    ], 64));
  }
});
var yy = defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuViewport",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const { forwardRef: t, currentElement: e } = R2(), n = _t(), l = ref(), s = computed(() => !!n.modelValue.value), r = computed(() => n.modelValue.value);
    watch(e, () => {
      e.value && n.onViewportChange(e.value);
    });
    const i = ref();
    return watch([r, s], async () => {
      var d, c;
      if (await nextTick(), !e.value)
        return;
      const u = (c = (d = e.value.querySelector("[data-state=open]")) == null ? void 0 : d.children) == null ? void 0 : c[0];
      i.value = u;
    }, { immediate: true }), tt(i, () => {
      i.value && (l.value = {
        width: i.value.offsetWidth,
        height: i.value.offsetHeight
      });
    }), (u, d) => (openBlock(), createBlock(unref(Pe), {
      present: u.forceMount || s.value
    }, {
      default: withCtx(() => {
        var c, f;
        return [
          createVNode(unref(O), mergeProps(u.$attrs, {
            ref: unref(t),
            as: u.as,
            "as-child": u.asChild,
            "data-state": unref(on)(s.value),
            "data-orientation": unref(n).orientation,
            style: {
              // Prevent interaction when animating out
              pointerEvents: !s.value && unref(n).isRootMenu ? "none" : void 0,
              "--radix-navigation-menu-viewport-width": l.value ? `${(c = l.value) == null ? void 0 : c.width}px` : void 0,
              "--radix-navigation-menu-viewport-height": l.value ? `${(f = l.value) == null ? void 0 : f.height}px` : void 0
            },
            onPointerenter: d[0] || (d[0] = (v2) => unref(n).onContentEnter(unref(n).modelValue.value)),
            onPointerleave: d[1] || (d[1] = (v2) => unref(gs)(() => unref(n).onContentLeave())(v2))
          }), {
            default: withCtx(() => [
              renderSlot(u.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child", "data-state", "data-orientation", "style"])
        ];
      }),
      _: 3
    }, 8, ["present"]));
  }
});
function bs(a2) {
  const { disabled: t } = a2, e = ref(), n = ua(), l = () => window.clearTimeout(e.value), s = (v2) => {
    l(), !t.value && (n.trigger(), e.value = window.setTimeout(() => {
      s(60);
    }, v2));
  }, r = () => {
    s(400);
  }, i = () => {
    l();
  }, u = ref(false), d = computed(() => $e(a2.target)), c = (v2) => {
    v2.button !== 0 || u.value || (v2.preventDefault(), u.value = true, r());
  }, f = () => {
    u.value = false, i();
  };
  return Je && (He(d || window, "pointerdown", c), He(window, "pointerup", f), He(window, "pointercancel", f)), {
    isPressed: u,
    onTrigger: n.on
  };
}
function Qo(a2, t = ref({})) {
  return $l(() => new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(a2.value, t.value));
}
function Wc(a2, t = ref({})) {
  return $l(() => new $6c7bd7858deea686$export$cd11ab140839f11d(a2.value, t.value));
}
function el(a2, t, e) {
  let n = a2 === "+" ? t + e : t - e;
  if (t % 1 !== 0 || e % 1 !== 0) {
    const l = t.toString().split("."), s = e.toString().split("."), r = l[1] && l[1].length || 0, i = s[1] && s[1].length || 0, u = 10 ** Math.max(r, i);
    t = Math.round(t * u), e = Math.round(e * u), n = a2 === "+" ? t + e : t - e, n /= u;
  }
  return n;
}
var jc = ["value", "name", "disabled", "required"];
var [Do, Uc] = te("NumberFieldRoot");
var gy = defineComponent({
  inheritAttrs: false,
  __name: "NumberFieldRoot",
  props: {
    defaultValue: { default: void 0 },
    modelValue: {},
    min: {},
    max: {},
    step: { default: 1 },
    formatOptions: {},
    locale: { default: "en-US" },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    id: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { disabled: l, min: s, max: r, step: i, locale: u, formatOptions: d, id: c } = toRefs(e), f = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: e.modelValue === void 0
    }), { primitiveElement: v2, currentElement: p } = Re(), g = at(p), m2 = ref(), _ = computed(
      () => H2(f.value) === s.value || (s.value && !isNaN(f.value) ? el("-", f.value, i.value) < s.value : false)
    ), C = computed(
      () => H2(f.value) === r.value || (r.value && !isNaN(f.value) ? el("+", f.value, i.value) > r.value : false)
    );
    function $2(G2, J2 = 1) {
      var K;
      const z2 = I.parse(((K = m2.value) == null ? void 0 : K.value) ?? "");
      e.disabled || (isNaN(z2) ? f.value = s.value ?? 0 : G2 === "increase" ? f.value = H2(z2 + (i.value ?? 1) * J2) : f.value = H2(z2 - (i.value ?? 1) * J2));
    }
    function h2(G2 = 1) {
      $2("increase", G2);
    }
    function E(G2 = 1) {
      $2("decrease", G2);
    }
    function P2(G2) {
      G2 === "min" && s.value !== void 0 ? f.value = H2(s.value) : G2 === "max" && r.value !== void 0 && (f.value = H2(r.value));
    }
    const D = Qo(u, d), I = Wc(u, d), M = computed(() => D.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), V2 = Qo(u, d), A2 = computed(() => isNaN(f.value) ? "" : V2.format(f.value));
    function F(G2) {
      return I.isValidPartialNumber(G2, s.value, r.value);
    }
    function j(G2) {
      m2.value && (m2.value.value = G2);
    }
    function H2(G2) {
      let J2;
      return i.value === void 0 || isNaN(i.value) ? J2 = Ut(G2, s.value, r.value) : J2 = Wr(G2, s.value, r.value, i.value), J2 = I.parse(D.format(J2)), J2;
    }
    function Q(G2) {
      const J2 = I.parse(G2);
      return f.value = H2(J2), G2.length ? (isNaN(J2), j(A2.value)) : j(G2);
    }
    return Uc({
      modelValue: f,
      handleDecrease: E,
      handleIncrease: h2,
      handleMinMaxValue: P2,
      inputMode: M,
      inputEl: m2,
      onInputElement: (G2) => m2.value = G2,
      textValue: A2,
      validate: F,
      applyInputValue: Q,
      disabled: l,
      max: r,
      min: s,
      isDecreaseDisabled: _,
      isIncreaseDisabled: C,
      id: c
    }), (G2, J2) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps(G2.$attrs, {
        ref_key: "primitiveElement",
        ref: v2,
        role: "group",
        as: G2.as,
        "as-child": G2.asChild,
        "data-disabled": unref(l) ? "" : void 0
      }), {
        default: withCtx(() => [
          renderSlot(G2.$slots, "default", {
            modelValue: unref(f),
            textValue: A2.value
          })
        ]),
        _: 3
      }, 16, ["as", "as-child", "data-disabled"]),
      unref(g) ? (openBlock(), createElementBlock("input", {
        key: 0,
        type: "text",
        tabindex: "-1",
        "aria-hidden": "true",
        value: unref(f),
        name: e.name,
        disabled: e.disabled,
        required: e.required,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, jc)) : createCommentVNode("", true)
    ], 64));
  }
});
var by = defineComponent({
  __name: "NumberFieldInput",
  props: {
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(a2) {
    const t = a2, { primitiveElement: e, currentElement: n } = Re(), l = Do();
    function s(u) {
      u.target === me() && (Math.abs(u.deltaY) <= Math.abs(u.deltaX) || (u.preventDefault(), u.deltaY > 0 ? l.handleIncrease() : u.deltaY < 0 && l.handleDecrease()));
    }
    onMounted(() => {
      l.onInputElement(n.value);
    });
    const r = ref(l.textValue.value);
    watch(() => l.textValue.value, () => {
      r.value = l.textValue.value;
    }, { immediate: true, deep: true });
    function i() {
      requestAnimationFrame(() => {
        r.value = l.textValue.value;
      });
    }
    return (u, d) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(l).id.value,
      ref_key: "primitiveElement",
      ref: e,
      value: r.value,
      role: "spinbutton",
      type: "text",
      tabindex: "0",
      inputmode: unref(l).inputMode.value,
      disabled: unref(l).disabled.value ? "" : void 0,
      "data-disabled": unref(l).disabled.value ? "" : void 0,
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: "false",
      "aria-roledescription": "Number field",
      "aria-valuenow": unref(l).modelValue.value,
      "aria-valuemin": unref(l).min.value,
      "aria-valuemax": unref(l).max.value,
      onKeydown: [
        d[0] || (d[0] = withKeys(withModifiers((c) => unref(l).handleIncrease(), ["prevent"]), ["up"])),
        d[1] || (d[1] = withKeys(withModifiers((c) => unref(l).handleDecrease(), ["prevent"]), ["down"])),
        d[2] || (d[2] = withKeys(withModifiers((c) => unref(l).handleIncrease(10), ["prevent"]), ["page-up"])),
        d[3] || (d[3] = withKeys(withModifiers((c) => unref(l).handleDecrease(10), ["prevent"]), ["page-down"])),
        d[4] || (d[4] = withKeys(withModifiers((c) => unref(l).handleMinMaxValue("min"), ["prevent"]), ["home"])),
        d[5] || (d[5] = withKeys(withModifiers((c) => unref(l).handleMinMaxValue("max"), ["prevent"]), ["end"])),
        d[8] || (d[8] = withKeys((c) => {
          var f;
          return unref(l).applyInputValue((f = c.target) == null ? void 0 : f.value);
        }, ["enter"]))
      ],
      onWheel: s,
      onBeforeinput: d[6] || (d[6] = (c) => {
        const f = c.target;
        let v2 = f.value.slice(0, f.selectionStart ?? void 0) + (c.data ?? "") + f.value.slice(f.selectionEnd ?? void 0);
        unref(l).validate(v2) || c.preventDefault();
      }),
      onInput: d[7] || (d[7] = (c) => {
        const f = c.target;
        r.value = f.value;
      }),
      onChange: i,
      onBlur: d[9] || (d[9] = (c) => {
        var f;
        return unref(l).applyInputValue((f = c.target) == null ? void 0 : f.value);
      })
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["id", "value", "inputmode", "disabled", "data-disabled", "aria-valuenow", "aria-valuemin", "aria-valuemax"]));
  }
});
var Cy = defineComponent({
  __name: "NumberFieldIncrement",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = Do(), n = computed(() => {
      var u;
      return ((u = e.disabled) == null ? void 0 : u.value) || t.disabled || e.isIncreaseDisabled.value;
    }), { primitiveElement: l, currentElement: s } = Re(), { isPressed: r, onTrigger: i } = bs({ target: s, disabled: n });
    return i(() => {
      e.handleIncrease();
    }), (u, d) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      ref_key: "primitiveElement",
      ref: l,
      tabindex: "-1",
      "aria-label": "Increase",
      type: u.as === "button" ? "button" : void 0,
      style: {
        userSelect: unref(r) ? "none" : void 0
      },
      disabled: n.value ? "" : void 0,
      "data-disabled": n.value ? "" : void 0,
      "data-pressed": unref(r) ? "true" : void 0,
      onContextmenu: d[0] || (d[0] = withModifiers(() => {
      }, ["prevent"]))
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "style", "disabled", "data-disabled", "data-pressed"]));
  }
});
var wy = defineComponent({
  __name: "NumberFieldDecrement",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = Do(), n = computed(() => {
      var u;
      return ((u = e.disabled) == null ? void 0 : u.value) || t.disabled || e.isDecreaseDisabled.value;
    }), { primitiveElement: l, currentElement: s } = Re(), { isPressed: r, onTrigger: i } = bs({ target: s, disabled: n });
    return i(() => {
      e.handleDecrease();
    }), (u, d) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      ref_key: "primitiveElement",
      ref: l,
      tabindex: "-1",
      "aria-label": "Decrease",
      type: u.as === "button" ? "button" : void 0,
      style: {
        userSelect: unref(r) ? "none" : void 0
      },
      disabled: n.value ? "" : void 0,
      "data-disabled": n.value ? "" : void 0,
      "data-pressed": unref(r) ? "true" : void 0,
      onContextmenu: d[0] || (d[0] = withModifiers(() => {
      }, ["prevent"]))
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "style", "disabled", "data-disabled", "data-pressed"]));
  }
});
var [aa, Gc] = te("PaginationRoot");
var _y = defineComponent({
  __name: "PaginationRoot",
  props: {
    page: {},
    defaultPage: { default: 1 },
    itemsPerPage: { default: 10 },
    total: { default: 0 },
    siblingCount: { default: 2 },
    disabled: { type: Boolean },
    showEdges: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "nav" }
  },
  emits: ["update:page"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { siblingCount: l, disabled: s, showEdges: r } = toRefs(e);
    R2();
    const i = ne(e, "page", n, {
      defaultValue: e.defaultPage,
      passive: e.page === void 0
    }), u = computed(() => Math.max(1, Math.ceil(e.total / e.itemsPerPage)));
    return Gc({
      page: i,
      onPageChange(d) {
        i.value = d;
      },
      pageCount: u,
      siblingCount: l,
      disabled: s,
      showEdges: r
    }), (d, c) => (openBlock(), createBlock(unref(O), {
      as: d.as,
      "as-child": d.asChild
    }, {
      default: withCtx(() => [
        renderSlot(d.$slots, "default", {
          page: unref(i),
          pageCount: u.value
        })
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
var xy = defineComponent({
  __name: "PaginationEllipsis",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, { "data-type": "ellipsis" }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default", {}, () => [
          createTextVNode("…")
        ])
      ]),
      _: 3
    }, 16));
  }
});
var Sy = defineComponent({
  __name: "PaginationFirst",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = aa();
    R2();
    const n = computed(() => e.page.value === 1 || e.disabled.value);
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "First Page",
      type: l.as === "button" ? "button" : void 0,
      disabled: n.value,
      onClick: s[0] || (s[0] = (r) => !n.value && unref(e).onPageChange(1))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("First page")
        ])
      ]),
      _: 3
    }, 16, ["type", "disabled"]));
  }
});
var Ey = defineComponent({
  __name: "PaginationLast",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = aa();
    R2();
    const n = computed(() => e.page.value === e.pageCount.value || e.disabled.value);
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "Last Page",
      type: l.as === "button" ? "button" : void 0,
      disabled: n.value,
      onClick: s[0] || (s[0] = (r) => !n.value && unref(e).onPageChange(unref(e).pageCount.value))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Last page")
        ])
      ]),
      _: 3
    }, 16, ["type", "disabled"]));
  }
});
function dt(a2, t) {
  const e = t - a2 + 1;
  return Array.from({ length: e }, (n, l) => l + a2);
}
function qc(a2) {
  return a2.map((t) => typeof t == "number" ? { type: "page", value: t } : { type: "ellipsis" });
}
var Ta = "ellipsis";
function Yc(a2, t, e, n) {
  const s = t, r = Math.max(a2 - e, 1), i = Math.min(a2 + e, s);
  if (n) {
    const d = Math.min(2 * e + 5, t) - 2, c = r > 3 && Math.abs(s - d - 1 + 1) > 2 && Math.abs(r - 1) > 2, f = i < s - 2 && Math.abs(s - d) > 2 && Math.abs(s - i) > 2;
    if (!c && f)
      return [...dt(1, d), Ta, s];
    if (c && !f) {
      const p = dt(s - d + 1, s);
      return [1, Ta, ...p];
    }
    if (c && f) {
      const p = dt(r, i);
      return [1, Ta, ...p, Ta, s];
    }
    return dt(1, s);
  } else {
    const u = e * 2 + 1;
    return t < u ? dt(1, s) : a2 <= e + 1 ? dt(1, u) : t - a2 <= e ? dt(t - u + 1, s) : dt(r, i);
  }
}
var Py = defineComponent({
  __name: "PaginationList",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = aa(), n = computed(() => qc(
      Yc(
        e.page.value,
        e.pageCount.value,
        e.siblingCount.value,
        e.showEdges.value
      )
    ));
    return (l, s) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", { items: n.value })
      ]),
      _: 3
    }, 16));
  }
});
var Dy = defineComponent({
  __name: "PaginationListItem",
  props: {
    value: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = aa(), n = computed(() => e.page.value === t.value), l = computed(() => e.disabled.value);
    return (s, r) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "data-type": "page",
      "aria-label": `Page ${s.value}`,
      "aria-current": n.value ? "page" : void 0,
      "data-selected": n.value ? "true" : void 0,
      disabled: l.value,
      type: s.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (i) => !l.value && unref(e).onPageChange(s.value))
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(s.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["aria-label", "aria-current", "data-selected", "disabled", "type"]));
  }
});
var $y = defineComponent({
  __name: "PaginationNext",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = aa(), n = computed(() => e.page.value === e.pageCount.value || e.disabled.value);
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "Next Page",
      type: l.as === "button" ? "button" : void 0,
      disabled: n.value,
      onClick: s[0] || (s[0] = (r) => !n.value && unref(e).onPageChange(unref(e).page.value + 1))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Next page")
        ])
      ]),
      _: 3
    }, 16, ["type", "disabled"]));
  }
});
var By = defineComponent({
  __name: "PaginationPrev",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = aa(), n = computed(() => e.page.value === 1 || e.disabled.value);
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "Previous Page",
      type: l.as === "button" ? "button" : void 0,
      disabled: n.value,
      onClick: s[0] || (s[0] = (r) => !n.value && unref(e).onPageChange(unref(e).page.value - 1))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Prev page")
        ])
      ]),
      _: 3
    }, 16, ["type", "disabled"]));
  }
});
var Xc = ["id", "value", "name", "disabled", "required"];
var [Zc, Jc] = te("PinInputRoot");
var Iy = defineComponent({
  inheritAttrs: false,
  __name: "PinInputRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    placeholder: { default: "" },
    mask: { type: Boolean },
    otp: { type: Boolean },
    type: { default: "text" },
    dir: {},
    name: {},
    disabled: { type: Boolean },
    required: { type: Boolean },
    id: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "complete"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { mask: l, otp: s, placeholder: r, type: i, disabled: u, dir: d } = toRefs(e), { forwardRef: c } = R2(), f = we(d), v2 = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue ?? [],
      passive: e.modelValue === void 0
    }), p = ref(/* @__PURE__ */ new Set());
    function g(_) {
      p.value.add(_);
    }
    const m2 = computed(() => v2.value.filter((C) => !!C).length === p.value.size);
    return watch(v2, () => {
      m2.value && n("complete", v2.value);
    }, { deep: true }), Jc({
      modelValue: v2,
      mask: l,
      otp: s,
      placeholder: r,
      type: i,
      dir: f,
      disabled: u,
      isCompleted: m2,
      inputElements: p,
      onInputElementChange: g
    }), (_, C) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps(_.$attrs, {
        ref: unref(c),
        dir: unref(f),
        "data-complete": m2.value ? "" : void 0,
        "data-disabled": unref(u) ? "" : void 0
      }), {
        default: withCtx(() => [
          renderSlot(_.$slots, "default", { modelValue: unref(v2) })
        ]),
        _: 3
      }, 16, ["dir", "data-complete", "data-disabled"]),
      createBaseVNode("input", {
        id: _.id,
        type: "text",
        tabindex: "-1",
        "aria-hidden": "true",
        value: unref(v2).join(""),
        name: _.name,
        disabled: unref(u),
        required: _.required,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        },
        onFocus: C[0] || (C[0] = ($2) => {
          var h2, E;
          return (E = (h2 = Array.from(p.value)) == null ? void 0 : h2[0]) == null ? void 0 : E.focus();
        })
      }, null, 40, Xc)
    ], 64));
  }
});
var Ty = defineComponent({
  __name: "PinInputInput",
  props: {
    index: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(a2) {
    const t = a2, e = Zc(), n = computed(() => Array.from(e.inputElements.value)), l = computed(() => e.modelValue.value[t.index]), s = computed(() => t.disabled || e.disabled.value), r = computed(() => e.otp.value), i = computed(() => e.type.value === "number"), u = computed(() => e.mask.value), { primitiveElement: d, currentElement: c } = Re();
    function f(D) {
      var V2;
      const I = D.target;
      if ((((V2 = D.data) == null ? void 0 : V2.length) ?? 0) > 1) {
        h2(I.value);
        return;
      }
      if (i.value && !/^\d*$/.test(I.value)) {
        I.value = I.value.replace(/\D/g, "");
        return;
      }
      I.value = I.value.slice(-1), P2(t.index, I.value);
      const M = n.value[t.index + 1];
      M && M.focus();
    }
    function v2() {
      const D = c.value;
      nextTick(() => {
        D && !D.value && (D.placeholder = e.placeholder.value);
      });
    }
    function p(D) {
      At(D, me(), void 0, {
        itemsArray: n.value,
        focus: true,
        loop: false,
        arrowKeyOptions: "horizontal",
        dir: e.dir.value
      });
    }
    function g(D) {
      if (D.preventDefault(), D.target.value)
        P2(t.index, "");
      else {
        const V2 = n.value[t.index - 1];
        V2 && (V2.focus(), P2(t.index - 1, ""));
      }
    }
    function m2(D) {
      D.key === "Delete" && (D.preventDefault(), P2(t.index, ""));
    }
    function _(D) {
      const I = D.target;
      I.setSelectionRange(1, 1), I.value || (I.placeholder = "");
    }
    function C(D) {
      v2();
    }
    function $2(D) {
      D.preventDefault();
      const I = D.clipboardData;
      if (!I)
        return;
      const M = I.getData("text");
      h2(M);
    }
    function h2(D) {
      var A2;
      const I = [...e.modelValue.value], M = D.length >= n.value.length ? 0 : t.index, V2 = Math.min(M + D.length, n.value.length);
      for (let F = M; F < V2; F++) {
        const j = n.value[F], H2 = D[F - M];
        i.value && !/^\d*$/.test(H2) || (I[F] = H2, j.focus());
      }
      e.modelValue.value = I, (A2 = n.value[V2]) == null || A2.focus();
    }
    function E(D) {
      let I = D.length - 1;
      for (; I >= 0 && D[I] === ""; )
        D.pop(), I--;
      return D;
    }
    function P2(D, I) {
      const M = [...e.modelValue.value];
      M[D] = I, e.modelValue.value = E(M);
    }
    return watch(l, () => {
      l.value || v2();
    }), onMounted(() => {
      e.onInputElementChange(c.value);
    }), onUnmounted(() => {
      var D;
      (D = e.inputElements) == null || D.value.delete(c.value);
    }), (D, I) => (openBlock(), createBlock(unref(O), {
      ref_key: "primitiveElement",
      ref: d,
      autocapitalize: "none",
      as: D.as,
      "as-child": D.asChild,
      autocomplete: r.value ? "one-time-code" : "false",
      type: u.value ? "password" : "text",
      inputmode: i.value ? "numeric" : "text",
      pattern: i.value ? "[0-9]*" : void 0,
      placeholder: unref(e).placeholder.value,
      value: l.value,
      disabled: s.value,
      "data-disabled": s.value ? "" : void 0,
      "data-complete": unref(e).isCompleted.value ? "" : void 0,
      "aria-label": `pin input ${D.index + 1} of ${n.value.length}`,
      onInput: I[0] || (I[0] = (M) => f(M)),
      onKeydown: [
        withKeys(p, ["left", "right", "up", "down", "home", "end"]),
        withKeys(g, ["backspace"]),
        withKeys(m2, ["delete"])
      ],
      onFocus: _,
      onBlur: C,
      onPaste: $2
    }, {
      default: withCtx(() => [
        renderSlot(D.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "autocomplete", "type", "inputmode", "pattern", "placeholder", "value", "disabled", "data-disabled", "data-complete", "aria-label"]));
  }
});
var [Lt, Qc] = te("PopoverRoot");
var Cs = defineComponent({
  __name: "PopoverRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    modal: { type: Boolean, default: false }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { modal: l } = toRefs(e), s = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    }), r = ref(), i = ref(false);
    return Qc({
      contentId: "",
      modal: l,
      open: s,
      onOpenChange: (u) => {
        s.value = u;
      },
      onOpenToggle: () => {
        s.value = !s.value;
      },
      triggerElement: r,
      hasCustomAnchor: i
    }), (u, d) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default", { open: unref(s) })
      ]),
      _: 3
    }));
  }
});
var ws = defineComponent({
  __name: "PopoverTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = Lt(), { forwardRef: n, currentElement: l } = R2();
    return onMounted(() => {
      e.triggerElement.value = l.value;
    }), (s, r) => (openBlock(), createBlock(resolveDynamicComponent(unref(e).hasCustomAnchor.value ? unref(O) : unref(Mt)), { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(n),
          type: s.as === "button" ? "button" : void 0,
          "aria-haspopup": "dialog",
          "aria-expanded": unref(e).open.value,
          "aria-controls": unref(e).contentId,
          "data-state": unref(e).open.value ? "open" : "closed",
          as: s.as,
          "as-child": t.asChild,
          onClick: unref(e).onOpenToggle
        }, {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 8, ["type", "aria-expanded", "aria-controls", "data-state", "as", "as-child", "onClick"])
      ]),
      _: 3
    }));
  }
});
var _s = defineComponent({
  __name: "PopoverPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var xs = defineComponent({
  __name: "PopoverContentImpl",
  props: {
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Ot(e), { forwardRef: s } = R2(), r = Lt();
    return Yn(), (i, u) => (openBlock(), createBlock(unref(Za), {
      "as-child": "",
      loop: "",
      trapped: i.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (d) => n("openAutoFocus", d)),
      onUnmountAutoFocus: u[6] || (u[6] = (d) => n("closeAutoFocus", d))
    }, {
      default: withCtx(() => [
        createVNode(unref(Ct), {
          "as-child": "",
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          onPointerDownOutside: u[0] || (u[0] = (d) => n("pointerDownOutside", d)),
          onInteractOutside: u[1] || (u[1] = (d) => n("interactOutside", d)),
          onEscapeKeyDown: u[2] || (u[2] = (d) => n("escapeKeyDown", d)),
          onFocusOutside: u[3] || (u[3] = (d) => n("focusOutside", d)),
          onDismiss: u[4] || (u[4] = (d) => unref(r).onOpenChange(false))
        }, {
          default: withCtx(() => [
            createVNode(unref(It), mergeProps(unref(l), {
              id: unref(r).contentId,
              ref: unref(s),
              "data-state": unref(r).open.value ? "open" : "closed",
              role: "dialog",
              style: {
                "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
              }
            }), {
              default: withCtx(() => [
                renderSlot(i.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "data-state"])
          ]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
});
var ef = defineComponent({
  __name: "PopoverContentModal",
  props: {
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Lt(), s = ref(false);
    ya(true);
    const r = Se(e, n), { forwardRef: i, currentElement: u } = R2();
    return ga(u), (d, c) => (openBlock(), createBlock(xs, mergeProps(unref(r), {
      ref: unref(i),
      "trap-focus": unref(l).open.value,
      "disable-outside-pointer-events": "",
      onCloseAutoFocus: c[0] || (c[0] = withModifiers(
        (f) => {
          var v2;
          n("closeAutoFocus", f), s.value || (v2 = unref(l).triggerElement.value) == null || v2.focus();
        },
        ["prevent"]
      )),
      onPointerDownOutside: c[1] || (c[1] = (f) => {
        n("pointerDownOutside", f);
        const v2 = f.detail.originalEvent, p = v2.button === 0 && v2.ctrlKey === true, g = v2.button === 2 || p;
        s.value = g;
      }),
      onFocusOutside: c[2] || (c[2] = withModifiers(() => {
      }, ["prevent"]))
    }), {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
});
var tf = defineComponent({
  __name: "PopoverContentNonModal",
  props: {
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Lt(), s = ref(false), r = ref(false), i = Se(e, n);
    return (u, d) => (openBlock(), createBlock(xs, mergeProps(unref(i), {
      "trap-focus": false,
      "disable-outside-pointer-events": false,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var f;
        n("closeAutoFocus", c), c.defaultPrevented || (s.value || (f = unref(l).triggerElement.value) == null || f.focus(), c.preventDefault()), s.value = false, r.value = false;
      }),
      onInteractOutside: d[1] || (d[1] = async (c) => {
        var p;
        n("interactOutside", c), c.defaultPrevented || (s.value = true, c.detail.originalEvent.type === "pointerdown" && (r.value = true));
        const f = c.target;
        ((p = unref(l).triggerElement.value) == null ? void 0 : p.contains(f)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && r.value && c.preventDefault();
      })
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ss = defineComponent({
  __name: "PopoverContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Lt(), s = Se(e, n), { forwardRef: r } = R2();
    return l.contentId || (l.contentId = ge(void 0, "radix-vue-popover-content")), (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(l).open.value
    }, {
      default: withCtx(() => [
        unref(l).modal.value ? (openBlock(), createBlock(ef, mergeProps({ key: 0 }, unref(s), { ref: unref(r) }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (openBlock(), createBlock(tf, mergeProps({ key: 1 }, unref(s), { ref: unref(r) }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Es = defineComponent({
  __name: "PopoverArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Zt), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ps = defineComponent({
  __name: "PopoverClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = Lt();
    return (n, l) => (openBlock(), createBlock(unref(O), {
      type: n.as === "button" ? "button" : void 0,
      as: n.as,
      "as-child": t.asChild,
      onClick: l[0] || (l[0] = (s) => unref(e).onOpenChange(false))
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["type", "as", "as-child"]));
  }
});
var Ds = defineComponent({
  __name: "PopoverAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = Lt();
    return onBeforeMount(() => {
      e.hasCustomAnchor.value = true;
    }), onUnmounted(() => {
      e.hasCustomAnchor.value = false;
    }), (n, l) => (openBlock(), createBlock(unref(Mt), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var ca = 100;
var [af, nf] = te("ProgressRoot");
var $o = (a2) => typeof a2 == "number";
function of(a2, t) {
  return ht(a2) || $o(a2) && !Number.isNaN(a2) && a2 <= t && a2 >= 0 ? a2 : (console.error(`Invalid prop \`value\` of value \`${a2}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${ca} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function lf(a2) {
  return $o(a2) && !Number.isNaN(a2) && a2 > 0 ? a2 : (console.error(
    `Invalid prop \`max\` of value \`${a2}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${ca}\`.`
  ), ca);
}
var Ry = defineComponent({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: ca },
    getValueLabel: { type: Function, default: (a2, t) => `${Math.round(a2 / t * ca)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    const l = ne(e, "modelValue", n, {
      passive: e.modelValue === void 0
    }), s = ne(e, "max", n, {
      passive: e.max === void 0
    });
    watch(
      () => l.value,
      async (i) => {
        const u = of(i, e.max);
        u !== i && (await nextTick(), l.value = u);
      },
      { immediate: true }
    ), watch(
      () => e.max,
      (i) => {
        const u = lf(e.max);
        u !== i && (s.value = u);
      },
      { immediate: true }
    );
    const r = computed(() => ht(l.value) ? "indeterminate" : l.value === s.value ? "complete" : "loading");
    return nf({
      modelValue: l,
      max: s,
      progressState: r
    }), (i, u) => (openBlock(), createBlock(unref(O), {
      "as-child": i.asChild,
      as: i.as,
      "aria-valuemax": unref(s),
      "aria-valuemin": 0,
      "aria-valuenow": $o(unref(l)) ? unref(l) : void 0,
      "aria-valuetext": i.getValueLabel(unref(l), unref(s)),
      "aria-label": i.getValueLabel(unref(l), unref(s)),
      role: "progressbar",
      "data-state": r.value,
      "data-value": unref(l) ?? void 0,
      "data-max": unref(s)
    }, {
      default: withCtx(() => [
        renderSlot(i.$slots, "default", { modelValue: unref(l) })
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
});
var Ay = defineComponent({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = af();
    return R2(), (n, l) => {
      var s;
      return openBlock(), createBlock(unref(O), mergeProps(t, {
        "data-state": unref(e).progressState.value,
        "data-value": ((s = unref(e).modelValue) == null ? void 0 : s.value) ?? void 0,
        "data-max": unref(e).max.value
      }), {
        default: withCtx(() => [
          renderSlot(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
});
var [sf, rf] = te("RadioGroupRoot");
var Oy = defineComponent({
  __name: "RadioGroupRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    disabled: { type: Boolean, default: false },
    name: {},
    required: { type: Boolean, default: false },
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l } = R2(), s = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: e.modelValue === void 0
    }), { disabled: r, loop: i, orientation: u, name: d, required: c, dir: f } = toRefs(e), v2 = we(f);
    return rf({
      modelValue: s,
      changeModelValue: (p) => {
        s.value = p;
      },
      disabled: r,
      loop: i,
      orientation: u,
      name: d == null ? void 0 : d.value,
      required: c
    }), (p, g) => (openBlock(), createBlock(unref(Ft), {
      "as-child": "",
      orientation: unref(u),
      dir: unref(v2),
      loop: unref(i)
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(l),
          role: "radiogroup",
          "data-disabled": unref(r) ? "" : void 0,
          "as-child": p.asChild,
          as: p.as,
          required: unref(c),
          "aria-orientation": unref(u),
          "aria-required": unref(c),
          dir: unref(v2),
          name: unref(d)
        }, {
          default: withCtx(() => [
            renderSlot(p.$slots, "default", { modelValue: unref(s) })
          ]),
          _: 3
        }, 8, ["data-disabled", "as-child", "as", "required", "aria-orientation", "aria-required", "dir", "name"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
});
var uf = ["value", "checked", "name", "disabled", "required"];
var df = defineComponent({
  __name: "Radio",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: false },
    required: { type: Boolean },
    checked: { type: Boolean, default: void 0 },
    name: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, l = ne(e, "checked", t, {
      passive: e.checked === void 0
    }), { value: s } = toRefs(e), { forwardRef: r, currentElement: i } = R2(), u = at(i), d = computed(() => {
      var f;
      return e.id && i.value ? ((f = document.querySelector(`[for="${e.id}"]`)) == null ? void 0 : f.innerText) ?? e.value : void 0;
    });
    function c(f) {
      l.value = true, u.value && f.stopPropagation();
    }
    return (f, v2) => (openBlock(), createBlock(unref(O), mergeProps(f.$attrs, {
      id: f.id,
      ref: unref(r),
      role: "radio",
      type: f.as === "button" ? "button" : void 0,
      as: f.as,
      "aria-checked": unref(l),
      "aria-label": d.value,
      "as-child": f.asChild,
      disabled: f.disabled ? "" : void 0,
      "data-state": unref(l) ? "checked" : "unchecked",
      "data-disabled": f.disabled ? "" : void 0,
      value: unref(s),
      required: f.required,
      name: f.name,
      onClick: withModifiers(c, ["stop"])
    }), {
      default: withCtx(() => [
        renderSlot(f.$slots, "default", { checked: unref(l) }),
        unref(u) ? (openBlock(), createElementBlock("input", {
          key: 0,
          type: "radio",
          tabindex: "-1",
          "aria-hidden": "true",
          value: unref(s),
          checked: !!unref(l),
          name: f.name,
          disabled: f.disabled,
          required: f.required,
          style: {
            transform: "translateX(-100%)",
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0
          }
        }, null, 8, uf)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]));
  }
});
var [cf, ff] = te("RadioGroupItem");
var ky = defineComponent({
  inheritAttrs: false,
  __name: "RadioGroupItem",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: false },
    required: { type: Boolean },
    name: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, { forwardRef: e, currentElement: n } = R2(), l = sf(), s = computed(() => l.disabled.value || t.disabled), r = computed(() => l.required.value || t.required), i = computed(() => {
      var f;
      return ((f = l.modelValue) == null ? void 0 : f.value) === t.value;
    });
    ff({ disabled: s, checked: i });
    const u = ref(false), d = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    He("keydown", (f) => {
      d.includes(f.key) && (u.value = true);
    }), He("keyup", () => {
      u.value = false;
    });
    function c() {
      setTimeout(() => {
        var f;
        u.value && ((f = n.value) == null || f.click());
      }, 0);
    }
    return (f, v2) => (openBlock(), createBlock(unref(Nt), {
      checked: i.value,
      disabled: s.value,
      "as-child": "",
      focusable: !s.value,
      active: i.value
    }, {
      default: withCtx(() => [
        createVNode(df, mergeProps({ ...f.$attrs, ...t }, {
          ref: unref(e),
          checked: i.value,
          required: r.value,
          disabled: s.value,
          "onUpdate:checked": v2[0] || (v2[0] = (p) => unref(l).changeModelValue(f.value)),
          onKeydown: v2[1] || (v2[1] = withKeys(withModifiers(() => {
          }, ["prevent"]), ["enter"])),
          onFocus: c
        }), {
          default: withCtx(() => [
            renderSlot(f.$slots, "default")
          ]),
          _: 3
        }, 16, ["checked", "required", "disabled"])
      ]),
      _: 3
    }, 8, ["checked", "disabled", "focusable", "active"]));
  }
});
var My = defineComponent({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const { forwardRef: t } = R2(), e = cf();
    return (n, l) => (openBlock(), createBlock(unref(Pe), {
      present: n.forceMount || unref(e).checked.value
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(t),
          "data-state": unref(e).checked.value ? "checked" : "unchecked",
          "data-disabled": unref(e).disabled.value ? "" : void 0,
          "as-child": n.asChild,
          as: n.as
        }, n.$attrs), {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
function pf(a2) {
  const t = computed(() => a2.start.value ? !!a2.isDateDisabled(a2.start.value) : false), e = computed(() => a2.end.value ? !!a2.isDateDisabled(a2.end.value) : false), n = computed(
    () => t.value || e.value ? false : !!(a2.start.value && a2.end.value && q(a2.end.value, a2.start.value))
  ), l = (c) => a2.start.value ? $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2.start.value, c) : false, s = (c) => a2.end.value ? $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2.end.value, c) : false, r = (c) => a2.start.value && $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2.start.value, c) || a2.end.value && $14e0f24ef4ac5c92$export$ea39ec197993aef0(a2.end.value, c) ? true : a2.end.value && a2.start.value ? v(c, a2.start.value, a2.end.value) : false, i = computed(() => {
    if (a2.start.value && a2.end.value || !a2.start.value || !a2.focusedValue.value)
      return null;
    const c = q(a2.start.value, a2.focusedValue.value), f = c ? a2.start.value : a2.focusedValue.value, v2 = c ? a2.focusedValue.value : a2.start.value;
    return $14e0f24ef4ac5c92$export$ea39ec197993aef0(f, v2) ? {
      start: f,
      end: v2
    } : b(f, v2, a2.isDateUnavailable, a2.isDateDisabled) ? {
      start: f,
      end: v2
    } : null;
  });
  return {
    isInvalid: n,
    isSelected: r,
    highlightedRange: i,
    isSelectionStart: l,
    isSelectionEnd: s,
    isHighlightedStart: (c) => !i.value || !i.value.start ? false : $14e0f24ef4ac5c92$export$ea39ec197993aef0(i.value.start, c),
    isHighlightedEnd: (c) => !i.value || !i.value.end ? false : $14e0f24ef4ac5c92$export$ea39ec197993aef0(i.value.end, c)
  };
}
var vf = { style: { border: "0px", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: "0px", position: "absolute", "white-space": "nowrap", width: "1px" } };
var mf = {
  role: "heading",
  "aria-level": "2"
};
var [na, hf] = te("RangeCalendarRoot");
var yf = defineComponent({
  __name: "RangeCalendarRoot",
  props: {
    defaultPlaceholder: {},
    defaultValue: { default: () => ({ start: void 0, end: void 0 }) },
    modelValue: {},
    placeholder: { default: void 0 },
    pagedNavigation: { type: Boolean, default: false },
    preventDeselect: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    weekdayFormat: { default: "narrow" },
    calendarLabel: {},
    fixedWeeks: { type: Boolean, default: false },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    numberOfMonths: { default: 1 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    initialFocus: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: void 0 },
    isDateUnavailable: { type: Function, default: void 0 },
    dir: {},
    nextPage: {},
    prevPage: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["update:modelValue", "update:placeholder", "update:startValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, {
      disabled: l,
      readonly: s,
      initialFocus: r,
      pagedNavigation: i,
      weekStartsOn: u,
      weekdayFormat: d,
      fixedWeeks: c,
      numberOfMonths: f,
      preventDeselect: v2,
      isDateUnavailable: p,
      isDateDisabled: g,
      calendarLabel: m2,
      maxValue: _,
      minValue: C,
      locale: $2,
      dir: h2,
      nextPage: E,
      prevPage: P2
    } = toRefs(e), { primitiveElement: D, currentElement: I } = Re(), M = we(h2), V2 = ref(), A2 = ref(), F = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue ?? { start: void 0, end: void 0 },
      passive: e.modelValue === void 0
    }), j = Yt({
      defaultPlaceholder: e.placeholder,
      defaultValue: F.value.start,
      locale: e.locale
    }), H2 = ref(F.value.start), Q = ref(F.value.end), G2 = ne(e, "placeholder", n, {
      defaultValue: e.defaultPlaceholder ?? j.copy(),
      passive: e.placeholder === void 0
    });
    function J2(he) {
      G2.value = he.copy();
    }
    const {
      fullCalendarLabel: z2,
      headingValue: K,
      isDateDisabled: L,
      isDateUnavailable: N2,
      isNextButtonDisabled: Z,
      isPrevButtonDisabled: Y,
      grid: re,
      weekdays: X,
      isOutsideVisibleView: se,
      nextPage: fe,
      prevPage: xe,
      formatter: Ee
    } = Jl({
      locale: $2,
      placeholder: G2,
      weekStartsOn: u,
      fixedWeeks: c,
      numberOfMonths: f,
      minValue: C,
      maxValue: _,
      disabled: l,
      weekdayFormat: d,
      pagedNavigation: i,
      isDateDisabled: g.value,
      isDateUnavailable: p.value,
      calendarLabel: m2,
      nextPage: E,
      prevPage: P2
    }), {
      isInvalid: be,
      isSelected: de,
      highlightedRange: Ie,
      isSelectionStart: Ae,
      isSelectionEnd: We,
      isHighlightedStart: Et,
      isHighlightedEnd: yr
    } = pf({
      start: H2,
      end: Q,
      isDateDisabled: L,
      isDateUnavailable: N2,
      focusedValue: A2
    });
    return watch(F, (he) => {
      var Ne, Ve, Ea, Fo;
      (!he || !he.start || H2.value && !$14e0f24ef4ac5c92$export$91b62ebf2ba703ee(he.start, H2.value)) && (H2.value = (Ve = (Ne = he == null ? void 0 : he.start) == null ? void 0 : Ne.copy) == null ? void 0 : Ve.call(Ne)), (!he || !he.end || Q.value && !$14e0f24ef4ac5c92$export$91b62ebf2ba703ee(he.end, Q.value)) && (Q.value = (Fo = (Ea = he == null ? void 0 : he.end) == null ? void 0 : Ea.copy) == null ? void 0 : Fo.call(Ea));
    }), watch(H2, (he) => {
      he && !$14e0f24ef4ac5c92$export$91b62ebf2ba703ee(he, G2.value) && J2(he), n("update:startValue", he);
    }), watch([H2, Q], ([he, Ne]) => {
      const Ve = F.value;
      if (!(Ve && Ve.start && Ve.end && he && Ne && $14e0f24ef4ac5c92$export$91b62ebf2ba703ee(Ve.start, he) && $14e0f24ef4ac5c92$export$91b62ebf2ba703ee(Ve.end, Ne)))
        if (he && Ne) {
          if (Ve.start && Ve.end && $14e0f24ef4ac5c92$export$91b62ebf2ba703ee(Ve.start, he) && $14e0f24ef4ac5c92$export$91b62ebf2ba703ee(Ve.end, Ne))
            return;
          q(Ne, he) ? F.value = {
            start: Ne.copy(),
            end: he.copy()
          } : F.value = {
            start: he.copy(),
            end: Ne.copy()
          };
        } else Ve.start && Ve.end && (F.value = {
          start: he == null ? void 0 : he.copy(),
          end: void 0
        });
    }), hf({
      isDateUnavailable: N2,
      startValue: H2,
      endValue: Q,
      formatter: Ee,
      modelValue: F,
      placeholder: G2,
      disabled: l,
      initialFocus: r,
      pagedNavigation: i,
      weekStartsOn: u,
      weekdayFormat: d,
      fixedWeeks: c,
      numberOfMonths: f,
      readonly: s,
      preventDeselect: v2,
      fullCalendarLabel: z2,
      headingValue: K,
      isInvalid: be,
      isDateDisabled: L,
      highlightedRange: Ie,
      focusedValue: A2,
      lastPressedDateValue: V2,
      isSelected: de,
      isSelectionEnd: We,
      isSelectionStart: Ae,
      isNextButtonDisabled: Z,
      isPrevButtonDisabled: Y,
      isOutsideVisibleView: se,
      nextPage: fe,
      prevPage: xe,
      parentElement: I,
      onPlaceholderChange: J2,
      locale: $2,
      dir: M,
      isHighlightedStart: Et,
      isHighlightedEnd: yr
    }), onMounted(() => {
      r.value && Pl(I.value);
    }), (he, Ne) => (openBlock(), createBlock(unref(O), {
      ref_key: "primitiveElement",
      ref: D,
      as: he.as,
      "as-child": he.asChild,
      role: "application",
      "aria-label": unref(z2),
      "data-readonly": unref(s) ? "" : void 0,
      "data-disabled": unref(l) ? "" : void 0,
      "data-invalid": unref(be) ? "" : void 0,
      dir: unref(M)
    }, {
      default: withCtx(() => [
        createBaseVNode("div", vf, [
          createBaseVNode("div", mf, toDisplayString(unref(z2)), 1)
        ]),
        renderSlot(he.$slots, "default", {
          date: unref(G2),
          grid: unref(re),
          weekDays: unref(X),
          weekStartsOn: unref(u),
          locale: unref($2),
          fixedWeeks: unref(c)
        })
      ]),
      _: 3
    }, 8, ["as", "as-child", "aria-label", "data-readonly", "data-disabled", "data-invalid", "dir"]));
  }
});
var gf = defineComponent({
  __name: "RangeCalendarHeader",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var bf = defineComponent({
  __name: "RangeCalendarHeading",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = na();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "data-disabled": unref(e).disabled.value ? "" : void 0
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {
          headingValue: unref(e).headingValue.value
        }, () => [
          createTextVNode(toDisplayString(unref(e).headingValue.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["data-disabled"]));
  }
});
var Cf = defineComponent({
  __name: "RangeCalendarGrid",
  props: {
    asChild: { type: Boolean },
    as: { default: "table" }
  },
  setup(a2) {
    const t = a2, e = na(), n = computed(() => e.disabled.value ? true : void 0), l = computed(() => e.readonly.value ? true : void 0);
    return (s, r) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      tabindex: "-1",
      role: "grid",
      "aria-readonly": l.value,
      "aria-disabled": n.value,
      "data-readonly": l.value && "",
      "data-disabled": n.value && ""
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-readonly", "aria-disabled", "data-readonly", "data-disabled"]));
  }
});
var wf = defineComponent({
  __name: "RangeCalendarCell",
  props: {
    date: {},
    asChild: { type: Boolean },
    as: { default: "td" }
  },
  setup(a2) {
    const t = na();
    return (e, n) => {
      var l, s;
      return openBlock(), createBlock(unref(O), {
        as: e.as,
        "as-child": e.asChild,
        role: "gridcell",
        "aria-selected": unref(t).isSelected(e.date) ? true : void 0,
        "aria-disabled": unref(t).isDateDisabled(e.date) || ((s = (l = unref(t)).isDateUnavailable) == null ? void 0 : s.call(l, e.date)),
        "data-disabled": unref(t).isDateDisabled(e.date) ? "" : void 0
      }, {
        default: withCtx(() => [
          renderSlot(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-selected", "aria-disabled", "data-disabled"]);
    };
  }
});
var _f = defineComponent({
  __name: "RangeCalendarHeadCell",
  props: {
    asChild: { type: Boolean },
    as: { default: "th" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var xf = defineComponent({
  __name: "RangeCalendarNext",
  props: {
    step: {},
    nextPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = computed(() => n.disabled.value || n.isNextButtonDisabled(t.step, t.nextPage)), n = na();
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "Next page",
      type: l.as === "button" ? "button" : void 0,
      "aria-disabled": e.value || void 0,
      "data-disabled": e.value || void 0,
      disabled: e.value,
      onClick: s[0] || (s[0] = (r) => unref(n).nextPage(t.step, t.nextPage))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Next page")
        ])
      ]),
      _: 3
    }, 16, ["type", "aria-disabled", "data-disabled", "disabled"]));
  }
});
var Sf = defineComponent({
  __name: "RangeCalendarPrev",
  props: {
    step: {},
    prevPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = computed(() => n.disabled.value || n.isPrevButtonDisabled(t.step, t.prevPage)), n = na();
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      "aria-label": "Previous page",
      type: l.as === "button" ? "button" : void 0,
      "aria-disabled": e.value || void 0,
      "data-disabled": e.value || void 0,
      disabled: e.value,
      onClick: s[0] || (s[0] = (r) => unref(n).prevPage(t.step, t.prevPage))
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", {}, () => [
          createTextVNode("Prev page")
        ])
      ]),
      _: 3
    }, 16, ["type", "aria-disabled", "data-disabled", "disabled"]));
  }
});
var Ef = defineComponent({
  __name: "RangeCalendarGridHead",
  props: {
    asChild: { type: Boolean },
    as: { default: "thead" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), mergeProps(t, { "aria-hidden": "true" }), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Pf = defineComponent({
  __name: "RangeCalendarGridBody",
  props: {
    asChild: { type: Boolean },
    as: { default: "tbody" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Df = defineComponent({
  __name: "RangeCalendarGridRow",
  props: {
    asChild: { type: Boolean },
    as: { default: "tr" }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var $f = defineComponent({
  __name: "RangeCalendarCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = na(), n = nt(), { primitiveElement: l, currentElement: s } = Re(), r = computed(() => e.formatter.custom($(t.day), {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })), i = computed(() => e.isDateDisabled(t.day)), u = computed(() => {
      var V2;
      return (V2 = e.isDateUnavailable) == null ? void 0 : V2.call(e, t.day);
    }), d = computed(() => e.isSelected(t.day)), c = computed(() => e.isSelectionStart(t.day)), f = computed(() => e.isSelectionEnd(t.day)), v2 = computed(() => e.isHighlightedStart(t.day)), p = computed(() => e.isHighlightedEnd(t.day)), g = computed(() => e.highlightedRange.value ? V(t.day, e.highlightedRange.value.start, e.highlightedRange.value.end) : false), m2 = "[data-radix-vue-calendar-cell-trigger]:not([data-disabled]):not([data-outside-view]):not([data-outside-visible-view])", _ = computed(() => $14e0f24ef4ac5c92$export$629b0a497aa65267(t.day, $14e0f24ef4ac5c92$export$aa8b41735afcabd2())), C = computed(() => !$14e0f24ef4ac5c92$export$a18c89cbd24170ff(t.day, t.month)), $2 = computed(
      () => e.isOutsideVisibleView(t.day)
    ), h2 = computed(() => t.day.day.toLocaleString(e.locale.value)), E = computed(() => !e.disabled.value && $14e0f24ef4ac5c92$export$ea39ec197993aef0(t.day, e.placeholder.value));
    function P2(V2, A2) {
      var F;
      if (!e.readonly.value && !(e.isDateDisabled(A2) || (F = e.isDateUnavailable) != null && F.call(e, A2))) {
        if (e.lastPressedDateValue.value = A2.copy(), e.startValue.value && e.highlightedRange.value === null) {
          if ($14e0f24ef4ac5c92$export$ea39ec197993aef0(A2, e.startValue.value) && !e.preventDeselect.value && !e.endValue.value) {
            e.startValue.value = void 0, e.onPlaceholderChange(A2);
            return;
          } else if (!e.endValue.value) {
            V2.preventDefault(), e.lastPressedDateValue.value && $14e0f24ef4ac5c92$export$ea39ec197993aef0(e.lastPressedDateValue.value, A2) && (e.startValue.value = A2.copy());
            return;
          }
        }
        if (e.startValue.value && e.endValue.value && $14e0f24ef4ac5c92$export$ea39ec197993aef0(e.endValue.value, A2) && !e.preventDeselect.value) {
          e.startValue.value = void 0, e.endValue.value = void 0, e.onPlaceholderChange(A2);
          return;
        }
        e.startValue.value ? e.endValue.value ? e.endValue.value && e.startValue.value && (e.endValue.value = void 0, e.startValue.value = A2.copy()) : e.endValue.value = A2.copy() : e.startValue.value = A2.copy();
      }
    }
    function D(V2) {
      P2(V2, t.day);
    }
    function I() {
      var V2;
      e.isDateDisabled(t.day) || (V2 = e.isDateUnavailable) != null && V2.call(e, t.day) || (e.focusedValue.value = t.day.copy());
    }
    function M(V2) {
      V2.preventDefault(), V2.stopPropagation();
      const A2 = e.parentElement.value, F = A2 ? Array.from(A2.querySelectorAll(m2)) : [];
      let H2 = F.indexOf(s.value);
      const Q = 7, G2 = e.dir.value === "rtl" ? -1 : 1;
      switch (V2.code) {
        case n.ARROW_RIGHT:
          H2 += G2;
          break;
        case n.ARROW_LEFT:
          H2 -= G2;
          break;
        case n.ARROW_UP:
          H2 -= Q;
          break;
        case n.ARROW_DOWN:
          H2 += Q;
          break;
        case n.ENTER:
        case n.SPACE_CODE:
          P2(V2, t.day);
          return;
        default:
          return;
      }
      if (H2 >= 0 && H2 < F.length) {
        F[H2].focus();
        return;
      }
      if (H2 < 0) {
        if (e.isPrevButtonDisabled("month"))
          return;
        e.prevPage(), nextTick(() => {
          const J2 = A2 ? Array.from(A2.querySelectorAll(m2)) : [];
          if (!e.pagedNavigation.value) {
            const z2 = R(e.placeholder.value);
            J2[z2 - Math.abs(H2)].focus();
            return;
          }
          J2[J2.length - Math.abs(H2)].focus();
        });
        return;
      }
      if (H2 >= F.length) {
        if (e.isNextButtonDisabled("month"))
          return;
        e.nextPage(), nextTick(() => {
          const J2 = A2 ? Array.from(A2.querySelectorAll(m2)) : [];
          if (!e.pagedNavigation.value) {
            const z2 = R(e.placeholder.value.add({ months: e.numberOfMonths.value - 1 }));
            J2[J2.length - z2 + H2 - F.length].focus();
            return;
          }
          J2[H2 - F.length].focus();
        });
      }
    }
    return (V2, A2) => (openBlock(), createBlock(unref(O), mergeProps({
      ref_key: "primitiveElement",
      ref: l
    }, t, {
      role: "button",
      "aria-label": r.value,
      "data-radix-vue-calendar-cell-trigger": "",
      "aria-selected": d.value ? true : void 0,
      "aria-disabled": i.value || u.value ? true : void 0,
      "data-highlighted": g.value ? "" : void 0,
      "data-selection-start": c.value ? true : void 0,
      "data-selection-end": f.value ? true : void 0,
      "data-highlighted-start": v2.value ? true : void 0,
      "data-highlighted-end": p.value ? true : void 0,
      "data-selected": d.value ? true : void 0,
      "data-outside-visible-view": $2.value ? "" : void 0,
      "data-value": V2.day.toString(),
      "data-disabled": i.value ? "" : void 0,
      "data-unavailable": u.value ? "" : void 0,
      "data-today": _.value ? "" : void 0,
      "data-outside-view": C.value ? "" : void 0,
      "data-focused": E.value ? "" : void 0,
      tabindex: E.value ? 0 : C.value || i.value ? void 0 : -1,
      onClick: D,
      onFocusin: I,
      onMouseenter: I,
      onKeydown: withKeys(M, ["up", "down", "left", "right", "enter", "space"])
    }), {
      default: withCtx(() => [
        renderSlot(V2.$slots, "default", { dayValue: h2.value }, () => [
          createTextVNode(toDisplayString(h2.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["aria-label", "aria-selected", "aria-disabled", "data-highlighted", "data-selection-start", "data-selection-end", "data-highlighted-start", "data-highlighted-end", "data-selected", "data-outside-visible-view", "data-value", "data-disabled", "data-unavailable", "data-today", "data-outside-view", "data-focused", "tabindex"]));
  }
});
var [Ue, Bf] = te("ScrollAreaRoot");
var Vy = defineComponent({
  __name: "ScrollAreaRoot",
  props: {
    type: { default: "hover" },
    dir: {},
    scrollHideDelay: { default: 600 },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2, { expose: t }) {
    const e = a2, n = ref(0), l = ref(0), s = ref(), r = ref(), i = ref(), u = ref(), d = ref(false), c = ref(false), { type: f, dir: v2, scrollHideDelay: p } = toRefs(e), g = we(v2);
    function m2() {
      var h2;
      (h2 = s.value) == null || h2.scrollTo({
        top: 0
      });
    }
    function _() {
      var h2;
      (h2 = s.value) == null || h2.scrollTo({
        top: 0,
        left: 0
      });
    }
    t({
      /** Viewport element within ScrollArea */
      viewport: s,
      /** Scroll viewport to top */
      scrollTop: m2,
      /** Scroll viewport to top-left */
      scrollTopLeft: _
    });
    const { forwardRef: C, currentElement: $2 } = R2();
    return Bf({
      type: f,
      dir: g,
      scrollHideDelay: p,
      scrollArea: $2,
      viewport: s,
      onViewportChange: (h2) => {
        s.value = h2 || void 0;
      },
      content: r,
      onContentChange: (h2) => {
        r.value = h2;
      },
      scrollbarX: i,
      scrollbarXEnabled: d,
      scrollbarY: u,
      scrollbarYEnabled: c,
      onScrollbarXChange: (h2) => {
        i.value = h2 || void 0;
      },
      onScrollbarYChange: (h2) => {
        u.value = h2 || void 0;
      },
      onScrollbarXEnabledChange: (h2) => {
        d.value = h2;
      },
      onScrollbarYEnabledChange: (h2) => {
        c.value = h2;
      },
      onCornerWidthChange: (h2) => {
        n.value = h2;
      },
      onCornerHeightChange: (h2) => {
        l.value = h2;
      }
    }), (h2, E) => (openBlock(), createBlock(unref(O), {
      ref: unref(C),
      "as-child": e.asChild,
      as: h2.as,
      dir: unref(g),
      style: normalizeStyle({
        position: "relative",
        // Pass corner sizes as CSS vars to reduce re-renders of context consumers
        "--radix-scroll-area-corner-width": `${n.value}px`,
        "--radix-scroll-area-corner-height": `${l.value}px`
      })
    }, {
      default: withCtx(() => [
        renderSlot(h2.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "dir", "style"]));
  }
});
var Fy = defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2, { expose: t }) {
    const e = a2, { nonce: n } = toRefs(e), l = Ja(n), s = Ue(), r = ref();
    onMounted(() => {
      s.onViewportChange(r.value), s.onContentChange(u.value);
    }), t({
      viewportElement: r
    });
    const { forwardRef: i, currentElement: u } = R2();
    return (d, c) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", mergeProps({
        ref_key: "viewportElement",
        ref: r,
        "data-radix-scroll-area-viewport": "",
        style: {
          /**
           * We don't support `visible` because the intention is to have at least one scrollbar
           * if this component is used and `visible` will behave like `auto` in that case
           * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
           *
           * We don't handle `auto` because the intention is for the native implementation
           * to be hidden if using this component. We just want to ensure the node is scrollable
           * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
           * the browser from having to work out whether to render native scrollbars or not,
           * we tell it to with the intention of hiding them in CSS.
           */
          overflowX: unref(s).scrollbarXEnabled.value ? "scroll" : "hidden",
          overflowY: unref(s).scrollbarYEnabled.value ? "scroll" : "hidden"
        }
      }, d.$attrs, { tabindex: 0 }), [
        createVNode(unref(O), {
          ref: unref(i),
          style: normalizeStyle({
            /**
             * When horizontal scrollbar is visible: this element should be at least
             * as wide as its children for size calculations to work correctly.
             *
             * When horizontal scrollbar is NOT visible: this element's width should
             * be constrained by the parent container to enable `text-overflow: ellipsis`
             */
            minWidth: unref(s).scrollbarXEnabled.value ? "fit-content" : void 0
          }),
          "as-child": e.asChild,
          as: d.as
        }, {
          default: withCtx(() => [
            renderSlot(d.$slots, "default")
          ]),
          _: 3
        }, 8, ["style", "as-child", "as"])
      ], 16),
      createVNode(unref(O), {
        as: "style",
        nonce: unref(l)
      }, {
        default: withCtx(() => [
          createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-scroll-area-viewport] { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; } [data-radix-scroll-area-viewport]::-webkit-scrollbar { display:none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
});
function $s(a2, t) {
  return (e) => {
    if (a2[0] === a2[1] || t[0] === t[1])
      return t[0];
    const n = (t[1] - t[0]) / (a2[1] - a2[0]);
    return t[0] + n * (e - a2[0]);
  };
}
function ln(a2) {
  const t = Bs(a2.viewport, a2.content), e = a2.scrollbar.paddingStart + a2.scrollbar.paddingEnd, n = (a2.scrollbar.size - e) * t;
  return Math.max(n, 18);
}
function Bs(a2, t) {
  const e = a2 / t;
  return Number.isNaN(e) ? 0 : e;
}
function If(a2, t = () => {
}) {
  let e = { left: a2.scrollLeft, top: a2.scrollTop }, n = 0;
  return function l() {
    const s = { left: a2.scrollLeft, top: a2.scrollTop }, r = e.left !== s.left, i = e.top !== s.top;
    (r || i) && t(), e = s, n = window.requestAnimationFrame(l);
  }(), () => window.cancelAnimationFrame(n);
}
function tl(a2, t, e = "ltr") {
  const n = ln(t), l = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, s = t.scrollbar.size - l, r = t.content - t.viewport, i = s - n, u = e === "ltr" ? [0, r] : [r * -1, 0], d = Ut(
    a2,
    u[0],
    u[1]
  );
  return $s([0, r], [0, i])(d);
}
function Ra(a2) {
  return a2 ? Number.parseInt(a2, 10) : 0;
}
function Tf(a2, t, e, n = "ltr") {
  const l = ln(e), s = l / 2, r = t || s, i = l - r, u = e.scrollbar.paddingStart + r, d = e.scrollbar.size - e.scrollbar.paddingEnd - i, c = e.content - e.viewport, f = n === "ltr" ? [0, c] : [c * -1, 0];
  return $s(
    [u, d],
    f
  )(a2);
}
function al(a2, t) {
  return a2 > 0 && a2 < t;
}
var Is = defineComponent({
  __name: "ScrollAreaScrollbarImpl",
  props: {
    isHorizontal: { type: Boolean }
  },
  emits: ["onDragScroll", "onWheelScroll", "onThumbPointerDown"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = Ue(), s = sn(), r = rn(), { forwardRef: i, currentElement: u } = R2(), d = ref(""), c = ref();
    function f(C) {
      var $2, h2;
      if (c.value) {
        const E = C.clientX - (($2 = c.value) == null ? void 0 : $2.left), P2 = C.clientY - ((h2 = c.value) == null ? void 0 : h2.top);
        n("onDragScroll", { x: E, y: P2 });
      }
    }
    function v2(C) {
      C.button === 0 && (C.target.setPointerCapture(C.pointerId), c.value = u.value.getBoundingClientRect(), d.value = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", l.viewport && (l.viewport.value.style.scrollBehavior = "auto"), f(C));
    }
    function p(C) {
      f(C);
    }
    function g(C) {
      const $2 = C.target;
      $2.hasPointerCapture(C.pointerId) && $2.releasePointerCapture(C.pointerId), document.body.style.webkitUserSelect = d.value, l.viewport && (l.viewport.value.style.scrollBehavior = ""), c.value = void 0;
    }
    function m2(C) {
      var P2;
      const $2 = C.target, h2 = (P2 = u.value) == null ? void 0 : P2.contains($2), E = s.sizes.value.content - s.sizes.value.viewport;
      h2 && s.handleWheelScroll(C, E);
    }
    onMounted(() => {
      document.addEventListener("wheel", m2, { passive: false });
    }), onUnmounted(() => {
      document.removeEventListener("wheel", m2);
    });
    function _() {
      var C, $2, h2, E, P2;
      u.value && (e.isHorizontal ? s.handleSizeChange({
        content: ((C = l.viewport.value) == null ? void 0 : C.scrollWidth) ?? 0,
        viewport: (($2 = l.viewport.value) == null ? void 0 : $2.offsetWidth) ?? 0,
        scrollbar: {
          size: u.value.clientWidth ?? 0,
          paddingStart: Ra(getComputedStyle(u.value).paddingLeft),
          paddingEnd: Ra(getComputedStyle(u.value).paddingRight)
        }
      }) : s.handleSizeChange({
        content: ((h2 = l.viewport.value) == null ? void 0 : h2.scrollHeight) ?? 0,
        viewport: ((E = l.viewport.value) == null ? void 0 : E.offsetHeight) ?? 0,
        scrollbar: {
          size: ((P2 = u.value) == null ? void 0 : P2.clientHeight) ?? 0,
          paddingStart: Ra(getComputedStyle(u.value).paddingLeft),
          paddingEnd: Ra(getComputedStyle(u.value).paddingRight)
        }
      }));
    }
    return tt(u, _), tt(l.content, _), (C, $2) => (openBlock(), createBlock(unref(O), {
      ref: unref(i),
      style: { position: "absolute" },
      "data-scrollbarimpl": "",
      as: unref(r).as.value,
      "as-child": unref(r).asChild.value,
      onPointerdown: v2,
      onPointermove: p,
      onPointerup: g
    }, {
      default: withCtx(() => [
        renderSlot(C.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
var Rf = defineComponent({
  __name: "ScrollAreaScrollbarX",
  setup(a2) {
    const t = Ue(), e = sn(), { forwardRef: n, currentElement: l } = R2();
    onMounted(() => {
      l.value && t.onScrollbarXChange(l.value);
    });
    const s = computed(() => e.sizes.value);
    return (r, i) => (openBlock(), createBlock(Is, {
      ref: unref(n),
      "is-horizontal": true,
      "data-orientation": "horizontal",
      style: normalizeStyle({
        bottom: 0,
        left: unref(t).dir.value === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: unref(t).dir.value === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": s.value ? `${unref(ln)(s.value)}px` : void 0
      }),
      onOnDragScroll: i[0] || (i[0] = (u) => unref(e).onDragScroll(u.x))
    }, {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["style"]));
  }
});
var Af = defineComponent({
  __name: "ScrollAreaScrollbarY",
  setup(a2) {
    const t = Ue(), e = sn(), { forwardRef: n, currentElement: l } = R2();
    onMounted(() => {
      l.value && t.onScrollbarYChange(l.value);
    });
    const s = computed(() => e.sizes.value);
    return (r, i) => (openBlock(), createBlock(Is, {
      ref: unref(n),
      "is-horizontal": false,
      "data-orientation": "vertical",
      style: normalizeStyle({
        top: 0,
        right: unref(t).dir.value === "ltr" ? 0 : void 0,
        left: unref(t).dir.value === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": s.value ? `${unref(ln)(s.value)}px` : void 0
      }),
      onOnDragScroll: i[0] || (i[0] = (u) => unref(e).onDragScroll(u.y))
    }, {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["style"]));
  }
});
var [sn, Of] = te("ScrollAreaScrollbarVisible");
var Bo = defineComponent({
  __name: "ScrollAreaScrollbarVisible",
  setup(a2) {
    const t = Ue(), e = rn(), { forwardRef: n } = R2(), l = ref({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    }), s = computed(() => {
      const C = Bs(l.value.viewport, l.value.content);
      return C > 0 && C < 1;
    }), r = ref(), i = ref(0);
    function u(C, $2) {
      if (p.value) {
        const h2 = t.viewport.value.scrollLeft + C.deltaY;
        t.viewport.value.scrollLeft = h2, al(h2, $2) && C.preventDefault();
      } else {
        const h2 = t.viewport.value.scrollTop + C.deltaY;
        t.viewport.value.scrollTop = h2, al(h2, $2) && C.preventDefault();
      }
    }
    function d(C, $2) {
      p.value ? i.value = $2.x : i.value = $2.y;
    }
    function c(C) {
      i.value = 0;
    }
    function f(C) {
      l.value = C;
    }
    function v2(C, $2) {
      return Tf(
        C,
        i.value,
        l.value,
        $2
      );
    }
    const p = computed(
      () => e.isHorizontal.value
    );
    function g(C) {
      p.value ? t.viewport.value.scrollLeft = v2(
        C,
        t.dir.value
      ) : t.viewport.value.scrollTop = v2(C);
    }
    function m2() {
      if (p.value) {
        if (t.viewport.value && r.value) {
          const C = t.viewport.value.scrollLeft, $2 = tl(
            C,
            l.value,
            t.dir.value
          );
          r.value.style.transform = `translate3d(${$2}px, 0, 0)`;
        }
      } else if (t.viewport.value && r.value) {
        const C = t.viewport.value.scrollTop, $2 = tl(C, l.value);
        r.value.style.transform = `translate3d(0, ${$2}px, 0)`;
      }
    }
    function _(C) {
      r.value = C;
    }
    return Of({
      sizes: l,
      hasThumb: s,
      handleWheelScroll: u,
      handleThumbDown: d,
      handleThumbUp: c,
      handleSizeChange: f,
      onThumbPositionChange: m2,
      onThumbChange: _,
      onDragScroll: g
    }), (C, $2) => p.value ? (openBlock(), createBlock(Rf, mergeProps({ key: 0 }, C.$attrs, { ref: unref(n) }), {
      default: withCtx(() => [
        renderSlot(C.$slots, "default")
      ]),
      _: 3
    }, 16)) : (openBlock(), createBlock(Af, mergeProps({ key: 1 }, C.$attrs, { ref: unref(n) }), {
      default: withCtx(() => [
        renderSlot(C.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ts = defineComponent({
  __name: "ScrollAreaScrollbarAuto",
  props: {
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = Ue(), e = rn(), { forwardRef: n } = R2(), l = ref(false), s = jn(() => {
      if (t.viewport.value) {
        const r = t.viewport.value.offsetWidth < t.viewport.value.scrollWidth, i = t.viewport.value.offsetHeight < t.viewport.value.scrollHeight;
        l.value = e.isHorizontal.value ? r : i;
      }
    }, 10);
    return onMounted(() => s()), tt(t.viewport, s), tt(t.content, s), (r, i) => (openBlock(), createBlock(unref(Pe), {
      present: r.forceMount || l.value
    }, {
      default: withCtx(() => [
        createVNode(Bo, mergeProps(r.$attrs, {
          ref: unref(n),
          "data-state": l.value ? "visible" : "hidden"
        }), {
          default: withCtx(() => [
            renderSlot(r.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var kf = defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaScrollbarHover",
  props: {
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = Ue(), { forwardRef: e } = R2();
    let n;
    const l = ref(false);
    function s() {
      window.clearTimeout(n), l.value = true;
    }
    function r() {
      n = window.setTimeout(() => {
        l.value = false;
      }, t.scrollHideDelay.value);
    }
    return onMounted(() => {
      const i = t.scrollArea.value;
      i && (i.addEventListener("pointerenter", s), i.addEventListener("pointerleave", r));
    }), onUnmounted(() => {
      const i = t.scrollArea.value;
      i && (window.clearTimeout(n), i.removeEventListener("pointerenter", s), i.removeEventListener("pointerleave", r));
    }), (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || l.value
    }, {
      default: withCtx(() => [
        createVNode(Ts, mergeProps(i.$attrs, {
          ref: unref(e),
          "data-state": l.value ? "visible" : "hidden"
        }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Mf = defineComponent({
  __name: "ScrollAreaScrollbarScroll",
  props: {
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = Ue(), e = rn(), { forwardRef: n } = R2(), { state: l, dispatch: s } = zl("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    watchEffect((i) => {
      if (l.value === "idle") {
        const u = window.setTimeout(
          () => s("HIDE"),
          t.scrollHideDelay.value
        );
        i(() => {
          window.clearTimeout(u);
        });
      }
    });
    const r = jn(() => s("SCROLL_END"), 100);
    return watchEffect((i) => {
      const u = t.viewport.value, d = e.isHorizontal.value ? "scrollLeft" : "scrollTop";
      if (u) {
        let c = u[d];
        const f = () => {
          const v2 = u[d];
          c !== v2 && (s("SCROLL"), r()), c = v2;
        };
        u.addEventListener("scroll", f), i(() => {
          u.removeEventListener("scroll", f);
        });
      }
    }), (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(l) !== "hidden"
    }, {
      default: withCtx(() => [
        createVNode(Bo, mergeProps(i.$attrs, { ref: unref(n) }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var [rn, Vf] = te("ScrollAreaScrollbar");
var Ny = defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaScrollbar",
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), n = Ue(), l = computed(() => t.orientation === "horizontal");
    watch(
      l,
      () => {
        l.value ? n.onScrollbarXEnabledChange(true) : n.onScrollbarYEnabledChange(true);
      },
      { immediate: true }
    ), onUnmounted(() => {
      n.onScrollbarXEnabledChange(false), n.onScrollbarYEnabledChange(false);
    });
    const { orientation: s, forceMount: r, asChild: i, as: u } = toRefs(t);
    return Vf({
      orientation: s,
      forceMount: r,
      isHorizontal: l,
      as: u,
      asChild: i
    }), (d, c) => unref(n).type.value === "hover" ? (openBlock(), createBlock(kf, mergeProps({ key: 0 }, d.$attrs, {
      ref: unref(e),
      "force-mount": unref(r)
    }), {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(n).type.value === "scroll" ? (openBlock(), createBlock(Mf, mergeProps({ key: 1 }, d.$attrs, {
      ref: unref(e),
      "force-mount": unref(r)
    }), {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(n).type.value === "auto" ? (openBlock(), createBlock(Ts, mergeProps({ key: 2 }, d.$attrs, {
      ref: unref(e),
      "force-mount": unref(r)
    }), {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(n).type.value === "always" ? (openBlock(), createBlock(Bo, mergeProps({ key: 3 }, d.$attrs, {
      ref: unref(e),
      "data-state": "visible"
    }), {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
var Ly = defineComponent({
  __name: "ScrollAreaThumb",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Ue(), n = sn();
    function l(v2) {
      const g = v2.target.getBoundingClientRect(), m2 = v2.clientX - g.left, _ = v2.clientY - g.top;
      n.handleThumbDown(v2, { x: m2, y: _ });
    }
    function s(v2) {
      n.handleThumbUp(v2);
    }
    const { forwardRef: r, currentElement: i } = R2(), u = ref(), d = computed(() => e.viewport.value);
    function c() {
      if (!u.value) {
        const v2 = If(
          d.value,
          n.onThumbPositionChange
        );
        u.value = v2, n.onThumbPositionChange();
      }
    }
    const f = computed(() => n.sizes.value);
    return bi(f, () => {
      n.onThumbChange(i.value), d.value && (n.onThumbPositionChange(), d.value.addEventListener("scroll", c));
    }), onUnmounted(() => {
      var v2;
      d.value.removeEventListener("scroll", c), (v2 = e.viewport.value) == null || v2.removeEventListener("scroll", c);
    }), (v2, p) => (openBlock(), createBlock(unref(O), {
      ref: unref(r),
      "data-state": unref(n).hasThumb ? "visible" : "hidden",
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)"
      },
      "as-child": t.asChild,
      as: v2.as,
      onPointerdown: l,
      onPointerup: s
    }, {
      default: withCtx(() => [
        renderSlot(v2.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-state", "as-child", "as"]));
  }
});
var Ff = defineComponent({
  __name: "ScrollAreaCornerImpl",
  setup(a2) {
    const t = Ue(), e = ref(0), n = ref(0), l = computed(() => !!e.value && !!n.value);
    function s() {
      var u;
      const i = ((u = t.scrollbarX.value) == null ? void 0 : u.offsetHeight) || 0;
      t.onCornerHeightChange(i), n.value = i;
    }
    function r() {
      var u;
      const i = ((u = t.scrollbarY.value) == null ? void 0 : u.offsetWidth) || 0;
      t.onCornerWidthChange(i), e.value = i;
    }
    return tt(t.scrollbarX.value, s), tt(t.scrollbarY.value, r), watch(() => t.scrollbarX.value, s), watch(() => t.scrollbarY.value, r), (i, u) => {
      var d;
      return l.value ? (openBlock(), createBlock(unref(O), mergeProps({
        key: 0,
        style: {
          width: `${e.value}px`,
          height: `${n.value}px`,
          position: "absolute",
          right: unref(t).dir.value === "ltr" ? 0 : void 0,
          left: unref(t).dir.value === "rtl" ? 0 : void 0,
          bottom: 0
        }
      }, (d = i.$parent) == null ? void 0 : d.$props), {
        default: withCtx(() => [
          renderSlot(i.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : createCommentVNode("", true);
    };
  }
});
var zy = defineComponent({
  __name: "ScrollAreaCorner",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), n = Ue(), l = computed(
      () => !!n.scrollbarX.value && !!n.scrollbarY.value
    ), s = computed(
      () => n.type.value !== "scroll" && l.value
    );
    return (r, i) => s.value ? (openBlock(), createBlock(Ff, mergeProps({ key: 0 }, t, { ref: unref(e) }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
var Nf = ["default-value"];
var Lf = defineComponent({
  __name: "BubbleSelect",
  props: {
    autocomplete: {},
    autofocus: { type: Boolean },
    disabled: { type: Boolean },
    form: {},
    multiple: { type: Boolean },
    name: {},
    required: { type: Boolean },
    size: {},
    value: {}
  },
  setup(a2) {
    const t = a2, { value: e } = toRefs(t), n = ref();
    return (l, s) => (openBlock(), createBlock(unref(Jt), { "as-child": "" }, {
      default: withCtx(() => [
        withDirectives(createBaseVNode("select", mergeProps({
          ref_key: "selectElement",
          ref: n
        }, t, {
          "onUpdate:modelValue": s[0] || (s[0] = (r) => isRef(e) ? e.value = r : null),
          "default-value": unref(e)
        }), [
          renderSlot(l.$slots, "default")
        ], 16, Nf), [
          [vModelSelect, unref(e)]
        ])
      ]),
      _: 3
    }));
  }
});
var zf = {
  key: 0,
  value: ""
};
var [xt, Rs] = te("SelectRoot");
var [Kf, Hf] = te("SelectRoot");
var Ky = defineComponent({
  __name: "SelectRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean },
    defaultValue: { default: "" },
    modelValue: { default: void 0 },
    dir: {},
    name: {},
    autocomplete: {},
    disabled: { type: Boolean },
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: e.modelValue === void 0
    }), s = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    }), r = ref(), i = ref(), u = ref({
      x: 0,
      y: 0
    }), d = ref(false), { required: c, disabled: f, dir: v2 } = toRefs(e), p = we(v2);
    Rs({
      triggerElement: r,
      onTriggerChange: (C) => {
        r.value = C;
      },
      valueElement: i,
      onValueElementChange: (C) => {
        i.value = C;
      },
      valueElementHasChildren: d,
      onValueElementHasChildrenChange: (C) => {
        d.value = C;
      },
      contentId: "",
      modelValue: l,
      onValueChange: (C) => {
        l.value = C;
      },
      open: s,
      required: c,
      onOpenChange: (C) => {
        s.value = C;
      },
      dir: p,
      triggerPointerDownPosRef: u,
      disabled: f
    });
    const g = at(r), m2 = ref(/* @__PURE__ */ new Set()), _ = computed(() => Array.from(m2.value).map((C) => {
      var $2;
      return ($2 = C.props) == null ? void 0 : $2.value;
    }).join(";"));
    return Hf({
      onNativeOptionAdd: (C) => {
        m2.value.add(C);
      },
      onNativeOptionRemove: (C) => {
        m2.value.delete(C);
      }
    }), (C, $2) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        renderSlot(C.$slots, "default", {
          modelValue: unref(l),
          open: unref(s)
        }),
        unref(g) ? (openBlock(), createBlock(Lf, mergeProps({ key: _.value }, C.$attrs, {
          "aria-hidden": "true",
          tabindex: "-1",
          required: unref(c),
          name: C.name,
          autocomplete: C.autocomplete,
          disabled: unref(f),
          value: unref(l),
          onChange: $2[0] || ($2[0] = (h2) => l.value = h2.target.value)
        }), {
          default: withCtx(() => [
            unref(l) === void 0 ? (openBlock(), createElementBlock("option", zf)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(m2.value), (h2) => (openBlock(), createBlock(resolveDynamicComponent(h2), mergeProps({ ref_for: true }, h2.props, {
              key: h2.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : createCommentVNode("", true)
      ]),
      _: 3
    }));
  }
});
var Wf = [" ", "Enter", "ArrowUp", "ArrowDown"];
var jf = [" ", "Enter"];
var qe = 10;
function As(a2) {
  return a2 === "" || ht(a2);
}
var Hy = defineComponent({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = xt(), n = computed(() => {
      var p;
      return ((p = e.disabled) == null ? void 0 : p.value) || t.disabled;
    }), { forwardRef: l, currentElement: s } = R2();
    e.contentId || (e.contentId = ge(void 0, "radix-vue-select-content")), onMounted(() => {
      e.triggerElement = s;
    });
    const { injectCollection: r } = Fe(), i = r(), { search: u, handleTypeaheadSearch: d, resetTypeahead: c } = ba(i);
    function f() {
      n.value || (e.onOpenChange(true), c());
    }
    function v2(p) {
      f(), e.triggerPointerDownPosRef.value = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      };
    }
    return (p, g) => (openBlock(), createBlock(unref(Mt), { "as-child": "" }, {
      default: withCtx(() => {
        var m2, _, C, $2;
        return [
          createVNode(unref(O), {
            ref: unref(l),
            role: "combobox",
            type: p.as === "button" ? "button" : void 0,
            "aria-controls": unref(e).contentId,
            "aria-expanded": unref(e).open.value || false,
            "aria-required": (m2 = unref(e).required) == null ? void 0 : m2.value,
            "aria-autocomplete": "none",
            disabled: n.value,
            dir: (_ = unref(e)) == null ? void 0 : _.dir.value,
            "data-state": (C = unref(e)) != null && C.open.value ? "open" : "closed",
            "data-disabled": n.value ? "" : void 0,
            "data-placeholder": unref(As)(($2 = unref(e).modelValue) == null ? void 0 : $2.value) ? "" : void 0,
            "as-child": p.asChild,
            as: p.as,
            onClick: g[0] || (g[0] = (h2) => {
              var E;
              (E = h2 == null ? void 0 : h2.currentTarget) == null || E.focus();
            }),
            onPointerdown: g[1] || (g[1] = (h2) => {
              if (h2.pointerType === "touch")
                return h2.preventDefault();
              const E = h2.target;
              E.hasPointerCapture(h2.pointerId) && E.releasePointerCapture(h2.pointerId), h2.button === 0 && h2.ctrlKey === false && (v2(h2), h2.preventDefault());
            }),
            onPointerup: g[2] || (g[2] = withModifiers(
              (h2) => {
                h2.pointerType === "touch" && v2(h2);
              },
              ["prevent"]
            )),
            onKeydown: g[3] || (g[3] = (h2) => {
              const E = unref(u) !== "";
              !(h2.ctrlKey || h2.altKey || h2.metaKey) && h2.key.length === 1 && E && h2.key === " " || (unref(d)(h2.key), unref(Wf).includes(h2.key) && (f(), h2.preventDefault()));
            })
          }, {
            default: withCtx(() => [
              renderSlot(p.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
});
var Wy = defineComponent({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [Io, Uf] = te("SelectItemAlignedPosition");
var Gf = defineComponent({
  inheritAttrs: false,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["placed"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { injectCollection: l } = Fe(), s = xt(), r = St(), i = l(), u = ref(false), d = ref(true), c = ref(), { forwardRef: f, currentElement: v2 } = R2(), { viewport: p, selectedItem: g, selectedItemText: m2, focusSelectedItem: _ } = r;
    function C() {
      if (s.triggerElement.value && s.valueElement.value && c.value && v2.value && (p != null && p.value) && (g != null && g.value) && (m2 != null && m2.value)) {
        const E = s.triggerElement.value.getBoundingClientRect(), P2 = v2.value.getBoundingClientRect(), D = s.valueElement.value.getBoundingClientRect(), I = m2.value.getBoundingClientRect();
        if (s.dir.value !== "rtl") {
          const Ee = I.left - P2.left, be = D.left - Ee, de = E.left - be, Ie = E.width + de, Ae = Math.max(Ie, P2.width), We = window.innerWidth - qe, Et = Ut(be, qe, Math.max(qe, We - Ae));
          c.value.style.minWidth = `${Ie}px`, c.value.style.left = `${Et}px`;
        } else {
          const Ee = P2.right - I.right, be = window.innerWidth - D.right - Ee, de = window.innerWidth - E.right - be, Ie = E.width + de, Ae = Math.max(Ie, P2.width), We = window.innerWidth - qe, Et = Ut(
            be,
            qe,
            Math.max(qe, We - Ae)
          );
          c.value.style.minWidth = `${Ie}px`, c.value.style.right = `${Et}px`;
        }
        const M = i.value, V2 = window.innerHeight - qe * 2, A2 = p.value.scrollHeight, F = window.getComputedStyle(v2.value), j = Number.parseInt(
          F.borderTopWidth,
          10
        ), H2 = Number.parseInt(F.paddingTop, 10), Q = Number.parseInt(
          F.borderBottomWidth,
          10
        ), G2 = Number.parseInt(
          F.paddingBottom,
          10
        ), J2 = j + H2 + A2 + G2 + Q, z2 = Math.min(
          g.value.offsetHeight * 5,
          J2
        ), K = window.getComputedStyle(p.value), L = Number.parseInt(K.paddingTop, 10), N2 = Number.parseInt(
          K.paddingBottom,
          10
        ), Z = E.top + E.height / 2 - qe, Y = V2 - Z, re = g.value.offsetHeight / 2, X = g.value.offsetTop + re, se = j + H2 + X, fe = J2 - se;
        if (se <= Z) {
          const Ee = g.value === M[M.length - 1];
          c.value.style.bottom = "0px";
          const be = v2.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, de = Math.max(
            Y,
            re + (Ee ? N2 : 0) + be + Q
          ), Ie = se + de;
          c.value.style.height = `${Ie}px`;
        } else {
          const Ee = g.value === M[0];
          c.value.style.top = "0px";
          const de = Math.max(
            Z,
            j + p.value.offsetTop + (Ee ? L : 0) + re
          ) + fe;
          c.value.style.height = `${de}px`, p.value.scrollTop = se - Z + p.value.offsetTop;
        }
        c.value.style.margin = `${qe}px 0`, c.value.style.minHeight = `${z2}px`, c.value.style.maxHeight = `${V2}px`, n("placed"), requestAnimationFrame(() => u.value = true);
      }
    }
    const $2 = ref("");
    onMounted(async () => {
      await nextTick(), C(), v2.value && ($2.value = window.getComputedStyle(v2.value).zIndex);
    });
    function h2(E) {
      E && d.value === true && (C(), _ == null || _(), d.value = false);
    }
    return Uf({
      contentWrapper: c,
      shouldExpandOnScrollRef: u,
      onScrollButtonChange: h2
    }), (E, P2) => (openBlock(), createElementBlock("div", {
      ref_key: "contentWrapperElement",
      ref: c,
      style: normalizeStyle({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: $2.value
      })
    }, [
      createVNode(unref(O), mergeProps({
        ref: unref(f),
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...E.$attrs, ...e }), {
        default: withCtx(() => [
          renderSlot(E.$slots, "default")
        ]),
        _: 3
      }, 16)
    ], 4));
  }
});
var qf = defineComponent({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: qe },
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const e = Ot(a2);
    return (n, l) => (openBlock(), createBlock(unref(It), mergeProps(unref(e), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var zt = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
};
var [St, Yf] = te("SelectContent");
var Xf = defineComponent({
  __name: "SelectContentImpl",
  props: {
    position: { default: "item-aligned" },
    bodyLock: { type: Boolean, default: true },
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = xt();
    Yn(), ya(e.bodyLock);
    const { createCollection: s } = Fe(), r = ref();
    ga(r);
    const i = s(r), { search: u, handleTypeaheadSearch: d } = ba(i), c = ref(), f = ref(), v2 = ref(), p = ref(false), g = ref(false);
    function m2() {
      f.value && r.value && In([f.value, r.value]);
    }
    watch(p, () => {
      m2();
    });
    const { onOpenChange: _, triggerPointerDownPosRef: C } = l;
    watchEffect((P2) => {
      if (!r.value)
        return;
      let D = { x: 0, y: 0 };
      const I = (V2) => {
        var A2, F;
        D = {
          x: Math.abs(
            Math.round(V2.pageX) - (((A2 = C.value) == null ? void 0 : A2.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(V2.pageY) - (((F = C.value) == null ? void 0 : F.y) ?? 0)
          )
        };
      }, M = (V2) => {
        var A2;
        V2.pointerType !== "touch" && (D.x <= 10 && D.y <= 10 ? V2.preventDefault() : (A2 = r.value) != null && A2.contains(V2.target) || _(false), document.removeEventListener("pointermove", I), C.value = null);
      };
      C.value !== null && (document.addEventListener("pointermove", I), document.addEventListener("pointerup", M, {
        capture: true,
        once: true
      })), P2(() => {
        document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", M, {
          capture: true
        });
      });
    });
    function $2(P2) {
      const D = P2.ctrlKey || P2.altKey || P2.metaKey;
      if (P2.key === "Tab" && P2.preventDefault(), !D && P2.key.length === 1 && d(P2.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(P2.key)) {
        let I = i.value;
        if (["ArrowUp", "End"].includes(P2.key) && (I = I.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(P2.key)) {
          const M = P2.target, V2 = I.indexOf(M);
          I = I.slice(V2 + 1);
        }
        setTimeout(() => In(I)), P2.preventDefault();
      }
    }
    const h2 = computed(() => e.position === "popper" ? e : {}), E = Ot(h2.value);
    return Yf({
      content: r,
      viewport: c,
      onViewportChange: (P2) => {
        c.value = P2;
      },
      itemRefCallback: (P2, D, I) => {
        var A2, F;
        const M = !g.value && !I;
        (((A2 = l.modelValue) == null ? void 0 : A2.value) !== void 0 && ((F = l.modelValue) == null ? void 0 : F.value) === D || M) && (f.value = P2, M && (g.value = true));
      },
      selectedItem: f,
      selectedItemText: v2,
      onItemLeave: () => {
        var P2;
        (P2 = r.value) == null || P2.focus();
      },
      itemTextRefCallback: (P2, D, I) => {
        var A2, F;
        const M = !g.value && !I;
        (((A2 = l.modelValue) == null ? void 0 : A2.value) !== void 0 && ((F = l.modelValue) == null ? void 0 : F.value) === D || M) && (v2.value = P2);
      },
      focusSelectedItem: m2,
      position: e.position,
      isPositioned: p,
      searchRef: u
    }), (P2, D) => (openBlock(), createBlock(unref(Za), {
      "as-child": "",
      onMountAutoFocus: D[6] || (D[6] = withModifiers(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: D[7] || (D[7] = (I) => {
        var M;
        n("closeAutoFocus", I), !I.defaultPrevented && ((M = unref(l).triggerElement.value) == null || M.focus({ preventScroll: true }), I.preventDefault());
      })
    }, {
      default: withCtx(() => [
        createVNode(unref(Ct), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: D[2] || (D[2] = withModifiers(() => {
          }, ["prevent"])),
          onDismiss: D[3] || (D[3] = (I) => unref(l).onOpenChange(false)),
          onEscapeKeyDown: D[4] || (D[4] = (I) => n("escapeKeyDown", I)),
          onPointerDownOutside: D[5] || (D[5] = (I) => n("pointerDownOutside", I))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(
              P2.position === "popper" ? qf : Gf
            ), mergeProps({ ...P2.$attrs, ...unref(E) }, {
              id: unref(l).contentId,
              ref: (I) => {
                r.value = unref($e)(I);
              },
              role: "listbox",
              "data-state": unref(l).open.value ? "open" : "closed",
              dir: unref(l).dir.value,
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none"
              },
              onContextmenu: D[0] || (D[0] = withModifiers(() => {
              }, ["prevent"])),
              onPlaced: D[1] || (D[1] = (I) => p.value = true),
              onKeydown: $2
            }), {
              default: withCtx(() => [
                renderSlot(P2.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "data-state", "dir", "onKeydown"]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
});
var Zf = defineComponent({
  inheritAttrs: false,
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(a2) {
    return Rs(a2.context), (e, n) => renderSlot(e.$slots, "default");
  }
});
var Jf = { key: 1 };
var jy = defineComponent({
  inheritAttrs: false,
  __name: "SelectContent",
  props: {
    forceMount: { type: Boolean },
    position: {},
    bodyLock: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(a2, { emit: t }) {
    const e = a2, l = Se(e, t), s = xt(), r = ref();
    onMounted(() => {
      r.value = new DocumentFragment();
    });
    const i = ref(), u = computed(() => e.forceMount || s.open.value);
    return (d, c) => {
      var f;
      return u.value ? (openBlock(), createBlock(unref(Pe), {
        key: 0,
        ref_key: "presenceRef",
        ref: i,
        present: true
      }, {
        default: withCtx(() => [
          createVNode(Xf, normalizeProps(guardReactiveProps({ ...unref(l), ...d.$attrs })), {
            default: withCtx(() => [
              renderSlot(d.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !((f = i.value) != null && f.present) && r.value ? (openBlock(), createElementBlock("div", Jf, [
        (openBlock(), createBlock(Teleport, { to: r.value }, [
          createVNode(Zf, { context: unref(s) }, {
            default: withCtx(() => [
              renderSlot(d.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : createCommentVNode("", true);
    };
  }
});
var Uy = defineComponent({
  __name: "SelectArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2, e = xt(), n = St(zt);
    return (l, s) => unref(e).open.value && unref(n).position === "popper" ? (openBlock(), createBlock(unref(Zt), normalizeProps(mergeProps({ key: 0 }, t)), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
var Gy = defineComponent({
  __name: "SelectSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(O), mergeProps({ "aria-hidden": "true" }, t), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var [Os, Qf] = te("SelectItem");
var qy = defineComponent({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { disabled: e } = toRefs(t), n = xt(), l = St(zt), { forwardRef: s, currentElement: r } = R2(), i = computed(() => {
      var m2;
      return ((m2 = n.modelValue) == null ? void 0 : m2.value) === t.value;
    }), u = ref(false), d = ref(t.textValue ?? ""), c = ge(void 0, "radix-vue-select-item-text");
    async function f(m2) {
      await nextTick(), !(m2 != null && m2.defaultPrevented) && (e.value || (n.onValueChange(t.value), n.onOpenChange(false)));
    }
    async function v2(m2) {
      var _;
      await nextTick(), !m2.defaultPrevented && (e.value ? (_ = l.onItemLeave) == null || _.call(l) : m2.currentTarget.focus({ preventScroll: true }));
    }
    async function p(m2) {
      var _;
      await nextTick(), !m2.defaultPrevented && m2.currentTarget === me() && ((_ = l.onItemLeave) == null || _.call(l));
    }
    async function g(m2) {
      var C;
      await nextTick(), !(m2.defaultPrevented || ((C = l.searchRef) == null ? void 0 : C.value) !== "" && m2.key === " ") && (jf.includes(m2.key) && f(), m2.key === " " && m2.preventDefault());
    }
    if (t.value === "")
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return onMounted(() => {
      r.value && l.itemRefCallback(
        r.value,
        t.value,
        t.disabled
      );
    }), Qf({
      value: t.value,
      disabled: e,
      textId: c,
      isSelected: i,
      onItemTextChange: (m2) => {
        d.value = ((d.value || (m2 == null ? void 0 : m2.textContent)) ?? "").trim();
      }
    }), (m2, _) => (openBlock(), createBlock(unref(O), {
      ref: unref(s),
      role: "option",
      "data-radix-vue-collection-item": "",
      "aria-labelledby": unref(c),
      "data-highlighted": u.value ? "" : void 0,
      "aria-selected": i.value,
      "data-state": i.value ? "checked" : "unchecked",
      "aria-disabled": unref(e) || void 0,
      "data-disabled": unref(e) ? "" : void 0,
      tabindex: unref(e) ? void 0 : -1,
      as: m2.as,
      "as-child": m2.asChild,
      onFocus: _[0] || (_[0] = (C) => u.value = true),
      onBlur: _[1] || (_[1] = (C) => u.value = false),
      onPointerup: f,
      onPointerdown: _[2] || (_[2] = (C) => {
        C.currentTarget.focus({ preventScroll: true });
      }),
      onTouchend: _[3] || (_[3] = withModifiers(() => {
      }, ["prevent", "stop"])),
      onPointermove: v2,
      onPointerleave: p,
      onKeydown: g
    }, {
      default: withCtx(() => [
        renderSlot(m2.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
});
var Yy = defineComponent({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, e = Os();
    return (n, l) => unref(e).isSelected.value ? (openBlock(), createBlock(unref(O), mergeProps({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
var [ep, tp] = te("SelectGroup");
var Xy = defineComponent({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = ge(void 0, "radix-vue-select-group");
    return tp({ id: e }), (n, l) => (openBlock(), createBlock(unref(O), mergeProps({ role: "group" }, t, { "aria-labelledby": unref(e) }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
});
var Zy = defineComponent({
  __name: "SelectLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(a2) {
    const t = a2, e = ep({ id: "" });
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).id
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var Jy = defineComponent({
  inheritAttrs: false,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, e = xt(), n = St(zt), l = Kf(), s = Os(), { forwardRef: r, currentElement: i } = R2(), u = computed(() => {
      var d;
      return h("option", {
        key: s.value,
        value: s.value,
        disabled: s.disabled.value,
        textContent: (d = i.value) == null ? void 0 : d.textContent
      });
    });
    return onMounted(() => {
      i.value && (s.onItemTextChange(i.value), n.itemTextRefCallback(
        i.value,
        s.value,
        s.disabled.value
      ), l.onNativeOptionAdd(u.value));
    }), onBeforeUnmount(() => {
      l.onNativeOptionRemove(u.value);
    }), (d, c) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps({
        id: unref(s).textId,
        ref: unref(r)
      }, { ...t, ...d.$attrs }, { "data-item-text": "" }), {
        default: withCtx(() => [
          renderSlot(d.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      unref(s).isSelected.value && unref(e).valueElement.value && !unref(e).valueElementHasChildren.value ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: unref(e).valueElement.value
      }, [
        renderSlot(d.$slots, "default")
      ], 8, ["to"])) : createCommentVNode("", true)
    ], 64));
  }
});
var Qy = defineComponent({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { nonce: e } = toRefs(t), n = Ja(e), l = St(zt), s = l.position === "item-aligned" ? Io() : void 0, { forwardRef: r, currentElement: i } = R2();
    onMounted(() => {
      l == null || l.onViewportChange(i.value);
    });
    const u = ref(0);
    function d(c) {
      const f = c.currentTarget, { shouldExpandOnScrollRef: v2, contentWrapper: p } = s ?? {};
      if (v2 != null && v2.value && (p != null && p.value)) {
        const g = Math.abs(u.value - f.scrollTop);
        if (g > 0) {
          const m2 = window.innerHeight - qe * 2, _ = Number.parseFloat(
            p.value.style.minHeight
          ), C = Number.parseFloat(p.value.style.height), $2 = Math.max(_, C);
          if ($2 < m2) {
            const h2 = $2 + g, E = Math.min(m2, h2), P2 = h2 - E;
            p.value.style.height = `${E}px`, p.value.style.bottom === "0px" && (f.scrollTop = P2 > 0 ? P2 : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      u.value = f.scrollTop;
    }
    return (c, f) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps({
        ref: unref(r),
        "data-radix-select-viewport": "",
        role: "presentation"
      }, { ...c.$attrs, ...t }, {
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "hidden auto"
        },
        onScroll: d
      }), {
        default: withCtx(() => [
          renderSlot(c.$slots, "default")
        ]),
        _: 3
      }, 16),
      createVNode(unref(O), {
        as: "style",
        nonce: unref(n)
      }, {
        default: withCtx(() => [
          createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
});
var ks = defineComponent({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(a2, { emit: t }) {
    const e = t, { injectCollection: n } = Fe(), l = n(), s = St(zt), r = ref(null);
    function i() {
      r.value !== null && (window.clearInterval(r.value), r.value = null);
    }
    watchEffect(() => {
      const c = l.value.find(
        (f) => f === me()
      );
      c == null || c.scrollIntoView({ block: "nearest" });
    });
    function u() {
      r.value === null && (r.value = window.setInterval(() => {
        e("autoScroll");
      }, 50));
    }
    function d() {
      var c;
      (c = s.onItemLeave) == null || c.call(s), r.value === null && (r.value = window.setInterval(() => {
        e("autoScroll");
      }, 50));
    }
    return onBeforeUnmount(() => i()), (c, f) => {
      var v2;
      return openBlock(), createBlock(unref(O), mergeProps({
        "aria-hidden": "true",
        style: {
          flexShrink: 0
        }
      }, (v2 = c.$parent) == null ? void 0 : v2.$props, {
        onPointerdown: u,
        onPointermove: d,
        onPointerleave: f[0] || (f[0] = () => {
          i();
        })
      }), {
        default: withCtx(() => [
          renderSlot(c.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
var eg = defineComponent({
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = St(zt), e = t.position === "item-aligned" ? Io() : void 0, { forwardRef: n, currentElement: l } = R2(), s = ref(false);
    return watchEffect((r) => {
      var i, u;
      if ((i = t.viewport) != null && i.value && ((u = t.isPositioned) != null && u.value)) {
        let d = function() {
          s.value = c.scrollTop > 0;
        };
        const c = t.viewport.value;
        d(), c.addEventListener("scroll", d), r(() => c.removeEventListener("scroll", d));
      }
    }), watch(l, () => {
      l.value && (e == null || e.onScrollButtonChange(l.value));
    }), (r, i) => s.value ? (openBlock(), createBlock(ks, {
      key: 0,
      ref: unref(n),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: u, selectedItem: d } = unref(t);
        u != null && u.value && (d != null && d.value) && (u.value.scrollTop = u.value.scrollTop - d.value.offsetHeight);
      })
    }, {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 512)) : createCommentVNode("", true);
  }
});
var tg = defineComponent({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = St(zt), e = t.position === "item-aligned" ? Io() : void 0, { forwardRef: n, currentElement: l } = R2(), s = ref(false);
    return watchEffect((r) => {
      var i, u;
      if ((i = t.viewport) != null && i.value && ((u = t.isPositioned) != null && u.value)) {
        let d = function() {
          const f = c.scrollHeight - c.clientHeight;
          s.value = Math.ceil(c.scrollTop) < f;
        };
        const c = t.viewport.value;
        d(), c.addEventListener("scroll", d), r(() => c.removeEventListener("scroll", d));
      }
    }), watch(l, () => {
      l.value && (e == null || e.onScrollButtonChange(l.value));
    }), (r, i) => s.value ? (openBlock(), createBlock(ks, {
      key: 0,
      ref: unref(n),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: u, selectedItem: d } = unref(t);
        u != null && u.value && (d != null && d.value) && (u.value.scrollTop = u.value.scrollTop + d.value.offsetHeight);
      })
    }, {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 512)) : createCommentVNode("", true);
  }
});
var ag = defineComponent({
  __name: "SelectValue",
  props: {
    placeholder: { default: "" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const { forwardRef: t, currentElement: e } = R2(), n = xt(), l = useSlots();
    return onBeforeMount(() => {
      var r;
      const s = !!qa((r = l == null ? void 0 : l.default) == null ? void 0 : r.call(l)).length;
      n.onValueElementHasChildrenChange(s);
    }), onMounted(() => {
      n.valueElement = e;
    }), (s, r) => (openBlock(), createBlock(unref(O), {
      ref: unref(t),
      as: s.as,
      "as-child": s.asChild,
      style: { pointerEvents: "none" }
    }, {
      default: withCtx(() => {
        var i;
        return [
          unref(As)((i = unref(n).modelValue) == null ? void 0 : i.value) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(s.placeholder), 1)
          ], 64)) : renderSlot(s.$slots, "default", { key: 1 })
        ];
      }),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
var ng = defineComponent({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    return (t, e) => (openBlock(), createBlock(unref(O), {
      "aria-hidden": "true",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default", {}, () => [
          createTextVNode("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
var Ms = defineComponent({
  __name: "BaseSeparator",
  props: {
    orientation: { default: "horizontal" },
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = ["horizontal", "vertical"];
    function n(i) {
      return e.includes(i);
    }
    const l = computed(
      () => n(t.orientation) ? t.orientation : "horizontal"
    ), s = computed(
      () => l.value === "vertical" ? t.orientation : void 0
    ), r = computed(
      () => t.decorative ? { role: "none" } : { "aria-orientation": s.value, role: "separator" }
    );
    return (i, u) => (openBlock(), createBlock(unref(O), mergeProps({
      as: i.as,
      "as-child": i.asChild,
      "data-orientation": l.value
    }, r.value), {
      default: withCtx(() => [
        renderSlot(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["as", "as-child", "data-orientation"]));
  }
});
var ap = defineComponent({
  __name: "Separator",
  props: {
    orientation: { default: "horizontal" },
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(Ms, normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function np(a2 = [], t, e) {
  const n = [...a2];
  return n[e] = t, n.sort((l, s) => l - s);
}
function Vs(a2, t, e) {
  const s = 100 / (e - t) * (a2 - t);
  return Ut(s, 0, 100);
}
function op(a2, t) {
  return t > 2 ? `Value ${a2 + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][a2] : void 0;
}
function lp(a2, t) {
  if (a2.length === 1)
    return 0;
  const e = a2.map((l) => Math.abs(l - t)), n = Math.min(...e);
  return e.indexOf(n);
}
function sp(a2, t, e) {
  const n = a2 / 2, s = To([0, 50], [0, n]);
  return (n - s(t) * e) * e;
}
function rp(a2) {
  return a2.slice(0, -1).map((t, e) => a2[e + 1] - t);
}
function ip(a2, t) {
  if (t > 0) {
    const e = rp(a2);
    return Math.min(...e) >= t;
  }
  return true;
}
function To(a2, t) {
  return (e) => {
    if (a2[0] === a2[1] || t[0] === t[1])
      return t[0];
    const n = (t[1] - t[0]) / (a2[1] - a2[0]);
    return t[0] + n * (e - a2[0]);
  };
}
function up(a2) {
  return (String(a2).split(".")[1] || "").length;
}
function dp(a2, t) {
  const e = 10 ** t;
  return Math.round(a2 * e) / e;
}
var Fs = ["PageUp", "PageDown"];
var Ns = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var Ls = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
};
var [zs, Ks] = te(["SliderVertical", "SliderHorizontal"]);
var Hs = defineComponent({
  __name: "SliderImpl",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  emits: ["slideStart", "slideMove", "slideEnd", "homeKeyDown", "endKeyDown", "stepKeyDown"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = un();
    return (s, r) => (openBlock(), createBlock(unref(O), mergeProps({ "data-slider-impl": "" }, e, {
      onKeydown: r[0] || (r[0] = (i) => {
        i.key === "Home" ? (n("homeKeyDown", i), i.preventDefault()) : i.key === "End" ? (n("endKeyDown", i), i.preventDefault()) : unref(Fs).concat(unref(Ns)).includes(i.key) && (n("stepKeyDown", i), i.preventDefault());
      }),
      onPointerdown: r[1] || (r[1] = (i) => {
        const u = i.target;
        u.setPointerCapture(i.pointerId), i.preventDefault(), unref(l).thumbElements.value.includes(u) ? u.focus() : n("slideStart", i);
      }),
      onPointermove: r[2] || (r[2] = (i) => {
        i.target.hasPointerCapture(i.pointerId) && n("slideMove", i);
      }),
      onPointerup: r[3] || (r[3] = (i) => {
        const u = i.target;
        u.hasPointerCapture(i.pointerId) && (u.releasePointerCapture(i.pointerId), n("slideEnd", i));
      })
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var cp = defineComponent({
  __name: "SliderHorizontal",
  props: {
    dir: {},
    min: {},
    max: {},
    inverted: { type: Boolean }
  },
  emits: ["slideEnd", "slideStart", "slideMove", "homeKeyDown", "endKeyDown", "stepKeyDown"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { max: l, min: s, dir: r, inverted: i } = toRefs(e), { forwardRef: u, currentElement: d } = R2(), c = ref(), f = computed(() => (r == null ? void 0 : r.value) === "ltr" && !i.value || (r == null ? void 0 : r.value) !== "ltr" && i.value);
    function v2(p) {
      const g = c.value || d.value.getBoundingClientRect(), m2 = [0, g.width], _ = f.value ? [s.value, l.value] : [l.value, s.value], C = To(m2, _);
      return c.value = g, C(p - g.left);
    }
    return Ks({
      startEdge: f.value ? "left" : "right",
      endEdge: f.value ? "right" : "left",
      direction: f.value ? 1 : -1,
      size: "width"
    }), (p, g) => (openBlock(), createBlock(Hs, {
      ref: unref(u),
      dir: unref(r),
      "data-orientation": "horizontal",
      style: {
        "--radix-slider-thumb-transform": "translateX(-50%)"
      },
      onSlideStart: g[0] || (g[0] = (m2) => {
        const _ = v2(m2.clientX);
        n("slideStart", _);
      }),
      onSlideMove: g[1] || (g[1] = (m2) => {
        const _ = v2(m2.clientX);
        n("slideMove", _);
      }),
      onSlideEnd: g[2] || (g[2] = () => {
        c.value = void 0, n("slideEnd");
      }),
      onStepKeyDown: g[3] || (g[3] = (m2) => {
        const _ = f.value ? "from-left" : "from-right", C = unref(Ls)[_].includes(m2.key);
        n("stepKeyDown", m2, C ? -1 : 1);
      }),
      onEndKeyDown: g[4] || (g[4] = (m2) => n("endKeyDown", m2)),
      onHomeKeyDown: g[5] || (g[5] = (m2) => n("homeKeyDown", m2))
    }, {
      default: withCtx(() => [
        renderSlot(p.$slots, "default")
      ]),
      _: 3
    }, 8, ["dir"]));
  }
});
var fp = defineComponent({
  __name: "SliderVertical",
  props: {
    min: {},
    max: {},
    inverted: { type: Boolean }
  },
  emits: ["slideEnd", "slideStart", "slideMove", "homeKeyDown", "endKeyDown", "stepKeyDown"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { max: l, min: s, inverted: r } = toRefs(e), { forwardRef: i, currentElement: u } = R2(), d = ref(), c = computed(() => !r.value);
    function f(v2) {
      const p = d.value || u.value.getBoundingClientRect(), g = [0, p.height], m2 = c.value ? [l.value, s.value] : [s.value, l.value], _ = To(g, m2);
      return d.value = p, _(v2 - p.top);
    }
    return Ks({
      startEdge: c.value ? "bottom" : "top",
      endEdge: c.value ? "top" : "bottom",
      size: "height",
      direction: c.value ? 1 : -1
    }), (v2, p) => (openBlock(), createBlock(Hs, {
      ref: unref(i),
      "data-orientation": "vertical",
      style: {
        "--radix-slider-thumb-transform": "translateY(50%)"
      },
      onSlideStart: p[0] || (p[0] = (g) => {
        const m2 = f(g.clientY);
        n("slideStart", m2);
      }),
      onSlideMove: p[1] || (p[1] = (g) => {
        const m2 = f(g.clientY);
        n("slideMove", m2);
      }),
      onSlideEnd: p[2] || (p[2] = () => {
        d.value = void 0, n("slideEnd");
      }),
      onStepKeyDown: p[3] || (p[3] = (g) => {
        const m2 = c.value ? "from-bottom" : "from-top", _ = unref(Ls)[m2].includes(g.key);
        n("stepKeyDown", g, _ ? -1 : 1);
      }),
      onEndKeyDown: p[4] || (p[4] = (g) => n("endKeyDown", g)),
      onHomeKeyDown: p[5] || (p[5] = (g) => n("homeKeyDown", g))
    }, {
      default: withCtx(() => [
        renderSlot(v2.$slots, "default")
      ]),
      _: 3
    }, 512));
  }
});
var pp = ["value", "name", "disabled", "step"];
var [un, vp] = te("SliderRoot");
var og = defineComponent({
  inheritAttrs: false,
  __name: "SliderRoot",
  props: {
    name: {},
    defaultValue: { default: () => [0] },
    modelValue: {},
    disabled: { type: Boolean, default: false },
    orientation: { default: "horizontal" },
    dir: {},
    inverted: { type: Boolean, default: false },
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    minStepsBetweenThumbs: { default: 0 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "valueCommit"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { min: l, max: s, step: r, minStepsBetweenThumbs: i, orientation: u, disabled: d, dir: c } = toRefs(e), f = we(c), { forwardRef: v2, currentElement: p } = R2(), g = at(p);
    Ca();
    const m2 = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: e.modelValue === void 0
    }), _ = ref(0), C = ref(m2.value);
    function $2(I) {
      const M = lp(m2.value, I);
      P2(I, M);
    }
    function h2(I) {
      P2(I, _.value);
    }
    function E() {
      const I = C.value[_.value];
      m2.value[_.value] !== I && n("valueCommit", toRaw(m2.value));
    }
    function P2(I, M, { commit: V2 } = { commit: false }) {
      var Q;
      const A2 = up(r.value), F = dp(Math.round((I - l.value) / r.value) * r.value + l.value, A2), j = Ut(F, l.value, s.value), H2 = np(m2.value, j, M);
      if (ip(H2, i.value * r.value)) {
        _.value = H2.indexOf(j);
        const G2 = String(H2) !== String(m2.value);
        G2 && V2 && n("valueCommit", H2), G2 && ((Q = D.value[_.value]) == null || Q.focus(), m2.value = H2);
      }
    }
    const D = ref([]);
    return vp({
      modelValue: m2,
      valueIndexToChangeRef: _,
      thumbElements: D,
      orientation: u,
      min: l,
      max: s,
      disabled: d
    }), (I, M) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(wa), null, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(unref(u) === "horizontal" ? cp : fp), mergeProps(I.$attrs, {
            ref: unref(v2),
            "as-child": I.asChild,
            as: I.as,
            min: unref(l),
            max: unref(s),
            dir: unref(f),
            inverted: I.inverted,
            "aria-disabled": unref(d),
            "data-disabled": unref(d) ? "" : void 0,
            onPointerdown: M[0] || (M[0] = () => {
              unref(d) || (C.value = unref(m2));
            }),
            onSlideStart: M[1] || (M[1] = (V2) => !unref(d) && $2(V2)),
            onSlideMove: M[2] || (M[2] = (V2) => !unref(d) && h2(V2)),
            onSlideEnd: M[3] || (M[3] = (V2) => !unref(d) && E()),
            onHomeKeyDown: M[4] || (M[4] = (V2) => !unref(d) && P2(unref(l), 0, { commit: true })),
            onEndKeyDown: M[5] || (M[5] = (V2) => !unref(d) && P2(unref(s), unref(m2).length - 1, { commit: true })),
            onStepKeyDown: M[6] || (M[6] = (V2, A2) => {
              if (!unref(d)) {
                const H2 = unref(Fs).includes(V2.key) || V2.shiftKey && unref(Ns).includes(V2.key) ? 10 : 1, Q = _.value, G2 = unref(m2)[Q], J2 = unref(r) * H2 * A2;
                P2(G2 + J2, Q, { commit: true });
              }
            })
          }), {
            default: withCtx(() => [
              renderSlot(I.$slots, "default", { modelValue: unref(m2) })
            ]),
            _: 3
          }, 16, ["as-child", "as", "min", "max", "dir", "inverted", "aria-disabled", "data-disabled"]))
        ]),
        _: 3
      }),
      unref(g) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(m2), (V2, A2) => (openBlock(), createElementBlock("input", {
        key: A2,
        value: V2,
        type: "number",
        style: { display: "none" },
        name: I.name ? I.name + (unref(m2).length > 1 ? "[]" : "") : void 0,
        disabled: unref(d),
        step: unref(r)
      }, null, 8, pp))), 128)) : createCommentVNode("", true)
    ], 64));
  }
});
var mp = defineComponent({
  inheritAttrs: false,
  __name: "SliderThumbImpl",
  props: {
    index: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = un(), n = zs(), { forwardRef: l, currentElement: s } = R2(), r = computed(() => {
      var p, g;
      return (g = (p = e.modelValue) == null ? void 0 : p.value) == null ? void 0 : g[t.index];
    }), i = computed(() => r.value === void 0 ? 0 : Vs(r.value, e.min.value ?? 0, e.max.value ?? 100)), u = computed(() => {
      var p, g;
      return op(t.index, ((g = (p = e.modelValue) == null ? void 0 : p.value) == null ? void 0 : g.length) ?? 0);
    }), d = Ll(s), c = computed(() => d[n.size].value), f = computed(() => c.value ? sp(c.value, i.value, n.direction) : 0), v2 = Ga();
    return onMounted(() => {
      e.thumbElements.value.push(s.value);
    }), onUnmounted(() => {
      const p = e.thumbElements.value.findIndex((g) => g === s.value) ?? -1;
      e.thumbElements.value.splice(p, 1);
    }), (p, g) => (openBlock(), createBlock(unref(Qt), null, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps(p.$attrs, {
          ref: unref(l),
          role: "slider",
          "data-radix-vue-collection-item": "",
          tabindex: unref(e).disabled.value ? void 0 : 0,
          "aria-label": p.$attrs["aria-label"] || u.value,
          "data-disabled": unref(e).disabled.value ? "" : void 0,
          "data-orientation": unref(e).orientation.value,
          "aria-valuenow": r.value,
          "aria-valuemin": unref(e).min.value,
          "aria-valuemax": unref(e).max.value,
          "aria-orientation": unref(e).orientation.value,
          "as-child": p.asChild,
          as: p.as,
          style: {
            transform: "var(--radix-slider-thumb-transform)",
            position: "absolute",
            [unref(n).startEdge]: `calc(${i.value}% + ${f.value}px)`,
            /**
             * There will be no value on initial render while we work out the index so we hide thumbs
             * without a value, otherwise SSR will render them in the wrong position before they
             * snap into the correct position during hydration which would be visually jarring for
             * slower connections.
             */
            display: !unref(v2) && r.value === void 0 ? "none" : void 0
          },
          onFocus: g[0] || (g[0] = () => {
            unref(e).valueIndexToChangeRef.value = p.index;
          })
        }), {
          default: withCtx(() => [
            renderSlot(p.$slots, "default")
          ]),
          _: 3
        }, 16, ["tabindex", "aria-label", "data-disabled", "data-orientation", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-orientation", "as-child", "as", "style"])
      ]),
      _: 3
    }));
  }
});
var lg = defineComponent({
  __name: "SliderThumb",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { getItems: e } = ea(), { forwardRef: n, currentElement: l } = R2(), s = computed(() => l.value ? e().findIndex((r) => r.ref === l.value) : -1);
    return (r, i) => (openBlock(), createBlock(mp, mergeProps({ ref: unref(n) }, t, { index: s.value }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["index"]));
  }
});
var sg = defineComponent({
  __name: "SliderTrack",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = un();
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), {
      "as-child": e.asChild,
      as: e.as,
      "data-disabled": unref(t).disabled.value ? "" : void 0,
      "data-orientation": unref(t).orientation.value
    }, {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "data-disabled", "data-orientation"]));
  }
});
var rg = defineComponent({
  __name: "SliderRange",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = un(), e = zs();
    R2();
    const n = computed(() => {
      var r, i;
      return (i = (r = t.modelValue) == null ? void 0 : r.value) == null ? void 0 : i.map(
        (u) => Vs(u, t.min.value, t.max.value)
      );
    }), l = computed(() => t.modelValue.value.length > 1 ? Math.min(...n.value) : 0), s = computed(() => 100 - Math.max(...n.value));
    return (r, i) => (openBlock(), createBlock(unref(O), {
      "data-disabled": unref(t).disabled.value ? "" : void 0,
      "data-orientation": unref(t).orientation.value,
      "as-child": r.asChild,
      as: r.as,
      style: normalizeStyle({
        [unref(e).startEdge]: `${l.value}%`,
        [unref(e).endEdge]: `${s.value}%`
      })
    }, {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-disabled", "data-orientation", "as-child", "as", "style"]));
  }
});
var kn = null;
var $t = null;
function hp(a2, t) {
  if (t) {
    const e = (t & Xs) !== 0, n = (t & Zs) !== 0, l = (t & Js) !== 0, s = (t & Qs) !== 0;
    if (e)
      return l ? "se-resize" : s ? "ne-resize" : "e-resize";
    if (n)
      return l ? "sw-resize" : s ? "nw-resize" : "w-resize";
    if (l)
      return "s-resize";
    if (s)
      return "n-resize";
  }
  switch (a2) {
    case "horizontal":
      return "ew-resize";
    case "intersection":
      return "move";
    case "vertical":
      return "ns-resize";
  }
}
function Ws() {
  $t !== null && (document.head.removeChild($t), kn = null, $t = null);
}
function Pn(a2, t) {
  const e = hp(a2, t);
  kn !== e && (kn = e, $t === null && ($t = document.createElement("style"), document.head.appendChild($t)), $t.innerHTML = `*{cursor: ${e}!important;}`);
}
function yp({
  defaultSize: a2,
  dragState: t,
  layout: e,
  panelData: n,
  panelIndex: l,
  precision: s = 3
}) {
  const r = e[l];
  let i;
  return r == null ? i = a2 !== void 0 ? a2.toPrecision(s) : "1" : n.length === 1 ? i = "1" : i = r.toPrecision(s), {
    flexBasis: 0,
    flexGrow: i,
    flexShrink: 1,
    // Without this, Panel sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a panel during resize
    // This avoid edge cases like nested iframes
    pointerEvents: t !== null ? "none" : void 0
  };
}
function js(a2) {
  return a2.type === "keydown";
}
function Us(a2) {
  return a2.type.startsWith("mouse");
}
function Gs(a2) {
  return a2.type.startsWith("touch");
}
function dn(a2) {
  if (Us(a2))
    return {
      x: a2.clientX,
      y: a2.clientY
    };
  if (Gs(a2)) {
    const t = a2.touches[0];
    if (t && t.clientX && t.clientY)
      return {
        x: t.clientX,
        y: t.clientY
      };
  }
  return {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY
  };
}
function qs(a2, t) {
  const e = a2 === "horizontal", { x: n, y: l } = dn(t);
  return e ? n : l;
}
function gp(a2, t, e) {
  return a2.x < t.x + t.width && a2.x + a2.width > t.x && a2.y < t.y + t.height && a2.y + a2.height > t.y;
}
function pe(a2, t = "Assertion failed!") {
  if (!a2)
    throw console.error(t), new Error(t);
}
function bp(a2, t) {
  if (a2 === t)
    throw new Error("Cannot compare node with itself");
  const e = {
    a: ll(a2),
    b: ll(t)
  };
  let n;
  for (; e.a.at(-1) === e.b.at(-1); )
    a2 = e.a.pop(), t = e.b.pop(), n = a2;
  pe(n);
  const l = {
    a: ol(nl(e.a)),
    b: ol(nl(e.b))
  };
  if (l.a === l.b) {
    const s = n.childNodes, r = {
      a: e.a.at(-1),
      b: e.b.at(-1)
    };
    let i = s.length;
    for (; i--; ) {
      const u = s[i];
      if (u === r.a)
        return 1;
      if (u === r.b)
        return -1;
    }
  }
  return Math.sign(l.a - l.b);
}
var Cp = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function wp(a2) {
  const t = getComputedStyle(Ys(a2)).display;
  return t === "flex" || t === "inline-flex";
}
function _p(a2) {
  const t = getComputedStyle(a2);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || wp(a2)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Cp.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function nl(a2) {
  let t = a2.length;
  for (; t--; ) {
    const e = a2[t];
    if (pe(e), _p(e))
      return e;
  }
  return null;
}
function ol(a2) {
  return a2 && Number(getComputedStyle(a2).zIndex) || 0;
}
function ll(a2) {
  const t = [];
  for (; a2; )
    t.push(a2), a2 = Ys(a2);
  return t;
}
function Ys(a2) {
  var t;
  return a2.parentNode instanceof DocumentFragment && ((t = a2.parentNode) == null ? void 0 : t.host) || a2.parentNode;
}
var Xs = 1;
var Zs = 2;
var Js = 4;
var Qs = 8;
function xp() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
var Sp = xp() === "coarse";
var yt = [];
var cn = false;
var vt = /* @__PURE__ */ new Map();
var fn = /* @__PURE__ */ new Map();
var fa = /* @__PURE__ */ new Set();
function Ep(a2, t, e, n, l) {
  const { ownerDocument: s } = t, r = {
    direction: e,
    element: t,
    hitAreaMargins: n,
    setResizeHandlerState: l
  }, i = vt.get(s) ?? 0;
  return vt.set(s, i + 1), fa.add(r), Ha(), function() {
    fn.delete(a2), fa.delete(r);
    const d = vt.get(s) ?? 1;
    vt.set(s, d - 1), Ha(), Ws(), d === 1 && vt.delete(s);
  };
}
function Aa(a2) {
  const { target: t } = a2, { x: e, y: n } = dn(a2);
  cn = true, Ro({ target: t, x: e, y: n }), Ha(), yt.length > 0 && (Ao("down", a2), a2.preventDefault());
}
function ct(a2) {
  const { x: t, y: e } = dn(a2);
  if (!cn) {
    const { target: n } = a2;
    Ro({ target: n, x: t, y: e });
  }
  Ao("move", a2), er(), yt.length > 0 && a2.preventDefault();
}
function ft(a2) {
  const { target: t } = a2, { x: e, y: n } = dn(a2);
  fn.clear(), cn = false, yt.length > 0 && a2.preventDefault(), Ao("up", a2), Ro({ target: t, x: e, y: n }), er(), Ha();
}
function Ro({
  target: a2,
  x: t,
  y: e
}) {
  yt.splice(0);
  let n = null;
  a2 instanceof HTMLElement && (n = a2), fa.forEach((l) => {
    const { element: s, hitAreaMargins: r } = l, i = s.getBoundingClientRect(), { bottom: u, left: d, right: c, top: f } = i, v2 = Sp ? r.coarse : r.fine;
    if (t >= d - v2 && t <= c + v2 && e >= f - v2 && e <= u + v2) {
      if (n !== null && s !== n && !s.contains(n) && !n.contains(s) && bp(n, s) > 0) {
        let g = n, m2 = false;
        for (; g && !g.contains(s); ) {
          if (gp(
            g.getBoundingClientRect(),
            i
          )) {
            m2 = true;
            break;
          }
          g = g.parentElement;
        }
        if (m2)
          return;
      }
      yt.push(l);
    }
  });
}
function Dn(a2, t) {
  fn.set(a2, t);
}
function er() {
  let a2 = false, t = false;
  yt.forEach((n) => {
    const { direction: l } = n;
    l.value === "horizontal" ? a2 = true : t = true;
  });
  let e = 0;
  fn.forEach((n) => {
    e |= n;
  }), a2 && t ? Pn("intersection", e) : a2 ? Pn("horizontal", e) : t ? Pn("vertical", e) : Ws();
}
function Ha() {
  vt.forEach((a2, t) => {
    const { body: e } = t;
    e.removeEventListener("contextmenu", ft), e.removeEventListener("mousedown", Aa), e.removeEventListener("mouseleave", ct), e.removeEventListener("mousemove", ct), e.removeEventListener("touchmove", ct), e.removeEventListener("touchstart", Aa);
  }), window.removeEventListener("mouseup", ft), window.removeEventListener("touchcancel", ft), window.removeEventListener("touchend", ft), fa.size > 0 && (cn ? (yt.length > 0 && vt.forEach((a2, t) => {
    const { body: e } = t;
    a2 > 0 && (e.addEventListener("contextmenu", ft), e.addEventListener("mouseleave", ct), e.addEventListener("mousemove", ct), e.addEventListener("touchmove", ct, {
      passive: false
    }));
  }), window.addEventListener("mouseup", ft), window.addEventListener("touchcancel", ft), window.addEventListener("touchend", ft)) : vt.forEach((a2, t) => {
    const { body: e } = t;
    a2 > 0 && (e.addEventListener("mousedown", Aa), e.addEventListener("mousemove", ct), e.addEventListener("touchmove", ct, {
      passive: false
    }), e.addEventListener("touchstart", Aa));
  }));
}
function Ao(a2, t) {
  fa.forEach((e) => {
    const { setResizeHandlerState: n } = e, l = yt.includes(e);
    n(a2, l, t);
  });
}
var Oo = 10;
function pa(a2, t, e = Oo) {
  a2 = Number.parseFloat(a2.toFixed(e)), t = Number.parseFloat(t.toFixed(e));
  const n = a2 - t;
  return n === 0 ? 0 : n > 0 ? 1 : -1;
}
function Le(a2, t, e) {
  return pa(a2, t, e) === 0;
}
function Wt({
  panelConstraints: a2,
  panelIndex: t,
  size: e
}) {
  const n = a2[t];
  pe(n != null);
  const { collapsedSize: l = 0, collapsible: s, maxSize: r = 100, minSize: i = 0 } = n;
  if (pa(e, i) < 0)
    if (s) {
      const u = (l + i) / 2;
      pa(e, u) < 0 ? e = l : e = i;
    } else
      e = i;
  return e = Math.min(r, e), e = Number.parseFloat(e.toFixed(Oo)), e;
}
function Oa(a2, t) {
  if (a2.length !== t.length)
    return false;
  for (let e = 0; e < a2.length; e++)
    if (a2[e] !== t[e])
      return false;
  return true;
}
function sa({
  delta: a2,
  layout: t,
  panelConstraints: e,
  pivotIndices: n,
  trigger: l
}) {
  if (Le(a2, 0))
    return t;
  const s = [...t], [r, i] = n;
  pe(r != null), pe(i != null);
  let u = 0;
  if (l === "keyboard") {
    {
      const c = a2 < 0 ? i : r, f = e[c];
      if (pe(f), f.collapsible) {
        const v2 = t[c];
        pe(v2 != null);
        const p = e[c];
        pe(p);
        const { collapsedSize: g = 0, minSize: m2 = 0 } = p;
        if (Le(v2, g)) {
          const _ = m2 - v2;
          pa(_, Math.abs(a2)) > 0 && (a2 = a2 < 0 ? 0 - _ : _);
        }
      }
    }
    {
      const c = a2 < 0 ? r : i, f = e[c];
      pe(f);
      const { collapsible: v2 } = f;
      if (v2) {
        const p = t[c];
        pe(p != null);
        const g = e[c];
        pe(g);
        const { collapsedSize: m2 = 0, minSize: _ = 0 } = g;
        if (Le(p, _)) {
          const C = p - m2;
          pa(C, Math.abs(a2)) > 0 && (a2 = a2 < 0 ? 0 - C : C);
        }
      }
    }
  }
  {
    const c = a2 < 0 ? 1 : -1;
    let f = a2 < 0 ? i : r, v2 = 0;
    for (; ; ) {
      const g = t[f];
      pe(g != null);
      const _ = Wt({
        panelConstraints: e,
        panelIndex: f,
        size: 100
      }) - g;
      if (v2 += _, f += c, f < 0 || f >= e.length)
        break;
    }
    const p = Math.min(Math.abs(a2), Math.abs(v2));
    a2 = a2 < 0 ? 0 - p : p;
  }
  {
    let f = a2 < 0 ? r : i;
    for (; f >= 0 && f < e.length; ) {
      const v2 = Math.abs(a2) - Math.abs(u), p = t[f];
      pe(p != null);
      const g = p - v2, m2 = Wt({
        panelConstraints: e,
        panelIndex: f,
        size: g
      });
      if (!Le(p, m2) && (u += p - m2, s[f] = m2, u.toPrecision(3).localeCompare(Math.abs(a2).toPrecision(3), void 0, {
        numeric: true
      }) >= 0))
        break;
      a2 < 0 ? f-- : f++;
    }
  }
  if (Le(u, 0))
    return t;
  {
    const c = a2 < 0 ? i : r, f = t[c];
    pe(f != null);
    const v2 = f + u, p = Wt({
      panelConstraints: e,
      panelIndex: c,
      size: v2
    });
    if (s[c] = p, !Le(p, v2)) {
      let g = v2 - p, _ = a2 < 0 ? i : r;
      for (; _ >= 0 && _ < e.length; ) {
        const C = s[_];
        pe(C != null);
        const $2 = C + g, h2 = Wt({
          panelConstraints: e,
          panelIndex: _,
          size: $2
        });
        if (Le(C, h2) || (g -= h2 - C, s[_] = h2), Le(g, 0))
          break;
        a2 > 0 ? _-- : _++;
      }
    }
  }
  const d = s.reduce((c, f) => f + c, 0);
  return Le(d, 100) ? s : t;
}
function tr(a2, t = document) {
  var n;
  if (!ha)
    return null;
  if (t instanceof HTMLElement && ((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.panelGroupId) === a2)
    return t;
  const e = t.querySelector(
    `[data-panel-group][data-panel-group-id="${a2}"]`
  );
  return e || null;
}
function pn(a2, t = document) {
  if (!ha)
    return null;
  const e = t.querySelector(`[data-panel-resize-handle-id="${a2}"]`);
  return e || null;
}
function ar(a2, t, e = document) {
  return ha ? va(a2, e).findIndex(
    (s) => s.getAttribute("data-panel-resize-handle-id") === t
  ) ?? null : null;
}
function va(a2, t = document) {
  return ha ? Array.from(
    t.querySelectorAll(
      `[data-panel-resize-handle-id][data-panel-group-id="${a2}"]`
    )
  ) : [];
}
function Pp(a2, t, e, n = document) {
  var d, c;
  const l = pn(t, n), s = va(a2, n), r = l ? s.indexOf(l) : -1, i = ((d = e[r]) == null ? void 0 : d.id) ?? null, u = ((c = e[r + 1]) == null ? void 0 : c.id) ?? null;
  return [i, u];
}
function Dp(a2, t, e, n, l) {
  const s = e === "horizontal", r = pn(t, l);
  pe(r);
  const i = r.getAttribute("data-panel-group-id");
  pe(i);
  const { initialCursorPosition: u } = n, d = qs(e, a2), c = tr(i, l);
  pe(c);
  const f = c.getBoundingClientRect(), v2 = s ? f.width : f.height;
  return (d - u) / v2 * 100;
}
function $p(a2, t, e, n, l, s) {
  if (js(a2)) {
    const r = e === "horizontal";
    let i = 0;
    a2.shiftKey ? i = 100 : i = l ?? 10;
    let u = 0;
    switch (a2.key) {
      case "ArrowDown":
        u = r ? 0 : i;
        break;
      case "ArrowLeft":
        u = r ? -i : 0;
        break;
      case "ArrowRight":
        u = r ? i : 0;
        break;
      case "ArrowUp":
        u = r ? 0 : -i;
        break;
      case "End":
        u = 100;
        break;
      case "Home":
        u = -100;
        break;
    }
    return u;
  } else
    return n == null ? 0 : Dp(
      a2,
      t,
      e,
      n,
      s
    );
}
function Bp({
  layout: a2,
  panelsArray: t,
  pivotIndices: e
}) {
  let n = 0, l = 100, s = 0, r = 0;
  const i = e[0];
  pe(i != null), t.forEach((f, v2) => {
    const { constraints: p } = f, { maxSize: g = 100, minSize: m2 = 0 } = p;
    v2 === i ? (n = m2, l = g) : (s += m2, r += g);
  });
  const u = Math.min(l, 100 - s), d = Math.max(n, 100 - r), c = a2[i];
  return {
    valueMax: u,
    valueMin: d,
    valueNow: c
  };
}
function Ip({
  panelDataArray: a2
}) {
  const t = Array(a2.length), e = a2.map(
    (s) => s.constraints
  );
  let n = 0, l = 100;
  for (let s = 0; s < a2.length; s++) {
    const r = e[s];
    pe(r);
    const { defaultSize: i } = r;
    i != null && (n++, t[s] = i, l -= i);
  }
  for (let s = 0; s < a2.length; s++) {
    const r = e[s];
    pe(r);
    const { defaultSize: i } = r;
    if (i != null)
      continue;
    const u = a2.length - n, d = l / u;
    n++, t[s] = d, l -= d;
  }
  return t;
}
function la(a2, t, e) {
  t.forEach((n, l) => {
    const s = a2[l];
    pe(s);
    const { callbacks: r, constraints: i, id: u } = s, { collapsedSize: d = 0, collapsible: c } = i, f = e[u];
    if (f == null || n !== f) {
      e[u] = n;
      const { onCollapse: v2, onExpand: p, onResize: g } = r;
      g && g(n, f), c && (v2 || p) && (p && (f == null || f === d) && n !== d && p(), v2 && (f == null || f !== d) && n === d && v2());
    }
  });
}
function Tp(a2, t = 10) {
  let e = null;
  return (...l) => {
    e !== null && clearTimeout(e), e = setTimeout(() => {
      a2(...l);
    }, t);
  };
}
function nr(a2, t, e) {
  const n = ar(
    a2,
    t,
    e
  );
  return n != null ? [n, n + 1] : [-1, -1];
}
function Rp({
  layout: a2,
  panelConstraints: t
}) {
  const e = [...a2], n = e.reduce(
    (s, r) => s + r,
    0
  );
  if (e.length !== t.length)
    throw new Error(
      `Invalid ${t.length} panel layout: ${e.map((s) => `${s}%`).join(", ")}`
    );
  if (!Le(n, 100)) {
    console.warn(
      `WARNING: Invalid layout total size: ${e.map((s) => `${s}%`).join(", ")}. Layout normalization will be applied.`
    );
    for (let s = 0; s < t.length; s++) {
      const r = e[s];
      pe(r != null);
      const i = 100 / n * r;
      e[s] = i;
    }
  }
  let l = 0;
  for (let s = 0; s < t.length; s++) {
    const r = e[s];
    pe(r != null);
    const i = Wt({
      panelConstraints: t,
      panelIndex: s,
      size: r
    });
    r !== i && (l += r - i, e[s] = i);
  }
  if (!Le(l, 0))
    for (let s = 0; s < t.length; s++) {
      const r = e[s];
      pe(r != null);
      const i = r + l, u = Wt({
        panelConstraints: t,
        panelIndex: s,
        size: i
      });
      if (r !== u && (l -= u - r, e[s] = u, Le(l, 0)))
        break;
    }
  return e;
}
function sl(a2) {
  try {
    if (typeof localStorage < "u")
      a2.getItem = (t) => localStorage.getItem(t), a2.setItem = (t, e) => {
        localStorage.setItem(t, e);
      };
    else
      throw new TypeError("localStorage not supported in this environment");
  } catch (t) {
    console.error(t), a2.getItem = () => null, a2.setItem = () => {
    };
  }
}
function or(a2) {
  return `radix-vue:${a2}`;
}
function lr(a2) {
  return a2.map((t) => {
    const { constraints: e, id: n, idIsFromProps: l, order: s } = t;
    return l ? n : s ? `${s}:${JSON.stringify(e)}` : JSON.stringify(e);
  }).sort((t, e) => t.localeCompare(e)).join(",");
}
function sr(a2, t) {
  try {
    const e = or(a2), n = t.getItem(e);
    if (n) {
      const l = JSON.parse(n);
      if (typeof l == "object" && l != null)
        return l;
    }
  } catch {
  }
  return null;
}
function Ap(a2, t, e) {
  const n = sr(a2, e) ?? {}, l = lr(t);
  return n[l] ?? null;
}
function Op(a2, t, e, n, l) {
  const s = or(a2), r = lr(t), i = sr(a2, l) ?? {};
  i[r] = {
    expandToSizes: Object.fromEntries(e.entries()),
    layout: n
  };
  try {
    l.setItem(s, JSON.stringify(i));
  } catch (u) {
    console.error(u);
  }
}
function kp({
  eagerValuesRef: a2,
  groupId: t,
  layout: e,
  panelDataArray: n,
  panelGroupElement: l,
  setLayout: s
}) {
  watchEffect((r) => {
    const i = l.value;
    if (!i)
      return;
    const u = va(
      t,
      i
    );
    for (let d = 0; d < n.length - 1; d++) {
      const { valueMax: c, valueMin: f, valueNow: v2 } = Bp({
        layout: e.value,
        panelsArray: n,
        pivotIndices: [d, d + 1]
      }), p = u[d];
      if (p != null) {
        const g = n[d];
        pe(g), p.setAttribute("aria-controls", g.id), p.setAttribute(
          "aria-valuemax",
          `${Math.round(c)}`
        ), p.setAttribute(
          "aria-valuemin",
          `${Math.round(f)}`
        ), p.setAttribute(
          "aria-valuenow",
          v2 != null ? `${Math.round(v2)}` : ""
        );
      }
    }
    r(() => {
      u.forEach((d) => {
        d.removeAttribute("aria-controls"), d.removeAttribute("aria-valuemax"), d.removeAttribute("aria-valuemin"), d.removeAttribute("aria-valuenow");
      });
    });
  }), watchEffect((r) => {
    const i = l.value;
    if (!i)
      return;
    const u = a2.value;
    pe(u);
    const { panelDataArray: d } = u, c = tr(t, i);
    pe(c != null, `No group found for id "${t}"`);
    const f = va(t, i);
    pe(f);
    const v2 = f.map((p) => {
      const g = p.getAttribute("data-panel-resize-handle-id");
      pe(g);
      const [m2, _] = Pp(
        t,
        g,
        d,
        i
      );
      if (m2 == null || _ == null)
        return () => {
        };
      const C = ($2) => {
        if (!$2.defaultPrevented)
          switch ($2.key) {
            case "Enter": {
              $2.preventDefault();
              const h2 = d.findIndex(
                (E) => E.id === m2
              );
              if (h2 >= 0) {
                const E = d[h2];
                pe(E);
                const P2 = e.value[h2], {
                  collapsedSize: D = 0,
                  collapsible: I,
                  minSize: M = 0
                } = E.constraints;
                if (P2 != null && I) {
                  const V2 = sa({
                    delta: Le(P2, D) ? M - D : D - P2,
                    layout: e.value,
                    panelConstraints: d.map(
                      (A2) => A2.constraints
                    ),
                    pivotIndices: nr(
                      t,
                      g,
                      i
                    ),
                    trigger: "keyboard"
                  });
                  e.value !== V2 && s(V2);
                }
              }
              break;
            }
          }
      };
      return p.addEventListener("keydown", C), () => {
        p.removeEventListener("keydown", C);
      };
    });
    r(() => {
      v2.forEach((p) => p());
    });
  });
}
var Mp = 100;
var ra = {
  getItem: (a2) => (sl(ra), ra.getItem(a2)),
  setItem: (a2, t) => {
    sl(ra), ra.setItem(a2, t);
  }
};
var [rr, Vp] = te("PanelGroup");
var ig = defineComponent({
  __name: "SplitterGroup",
  props: {
    id: {},
    autoSaveId: { default: null },
    direction: {},
    keyboardResizeBy: { default: 10 },
    storage: { default: () => ra },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["layout"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = {}, { direction: s } = toRefs(e), r = ge(e.id, "radix-vue-splitter-group"), i = we(), { forwardRef: u, currentElement: d } = R2(), c = ref(null), f = ref([]), v2 = ref({}), p = ref(/* @__PURE__ */ new Map()), g = ref(0), m2 = computed(() => ({
      autoSaveId: e.autoSaveId,
      direction: e.direction,
      dragState: c.value,
      id: r,
      keyboardResizeBy: e.keyboardResizeBy,
      storage: e.storage
    })), _ = ref({
      layout: f.value,
      panelDataArray: [],
      panelDataArrayChanged: false
    }), C = (z2) => f.value = z2;
    kp({
      eagerValuesRef: _,
      groupId: r,
      layout: f,
      panelDataArray: _.value.panelDataArray,
      setLayout: C,
      panelGroupElement: d
    }), watchEffect(() => {
      const { panelDataArray: z2 } = _.value, { autoSaveId: K } = e;
      if (K) {
        if (f.value.length === 0 || f.value.length !== z2.length)
          return;
        let L = l[K];
        L || (L = Tp(
          Op,
          Mp
        ), l[K] = L);
        const N2 = [...z2], Z = new Map(
          p.value
        );
        L(
          K,
          N2,
          Z,
          f.value,
          e.storage
        );
      }
    });
    function $2(z2, K) {
      const { panelDataArray: L } = _.value, N2 = G2(L, z2);
      return yp({
        defaultSize: K,
        dragState: c.value,
        layout: f.value,
        panelData: L,
        panelIndex: N2
      });
    }
    function h2(z2) {
      const { panelDataArray: K } = _.value;
      K.push(z2), K.sort((L, N2) => {
        const Z = L.order, Y = N2.order;
        return Z == null && Y == null ? 0 : Z == null ? -1 : Y == null ? 1 : Z - Y;
      }), _.value.panelDataArrayChanged = true;
    }
    watch(() => _.value.panelDataArrayChanged, () => {
      if (_.value.panelDataArrayChanged) {
        _.value.panelDataArrayChanged = false;
        const { autoSaveId: z2, storage: K } = m2.value, { layout: L, panelDataArray: N2 } = _.value;
        let Z = null;
        if (z2) {
          const re = Ap(z2, N2, K);
          re && (p.value = new Map(
            Object.entries(re.expandToSizes)
          ), Z = re.layout);
        }
        Z === null && (Z = Ip({
          panelDataArray: N2
        }));
        const Y = Rp({
          layout: Z,
          panelConstraints: N2.map(
            (re) => re.constraints
          )
        });
        Gr(L, Y) || (C(Y), _.value.layout = Y, n("layout", Y), la(
          N2,
          Y,
          v2.value
        ));
      }
    });
    function E(z2) {
      return function(L) {
        L.preventDefault();
        const N2 = d.value;
        if (!N2)
          return () => null;
        const { direction: Z, dragState: Y, id: re, keyboardResizeBy: X } = m2.value, { layout: se, panelDataArray: fe } = _.value, { initialLayout: xe } = Y ?? {}, Ee = nr(
          re,
          z2,
          N2
        );
        let be = $p(
          L,
          z2,
          Z,
          Y,
          X,
          N2
        );
        if (be === 0)
          return;
        const de = Z === "horizontal";
        i.value === "rtl" && de && (be = -be);
        const Ie = fe.map((Et) => Et.constraints), Ae = sa({
          delta: be,
          layout: xe ?? se,
          panelConstraints: Ie,
          pivotIndices: Ee,
          trigger: js(L) ? "keyboard" : "mouse-or-touch"
        }), We = !Oa(se, Ae);
        (Us(L) || Gs(L)) && g.value !== be && (g.value = be, We ? Dn(z2, 0) : de ? Dn(
          z2,
          be < 0 ? Xs : Zs
        ) : Dn(
          z2,
          be < 0 ? Js : Qs
        )), We && (C(Ae), _.value.layout = Ae, n("layout", Ae), la(
          fe,
          Ae,
          v2.value
        ));
      };
    }
    function P2(z2, K) {
      const { layout: L, panelDataArray: N2 } = _.value, Z = N2.map((xe) => xe.constraints), { panelSize: Y, pivotIndices: re } = J2(
        N2,
        z2,
        L
      );
      pe(Y != null);
      const se = G2(N2, z2) === N2.length - 1 ? Y - K : K - Y, fe = sa({
        delta: se,
        layout: L,
        panelConstraints: Z,
        pivotIndices: re,
        trigger: "imperative-api"
      });
      Oa(L, fe) || (C(fe), _.value.layout = fe, n("layout", fe), la(
        N2,
        fe,
        v2.value
      ));
    }
    function D(z2, K) {
      const { layout: L, panelDataArray: N2 } = _.value, Z = G2(N2, z2);
      N2[Z] = z2, _.value.panelDataArrayChanged = true;
      const {
        collapsedSize: Y = 0,
        collapsible: re
      } = K, {
        collapsedSize: X = 0,
        collapsible: se,
        maxSize: fe = 100,
        minSize: xe = 0
      } = z2.constraints, { panelSize: Ee } = J2(
        N2,
        z2,
        L
      );
      Ee !== null && (re && se && Ee === Y ? Y !== X && P2(z2, X) : Ee < xe ? P2(z2, xe) : Ee > fe && P2(z2, fe));
    }
    function I(z2, K) {
      const { direction: L } = m2.value, { layout: N2 } = _.value;
      if (!d.value)
        return;
      const Z = pn(
        z2,
        d.value
      );
      pe(Z);
      const Y = qs(
        L,
        K
      );
      c.value = {
        dragHandleId: z2,
        dragHandleRect: Z.getBoundingClientRect(),
        initialCursorPosition: Y,
        initialLayout: N2
      };
    }
    function M() {
      c.value = null;
    }
    function V2(z2) {
      const { panelDataArray: K } = _.value, L = G2(K, z2);
      L >= 0 && (K.splice(L, 1), delete v2.value[z2.id], _.value.panelDataArrayChanged = true);
    }
    function A2(z2) {
      const { layout: K, panelDataArray: L } = _.value;
      if (z2.constraints.collapsible) {
        const N2 = L.map(
          (X) => X.constraints
        ), {
          collapsedSize: Z = 0,
          panelSize: Y,
          pivotIndices: re
        } = J2(L, z2, K);
        if (pe(
          Y != null,
          `Panel size not found for panel "${z2.id}"`
        ), Y !== Z) {
          p.value.set(z2.id, Y);
          const se = G2(L, z2) === L.length - 1 ? Y - Z : Z - Y, fe = sa({
            delta: se,
            layout: K,
            panelConstraints: N2,
            pivotIndices: re,
            trigger: "imperative-api"
          });
          Oa(K, fe) || (C(fe), _.value.layout = fe, n("layout", fe), la(
            L,
            fe,
            v2.value
          ));
        }
      }
    }
    function F(z2) {
      const { layout: K, panelDataArray: L } = _.value;
      if (z2.constraints.collapsible) {
        const N2 = L.map(
          (se) => se.constraints
        ), {
          collapsedSize: Z = 0,
          panelSize: Y,
          minSize: re = 0,
          pivotIndices: X
        } = J2(L, z2, K);
        if (Y === Z) {
          const se = p.value.get(
            z2.id
          ), fe = se != null && se >= re ? se : re, Ee = G2(L, z2) === L.length - 1 ? Y - fe : fe - Y, be = sa({
            delta: Ee,
            layout: K,
            panelConstraints: N2,
            pivotIndices: X,
            trigger: "imperative-api"
          });
          Oa(K, be) || (C(be), _.value.layout = be, n("layout", be), la(
            L,
            be,
            v2.value
          ));
        }
      }
    }
    function j(z2) {
      const { layout: K, panelDataArray: L } = _.value, { panelSize: N2 } = J2(L, z2, K);
      return pe(
        N2 != null,
        `Panel size not found for panel "${z2.id}"`
      ), N2;
    }
    function H2(z2) {
      const { layout: K, panelDataArray: L } = _.value, {
        collapsedSize: N2 = 0,
        collapsible: Z,
        panelSize: Y
      } = J2(L, z2, K);
      return Z ? Y === void 0 ? z2.constraints.defaultSize === z2.constraints.collapsedSize : Y === N2 : false;
    }
    function Q(z2) {
      const { layout: K, panelDataArray: L } = _.value, {
        collapsedSize: N2 = 0,
        collapsible: Z,
        panelSize: Y
      } = J2(L, z2, K);
      return pe(
        Y != null,
        `Panel size not found for panel "${z2.id}"`
      ), !Z || Y > N2;
    }
    Vp({
      direction: s,
      dragState: c.value,
      groupId: r,
      reevaluatePanelConstraints: D,
      registerPanel: h2,
      registerResizeHandle: E,
      resizePanel: P2,
      startDragging: I,
      stopDragging: M,
      unregisterPanel: V2,
      panelGroupElement: d,
      collapsePanel: A2,
      expandPanel: F,
      isPanelCollapsed: H2,
      isPanelExpanded: Q,
      getPanelSize: j,
      getPanelStyle: $2
    });
    function G2(z2, K) {
      return z2.findIndex(
        (L) => L === K || L.id === K.id
      );
    }
    function J2(z2, K, L) {
      const N2 = G2(z2, K), Y = N2 === z2.length - 1 ? [N2 - 1, N2] : [N2, N2 + 1], re = L[N2];
      return {
        ...K.constraints,
        panelSize: re,
        pivotIndices: Y
      };
    }
    return (z2, K) => (openBlock(), createBlock(unref(O), {
      ref: unref(u),
      as: z2.as,
      "as-child": z2.asChild,
      style: normalizeStyle({
        display: "flex",
        flexDirection: unref(s) === "horizontal" ? "row" : "column",
        height: "100%",
        overflow: "hidden",
        width: "100%"
      }),
      "data-panel-group": "",
      "data-orientation": unref(s),
      "data-panel-group-id": unref(r)
    }, {
      default: withCtx(() => [
        renderSlot(z2.$slots, "default", { layout: f.value })
      ]),
      _: 3
    }, 8, ["as", "as-child", "style", "data-orientation", "data-panel-group-id"]));
  }
});
var ug = defineComponent({
  __name: "SplitterPanel",
  props: {
    collapsedSize: {},
    collapsible: { type: Boolean },
    defaultSize: {},
    id: {},
    maxSize: {},
    minSize: {},
    order: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["collapse", "expand", "resize"],
  setup(a2, { expose: t, emit: e }) {
    const n = a2, l = e, s = rr();
    if (s === null)
      throw new Error(
        "SplitterPanel components must be rendered within a SplitterGroup container"
      );
    const { collapsePanel: r, expandPanel: i, getPanelSize: u, getPanelStyle: d, isPanelCollapsed: c, resizePanel: f, groupId: v2, reevaluatePanelConstraints: p, registerPanel: g, unregisterPanel: m2 } = s, _ = ge(n.id, "radix-vue-splitter-panel"), C = computed(() => ({
      callbacks: {
        onCollapse: () => l("collapse"),
        onExpand: () => l("expand"),
        onResize: (...P2) => l("resize", ...P2)
      },
      constraints: {
        collapsedSize: n.collapsedSize && Number.parseFloat(n.collapsedSize.toFixed(Oo)),
        collapsible: n.collapsible,
        defaultSize: n.defaultSize,
        /** Panel id (unique within group); falls back to useId when not provided */
        /** Panel id (unique within group); falls back to useId when not provided */
        maxSize: n.maxSize,
        minSize: n.minSize
      },
      id: _,
      idIsFromProps: n.id !== void 0,
      order: n.order
    }));
    watch(() => C.value.constraints, (P2, D) => {
      (D.collapsedSize !== P2.collapsedSize || D.collapsible !== P2.collapsible || D.maxSize !== P2.maxSize || D.minSize !== P2.minSize) && p(C.value, D);
    }, { deep: true }), onMounted(() => {
      const P2 = C.value;
      g(P2), onUnmounted(() => {
        m2(P2);
      });
    });
    const $2 = computed(() => d(C.value, n.defaultSize)), h2 = computed(() => c(C.value)), E = computed(() => !h2.value);
    return t({
      /** If panel is `collapsible`, collapse it fully. */
      collapse: () => {
        r(C.value);
      },
      /** If panel is currently collapsed, expand it to its most recent size. */
      expand: () => {
        i(C.value);
      },
      /** Gets the current size of the panel as a percentage (1 - 100). */
      getSize() {
        return u(C.value);
      },
      /** Resize panel to the specified percentage (1 - 100). */
      resize: (P2) => {
        f(C.value, P2);
      },
      /** Returns `true` if the panel is currently collapsed */
      isCollapsed: h2,
      /** Returns `true` if the panel is currently not collapsed */
      isExpanded: E
    }), (P2, D) => (openBlock(), createBlock(unref(O), {
      id: unref(_),
      style: normalizeStyle($2.value),
      as: P2.as,
      "as-child": P2.asChild,
      "data-panel": "",
      "data-panel-collapsible": P2.collapsible || void 0,
      "data-panel-group-id": unref(v2),
      "data-panel-id": unref(_),
      "data-panel-size": Number.parseFloat(`${$2.value.flexGrow}`).toFixed(1),
      "data-state": P2.collapsible ? h2.value ? "collapsed" : "expanded" : void 0
    }, {
      default: withCtx(() => [
        renderSlot(P2.$slots, "default", {
          isCollapsed: h2.value,
          isExpanded: E.value
        })
      ]),
      _: 3
    }, 8, ["id", "style", "as", "as-child", "data-panel-collapsible", "data-panel-group-id", "data-panel-id", "data-panel-size", "data-state"]));
  }
});
function Fp({
  disabled: a2,
  handleId: t,
  resizeHandler: e,
  panelGroupElement: n
}) {
  watchEffect((l) => {
    const s = n.value;
    if (a2.value || e.value === null || s === null)
      return;
    const r = pn(t, s);
    if (r == null)
      return;
    const i = (u) => {
      var d;
      if (!u.defaultPrevented)
        switch (u.key) {
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "ArrowUp":
          case "End":
          case "Home": {
            u.preventDefault(), (d = e.value) == null || d.call(e, u);
            break;
          }
          case "F6": {
            u.preventDefault();
            const c = r.getAttribute("data-panel-group-id");
            pe(c);
            const f = va(
              c,
              s
            ), v2 = ar(
              c,
              t,
              s
            );
            pe(v2 !== null);
            const p = u.shiftKey ? v2 > 0 ? v2 - 1 : f.length - 1 : v2 + 1 < f.length ? v2 + 1 : 0;
            f[p].focus();
            break;
          }
        }
    };
    r.addEventListener("keydown", i), l(() => {
      r.removeEventListener("keydown", i);
    });
  });
}
var dg = defineComponent({
  __name: "SplitterResizeHandle",
  props: {
    id: {},
    hitAreaMargins: {},
    tabindex: { default: 0 },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["dragging"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l, currentElement: s } = R2(), { disabled: r } = toRefs(e), i = rr();
    if (i === null)
      throw new Error(
        "PanelResizeHandle components must be rendered within a PanelGroup container"
      );
    const {
      direction: u,
      groupId: d,
      registerResizeHandle: c,
      startDragging: f,
      stopDragging: v2,
      panelGroupElement: p
    } = i, g = ge(e.id, "radix-vue-splitter-resize-handle"), m2 = ref("inactive"), _ = ref(false), C = ref(null);
    return watch(r, () => {
      ha && (r.value ? C.value = null : C.value = c(g));
    }, { immediate: true }), watchEffect(($2) => {
      var P2, D;
      if (r.value || C.value === null)
        return;
      const h2 = s.value;
      if (!h2)
        return;
      pe(h2);
      const E = (I, M, V2) => {
        var A2;
        if (M)
          switch (I) {
            case "down": {
              m2.value = "drag", f(g, V2), n("dragging", true);
              break;
            }
            case "move": {
              m2.value !== "drag" && (m2.value = "hover"), (A2 = C.value) == null || A2.call(C, V2);
              break;
            }
            case "up": {
              m2.value = "hover", v2(), n("dragging", false);
              break;
            }
          }
        else
          m2.value = "inactive";
      };
      $2(Ep(
        g,
        h2,
        u,
        {
          // Coarse inputs (e.g. finger/touch)
          coarse: ((P2 = e.hitAreaMargins) == null ? void 0 : P2.coarse) ?? 15,
          // Fine inputs (e.g. mouse)
          fine: ((D = e.hitAreaMargins) == null ? void 0 : D.fine) ?? 5
        },
        E
      ));
    }), Fp({
      disabled: r,
      resizeHandler: C,
      handleId: g,
      panelGroupElement: p
    }), ($2, h2) => (openBlock(), createBlock(unref(O), {
      id: unref(g),
      ref: unref(l),
      style: {
        touchAction: "none",
        userSelect: "none"
      },
      as: $2.as,
      "as-child": $2.asChild,
      role: "separator",
      "data-resize-handle": "",
      tabindex: $2.tabindex,
      "data-state": m2.value,
      "data-disabled": unref(r) ? "" : void 0,
      "data-orientation": unref(u),
      "data-panel-group-id": unref(d),
      "data-resize-handle-active": m2.value === "drag" ? "pointer" : _.value ? "keyboard" : void 0,
      "data-resize-handle-state": m2.value,
      "data-panel-resize-handle-enabled": !unref(r),
      "data-panel-resize-handle-id": unref(g),
      onBlur: h2[0] || (h2[0] = (E) => _.value = false),
      onFocus: h2[1] || (h2[1] = (E) => _.value = false)
    }, {
      default: withCtx(() => [
        renderSlot($2.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "as", "as-child", "tabindex", "data-state", "data-disabled", "data-orientation", "data-panel-group-id", "data-resize-handle-active", "data-resize-handle-state", "data-panel-resize-handle-enabled", "data-panel-resize-handle-id"]));
  }
});
var Np = {
  "aria-live": "polite",
  "aria-atomic": "true",
  role: "status",
  style: {
    transform: "translateX(-100%)",
    position: "absolute",
    pointerEvents: "none",
    opacity: 0,
    margin: 0
  }
};
var [ko, Lp] = te("StepperRoot");
var cg = defineComponent({
  __name: "StepperRoot",
  props: {
    defaultValue: { default: 1 },
    orientation: { default: "horizontal" },
    dir: {},
    modelValue: {},
    linear: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { dir: l, orientation: s, linear: r } = toRefs(e), i = we(l);
    R2();
    const u = ref(/* @__PURE__ */ new Set()), d = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: e.modelValue === void 0
    }), c = computed(() => Array.from(u.value)), f = computed(() => d.value === 1), v2 = computed(() => d.value === c.value.length), p = computed(() => u.value.size);
    function g(h2) {
      h2 > p.value || h2 < 1 || u.value.size && c.value[h2] && c.value[h2].getAttribute("disabled") || r.value && h2 > (d.value ?? 1) + 1 || (d.value = h2);
    }
    const m2 = ref(null), _ = ref(null), C = computed(() => m2.value ? m2.value.getAttribute("disabled") === "" : true), $2 = computed(() => _.value ? _.value.getAttribute("disabled") === "" : true);
    return watch(d, async () => {
      await nextTick(() => {
        m2.value = c.value.length && d.value < c.value.length ? c.value[d.value] : null, _.value = c.value.length && d.value > 1 ? c.value[d.value - 2] : null;
      });
    }), watch(c, async () => {
      await nextTick(() => {
        m2.value = c.value.length && d.value < c.value.length ? c.value[d.value] : null, _.value = c.value.length && d.value > 1 ? c.value[d.value - 2] : null;
      });
    }), Lp({
      modelValue: d,
      changeModelValue: (h2) => {
        d.value = h2;
      },
      orientation: s,
      dir: i,
      linear: r,
      totalStepperItems: u
    }), (h2, E) => (openBlock(), createBlock(unref(O), {
      role: "group",
      "aria-label": "progress",
      as: h2.as,
      "as-child": h2.asChild,
      "data-linear": unref(r) ? "" : void 0,
      "data-orientation": h2.orientation
    }, {
      default: withCtx(() => [
        renderSlot(h2.$slots, "default", {
          modelValue: unref(d),
          totalSteps: u.value.size,
          isNextDisabled: C.value,
          isPrevDisabled: $2.value,
          isFirstStep: f.value,
          isLastStep: v2.value,
          goToStep: g,
          nextStep: () => g((unref(d) ?? 1) + 1),
          prevStep: () => g((unref(d) ?? 1) - 1)
        }),
        createBaseVNode("div", Np, " Step " + toDisplayString(unref(d)) + " of " + toDisplayString(u.value.size), 1)
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-linear", "data-orientation"]));
  }
});
var [Sa, zp] = te("StepperItem");
var fg = defineComponent({
  __name: "StepperItem",
  props: {
    step: {},
    disabled: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { disabled: e, step: n, completed: l } = toRefs(t), { forwardRef: s } = R2(), r = ko(), i = ge(void 0, "radix-vue-stepper-item-title"), u = ge(void 0, "radix-vue-stepper-item-description"), d = computed(() => l.value ? "completed" : r.modelValue.value === n.value ? "active" : r.modelValue.value > n.value ? "completed" : "inactive"), c = computed(() => e.value ? false : r.linear.value ? n.value <= r.modelValue.value || n.value === r.modelValue.value + 1 : true);
    return zp({
      titleId: i,
      descriptionId: u,
      state: d,
      disabled: e,
      step: n,
      isFocusable: c
    }), (f, v2) => (openBlock(), createBlock(unref(O), {
      ref: unref(s),
      as: f.as,
      "as-child": f.asChild,
      "aria-current": d.value === "active" ? "true" : void 0,
      "data-state": d.value,
      disabled: unref(e) || !c.value ? "" : void 0,
      "data-disabled": unref(e) || !c.value ? "" : void 0,
      "data-orientation": unref(r).orientation.value
    }, {
      default: withCtx(() => [
        renderSlot(f.$slots, "default", { state: d.value })
      ]),
      _: 3
    }, 8, ["as", "as-child", "aria-current", "data-state", "disabled", "data-disabled", "data-orientation"]));
  }
});
var pg = defineComponent({
  __name: "StepperTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = ko(), e = Sa(), n = nt(), l = computed(() => Array.from(t.totalStepperItems.value));
    function s(d) {
      if (!e.disabled.value) {
        if (t.linear.value) {
          if ((e.step.value <= t.modelValue.value || e.step.value === t.modelValue.value + 1) && d.ctrlKey === false) {
            t.changeModelValue(e.step.value);
            return;
          }
        } else if (d.ctrlKey === false) {
          t.changeModelValue(e.step.value);
          return;
        }
        d.preventDefault();
      }
    }
    function r(d) {
      d.preventDefault(), !e.disabled.value && ((d.key === n.ENTER || d.key === n.SPACE) && !d.ctrlKey && !d.shiftKey && t.changeModelValue(e.step.value), [n.ARROW_LEFT, n.ARROW_RIGHT, n.ARROW_UP, n.ARROW_DOWN].includes(d.key) && At(d, me(), void 0, {
        itemsArray: l.value,
        focus: true,
        loop: false,
        arrowKeyOptions: t.orientation.value,
        dir: t.dir.value
      }));
    }
    const { forwardRef: i, currentElement: u } = R2();
    return onMounted(() => {
      t.totalStepperItems.value.add(u.value);
    }), onUnmounted(() => {
      t.totalStepperItems.value.delete(u.value);
    }), (d, c) => (openBlock(), createBlock(unref(O), {
      ref: unref(i),
      type: d.as === "button" ? "button" : void 0,
      as: d.as,
      "as-child": d.asChild,
      "data-state": unref(e).state.value,
      disabled: unref(e).disabled.value || !unref(e).isFocusable.value ? "" : void 0,
      "data-disabled": unref(e).disabled.value || !unref(e).isFocusable.value ? "" : void 0,
      "data-orientation": unref(t).orientation.value,
      tabindex: unref(e).isFocusable.value ? 0 : -1,
      "aria-describedby": unref(e).descriptionId,
      "aria-labelledby": unref(e).titleId,
      onMousedown: withModifiers(s, ["left"]),
      onKeydown: withKeys(r, ["enter", "space", "left", "right", "up", "down"])
    }, {
      default: withCtx(() => [
        renderSlot(d.$slots, "default")
      ]),
      _: 3
    }, 8, ["type", "as", "as-child", "data-state", "disabled", "data-disabled", "data-orientation", "tabindex", "aria-describedby", "aria-labelledby"]));
  }
});
var vg = defineComponent({
  __name: "StepperDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = Sa();
    return (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).descriptionId
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var mg = defineComponent({
  __name: "StepperTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h4" }
  },
  setup(a2) {
    const t = a2, e = Sa();
    return R2(), (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).titleId
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var hg = defineComponent({
  __name: "StepperIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = Sa();
    return R2(), (n, l) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, () => [
          createTextVNode(" Step " + toDisplayString(unref(e).step.value), 1)
        ])
      ]),
      _: 3
    }, 16));
  }
});
var yg = defineComponent({
  __name: "StepperSeparator",
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = ko(), n = Sa();
    return R2(), (l, s) => (openBlock(), createBlock(unref(ap), mergeProps(t, {
      decorative: "",
      orientation: unref(e).orientation.value,
      "data-state": unref(n).state.value
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["orientation", "data-state"]));
  }
});
var Kp = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"];
var [Hp, Wp] = te("SwitchRoot");
var gg = defineComponent({
  __name: "SwitchRoot",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: Boolean, default: void 0 },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    id: {},
    value: { default: "on" },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:checked"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { disabled: l } = toRefs(e), s = ne(e, "checked", n, {
      defaultValue: e.defaultChecked,
      passive: e.checked === void 0
    });
    function r() {
      l.value || (s.value = !s.value);
    }
    const { forwardRef: i, currentElement: u } = R2(), d = at(u), c = computed(() => {
      var f;
      return e.id && u.value ? (f = document.querySelector(`[for="${e.id}"]`)) == null ? void 0 : f.innerText : void 0;
    });
    return Wp({
      checked: s,
      toggleCheck: r,
      disabled: l
    }), (f, v2) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps(f.$attrs, {
        id: f.id,
        ref: unref(i),
        role: "switch",
        type: f.as === "button" ? "button" : void 0,
        value: f.value,
        "aria-label": f.$attrs["aria-label"] || c.value,
        "aria-checked": unref(s),
        "aria-required": f.required,
        "data-state": unref(s) ? "checked" : "unchecked",
        "data-disabled": unref(l) ? "" : void 0,
        "as-child": f.asChild,
        as: f.as,
        disabled: unref(l),
        onClick: r,
        onKeydown: withKeys(withModifiers(r, ["prevent"]), ["enter"])
      }), {
        default: withCtx(() => [
          renderSlot(f.$slots, "default", { checked: unref(s) })
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      unref(d) ? (openBlock(), createElementBlock("input", {
        key: 0,
        type: "checkbox",
        name: f.name,
        tabindex: "-1",
        "aria-hidden": "true",
        disabled: unref(l),
        required: f.required,
        value: f.value,
        checked: !!unref(s),
        "data-state": unref(s) ? "checked" : "unchecked",
        "data-disabled": unref(l) ? "" : void 0,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, Kp)) : createCommentVNode("", true)
    ], 64));
  }
});
var bg = defineComponent({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = Hp();
    return R2(), (e, n) => {
      var l;
      return openBlock(), createBlock(unref(O), {
        "data-state": (l = unref(t).checked) != null && l.value ? "checked" : "unchecked",
        "data-disabled": unref(t).disabled.value ? "" : void 0,
        "as-child": e.asChild,
        as: e.as
      }, {
        default: withCtx(() => [
          renderSlot(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
});
var [vn, jp] = te("TabsRoot");
var Cg = defineComponent({
  __name: "TabsRoot",
  props: {
    defaultValue: {},
    orientation: { default: "horizontal" },
    dir: {},
    activationMode: { default: "automatic" },
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { orientation: l, dir: s } = toRefs(e), r = we(s);
    R2();
    const i = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: e.modelValue === void 0
    }), u = ref();
    return jp({
      modelValue: i,
      changeModelValue: (d) => {
        i.value = d;
      },
      orientation: l,
      dir: r,
      activationMode: e.activationMode,
      baseId: ge(void 0, "radix-vue-tabs"),
      tabsList: u
    }), (d, c) => (openBlock(), createBlock(unref(O), {
      dir: unref(r),
      "data-orientation": unref(l),
      "as-child": d.asChild,
      as: d.as
    }, {
      default: withCtx(() => [
        renderSlot(d.$slots, "default", { modelValue: unref(i) })
      ]),
      _: 3
    }, 8, ["dir", "data-orientation", "as-child", "as"]));
  }
});
var wg = defineComponent({
  __name: "TabsList",
  props: {
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { loop: e } = toRefs(t), { forwardRef: n, currentElement: l } = R2(), s = vn();
    return s.tabsList = l, (r, i) => (openBlock(), createBlock(unref(Ft), {
      "as-child": "",
      orientation: unref(s).orientation.value,
      dir: unref(s).dir.value,
      loop: unref(e)
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(n),
          role: "tablist",
          "as-child": r.asChild,
          as: r.as,
          "aria-orientation": unref(s).orientation.value
        }, {
          default: withCtx(() => [
            renderSlot(r.$slots, "default")
          ]),
          _: 3
        }, 8, ["as-child", "as", "aria-orientation"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
});
function ir(a2, t) {
  return `${a2}-trigger-${t}`;
}
function ur(a2, t) {
  return `${a2}-content-${t}`;
}
var _g = defineComponent({
  __name: "TabsContent",
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), n = vn(), l = computed(() => ir(n.baseId, t.value)), s = computed(() => ur(n.baseId, t.value)), r = computed(() => t.value === n.modelValue.value), i = ref(r.value);
    return onMounted(() => {
      requestAnimationFrame(() => {
        i.value = false;
      });
    }), (u, d) => (openBlock(), createBlock(unref(Pe), {
      present: r.value,
      "force-mount": ""
    }, {
      default: withCtx(({ present: c }) => [
        createVNode(unref(O), {
          id: s.value,
          ref: unref(e),
          "as-child": u.asChild,
          as: u.as,
          role: "tabpanel",
          "data-state": r.value ? "active" : "inactive",
          "data-orientation": unref(n).orientation.value,
          "aria-labelledby": l.value,
          hidden: !c.value,
          tabindex: "0",
          style: normalizeStyle({
            animationDuration: i.value ? "0s" : void 0
          })
        }, {
          default: withCtx(() => [
            u.forceMount || r.value ? renderSlot(u.$slots, "default", { key: 0 }) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["id", "as-child", "as", "data-state", "data-orientation", "aria-labelledby", "hidden", "style"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var xg = defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), n = vn(), l = computed(() => ir(n.baseId, t.value)), s = computed(() => ur(n.baseId, t.value)), r = computed(() => t.value === n.modelValue.value);
    return (i, u) => (openBlock(), createBlock(unref(Nt), {
      "as-child": "",
      focusable: !i.disabled,
      active: r.value
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          id: l.value,
          ref: unref(e),
          role: "tab",
          type: i.as === "button" ? "button" : void 0,
          as: i.as,
          "as-child": i.asChild,
          "aria-selected": r.value ? "true" : "false",
          "aria-controls": s.value,
          "data-state": r.value ? "active" : "inactive",
          disabled: i.disabled,
          "data-disabled": i.disabled ? "" : void 0,
          "data-orientation": unref(n).orientation.value,
          onMousedown: u[0] || (u[0] = withModifiers((d) => {
            !i.disabled && d.ctrlKey === false ? unref(n).changeModelValue(i.value) : d.preventDefault();
          }, ["left"])),
          onKeydown: u[1] || (u[1] = withKeys((d) => unref(n).changeModelValue(i.value), ["enter", "space"])),
          onFocus: u[2] || (u[2] = () => {
            const d = unref(n).activationMode !== "manual";
            !r.value && !i.disabled && d && unref(n).changeModelValue(i.value);
          })
        }, {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "type", "as", "as-child", "aria-selected", "aria-controls", "data-state", "disabled", "data-disabled", "data-orientation"])
      ]),
      _: 3
    }, 8, ["focusable", "active"]));
  }
});
var Sg = defineComponent({
  __name: "TabsIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = vn();
    R2();
    const n = ref(), l = ref({
      size: null,
      position: null
    });
    watch(() => [e.modelValue.value, e == null ? void 0 : e.dir.value], async () => {
      await nextTick(), s();
    }, { immediate: true }), tt([e.tabsList, n], s);
    function s() {
      var r;
      n.value = (r = e.tabsList.value) == null ? void 0 : r.querySelector('[role="tab"][data-state="active"]'), n.value && (e.orientation.value === "horizontal" ? l.value = {
        size: n.value.offsetWidth,
        position: n.value.offsetLeft
      } : l.value = {
        size: n.value.offsetHeight,
        position: n.value.offsetTop
      });
    }
    return (r, i) => typeof l.value.size == "number" ? (openBlock(), createBlock(unref(O), mergeProps({ key: 0 }, t, {
      style: {
        "--radix-tabs-indicator-size": `${l.value.size}px`,
        "--radix-tabs-indicator-position": `${l.value.position}px`
      }
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["style"])) : createCommentVNode("", true);
  }
});
var [mn, Up] = te("TagsInputRoot");
var Eg = defineComponent({
  __name: "TagsInputRoot",
  props: {
    modelValue: {},
    defaultValue: { default: () => [] },
    addOnPaste: { type: Boolean },
    addOnTab: { type: Boolean },
    addOnBlur: { type: Boolean },
    duplicate: { type: Boolean },
    disabled: { type: Boolean },
    delimiter: { default: "," },
    dir: {},
    max: { default: 0 },
    required: { type: Boolean },
    name: {},
    id: {},
    convertValue: {},
    displayValue: { type: Function, default: (a2) => a2.toString() },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "invalid"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { addOnPaste: l, disabled: s, delimiter: r, max: i, id: u, dir: d, addOnBlur: c, addOnTab: f } = toRefs(e), v2 = we(d), p = ne(e, "modelValue", n, {
      defaultValue: e.defaultValue,
      passive: true,
      deep: true
    }), { forwardRef: g, currentElement: m2 } = R2(), { focused: _ } = Si(m2), C = at(m2), { getItems: $2 } = Ca(), h2 = ref(), E = ref(false);
    return Up({
      modelValue: p,
      onAddValue: (P2) => {
        const D = p.value.length > 0 && typeof p.value[0] == "object", I = p.value.length > 0 && typeof e.defaultValue[0] == "object";
        if ((D || I) && typeof e.convertValue != "function")
          throw new Error("You must provide a `convertValue` function when using objects as values.");
        const M = e.convertValue ? e.convertValue(P2) : P2;
        if (p.value.length >= i.value && i.value)
          return n("invalid", M), false;
        if (e.duplicate)
          return p.value = [...p.value, M], true;
        if (p.value.includes(M))
          E.value = true;
        else
          return p.value = [...p.value, M], true;
        return n("invalid", M), false;
      },
      onRemoveValue: (P2) => {
        P2 !== -1 && (p.value = p.value.filter((D, I) => I !== P2));
      },
      onInputKeydown: (P2) => {
        const D = P2.target, I = $2().map((V2) => V2.ref).filter((V2) => V2.dataset.disabled !== "");
        if (!I.length)
          return;
        const M = I.at(-1);
        switch (P2.key) {
          case "Delete":
          case "Backspace": {
            if (D.selectionStart !== 0 || D.selectionEnd !== 0)
              break;
            if (h2.value) {
              const V2 = I.findIndex((A2) => A2 === h2.value);
              p.value = p.value.filter((A2, F) => F !== V2), h2.value = h2.value === M ? I.at(V2 - 1) : I.at(V2 + 1), P2.preventDefault();
            } else P2.key === "Backspace" && (h2.value = M, P2.preventDefault());
            break;
          }
          case "Home":
          case "End":
          case "ArrowRight":
          case "ArrowLeft": {
            const V2 = P2.key === "ArrowRight" && v2.value === "ltr" || P2.key === "ArrowLeft" && v2.value === "rtl", A2 = !V2;
            if (D.selectionStart !== 0 || D.selectionEnd !== 0)
              break;
            if (A2 && !h2.value)
              h2.value = M, P2.preventDefault();
            else if (V2 && M && h2.value === M)
              h2.value = void 0, P2.preventDefault();
            else if (h2.value) {
              const F = At(P2, h2.value, void 0, {
                itemsArray: I,
                loop: false,
                dir: v2.value
              });
              F && (h2.value = F), P2.preventDefault();
            }
            break;
          }
          case "ArrowUp":
          case "ArrowDown": {
            h2.value && P2.preventDefault();
            break;
          }
          default:
            h2.value = void 0;
        }
      },
      selectedElement: h2,
      isInvalidInput: E,
      addOnPaste: l,
      addOnBlur: c,
      addOnTab: f,
      dir: v2,
      disabled: s,
      delimiter: r,
      max: i,
      id: u,
      displayValue: e.displayValue
    }), (P2, D) => (openBlock(), createBlock(unref(wa), null, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(g),
          dir: unref(v2),
          as: P2.as,
          "as-child": P2.asChild,
          "data-invalid": E.value ? "" : void 0,
          "data-disabled": unref(s) ? "" : void 0,
          "data-focused": unref(_) ? "" : void 0
        }, {
          default: withCtx(() => [
            renderSlot(P2.$slots, "default", { modelValue: unref(p) }),
            unref(C) && P2.name ? (openBlock(), createBlock(unref(no), {
              key: 0,
              name: P2.name,
              value: unref(p),
              required: P2.required,
              disabled: unref(s)
            }, null, 8, ["name", "value", "required", "disabled"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["dir", "as", "as-child", "data-invalid", "data-disabled", "data-focused"])
      ]),
      _: 3
    }));
  }
});
var Pg = defineComponent({
  __name: "TagsInputInput",
  props: {
    placeholder: {},
    autoFocus: { type: Boolean },
    maxLength: {},
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(a2) {
    const t = a2, e = mn(), { forwardRef: n, currentElement: l } = R2();
    function s(p) {
      if (!e.addOnBlur.value)
        return;
      const g = p.target;
      if (!g.value)
        return;
      e.onAddValue(g.value) && (g.value = "");
    }
    function r(p) {
      e.addOnTab.value && c(p);
    }
    const i = ref(false);
    function u() {
      i.value = true;
    }
    function d() {
      requestAnimationFrame(() => {
        i.value = false;
      });
    }
    async function c(p) {
      if (i.value || (await nextTick(), p.defaultPrevented))
        return;
      const g = p.target;
      if (!g.value)
        return;
      e.onAddValue(g.value) && (g.value = ""), p.preventDefault();
    }
    function f(p) {
      e.isInvalidInput.value = false;
      const g = e.delimiter.value;
      if (g === p.data) {
        const m2 = p.target;
        m2.value = m2.value.replaceAll(g, ""), e.onAddValue(m2.value) && (m2.value = "");
      }
    }
    function v2(p) {
      if (e.addOnPaste.value) {
        p.preventDefault();
        const g = p.clipboardData;
        if (!g)
          return;
        const m2 = g.getData("text");
        e.delimiter.value ? m2.split(e.delimiter.value).forEach((C) => {
          e.onAddValue(C);
        }) : e.onAddValue(m2);
      }
    }
    return onMounted(() => {
      const p = l.value.nodeName === "INPUT" ? l.value : l.value.querySelector("input");
      p && setTimeout(() => {
        t.autoFocus && (p == null || p.focus());
      }, 1);
    }), (p, g) => {
      var m2;
      return openBlock(), createBlock(unref(O), {
        id: (m2 = unref(e).id) == null ? void 0 : m2.value,
        ref: unref(n),
        type: "text",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        as: p.as,
        "as-child": p.asChild,
        maxlength: p.maxLength,
        placeholder: p.placeholder,
        disabled: unref(e).disabled.value,
        "data-invalid": unref(e).isInvalidInput.value ? "" : void 0,
        onInput: f,
        onKeydown: [
          withKeys(c, ["enter"]),
          withKeys(r, ["tab"]),
          unref(e).onInputKeydown
        ],
        onBlur: s,
        onCompositionstart: u,
        onCompositionend: d,
        onPaste: v2
      }, {
        default: withCtx(() => [
          renderSlot(p.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "as", "as-child", "maxlength", "placeholder", "disabled", "data-invalid", "onKeydown"]);
    };
  }
});
var [dr, Gp] = te("TagsInputItem");
var Dg = defineComponent({
  __name: "TagsInputItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { value: e } = toRefs(t), n = mn(), { forwardRef: l, currentElement: s } = R2(), r = computed(() => n.selectedElement.value === s.value), i = computed(() => t.disabled || n.disabled.value), u = Gp({
      value: e,
      isSelected: r,
      disabled: i,
      textId: "",
      displayValue: computed(() => n.displayValue(e.value))
    });
    return (d, c) => (openBlock(), createBlock(unref(Qt), null, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(l),
          as: d.as,
          "as-child": d.asChild,
          "aria-labelledby": unref(u).textId,
          "aria-current": r.value,
          "data-disabled": i.value ? "" : void 0,
          "data-state": r.value ? "active" : "inactive"
        }, {
          default: withCtx(() => [
            renderSlot(d.$slots, "default")
          ]),
          _: 3
        }, 8, ["as", "as-child", "aria-labelledby", "aria-current", "data-disabled", "data-state"])
      ]),
      _: 3
    }));
  }
});
var $g = defineComponent({
  __name: "TagsInputItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(a2) {
    const t = a2, e = dr();
    return R2(), e.textId || (e.textId = ge(void 0, "radix-vue-tags-input-item-text")), (n, l) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      id: unref(e).textId
    }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(unref(e).displayValue.value), 1)
        ])
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
var Bg = defineComponent({
  __name: "TagsInputItemDelete",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = mn(), n = dr(), l = computed(() => {
      var r;
      return ((r = n.disabled) == null ? void 0 : r.value) || e.disabled.value;
    });
    function s() {
      if (l.value)
        return;
      const r = e.modelValue.value.findIndex((i) => i === n.value.value);
      e.onRemoveValue(r);
    }
    return (r, i) => (openBlock(), createBlock(unref(O), mergeProps({ tabindex: "-1" }, t, {
      "aria-labelledby": unref(n).textId,
      "aria-current": unref(n).isSelected.value,
      "data-state": unref(n).isSelected.value ? "active" : "inactive",
      "data-disabled": l.value ? "" : void 0,
      type: r.as === "button" ? "button" : void 0,
      onClick: s
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-labelledby", "aria-current", "data-state", "data-disabled", "type"]));
  }
});
var Ig = defineComponent({
  __name: "TagsInputClear",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2;
    R2();
    const e = mn();
    function n() {
      e.disabled.value || (e.modelValue.value = []);
    }
    return (l, s) => (openBlock(), createBlock(unref(O), mergeProps(t, {
      type: l.as === "button" ? "button" : void 0,
      "data-disabled": unref(e).disabled.value ? "" : void 0,
      onClick: n
    }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "data-disabled"]));
  }
});
var [hn, qp] = te("ToastProvider");
var Tg = defineComponent({
  inheritAttrs: false,
  __name: "ToastProvider",
  props: {
    label: { default: "Notification" },
    duration: { default: 5e3 },
    swipeDirection: { default: "right" },
    swipeThreshold: { default: 50 }
  },
  setup(a2) {
    const t = a2, { label: e, duration: n, swipeDirection: l, swipeThreshold: s } = toRefs(t), r = ref(), i = ref(0), u = ref(false), d = ref(false);
    if (t.label && typeof t.label == "string" && !t.label.trim()) {
      const c = "Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.";
      throw new Error(c);
    }
    return qp({
      label: e,
      duration: n,
      swipeDirection: l,
      swipeThreshold: s,
      toastCount: i,
      viewport: r,
      onViewportChange(c) {
        r.value = c;
      },
      onToastAdd() {
        i.value++;
      },
      onToastRemove() {
        i.value--;
      },
      isFocusedToastEscapeKeyDownRef: u,
      isClosePausedRef: d
    }), (c, f) => renderSlot(c.$slots, "default");
  }
});
var Yp = "toast.swipeStart";
var Xp = "toast.swipeMove";
var Zp = "toast.swipeCancel";
var Jp = "toast.swipeEnd";
var Mn = "toast.viewportPause";
var Vn = "toast.viewportResume";
function ka(a2, t, e) {
  const n = e.originalEvent.currentTarget, l = new CustomEvent(a2, {
    bubbles: false,
    cancelable: true,
    detail: e
  });
  t && n.addEventListener(a2, t, { once: true }), n.dispatchEvent(l);
}
function rl(a2, t, e = 0) {
  const n = Math.abs(a2.x), l = Math.abs(a2.y), s = n > l;
  return t === "left" || t === "right" ? s && n > e : !s && l > e;
}
function Qp(a2) {
  return a2.nodeType === a2.ELEMENT_NODE;
}
function cr(a2) {
  const t = [];
  return Array.from(a2.childNodes).forEach((n) => {
    if (n.nodeType === n.TEXT_NODE && n.textContent && t.push(n.textContent), Qp(n)) {
      const l = n.ariaHidden || n.hidden || n.style.display === "none", s = n.dataset.radixToastAnnounceExclude === "";
      if (!l)
        if (s) {
          const r = n.dataset.radixToastAnnounceAlt;
          r && t.push(r);
        } else
          t.push(...cr(n));
    }
  }), t;
}
var ev = defineComponent({
  __name: "ToastAnnounce",
  setup(a2) {
    const t = hn(), e = gi(1e3), n = ref(false);
    return Ol(() => {
      n.value = true;
    }), (l, s) => unref(e) || n.value ? (openBlock(), createBlock(unref(Jt), { key: 0 }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(unref(t).label.value) + " ", 1),
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    })) : createCommentVNode("", true);
  }
});
var [tv, av] = te("ToastRoot");
var nv = defineComponent({
  inheritAttrs: false,
  __name: "ToastRootImpl",
  props: {
    type: {},
    open: { type: Boolean, default: false },
    duration: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["close", "escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l, currentElement: s } = R2(), r = hn(), i = ref(null), u = ref(null), d = computed(
      () => typeof e.duration == "number" ? e.duration : r.duration.value
    ), c = ref(0), f = ref(d.value), v2 = ref(0), p = ref(d.value), g = Ol(() => {
      const $2 = (/* @__PURE__ */ new Date()).getTime() - c.value;
      p.value = Math.max(f.value - $2, 0);
    }, { fpsLimit: 60 });
    function m2($2) {
      $2 <= 0 || $2 === Number.POSITIVE_INFINITY || Je && (window.clearTimeout(v2.value), c.value = (/* @__PURE__ */ new Date()).getTime(), v2.value = window.setTimeout(_, $2));
    }
    function _() {
      var h2, E;
      ((h2 = s.value) == null ? void 0 : h2.contains(me())) && ((E = r.viewport.value) == null || E.focus()), r.isClosePausedRef.value = false, n("close");
    }
    const C = computed(() => s.value ? cr(s.value) : null);
    if (e.type && !["foreground", "background"].includes(e.type)) {
      const $2 = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
      throw new Error($2);
    }
    return watchEffect(($2) => {
      const h2 = r.viewport.value;
      if (h2) {
        const E = () => {
          m2(f.value), g.resume(), n("resume");
        }, P2 = () => {
          const D = (/* @__PURE__ */ new Date()).getTime() - c.value;
          f.value = f.value - D, window.clearTimeout(v2.value), g.pause(), n("pause");
        };
        return h2.addEventListener(Mn, P2), h2.addEventListener(Vn, E), () => {
          h2.removeEventListener(Mn, P2), h2.removeEventListener(Vn, E);
        };
      }
    }), watch(() => [e.open, d.value], () => {
      f.value = d.value, e.open && !r.isClosePausedRef.value && m2(d.value);
    }, { immediate: true }), Gn("Escape", ($2) => {
      n("escapeKeyDown", $2), $2.defaultPrevented || (r.isFocusedToastEscapeKeyDownRef.value = true, _());
    }), onMounted(() => {
      r.onToastAdd();
    }), onUnmounted(() => {
      r.onToastRemove();
    }), av({ onClose: _ }), ($2, h2) => (openBlock(), createElementBlock(Fragment, null, [
      C.value ? (openBlock(), createBlock(ev, {
        key: 0,
        role: "alert",
        "aria-live": $2.type === "foreground" ? "assertive" : "polite",
        "aria-atomic": "true"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(C.value), 1)
        ]),
        _: 1
      }, 8, ["aria-live"])) : createCommentVNode("", true),
      unref(r).viewport.value ? (openBlock(), createBlock(Teleport, {
        key: 1,
        to: unref(r).viewport.value
      }, [
        createVNode(unref(O), mergeProps({
          ref: unref(l),
          role: "alert",
          "aria-live": "off",
          "aria-atomic": "true",
          tabindex: "0",
          "data-radix-vue-collection-item": ""
        }, $2.$attrs, {
          as: $2.as,
          "as-child": $2.asChild,
          "data-state": $2.open ? "open" : "closed",
          "data-swipe-direction": unref(r).swipeDirection.value,
          style: { userSelect: "none", touchAction: "none" },
          onPointerdown: h2[0] || (h2[0] = withModifiers((E) => {
            i.value = { x: E.clientX, y: E.clientY };
          }, ["left"])),
          onPointermove: h2[1] || (h2[1] = (E) => {
            if (!i.value) return;
            const P2 = E.clientX - i.value.x, D = E.clientY - i.value.y, I = !!u.value, M = ["left", "right"].includes(unref(r).swipeDirection.value), V2 = ["left", "up"].includes(unref(r).swipeDirection.value) ? Math.min : Math.max, A2 = M ? V2(0, P2) : 0, F = M ? 0 : V2(0, D), j = E.pointerType === "touch" ? 10 : 2, H2 = { x: A2, y: F }, Q = { originalEvent: E, delta: H2 };
            I ? (u.value = H2, unref(ka)(unref(Xp), (G2) => n("swipeMove", G2), Q)) : unref(rl)(H2, unref(r).swipeDirection.value, j) ? (u.value = H2, unref(ka)(unref(Yp), (G2) => n("swipeStart", G2), Q), E.target.setPointerCapture(E.pointerId)) : (Math.abs(P2) > j || Math.abs(D) > j) && (i.value = null);
          }),
          onPointerup: h2[2] || (h2[2] = (E) => {
            const P2 = u.value, D = E.target;
            if (D.hasPointerCapture(E.pointerId) && D.releasePointerCapture(E.pointerId), u.value = null, i.value = null, P2) {
              const I = E.currentTarget, M = { originalEvent: E, delta: P2 };
              unref(rl)(P2, unref(r).swipeDirection.value, unref(r).swipeThreshold.value) ? unref(ka)(unref(Jp), (V2) => n("swipeEnd", V2), M) : unref(ka)(unref(Zp), (V2) => n("swipeCancel", V2), M), I == null || I.addEventListener("click", (V2) => V2.preventDefault(), {
                once: true
              });
            }
          })
        }), {
          default: withCtx(() => [
            renderSlot($2.$slots, "default", {
              remaining: p.value,
              duration: d.value
            })
          ]),
          _: 3
        }, 16, ["as", "as-child", "data-state", "data-swipe-direction"])
      ], 8, ["to"])) : createCommentVNode("", true)
    ], 64));
  }
});
var Rg = defineComponent({
  __name: "ToastRoot",
  props: {
    defaultOpen: { type: Boolean, default: true },
    forceMount: { type: Boolean },
    type: { default: "foreground" },
    open: { type: Boolean, default: void 0 },
    duration: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { forwardRef: l } = R2(), s = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    });
    return (r, i) => (openBlock(), createBlock(unref(Pe), {
      present: r.forceMount || unref(s)
    }, {
      default: withCtx(() => [
        createVNode(nv, mergeProps({
          ref: unref(l),
          open: unref(s),
          type: r.type,
          as: r.as,
          "as-child": r.asChild,
          duration: r.duration
        }, r.$attrs, {
          onClose: i[0] || (i[0] = (u) => s.value = false),
          onPause: i[1] || (i[1] = (u) => n("pause")),
          onResume: i[2] || (i[2] = (u) => n("resume")),
          onEscapeKeyDown: i[3] || (i[3] = (u) => n("escapeKeyDown", u)),
          onSwipeStart: i[4] || (i[4] = (u) => {
            n("swipeStart", u), u.currentTarget.setAttribute("data-swipe", "start");
          }),
          onSwipeMove: i[5] || (i[5] = (u) => {
            const { x: d, y: c } = u.detail.delta, f = u.currentTarget;
            f.setAttribute("data-swipe", "move"), f.style.setProperty("--radix-toast-swipe-move-x", `${d}px`), f.style.setProperty("--radix-toast-swipe-move-y", `${c}px`);
          }),
          onSwipeCancel: i[6] || (i[6] = (u) => {
            const d = u.currentTarget;
            d.setAttribute("data-swipe", "cancel"), d.style.removeProperty("--radix-toast-swipe-move-x"), d.style.removeProperty("--radix-toast-swipe-move-y"), d.style.removeProperty("--radix-toast-swipe-end-x"), d.style.removeProperty("--radix-toast-swipe-end-y");
          }),
          onSwipeEnd: i[7] || (i[7] = (u) => {
            const { x: d, y: c } = u.detail.delta, f = u.currentTarget;
            f.setAttribute("data-swipe", "end"), f.style.removeProperty("--radix-toast-swipe-move-x"), f.style.removeProperty("--radix-toast-swipe-move-y"), f.style.setProperty("--radix-toast-swipe-end-x", `${d}px`), f.style.setProperty("--radix-toast-swipe-end-y", `${c}px`), s.value = false;
          })
        }), {
          default: withCtx(({ remaining: u, duration: d }) => [
            renderSlot(r.$slots, "default", {
              remaining: u,
              duration: d,
              open: unref(s)
            })
          ]),
          _: 3
        }, 16, ["open", "type", "as", "as-child", "duration"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Ag = defineComponent({
  __name: "ToastPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var fr = defineComponent({
  __name: "ToastAnnounceExclude",
  props: {
    altText: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    return (t, e) => (openBlock(), createBlock(unref(O), {
      as: t.as,
      "as-child": t.asChild,
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": t.altText || void 0
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-radix-toast-announce-alt"]));
  }
});
var ov = defineComponent({
  __name: "ToastClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = tv(), { forwardRef: n } = R2();
    return (l, s) => (openBlock(), createBlock(fr, { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps(t, {
          ref: unref(n),
          type: l.as === "button" ? "button" : void 0,
          onClick: s[0] || (s[0] = (r) => unref(e).onClose())
        }), {
          default: withCtx(() => [
            renderSlot(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["type"])
      ]),
      _: 3
    }));
  }
});
var Og = defineComponent({
  __name: "ToastAction",
  props: {
    altText: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    if (!a2.altText)
      throw new Error("Missing prop `altText` expected on `ToastAction`");
    const { forwardRef: e } = R2();
    return (n, l) => n.altText ? (openBlock(), createBlock(fr, {
      key: 0,
      "alt-text": n.altText,
      "as-child": ""
    }, {
      default: withCtx(() => [
        createVNode(ov, {
          ref: unref(e),
          as: n.as,
          "as-child": n.asChild
        }, {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 8, ["as", "as-child"])
      ]),
      _: 3
    }, 8, ["alt-text"])) : createCommentVNode("", true);
  }
});
var il = defineComponent({
  __name: "FocusProxy",
  emits: ["focusFromOutsideViewport"],
  setup(a2, { emit: t }) {
    const e = t, n = hn();
    return (l, s) => (openBlock(), createBlock(unref(Jt), {
      "aria-hidden": "true",
      tabindex: "0",
      style: { position: "fixed" },
      onFocus: s[0] || (s[0] = (r) => {
        var d;
        const i = r.relatedTarget;
        !((d = unref(n).viewport.value) != null && d.contains(i)) && e("focusFromOutsideViewport");
      })
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }));
  }
});
var kg = defineComponent({
  inheritAttrs: false,
  __name: "ToastViewport",
  props: {
    hotkey: { default: () => ["F8"] },
    label: { type: [String, Function], default: "Notifications ({hotkey})" },
    asChild: { type: Boolean },
    as: { default: "ol" }
  },
  setup(a2) {
    const t = a2, { hotkey: e, label: n } = toRefs(t), { forwardRef: l, currentElement: s } = R2(), { createCollection: r } = Fe(), i = r(s), u = hn(), d = computed(() => u.toastCount.value > 0), c = ref(), f = ref(), v2 = computed(() => e.value.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
    Gn(e.value, () => {
      s.value.focus();
    }), onMounted(() => {
      u.onViewportChange(s.value);
    }), watchEffect((g) => {
      const m2 = s.value;
      if (d.value && m2) {
        const _ = () => {
          if (!u.isClosePausedRef.value) {
            const P2 = new CustomEvent(Mn);
            m2.dispatchEvent(P2), u.isClosePausedRef.value = true;
          }
        }, C = () => {
          if (u.isClosePausedRef.value) {
            const P2 = new CustomEvent(Vn);
            m2.dispatchEvent(P2), u.isClosePausedRef.value = false;
          }
        }, $2 = (P2) => {
          !m2.contains(P2.relatedTarget) && C();
        }, h2 = () => {
          m2.contains(me()) || C();
        }, E = (P2) => {
          var M, V2, A2;
          const D = P2.altKey || P2.ctrlKey || P2.metaKey;
          if (P2.key === "Tab" && !D) {
            const F = me(), j = P2.shiftKey;
            if (P2.target === m2 && j) {
              (M = c.value) == null || M.focus();
              return;
            }
            const G2 = p({ tabbingDirection: j ? "backwards" : "forwards" }), J2 = G2.findIndex((z2) => z2 === F);
            Ma(G2.slice(J2 + 1)) ? P2.preventDefault() : j ? (V2 = c.value) == null || V2.focus() : (A2 = f.value) == null || A2.focus();
          }
        };
        m2.addEventListener("focusin", _), m2.addEventListener("focusout", $2), m2.addEventListener("pointermove", _), m2.addEventListener("pointerleave", h2), m2.addEventListener("keydown", E), window.addEventListener("blur", _), window.addEventListener("focus", C), g(() => {
          m2.removeEventListener("focusin", _), m2.removeEventListener("focusout", $2), m2.removeEventListener("pointermove", _), m2.removeEventListener("pointerleave", h2), m2.removeEventListener("keydown", E), window.removeEventListener("blur", _), window.removeEventListener("focus", C);
        });
      }
    });
    function p({ tabbingDirection: g }) {
      const _ = i.value.map((C) => {
        const $2 = [C, ...eo(C)];
        return g === "forwards" ? $2 : $2.reverse();
      });
      return (g === "forwards" ? _.reverse() : _).flat();
    }
    return (g, m2) => (openBlock(), createBlock(unref(ru), {
      role: "region",
      "aria-label": typeof unref(n) == "string" ? unref(n).replace("{hotkey}", v2.value) : unref(n)(v2.value),
      tabindex: "-1",
      style: normalizeStyle({
        // incase list has size when empty (e.g. padding), we remove pointer events so
        // it doesn't prevent interactions with page elements that it overlays
        pointerEvents: d.value ? void 0 : "none"
      })
    }, {
      default: withCtx(() => [
        d.value ? (openBlock(), createBlock(il, {
          key: 0,
          ref: (_) => {
            c.value = unref($e)(_);
          },
          onFocusFromOutsideViewport: m2[0] || (m2[0] = () => {
            const _ = p({
              tabbingDirection: "forwards"
            });
            unref(Ma)(_);
          })
        }, null, 512)) : createCommentVNode("", true),
        createVNode(unref(O), mergeProps({
          ref: unref(l),
          tabindex: "-1",
          as: g.as,
          "as-child": g.asChild
        }, g.$attrs), {
          default: withCtx(() => [
            renderSlot(g.$slots, "default")
          ]),
          _: 3
        }, 16, ["as", "as-child"]),
        d.value ? (openBlock(), createBlock(il, {
          key: 1,
          ref: (_) => {
            f.value = unref($e)(_);
          },
          onFocusFromOutsideViewport: m2[1] || (m2[1] = () => {
            const _ = p({
              tabbingDirection: "backwards"
            });
            unref(Ma)(_);
          })
        }, null, 512)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["aria-label", "style"]));
  }
});
var Mg = defineComponent({
  __name: "ToastTitle",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Vg = defineComponent({
  __name: "ToastDescription",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(O), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var lv = defineComponent({
  __name: "Toggle",
  props: {
    defaultValue: { type: Boolean },
    pressed: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:pressed"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    const l = ne(e, "pressed", n, {
      defaultValue: e.defaultValue,
      passive: e.pressed === void 0
    });
    function s() {
      l.value = !l.value;
    }
    const r = computed(() => l.value ? "on" : "off");
    return (i, u) => (openBlock(), createBlock(unref(O), {
      type: i.as === "button" ? "button" : void 0,
      "as-child": e.asChild,
      as: i.as,
      "aria-pressed": unref(l),
      "data-state": r.value,
      "data-disabled": i.disabled ? "" : void 0,
      disabled: i.disabled,
      onClick: s
    }, {
      default: withCtx(() => [
        renderSlot(i.$slots, "default", { pressed: unref(l) })
      ]),
      _: 3
    }, 8, ["type", "as-child", "as", "aria-pressed", "data-state", "data-disabled", "disabled"]));
  }
});
var [sv, rv] = te("ToggleGroupRoot");
var iv = defineComponent({
  __name: "ToggleGroupRoot",
  props: {
    rovingFocus: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    orientation: {},
    dir: {},
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { loop: l, rovingFocus: s, disabled: r, dir: i } = toRefs(e), u = we(i), { forwardRef: d } = R2(), { modelValue: c, changeModelValue: f, isSingle: v2 } = Wl(e, n);
    return rv({
      isSingle: v2,
      modelValue: c,
      changeModelValue: f,
      dir: u,
      orientation: e.orientation,
      loop: l,
      rovingFocus: s,
      disabled: r
    }), (p, g) => (openBlock(), createBlock(resolveDynamicComponent(unref(s) ? unref(Ft) : unref(O)), {
      "as-child": "",
      orientation: unref(s) ? p.orientation : void 0,
      dir: unref(u),
      loop: unref(s) ? unref(l) : void 0
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(d),
          role: "group",
          "as-child": p.asChild,
          as: p.as
        }, {
          default: withCtx(() => [
            renderSlot(p.$slots, "default", { modelValue: unref(c) })
          ]),
          _: 3
        }, 8, ["as-child", "as"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
});
var uv = defineComponent({
  __name: "ToggleGroupItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = sv(), n = computed(() => {
      var i;
      return ((i = e.disabled) == null ? void 0 : i.value) || t.disabled;
    }), l = computed(() => {
      var i;
      return (i = e.modelValue.value) == null ? void 0 : i.includes(t.value);
    }), s = computed(() => {
      var i;
      return e.isSingle.value ? e.modelValue.value === t.value : (i = e.modelValue.value) == null ? void 0 : i.includes(t.value);
    }), { forwardRef: r } = R2();
    return (i, u) => (openBlock(), createBlock(resolveDynamicComponent(unref(e).rovingFocus.value ? unref(Nt) : unref(O)), {
      "as-child": "",
      focusable: !n.value,
      active: l.value
    }, {
      default: withCtx(() => [
        createVNode(unref(lv), mergeProps(t, {
          ref: unref(r),
          disabled: n.value,
          pressed: s.value,
          "onUpdate:pressed": u[0] || (u[0] = (d) => unref(e).changeModelValue(i.value))
        }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["disabled", "pressed"])
      ]),
      _: 3
    }, 8, ["focusable", "active"]));
  }
});
var [pr, dv] = te("ToolbarRoot");
var Fg = defineComponent({
  __name: "ToolbarRoot",
  props: {
    orientation: { default: "horizontal" },
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { orientation: e, dir: n } = toRefs(t), l = we(n), { forwardRef: s } = R2();
    return dv({ orientation: e, dir: l }), (r, i) => (openBlock(), createBlock(unref(Ft), {
      "as-child": "",
      orientation: unref(e),
      dir: unref(l),
      loop: r.loop
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          ref: unref(s),
          role: "toolbar",
          "aria-orientation": unref(e),
          "as-child": r.asChild,
          as: r.as
        }, {
          default: withCtx(() => [
            renderSlot(r.$slots, "default")
          ]),
          _: 3
        }, 8, ["aria-orientation", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
});
var cv = defineComponent({
  __name: "ToolbarButton",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2();
    return (n, l) => (openBlock(), createBlock(unref(Nt), {
      "as-child": "",
      focusable: !n.disabled
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(e),
          type: n.as === "button" ? "button" : void 0
        }, t), {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 16, ["type"])
      ]),
      _: 3
    }, 8, ["focusable"]));
  }
});
var Ng = defineComponent({
  __name: "ToolbarLink",
  props: {
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2();
    return (n, l) => (openBlock(), createBlock(unref(Nt), {
      "as-child": "",
      focusable: ""
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps(t, {
          ref: unref(e),
          onKeydown: l[0] || (l[0] = (s) => {
            var r;
            s.key === " " && ((r = s.currentTarget) == null || r.click());
          })
        }), {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }));
  }
});
var Lg = defineComponent({
  __name: "ToolbarToggleGroup",
  props: {
    rovingFocus: { type: Boolean },
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = pr(), s = Te(n);
    return R2(), (r, i) => (openBlock(), createBlock(unref(iv), mergeProps({ ...e, ...unref(s) }, {
      "data-orientation": unref(l).orientation.value,
      dir: unref(l).dir.value,
      "roving-focus": false
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-orientation", "dir"]));
  }
});
var zg = defineComponent({
  __name: "ToolbarToggleItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2();
    return (n, l) => (openBlock(), createBlock(cv, { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(uv), mergeProps(t, { ref: unref(e) }), {
          default: withCtx(() => [
            renderSlot(n.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }));
  }
});
var Kg = defineComponent({
  __name: "ToolbarSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, e = pr();
    return R2(), (n, l) => (openBlock(), createBlock(Ms, {
      orientation: unref(e).orientation.value,
      "as-child": t.asChild,
      as: n.as
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["orientation", "as-child", "as"]));
  }
});
var vr = "tooltip.open";
var [Mo, fv] = te("TooltipProvider");
var Hg = defineComponent({
  inheritAttrs: false,
  __name: "TooltipProvider",
  props: {
    delayDuration: { default: 700 },
    skipDelayDuration: { default: 300 },
    disableHoverableContent: { type: Boolean, default: false },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean, default: false }
  },
  setup(a2) {
    const t = a2, { delayDuration: e, skipDelayDuration: n, disableHoverableContent: l, disableClosingTrigger: s, ignoreNonKeyboardFocus: r, disabled: i } = toRefs(t);
    R2();
    const u = ref(true), d = ref(false), { start: c, stop: f } = Un(() => {
      u.value = true;
    }, n, { immediate: false });
    return fv({
      isOpenDelayed: u,
      delayDuration: e,
      onOpen() {
        f(), u.value = false;
      },
      onClose() {
        c();
      },
      isPointerInTransitRef: d,
      disableHoverableContent: l,
      disableClosingTrigger: s,
      disabled: i,
      ignoreNonKeyboardFocus: r
    }), (v2, p) => renderSlot(v2.$slots, "default");
  }
});
var [yn, pv] = te("TooltipRoot");
var Wg = defineComponent({
  __name: "TooltipRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    delayDuration: { default: void 0 },
    disableHoverableContent: { type: Boolean, default: void 0 },
    disableClosingTrigger: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    ignoreNonKeyboardFocus: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(a2, { emit: t }) {
    const e = a2, n = t;
    R2();
    const l = Mo(), s = computed(() => e.disableHoverableContent ?? l.disableHoverableContent.value), r = computed(() => e.disableClosingTrigger ?? l.disableClosingTrigger.value), i = computed(() => e.disabled ?? l.disabled.value), u = computed(() => e.delayDuration ?? l.delayDuration.value), d = computed(() => e.ignoreNonKeyboardFocus ?? l.ignoreNonKeyboardFocus.value), c = ne(e, "open", n, {
      defaultValue: e.defaultOpen,
      passive: e.open === void 0
    });
    watch(c, (h2) => {
      l.onClose && (h2 ? (l.onOpen(), document.dispatchEvent(new CustomEvent(vr))) : l.onClose());
    });
    const f = ref(false), v2 = ref(), p = computed(() => c.value ? f.value ? "delayed-open" : "instant-open" : "closed"), { start: g, stop: m2 } = Un(() => {
      f.value = true, c.value = true;
    }, u, { immediate: false });
    function _() {
      m2(), f.value = false, c.value = true;
    }
    function C() {
      m2(), c.value = false;
    }
    function $2() {
      g();
    }
    return pv({
      contentId: "",
      open: c,
      stateAttribute: p,
      trigger: v2,
      onTriggerChange(h2) {
        v2.value = h2;
      },
      onTriggerEnter() {
        l.isOpenDelayed.value ? $2() : _();
      },
      onTriggerLeave() {
        s.value ? C() : m2();
      },
      onOpen: _,
      onClose: C,
      disableHoverableContent: s,
      disableClosingTrigger: r,
      disabled: i,
      ignoreNonKeyboardFocus: d
    }), (h2, E) => (openBlock(), createBlock(unref(kt), null, {
      default: withCtx(() => [
        renderSlot(h2.$slots, "default", { open: unref(c) })
      ]),
      _: 3
    }));
  }
});
var jg = defineComponent({
  __name: "TooltipTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(a2) {
    const t = a2, e = yn(), n = Mo();
    e.contentId || (e.contentId = ge(void 0, "radix-vue-tooltip-content"));
    const { forwardRef: l, currentElement: s } = R2(), r = ref(false), i = ref(false), u = computed(() => e.disabled.value ? {} : {
      click: m2,
      focus: p,
      pointermove: f,
      pointerleave: v2,
      pointerdown: c,
      blur: g
    });
    onMounted(() => {
      e.onTriggerChange(s.value);
    });
    function d() {
      setTimeout(() => {
        r.value = false;
      }, 1);
    }
    function c() {
      r.value = true, document.addEventListener("pointerup", d, { once: true });
    }
    function f(_) {
      _.pointerType !== "touch" && !i.value && !n.isPointerInTransitRef.value && (e.onTriggerEnter(), i.value = true);
    }
    function v2() {
      e.onTriggerLeave(), i.value = false;
    }
    function p(_) {
      var C, $2;
      r.value || e.ignoreNonKeyboardFocus.value && !(($2 = (C = _.target).matches) != null && $2.call(C, ":focus-visible")) || e.onOpen();
    }
    function g() {
      e.onClose();
    }
    function m2() {
      e.disableClosingTrigger.value || e.onClose();
    }
    return (_, C) => (openBlock(), createBlock(unref(Mt), { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps({
          ref: unref(l),
          "aria-describedby": unref(e).open.value ? unref(e).contentId : void 0,
          "data-state": unref(e).stateAttribute.value,
          as: _.as,
          "as-child": t.asChild,
          "data-grace-area-trigger": ""
        }, toHandlers(u.value)), {
          default: withCtx(() => [
            renderSlot(_.$slots, "default")
          ]),
          _: 3
        }, 16, ["aria-describedby", "data-state", "as", "as-child"])
      ]),
      _: 3
    }));
  }
});
var mr = defineComponent({
  __name: "TooltipContentImpl",
  props: {
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: { default: "top" },
    sideOffset: { default: 0 },
    align: { default: "center" },
    alignOffset: {},
    avoidCollisions: { type: Boolean, default: true },
    collisionBoundary: { default: () => [] },
    collisionPadding: { default: 0 },
    arrowPadding: { default: 0 },
    sticky: { default: "partial" },
    hideWhenDetached: { type: Boolean, default: false }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = yn(), { forwardRef: s } = R2(), r = useSlots(), i = computed(() => {
      var c;
      return (c = r.default) == null ? void 0 : c.call(r);
    }), u = computed(() => {
      var v2;
      if (e.ariaLabel)
        return e.ariaLabel;
      let c = "";
      function f(p) {
        typeof p.children == "string" && p.type !== Comment ? c += p.children : Array.isArray(p.children) && p.children.forEach((g) => f(g));
      }
      return (v2 = i.value) == null || v2.forEach((p) => f(p)), c;
    }), d = computed(() => {
      const { ariaLabel: c, ...f } = e;
      return f;
    });
    return onMounted(() => {
      He(window, "scroll", (c) => {
        const f = c.target;
        f != null && f.contains(l.trigger.value) && l.onClose();
      }), He(window, vr, l.onClose);
    }), (c, f) => (openBlock(), createBlock(unref(Ct), {
      "as-child": "",
      "disable-outside-pointer-events": false,
      onEscapeKeyDown: f[0] || (f[0] = (v2) => n("escapeKeyDown", v2)),
      onPointerDownOutside: f[1] || (f[1] = (v2) => {
        var p;
        unref(l).disableClosingTrigger.value && ((p = unref(l).trigger.value) != null && p.contains(v2.target)) && v2.preventDefault(), n("pointerDownOutside", v2);
      }),
      onFocusOutside: f[2] || (f[2] = withModifiers(() => {
      }, ["prevent"])),
      onDismiss: f[3] || (f[3] = (v2) => unref(l).onClose())
    }, {
      default: withCtx(() => [
        createVNode(unref(It), mergeProps({
          ref: unref(s),
          "data-state": unref(l).stateAttribute.value
        }, { ...c.$attrs, ...d.value }, { style: {
          "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
          "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
          "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
        } }), {
          default: withCtx(() => [
            renderSlot(c.$slots, "default"),
            createVNode(unref(Jt), {
              id: unref(l).contentId,
              role: "tooltip"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(u.value), 1)
              ]),
              _: 1
            }, 8, ["id"])
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }));
  }
});
var vv = defineComponent({
  __name: "TooltipContentHoverable",
  props: {
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean }
  },
  setup(a2) {
    const e = Ot(a2), { forwardRef: n, currentElement: l } = R2(), { trigger: s, onClose: r } = yn(), i = Mo(), { isPointerInTransit: u, onPointerExit: d } = Fl(s, l);
    return i.isPointerInTransitRef = u, d(() => {
      r();
    }), (c, f) => (openBlock(), createBlock(mr, mergeProps({ ref: unref(n) }, unref(e)), {
      default: withCtx(() => [
        renderSlot(c.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var Ug = defineComponent({
  __name: "TooltipContent",
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: { default: "top" },
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, l = yn(), s = Se(e, n), { forwardRef: r } = R2();
    return (i, u) => (openBlock(), createBlock(unref(Pe), {
      present: i.forceMount || unref(l).open.value
    }, {
      default: withCtx(() => [
        (openBlock(), createBlock(resolveDynamicComponent(unref(l).disableHoverableContent.value ? mr : vv), mergeProps({ ref: unref(r) }, unref(s)), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
var Gg = defineComponent({
  __name: "TooltipArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(a2) {
    const t = a2;
    return R2(), (e, n) => (openBlock(), createBlock(unref(Zt), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
var qg = defineComponent({
  __name: "TooltipPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(a2) {
    const t = a2;
    return (e, n) => (openBlock(), createBlock(unref(rt2), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function Vo(a2) {
  return a2.reduce((t, e) => (t.push(e), e.children && t.push(...Vo(e.children)), t), []);
}
var [hr, mv] = te("TreeRoot");
var Yg = defineComponent({
  __name: "TreeRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    items: {},
    expanded: {},
    defaultExpanded: {},
    getKey: {},
    getChildren: { type: Function, default: (a2) => a2.children },
    selectionBehavior: { default: "toggle" },
    multiple: { type: Boolean },
    dir: {},
    disabled: { type: Boolean },
    propagateSelect: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "ul" }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(a2, { emit: t }) {
    const e = a2, n = t, { items: l, multiple: s, disabled: r, propagateSelect: i, dir: u } = toRefs(e), { handleTypeaheadSearch: d } = ba(), c = we(u), f = ref(), v2 = ref(false), p = ua(), g = ne(e, "modelValue", n, {
      // @ts-expect-error idk
      defaultValue: e.defaultValue ?? (s.value ? [] : void 0),
      passive: e.modelValue === void 0,
      deep: true
    }), m2 = ne(e, "expanded", n, {
      // @ts-expect-error idk
      defaultValue: e.defaultExpanded ?? [],
      passive: e.expanded === void 0,
      deep: true
    }), { onSelectItem: _, handleMultipleReplace: C } = ji(g, e), $2 = computed(() => s.value && Array.isArray(g.value) ? g.value.map((I) => e.getKey(I)) : [e.getKey(g.value ?? {})]);
    function h2(I, M = 1, V2) {
      return I.reduce((A2, F, j) => {
        const H2 = e.getKey(F), Q = e.getChildren(F), G2 = m2.value.includes(H2), J2 = {
          _id: H2,
          value: F,
          index: j,
          level: M,
          parentItem: V2,
          hasChildren: !!Q,
          bind: {
            value: F,
            level: M,
            "aria-setsize": I.length,
            "aria-posinset": j + 1
          }
        };
        return A2.push(J2), Q && G2 && A2.push(...h2(Q, M + 1, F)), A2;
      }, []);
    }
    const E = computed(() => {
      const I = e.items;
      return m2.value.map((M) => M), h2(I ?? []);
    });
    function P2(I) {
      var M;
      if (v2.value)
        p.trigger(I);
      else {
        const V2 = (M = f.value) == null ? void 0 : M.getItems().map((A2) => A2.ref);
        d(I.key, V2);
      }
    }
    function D(I) {
      if (v2.value)
        return;
      const M = en[I.key];
      nextTick(() => {
        var V2;
        C(
          M,
          me(),
          (V2 = f.value) == null ? void 0 : V2.getItems,
          E.value.map((A2) => A2.value)
        );
      });
    }
    return mv({
      modelValue: g,
      selectedKeys: $2,
      onSelect: (I) => {
        var A2;
        const M = (F) => e.getKey(F ?? {}) === e.getKey(I), V2 = e.multiple && Array.isArray(g.value) ? ((A2 = g.value) == null ? void 0 : A2.findIndex(M)) !== -1 : void 0;
        if (_(I, M), e.propagateSelect && e.multiple && Array.isArray(g.value)) {
          const F = Vo(e.getChildren(I) ?? []);
          V2 ? g.value = [...g.value].filter((j) => !F.some((H2) => e.getKey(j ?? {}) === e.getKey(H2))) : g.value = [...g.value, ...F];
        }
      },
      expanded: m2,
      onToggle(I) {
        if (!(I ? e.getChildren(I) : void 0))
          return;
        const V2 = e.getKey(I) ?? I;
        m2.value.includes(V2) ? m2.value = m2.value.filter((A2) => A2 !== V2) : m2.value.push(V2);
      },
      getKey: e.getKey,
      getChildren: e.getChildren,
      items: l,
      expandedItems: E,
      disabled: r,
      multiple: s,
      dir: c,
      propagateSelect: i,
      isVirtual: v2,
      virtualKeydownHook: p,
      handleMultipleReplace: C
    }), (I, M) => (openBlock(), createBlock(unref(Ft), {
      ref_key: "rovingFocusGroupRef",
      ref: f,
      "as-child": "",
      orientation: "vertical",
      dir: unref(c)
    }, {
      default: withCtx(() => [
        createVNode(unref(O), {
          role: "tree",
          as: I.as,
          "as-child": I.asChild,
          "aria-multiselectable": unref(s) ? true : void 0,
          onKeydown: [
            P2,
            withKeys(withModifiers(D, ["shift"]), ["up", "down"])
          ]
        }, {
          default: withCtx(() => [
            renderSlot(I.$slots, "default", {
              flattenItems: E.value,
              modelValue: unref(g),
              expanded: unref(m2)
            })
          ]),
          _: 3
        }, 8, ["as", "as-child", "aria-multiselectable", "onKeydown"])
      ]),
      _: 3
    }, 8, ["dir"]));
  }
});
var hv = "tree.select";
var yv = "tree.toggle";
var Xg = defineComponent({
  inheritAttrs: false,
  __name: "TreeItem",
  props: {
    value: {},
    level: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["select", "toggle"],
  setup(a2, { expose: t, emit: e }) {
    const n = a2, l = e, s = hr(), { getItems: r } = ea(), i = computed(() => !!s.getChildren(n.value)), u = computed(() => {
      const C = s.getKey(n.value);
      return s.expanded.value.includes(C);
    }), d = computed(() => {
      const C = s.getKey(n.value);
      return s.selectedKeys.value.includes(C);
    }), c = computed(() => {
      if (s.propagateSelect.value && d.value && i.value && Array.isArray(s.modelValue.value))
        return !Vo(s.getChildren(n.value) || []).every(($2) => s.modelValue.value.find((h2) => s.getKey(h2) === s.getKey($2)));
    });
    function f(C) {
      if (i.value)
        if (u.value) {
          const $2 = r().map((I) => I.ref), h2 = me(), E = $2.indexOf(h2), D = [...$2].slice(E).find((I) => Number(I.getAttribute("data-indent")) === n.level + 1);
          D && D.focus();
        } else
          _(C);
    }
    function v2(C) {
      if (u.value)
        _(C);
      else {
        const $2 = r().map((I) => I.ref), h2 = me(), E = $2.indexOf(h2), D = [...$2].slice(0, E).reverse().find((I) => Number(I.getAttribute("data-indent")) === n.level - 1);
        D && D.focus();
      }
    }
    async function p(C) {
      l("select", C), !(C != null && C.defaultPrevented) && s.onSelect(n.value);
    }
    async function g(C) {
      l("toggle", C), !(C != null && C.defaultPrevented) && s.onToggle(n.value);
    }
    async function m2(C) {
      if (!C)
        return;
      const $2 = { originalEvent: C, value: n.value, isExpanded: u.value, isSelected: d.value };
      jt(hv, p, $2);
    }
    async function _(C) {
      if (!C)
        return;
      const $2 = { originalEvent: C, value: n.value, isExpanded: u.value, isSelected: d.value };
      jt(yv, g, $2);
    }
    return t({
      isExpanded: u,
      isSelected: d,
      isIndeterminate: c,
      handleToggle: () => s.onToggle(n.value),
      handleSelect: () => s.onSelect(n.value)
    }), (C, $2) => (openBlock(), createBlock(unref(Nt), {
      "as-child": "",
      value: C.value,
      "allow-shift-key": ""
    }, {
      default: withCtx(() => [
        createVNode(unref(O), mergeProps(C.$attrs, {
          role: "treeitem",
          as: C.as,
          "as-child": C.asChild,
          "aria-selected": d.value,
          "aria-expanded": i.value ? u.value : void 0,
          "aria-level": C.level,
          "data-indent": C.level,
          "data-selected": d.value ? "" : void 0,
          "data-expanded": u.value ? "" : void 0,
          onKeydown: [
            withKeys(withModifiers(m2, ["self", "prevent"]), ["enter", "space"]),
            $2[0] || ($2[0] = withKeys(withModifiers((h2) => unref(s).dir.value === "ltr" ? f(h2) : v2(h2), ["prevent"]), ["right"])),
            $2[1] || ($2[1] = withKeys(withModifiers((h2) => unref(s).dir.value === "ltr" ? v2(h2) : f(h2), ["prevent"]), ["left"]))
          ],
          onClick: $2[2] || ($2[2] = withModifiers((h2) => {
            m2(h2), _(h2);
          }, ["stop"]))
        }), {
          default: withCtx(() => [
            renderSlot(C.$slots, "default", {
              isExpanded: u.value,
              isSelected: d.value,
              isIndeterminate: c.value,
              handleSelect: () => unref(s).onSelect(C.value),
              handleToggle: () => unref(s).onToggle(C.value)
            })
          ]),
          _: 3
        }, 16, ["as", "as-child", "aria-selected", "aria-expanded", "aria-level", "data-indent", "data-selected", "data-expanded", "onKeydown"])
      ]),
      _: 3
    }, 8, ["value"]));
  }
});
var Zg = defineComponent({
  __name: "TreeVirtualizer",
  props: {
    estimateSize: {},
    textContent: { type: Function }
  },
  setup(a2) {
    const t = a2, e = useSlots(), n = hr(), l = kl(), { getItems: s } = ea(), r = Tt("", 1e3), i = computed(() => {
      const v2 = (p) => t.textContent ? t.textContent(p) : p.toString().toLowerCase();
      return n.expandedItems.value.map((p, g) => ({
        index: g,
        textContent: v2(p.value)
      }));
    });
    n.isVirtual.value = true;
    const u = computed(() => {
      const v2 = l.value;
      if (v2) {
        const p = window.getComputedStyle(v2);
        return {
          start: Number.parseFloat(p.paddingBlockStart || p.paddingTop),
          end: Number.parseFloat(p.paddingBlockEnd || p.paddingBottom)
        };
      } else
        return { start: 0, end: 0 };
    }), d = vs(
      {
        get scrollPaddingStart() {
          return u.value.start;
        },
        get scrollPaddingEnd() {
          return u.value.end;
        },
        get count() {
          return n.expandedItems.value.length ?? 0;
        },
        get horizontal() {
          return false;
        },
        getItemKey(v2) {
          return v2 + n.getKey(n.expandedItems.value[v2].value);
        },
        estimateSize() {
          return t.estimateSize ?? 28;
        },
        getScrollElement() {
          return l.value;
        },
        overscan: 12
      }
    ), c = computed(() => d.value.getVirtualItems().map((v2) => ({
      item: v2,
      is: cloneVNode(e.default({
        item: n.expandedItems.value[v2.index],
        virtualizer: d.value,
        virtualItem: v2
      })[0], {
        "data-index": v2.index,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translateY(${v2.start}px)`,
          overflowAnchor: "none"
        }
      })
    })));
    function f(v2) {
      d.value.scrollToIndex(v2, { align: "start" }), requestAnimationFrame(() => {
        const p = l.value.querySelector(`[data-index="${v2}"]`);
        p instanceof HTMLElement && p.focus();
      });
    }
    return n.virtualKeydownHook.on((v2) => {
      var _;
      const p = v2.altKey || v2.ctrlKey || v2.metaKey;
      if (v2.key === "Tab" && !p)
        return;
      const m2 = en[v2.key];
      if (["first", "last"].includes(m2)) {
        v2.preventDefault();
        const C = m2 === "first" ? 0 : n.expandedItems.value.length - 1;
        d.value.scrollToIndex(C), requestAnimationFrame(() => {
          const $2 = s();
          (m2 === "first" ? $2[0] : $2[$2.length - 1]).ref.focus();
        });
      } else if (m2 === "prev" && v2.key !== "ArrowUp") {
        const C = me(), $2 = Number(C.getAttribute("data-index")), h2 = Number(C.getAttribute("data-indent")), P2 = n.expandedItems.value.slice(0, $2).map((D, I) => ({ ...D, index: I })).reverse().find((D) => D.level === h2 - 1);
        P2 && f(P2.index);
      } else if (!m2 && !p) {
        r.value += v2.key;
        const C = Number((_ = me()) == null ? void 0 : _.getAttribute("data-index")), $2 = i.value[C].textContent, h2 = i.value.map((D) => D.textContent), E = Zn(h2, r.value, $2), P2 = i.value.find((D) => D.textContent === E);
        P2 && f(P2.index);
      }
      nextTick(() => {
        v2.shiftKey && m2 && n.handleMultipleReplace(m2, me(), s, n.expandedItems.value.map((C) => C.value));
      });
    }), (v2, p) => (openBlock(), createElementBlock("div", {
      "data-radix-vue-virtualizer": "",
      style: normalizeStyle({
        position: "relative",
        width: "100%",
        height: `${unref(d).getTotalSize()}px`
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(c.value, ({ is: g, item: m2 }) => (openBlock(), createBlock(resolveDynamicComponent(g), {
        key: m2.key
      }))), 128))
    ], 4));
  }
});
var Jg = defineComponent({
  __name: "Viewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(a2) {
    const t = a2, { forwardRef: e } = R2(), { nonce: n } = toRefs(t), l = Ja(n);
    return (s, r) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(unref(O), mergeProps({ ...s.$attrs, ...t }, {
        ref: unref(e),
        "data-radix-viewport": "",
        role: "presentation",
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "auto"
        }
      }), {
        default: withCtx(() => [
          renderSlot(s.$slots, "default")
        ]),
        _: 3
      }, 16),
      createVNode(unref(O), {
        as: "style",
        nonce: unref(l)
      }, {
        default: withCtx(() => [
          createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
});
export {
  Dv as AccordionContent,
  $v as AccordionHeader,
  Pv as AccordionItem,
  Ev as AccordionRoot,
  Bv as AccordionTrigger,
  Nv as AlertDialogAction,
  Mv as AlertDialogCancel,
  Ov as AlertDialogContent,
  Fv as AlertDialogDescription,
  kv as AlertDialogOverlay,
  Av as AlertDialogPortal,
  Tv as AlertDialogRoot,
  Vv as AlertDialogTitle,
  Rv as AlertDialogTrigger,
  Lv as AspectRatio,
  Hv as AvatarFallback,
  Kv as AvatarImage,
  zv as AvatarRoot,
  Gu as CalendarCell,
  ed as CalendarCellTrigger,
  Uu as CalendarGrid,
  Ju as CalendarGridBody,
  Zu as CalendarGridHead,
  Qu as CalendarGridRow,
  qu as CalendarHeadCell,
  Wu as CalendarHeader,
  ju as CalendarHeading,
  Yu as CalendarNext,
  Xu as CalendarPrev,
  Hu as CalendarRoot,
  jv as CheckboxIndicator,
  Wv as CheckboxRoot,
  Zi as CollapsibleContent,
  qi as CollapsibleRoot,
  Yi as CollapsibleTrigger,
  qv as ComboboxAnchor,
  lm as ComboboxArrow,
  Xv as ComboboxCancel,
  Qv as ComboboxContent,
  em as ComboboxEmpty,
  Zv as ComboboxGroup,
  Gv as ComboboxInput,
  am as ComboboxItem,
  nm as ComboboxItemIndicator,
  Jv as ComboboxLabel,
  sm as ComboboxPortal,
  Uv as ComboboxRoot,
  om as ComboboxSeparator,
  Yv as ComboboxTrigger,
  tm as ComboboxViewport,
  xv as ConfigProvider,
  cm as ContextMenuArrow,
  mm as ContextMenuCheckboxItem,
  dm as ContextMenuContent,
  pm as ContextMenuGroup,
  fm as ContextMenuItem,
  hm as ContextMenuItemIndicator,
  ym as ContextMenuLabel,
  um as ContextMenuPortal,
  gm as ContextMenuRadioGroup,
  bm as ContextMenuRadioItem,
  rm as ContextMenuRoot,
  vm as ContextMenuSeparator,
  Cm as ContextMenuSub,
  wm as ContextMenuSubContent,
  _m as ContextMenuSubTrigger,
  im as ContextMenuTrigger,
  nc as DateFieldInput,
  jd as DateFieldRoot,
  Fm as DatePickerAnchor,
  Nm as DatePickerArrow,
  Mm as DatePickerCalendar,
  Pm as DatePickerCell,
  Am as DatePickerCellTrigger,
  Lm as DatePickerClose,
  Km as DatePickerContent,
  Vm as DatePickerField,
  Em as DatePickerGrid,
  Tm as DatePickerGridBody,
  Im as DatePickerGridHead,
  Rm as DatePickerGridRow,
  Dm as DatePickerHeadCell,
  xm as DatePickerHeader,
  Sm as DatePickerHeading,
  Om as DatePickerInput,
  $m as DatePickerNext,
  Bm as DatePickerPrev,
  km as DatePickerRoot,
  zm as DatePickerTrigger,
  dc as DateRangeFieldInput,
  uc as DateRangeFieldRoot,
  oh as DateRangePickerAnchor,
  lh as DateRangePickerArrow,
  ah as DateRangePickerCalendar,
  Um as DateRangePickerCell,
  Qm as DateRangePickerCellTrigger,
  sh as DateRangePickerClose,
  ih as DateRangePickerContent,
  nh as DateRangePickerField,
  jm as DateRangePickerGrid,
  Zm as DateRangePickerGridBody,
  Xm as DateRangePickerGridHead,
  Jm as DateRangePickerGridRow,
  Gm as DateRangePickerHeadCell,
  Hm as DateRangePickerHeader,
  Wm as DateRangePickerHeading,
  eh as DateRangePickerInput,
  qm as DateRangePickerNext,
  Ym as DateRangePickerPrev,
  th as DateRangePickerRoot,
  rh as DateRangePickerTrigger,
  Xl as DialogClose,
  Pu as DialogContent,
  Iu as DialogDescription,
  $u as DialogOverlay,
  Iv as DialogPortal,
  nu as DialogRoot,
  Bu as DialogTitle,
  ou as DialogTrigger,
  ph as DropdownMenuArrow,
  yh as DropdownMenuCheckboxItem,
  fh as DropdownMenuContent,
  mh as DropdownMenuGroup,
  vh as DropdownMenuItem,
  gh as DropdownMenuItemIndicator,
  bh as DropdownMenuLabel,
  ch as DropdownMenuPortal,
  Ch as DropdownMenuRadioGroup,
  wh as DropdownMenuRadioItem,
  uh as DropdownMenuRoot,
  hh as DropdownMenuSeparator,
  _h as DropdownMenuSub,
  xh as DropdownMenuSubContent,
  Sh as DropdownMenuSubTrigger,
  dh as DropdownMenuTrigger,
  Ph as EditableArea,
  Ih as EditableCancelTrigger,
  Th as EditableEditTrigger,
  Dh as EditableInput,
  $h as EditablePreview,
  Eh as EditableRoot,
  Bh as EditableSubmitTrigger,
  Za as FocusScope,
  Mh as HoverCardArrow,
  kh as HoverCardContent,
  Oh as HoverCardPortal,
  Rh as HoverCardRoot,
  Ah as HoverCardTrigger,
  Vh as Label,
  Nh as ListboxContent,
  Lh as ListboxFilter,
  Wh as ListboxGroup,
  jh as ListboxGroupLabel,
  zh as ListboxItem,
  Kh as ListboxItemIndicator,
  Fh as ListboxRoot,
  Hh as ListboxVirtualizer,
  Zh as MenubarArrow,
  ty as MenubarCheckboxItem,
  Xh as MenubarContent,
  Qh as MenubarGroup,
  Jh as MenubarItem,
  ay as MenubarItemIndicator,
  ny as MenubarLabel,
  Gh as MenubarMenu,
  Yh as MenubarPortal,
  oy as MenubarRadioGroup,
  ly as MenubarRadioItem,
  Uh as MenubarRoot,
  ey as MenubarSeparator,
  sy as MenubarSub,
  ry as MenubarSubContent,
  iy as MenubarSubTrigger,
  qh as MenubarTrigger,
  cy as NavigationMenuContent,
  fy as NavigationMenuIndicator,
  dy as NavigationMenuItem,
  py as NavigationMenuLink,
  vy as NavigationMenuList,
  uy as NavigationMenuRoot,
  my as NavigationMenuSub,
  hy as NavigationMenuTrigger,
  yy as NavigationMenuViewport,
  wy as NumberFieldDecrement,
  Cy as NumberFieldIncrement,
  by as NumberFieldInput,
  gy as NumberFieldRoot,
  xy as PaginationEllipsis,
  Sy as PaginationFirst,
  Ey as PaginationLast,
  Py as PaginationList,
  Dy as PaginationListItem,
  $y as PaginationNext,
  By as PaginationPrev,
  _y as PaginationRoot,
  Ty as PinInputInput,
  Iy as PinInputRoot,
  Ds as PopoverAnchor,
  Es as PopoverArrow,
  Ps as PopoverClose,
  Ss as PopoverContent,
  _s as PopoverPortal,
  Cs as PopoverRoot,
  ws as PopoverTrigger,
  O as Primitive,
  Ay as ProgressIndicator,
  Ry as ProgressRoot,
  My as RadioGroupIndicator,
  ky as RadioGroupItem,
  Oy as RadioGroupRoot,
  wf as RangeCalendarCell,
  $f as RangeCalendarCellTrigger,
  Cf as RangeCalendarGrid,
  Pf as RangeCalendarGridBody,
  Ef as RangeCalendarGridHead,
  Df as RangeCalendarGridRow,
  _f as RangeCalendarHeadCell,
  gf as RangeCalendarHeader,
  bf as RangeCalendarHeading,
  xf as RangeCalendarNext,
  Sf as RangeCalendarPrev,
  yf as RangeCalendarRoot,
  zy as ScrollAreaCorner,
  Vy as ScrollAreaRoot,
  Ny as ScrollAreaScrollbar,
  Ly as ScrollAreaThumb,
  Fy as ScrollAreaViewport,
  Uy as SelectArrow,
  jy as SelectContent,
  Xy as SelectGroup,
  ng as SelectIcon,
  qy as SelectItem,
  Yy as SelectItemIndicator,
  Jy as SelectItemText,
  Zy as SelectLabel,
  Wy as SelectPortal,
  Ky as SelectRoot,
  tg as SelectScrollDownButton,
  eg as SelectScrollUpButton,
  Gy as SelectSeparator,
  Hy as SelectTrigger,
  ag as SelectValue,
  Qy as SelectViewport,
  ap as Separator,
  rg as SliderRange,
  og as SliderRoot,
  lg as SliderThumb,
  sg as SliderTrack,
  Jn as Slot,
  ig as SplitterGroup,
  ug as SplitterPanel,
  dg as SplitterResizeHandle,
  vg as StepperDescription,
  hg as StepperIndicator,
  fg as StepperItem,
  cg as StepperRoot,
  yg as StepperSeparator,
  mg as StepperTitle,
  pg as StepperTrigger,
  gg as SwitchRoot,
  bg as SwitchThumb,
  _g as TabsContent,
  Sg as TabsIndicator,
  wg as TabsList,
  Cg as TabsRoot,
  xg as TabsTrigger,
  Ig as TagsInputClear,
  Pg as TagsInputInput,
  Dg as TagsInputItem,
  Bg as TagsInputItemDelete,
  $g as TagsInputItemText,
  Eg as TagsInputRoot,
  Og as ToastAction,
  ov as ToastClose,
  Vg as ToastDescription,
  Ag as ToastPortal,
  Tg as ToastProvider,
  Rg as ToastRoot,
  Mg as ToastTitle,
  kg as ToastViewport,
  lv as Toggle,
  uv as ToggleGroupItem,
  iv as ToggleGroupRoot,
  cv as ToolbarButton,
  Ng as ToolbarLink,
  Fg as ToolbarRoot,
  Kg as ToolbarSeparator,
  Lg as ToolbarToggleGroup,
  zg as ToolbarToggleItem,
  Gg as TooltipArrow,
  Ug as TooltipContent,
  qg as TooltipPortal,
  Hg as TooltipProvider,
  Wg as TooltipRoot,
  jg as TooltipTrigger,
  Xg as TreeItem,
  Yg as TreeRoot,
  Zg as TreeVirtualizer,
  Jg as Viewport,
  Jt as VisuallyHidden,
  te as createContext,
  ya as useBodyScrollLock,
  qn as useDateFormatter,
  Te as useEmitAsProps,
  R2 as useForwardExpose,
  Ot as useForwardProps,
  Se as useForwardPropsEmits,
  ge as useId,
  zl as useStateMachine,
  Sv as withDefault
};
//# sourceMappingURL=radix-vue.js.map
