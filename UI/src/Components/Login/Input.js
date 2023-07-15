import React from 'react';
import './Login.css'
class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputVal: ""
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(e) {
        this.props.parentFunction(e)
    }

    render() {
        return (
          <>
            <input
              type={this.props.inputType}
              name={this.props.name}
              placeholder={this.props.placeholder}
              id={this.props.id}
              className={this.props.className}
              onChange={this.changeHandler}
              autoComplete={this.props.autoComplete}
              onKeyDown={this.props.keyPressEvent}
            />
          </>
        );
    }
}
export default Input;