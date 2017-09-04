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
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onChange(e)
    }
    render() {
        const listItems = this.props.labels.map((item, index) => {
            return (
                <label className="checkbox-inline" title="" key={index}>
                    <input 
                        name={item.name} 
                        type="checkbox" 
                        checked={item.value} 
                        onChange={this.handleChange}
                    /> {item.label + ' '}
                </label>
            )
        })
        return (
            <div className="form-group">
                <div className={this.props.className}>
                    {listItems}
                </div>
            </div>
        )
    }
}