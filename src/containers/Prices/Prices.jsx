import React, {Component} from 'react';
import { Row, Col } from 'react-flexbox-grid'
import PriceCardContainer from './PriceCard'
import { ipcRenderer } from 'electron'

class PricesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {prices : null};
        this.setInterval = this.setInterval.bind(this);
    }
    componentWillMount() {
        this.intervals = [];
        this.listeners = (event, arg) => {
            this.setState({prices : arg})
        };
        const sendFN = () => { ipcRenderer.send('get-prices') }
        sendFN();
        this.setInterval(sendFN, 10000);
        ipcRenderer.on('send-prices', this.listeners);
    }
    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments))
    }
    componentWillUnmount() {
        ipcRenderer.removeListener('send-prices', this.listeners)
        this.intervals.forEach(clearInterval)
    }
    render() {
        let modules = [];    
        if(this.state.prices !== null) {
            let siteModules = [];
            for(let site of this.state.prices[this.props.route.path]) {
                siteModules.push(<Col key={site.name + this.props.route.path} xs={4}><PriceCardContainer data={site} /></Col>)
            }
            for(let count = 0; count < siteModules.length; count+=3) {
                modules.push(<Row key={Math.random()}><Col xs={12}>&nbsp;</Col></Row>);
                modules.push(<Row key={Math.random()}><Col xs={12}>&nbsp;</Col></Row>);
                let sites = [];
                for(let countSite = 0; ((countSite < siteModules.length) && (countSite < 3)); countSite++) {
                    sites.push(siteModules[count + countSite]);
                }   
                modules.push(<Row key={Math.random()}>{sites}</Row>); 
            }

        }
        return (
            <div>{modules}</div> 
        );
    }
}

export default PricesContainer;

/*

    Not Released

    -------------------------------------------------------------------------------------

    import FloatingActionButton from 'material-ui/FloatingActionButton';
    import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
    import { orange400 } from 'material-ui/styles/colors'

    <FloatingActionButton backgroundColor={orange400} className={style.refresh_button}>
        <RefreshIcon />
    </FloatingActionButton>

    -------------------------------------------------------------------------------------


*/