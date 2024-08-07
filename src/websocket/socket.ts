export const initiateSocket = (webWorker : Worker) => {
  const wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
wss.onmessage = (msg : any) => {
    webWorker.postMessage({message : msg?.data})
}
  wss.onopen = () => {
    wss.send(
      JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
      })
    );
  };
};
