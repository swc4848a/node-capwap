import { observable, action, computed } from 'mobx'
import agent from '../agent';

class SSIDsStore {
    @observable isLoading = false;
    @observable ssidsRegistry = observable.map()

    @computed get ssids() {
        return this.ssidsRegistry.values()
    }

    getSSID(slug) {
        return this.ssidsRegistry.get(slug)
    }

    $req() {
        return agent.SSIDs.all()
    }

    @action loadSSIDs() {
        this.isLoading = true
        return this.$req()
            .then(action(({ ssids }) => {
                this.ssidsRegistry.clear()
                ssids.forEach((ssid) => this.ssidsRegistry.set(ssid.ssid, ssid))
            }))
            .finally(action(() => {
                this.isLoading = false
            }))
    }

    @action loadSSID(slug, { acceptCached = false } = {}) {
        if (acceptCached) {
            const ssid = this.getSSID(slug)
            if (ssid) return Promise.resolve(ssid)
        }
        this.isLoading = true
        return agent.SSIDs.get(slug)
            .then(action(({ ssid }) => {
                this.ssidsRegistry.set(ssid.ssid, ssid)
                return ssid
            }))
            .finally(action(() => {
                this.isLoading = false
            }))
    }
}

export default new SSIDsStore()