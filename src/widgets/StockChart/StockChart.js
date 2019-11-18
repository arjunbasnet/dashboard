import React, { Component } from "react";

class StockChart extends Component {
  componentDidMount() {
    let container = this.container;

    function initWidgetScript() {
      let script = document.createElement("script");
      script.async = true;
      script.innerHTML =
        "new TradingView.widget({" +
        ' "autosize": true,"symbol": "NASDAQ:FB","interval": "D","timezone": "Europe/Helsinki", ' +
        ' "theme": "Dark", "style": "1","locale": "en","toolbar_bg": "#f1f3f6", "enable_publishing": false, ' +
        ' "allow_symbol_change": true,"container_id": "tradingViewWidget"});';

      container.appendChild(script);
    }

    let externalScript = document.createElement("script");
    externalScript.async = true;
    externalScript.src = "https://s3.tradingview.com/tv.js";
    externalScript.onload = initWidgetScript;

    container.appendChild(externalScript);
  }

  render() {
    const widgetStyle = {
      height: "300px"
    };
    return (
      <div className="card " {...this.props} ref={this.props.innerRef}>
        <div className="header">
          <h4 className="title">Stock</h4>
        </div>
        <div className="content">
          <div id="StockInfo" ref={el => (this.container = el)}>
            <div className="tradingview-widget-container">
              <div id="tradingViewWidget" style={widgetStyle}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StockChart