import { observable, action } from 'mobx'
import agent from '../agent';

class NetworkStore {
    @observable values = {
        timezone: '',
        emailTo: '',
        bgScanInterval: 600,
        bgScanState: false,
        psScanState: false,
    }

    @observable timezoneOptions = []

    @action setTimezone(timezone) {
        this.values.timezone = timezone
    }

    @action setEmailTo(emailTo) {
        this.values.emailTo = emailTo
    }

    @action setBgScanInterval(interval) {
        this.values.bgScanInterval = interval
    }

    @action setBgScanState(state) {
        this.values.bgScanState = state
    }

    @action setPsScanState(state) {
        this.values.psScanState = state
    }

    @action loadTimezoneOptions() {
        return agent.Options.all()
            .then(action(({ options }) => {
                options.forEach((option, i) => this.timezoneOptions[i] = option)
            }))
    }

    @action submit() {
        const network = this.values
        return agent.Network.submit(network)
            .then(({ result }) => {
                console.log(result)
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
    }
}

export default new NetworkStore()