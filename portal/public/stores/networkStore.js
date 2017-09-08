import { observable, action } from 'mobx'
import agent from '../agent';

class NetworkStore {
    @observable values = {
        timezone: ''
    }

    @observable timezoneOptions = []

    @action setTimezone(timezone) {
        this.values.timezone = timezone
    }

    $req() {
        return agent.Options.all()
    }

    @action loadTimezoneOptions() {
        return this.$req()
            .then(action(({ options }) => {
                options.forEach((option, i) => this.timezoneOptions[i] = option)
            }))
    }
}

export default new NetworkStore()