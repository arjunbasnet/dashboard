// widget related data
  import React from 'react'
  import ReactDOM from 'react-dom'
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var WidgetSchema = new Schema({
	id: Number,
    title:  String,
    category: String
  });

  class Widget extends React.Component {
    render(){
      return (
          <div className="widget">

          </div>
      );
    }
  }