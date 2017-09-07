import { observable, action } from 'mobx'

class NetworkStore {
    @observable values = {
        timezone: ''
    }

    @observable timezoneOptions = []

    @action setTimezone(timezone) {
        this.values.timezone = timezone
    }
}

export default new NetworkStore()