import React, {Component} from 'react';
import { Row, Col } from 'react-flexbox-grid'
import PriceCardContainer from './PriceCard'

class PricesContainer extends Component {
    render() {
        let siteModules = [];
        for(let site of this.props.data) {
            siteModules.push(<Col xs={4}><PriceCardContainer key={site.name} data={site} /></Col>)
        }
        let modules = [];
        for(let count = 0; count < siteModules.length; count+=3) {
            modules.push(<Row><Col xs={12}>&nbsp;</Col></Row>);
            modules.push(<Row><Col xs={12}>&nbsp;</Col></Row>);
            let sites = [];
            for(let countSite = 0; ((countSite < siteModules.length) && (countSite < 3)); countSite++) {
                sites.push(siteModules[count + countSite]);
            }   
            modules.push(<Row>{sites}</Row>); 
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