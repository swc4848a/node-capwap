import { observable, action, computed } from 'mobx'
import agent from '../agent';

class SSIDsStore {
    @observable isLoading = false;
    @observable ssidsRegistry = observable.map()

    @computed get ssids() {
        return this.ssidsRegistry.values()
    }

    $req() {
        return agent.SSIDs.all()
    }

    @action loadSSIDs() {
        this.isLoading = true
        return this.$req()
            .then(action(({ ssids }) => {
                this.ssidsRegistry.clear()
                ssids.forEach((ssid, index) => this.ssidsRegistry.set(index, ssid))
            }))
            .finally(action(() => {
                this.isLoading = false
            }))
    }
}

export default new SSIDsStore()