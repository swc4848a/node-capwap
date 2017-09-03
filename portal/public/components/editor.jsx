import React from 'react'

export class Input extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onChange(e)
    }
    render() {
        const value = this.props.value
        return (
            <div className="form-group">
                <label className={this.props.left + " control-label"}>{this.props.label}</label>
                <div className={this.props.right}>
                    <input 
                        name={this.props.name}
                        type={this.props.type} 
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

export class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-offset-2 col-md-2">
                    <div className="form-group">
                        <div className={this.props.className}>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" /> {this.props.label}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <div className={this.props.className}>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" /> {this.props.label}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}