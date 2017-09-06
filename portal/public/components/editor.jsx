import React from 'react'
import { observer } from 'mobx-react'
import Select from 'react-select'

@observer
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

@observer
export class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e, i) {
        this.props.onChange(e, i)
    }
    render() {
        let listItems = []
        if (this.props.labels) {
            listItems = this.props.labels.map((item, index) => {
                return (
                    <label className="checkbox-inline" title="" key={index}>
                        <input 
                            name={item.name} 
                            type="checkbox" 
                            checked={item.value} 
                            onChange={(e) => this.handleChange(e, index)}
                        /> {item.label + ' '}
                    </label>
                )
            })
        }
        return (
            <div className="form-group">
                <label className={this.props.left + " control-label"}>{this.props.label}</label>
                <div className={this.props.right}>
                    {listItems}
                </div>
            </div>
        )
    }
}

@observer
export class CSelect extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label className={this.props.left + " control-label"}>{this.props.label}</label>
                <div className={this.props.right}>
                    <Select
                        name={this.props.name}
                        value={this.props.value}
                        options={this.props.options}
                    />
                </div>
            </div>
        )
    }
}