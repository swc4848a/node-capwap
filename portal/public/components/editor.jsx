import React from 'react'

export class Input extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onInputChange(e.target.value)
    }
    render() {
        const value = this.props.value
        return (
            <div className="form-group">
                <label className={this.props.left + " control-label"}>{this.props.label}</label>
                <div className={this.props.right}>
                    <input type={this.props.type} 
                        className="form-control" 
                        placeholder={this.props.placeholder} 
                        value={value}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                    />
                </div>
            </div>
        )
    }
}

export class Text extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="form-group">
                <label className={this.props.left + " control-label"}>{this.props.label}</label>
                <div className={this.props.right}>
                    <span>{this.props.value}</span>
                </div>
            </div>
        )
    }
}