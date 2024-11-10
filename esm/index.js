import { io as r } from "socket.io-client";
const o = () => r("http://localhost:5000"), m = (s) => {
  o().on("connect", () => {
    s == null || s("Connected to Python backend!");
  });
}, n = (s, e) => {
  o().emit(s, e);
}, a = (s, e) => {
  o().on(s, e);
}, k = (s, e) => {
  o().once(s, e);
}, d = (s) => {
  n("message", s);
}, b = (s) => {
  a("message", s);
}, h = (s) => {
  k("message", s);
}, u = (s, e, t) => new Promise((i) => {
  k(s, (c) => {
    t(c), i(c);
  }), n(s, e);
});
export {
  o as getSocket,
  m as initializeSocket,
  k as once,
  h as onceMessage,
  n as send,
  u as sendAndReceive,
  d as sendMessage,
  a as subscribe,
  b as subscribeMessage
};
