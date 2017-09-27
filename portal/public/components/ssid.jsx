import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('ssidsStore')
@withRouter
@observer
export default class Article extends React.Component {
    componentWillMount() {
        const slug = this.props.match.params.name
        this.props.ssidsStore.loadSSID(slug, { acceptCached: true });
    }
    componentDidMount() {
        // $("#example-basic").steps({
        //     headerTag: "h3",
        //     bodyTag: "section",
        //     transitionEffect: "slideLeft",
        //     autoFocus: true
        // })
    }
    render() {
        const slug = this.props.match.params.name
        const ssid = this.props.ssidsStore.getSSID(slug)

        return (
            <section className="content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="box box-primary">
                            <div id="example-basic">
                                <h3>Keyboard</h3>
                                <section>
                                    <p>Try the keyboard navigation by clicking arrow left or right!</p>
                                </section>
                                <h3>Effects</h3>
                                <section>
                                    <p>Wonderful transition effects.</p>
                                </section>
                                <h3>Pager</h3>
                                <section>
                                    <p>The next and previous buttons help you to navigate through your content.</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}