import { observable, action, computed } from 'mobx'

class ApStore {
    @observable apList = []
    @action set(data) {
        this.apList = data
    }
    @action update(sn, key, value) {
        this.apList.filter(ap => (sn === ap.serial))[0][key] = value
    }
}

export default new ApStore()